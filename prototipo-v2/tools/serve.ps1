# =============================================================================
#  Spota - servidor estatico nativo de Windows (PowerShell + System.Net.HttpListener)
#
#  No instala nada: HttpListener es parte de .NET Framework, que ya viene en
#  cualquier Windows moderno. Sirve esta carpeta por HTTP para que Babel pueda
#  bajar los modulos .jsx (que sobre file:/// serian bloqueados por CORS).
#
#  CONTRATO DE SALIDA (lo usa spota.cmd para decidir el fallback):
#    3  = no pude levantar el servidor (puerto ocupado, sin permiso para la URL)
#    0  = corrio y se corto limpio
#    *  = cualquier otra cosa; NO es motivo de fallback
#
#  El codigo 3 es dedicado a proposito: si usaramos 1, un Ctrl+C o un error
#  cualquiera se confundiria con "no pudo arrancar" y dispararia el fallback
#  abriendo una ventana de browser al pedo cada vez que cortas el servidor.
#
#  NO SE INVOCA DIRECTO. Es interno: la puerta de entrada es ..\spota.cmd
#  Cortar con Ctrl+C.
# =============================================================================

param(
  [int]$Port = 8000,
  [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'

# este script vive en tools\, pero lo que se sirve es la raiz del prototipo.
# $rootFull ademas es el guard de path traversal de mas abajo: si apunta mal,
# el servidor expone la carpeta equivocada.
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$root      = Split-Path -Parent $scriptDir
$rootFull  = [System.IO.Path]::GetFullPath($root)
$prefix    = "http://localhost:$Port/"

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.jsx'  = 'application/javascript; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.txt'  = 'text/plain; charset=utf-8'
  '.svg'  = 'image/svg+xml'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.gif'  = 'image/gif'
  '.webp' = 'image/webp'
  '.ico'  = 'image/x-icon'
  '.woff' = 'font/woff'
  '.woff2'= 'font/woff2'
}

if (-not (Test-Path (Join-Path $rootFull 'index.html'))) {
  Write-Host "  [AVISO] No hay index.html. Corre spota.cmd --output primero." -ForegroundColor Yellow
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
}
catch {
  Write-Host ""
  Write-Host "  [ERROR] No se pudo abrir $prefix" -ForegroundColor Red
  Write-Host "  $($_.Exception.Message)"
  Write-Host ""
  Write-Host "  Causas tipicas y como salir:" -ForegroundColor Yellow
  Write-Host "   - El puerto esta ocupado  -> probar otro:  spota.cmd 9001"
  Write-Host "   - Falta permiso para reservar la URL (error 5, 'Acceso denegado'):"
  Write-Host "       * abrir esta consola como Administrador, o"
  Write-Host "       * registrar la URL una sola vez, desde una consola admin:"
  Write-Host "           netsh http add urlacl url=$prefix user=$env:USERNAME"
  Write-Host "   - Politica de la maquina que bloquea escuchar en un socket."
  Write-Host ""
  exit 3
}

Write-Host ""
Write-Host "  Spota - prototipo desktop (modulos servidos por HTTP)" -ForegroundColor Green
Write-Host "  Sirviendo : $rootFull"
Write-Host "  URL       : $prefix"
Write-Host "  Cortar    : Ctrl+C"
Write-Host ""

if (-not $NoBrowser) { Start-Process $prefix | Out-Null }

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $res = $ctx.Response

    try {
      $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
      if ($rel -eq '/') { $rel = '/index.html' }

      $candidate = Join-Path $rootFull ($rel.TrimStart('/') -replace '/', '\')
      $full      = [System.IO.Path]::GetFullPath($candidate)

      # no dejar salir de la carpeta del prototipo
      if (-not $full.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase)) {
        $res.StatusCode = 403
        Write-Host ("  403  " + $rel) -ForegroundColor Red
      }
      elseif (Test-Path -LiteralPath $full -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($full)
        $ext   = [System.IO.Path]::GetExtension($full).ToLower()

        $type = 'application/octet-stream'
        if ($mime.ContainsKey($ext)) { $type = $mime[$ext] }

        $res.ContentType = $type
        # sin cache: editas un .jsx, apretas F5 y ves el cambio
        $res.Headers.Add('Cache-Control', 'no-store, no-cache, must-revalidate')
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host ("  200  " + $rel)
      }
      else {
        $res.StatusCode = 404
        Write-Host ("  404  " + $rel) -ForegroundColor Yellow
      }
    }
    catch {
      $res.StatusCode = 500
      Write-Host ("  500  " + $_.Exception.Message) -ForegroundColor Red
    }
    finally {
      $res.Close()
    }
  }
}
finally {
  $listener.Stop()
  $listener.Close()
  Write-Host ""
  Write-Host "  Servidor detenido." -ForegroundColor Green
}

exit 0
