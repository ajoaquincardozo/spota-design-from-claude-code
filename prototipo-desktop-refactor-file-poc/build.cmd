@echo off
REM ============================================================================
REM  Spota - build del prototipo desktop
REM
REM  Concatena src\_head.html + los modulos de src\manifest.txt + src\_tail.html
REM  en un unico HTML autocontenido.
REM
REM  No necesita Node, ni Python, ni servidor. Solo cmd.exe.
REM  Uso: doble click, o  build.cmd  desde una consola.
REM ============================================================================

setlocal enabledelayedexpansion
cd /d "%~dp0"

set "OUT=Spota Prototipo Desktop.html"
set "LIST=src\_head.html"

if not exist "src\manifest.txt" (
  echo [ERROR] No se encuentra src\manifest.txt
  exit /b 1
)

REM eol=# ignora comentarios; for /f saltea lineas vacias por default
for /f "usebackq eol=# delims=" %%F in ("src\manifest.txt") do (
  if not exist "src\%%F" (
    echo [ERROR] Falta el archivo src\%%F ^(listado en manifest.txt^)
    exit /b 1
  )
  set "LIST=!LIST!+src\%%F"
)

set "LIST=!LIST!+src\_tail.html"

copy /b !LIST! "%OUT%" >nul
if errorlevel 1 (
  echo [ERROR] Fallo la concatenacion.
  exit /b 1
)

echo.
echo   OK - "%OUT%" generado.
echo   Abrilo con doble click ^(anda en file:///^) o copialo a IIS.
echo.

REM Para publicar directo sobre el prototipo original, descomentar:
REM copy /b "%OUT%" "..\prototipo-desktop\%OUT%" >nul

endlocal
