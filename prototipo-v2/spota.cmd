@echo off
REM ============================================================================
REM  Spota - punto de entrada unico (Windows). Equivalente de spota.command.
REM
REM  Por defecto intenta levantar el servidor. Si no puede (puerto ocupado,
REM  ExecutionPolicy, urlacl, firewall), NO se cuelga: genera el monolito y lo
REM  abre con file:/// para que puedas mostrar el prototipo igual.
REM
REM  Modos:
REM    spota.cmd                    servidor; si falla -> genera y abre el archivo
REM    spota.cmd 9001               idem, en otro puerto
REM    spota.cmd --serve [puerto]   solo servidor, sin fallback (para diagnosticar)
REM    spota.cmd --file             solo generar y abrir el archivo
REM    spota.cmd --output [ruta]    solo generar, sin abrir nada
REM    spota.cmd --help
REM
REM  Invoca PowerShell con -ExecutionPolicy Bypass, asi que no hace falta tocar
REM  la politica de la maquina para que el servidor arranque.
REM
REM  POR QUE NO SE LLAMA start.cmd: "start" es un comando interno de cmd. Si el
REM  archivo se llamara start.cmd, tipear "start" parado en esta carpeta abriria
REM  una ventana nueva en vez de correr el script -el builtin le gana al archivo
REM  del directorio actual-. Anda con doble click y anda tipeando "start.cmd"
REM  completo, pero es una trampa silenciosa. "spota" no colisiona con nada.
REM ============================================================================

setlocal

set "HERE=%~dp0"
set "HERE=%HERE:~0,-1%"
set "MONO=%HERE%\Spota Prototipo.html"

set "MODE=%~1"

if /i "%MODE%"=="--help"   goto :help
if /i "%MODE%"=="-h"       goto :help
if /i "%MODE%"=="--output" goto :output
if /i "%MODE%"=="-o"       goto :output
if /i "%MODE%"=="--file"   goto :filemode
if /i "%MODE%"=="-f"       goto :filemode
if /i "%MODE%"=="--serve"  goto :servemode
if /i "%MODE%"=="-s"       goto :servemode
goto :default


:help
echo.
echo   spota.cmd                    servidor; si falla -^> genera y abre el archivo
echo   spota.cmd 9001               idem, en otro puerto
echo   spota.cmd --serve [puerto]   solo servidor, sin fallback (para diagnosticar)
echo   spota.cmd --file             solo generar y abrir el archivo
echo   spota.cmd --output [ruta]    solo generar, sin abrir nada
echo   spota.cmd --help
echo.
exit /b 0


:output
REM la ruta se pasa cruda: build.cmd la resuelve contra el cwd del usuario
if "%~2"=="" (
  call "%HERE%\tools\build.cmd"
) else (
  call "%HERE%\tools\build.cmd" "%~2"
)
exit /b %ERRORLEVEL%


:filemode
call "%HERE%\tools\build.cmd"
if errorlevel 1 exit /b 1
echo   Abriendo el archivo generado (file:///)...
start "" "%MONO%"
echo.
exit /b 0


:servemode
call "%HERE%\tools\build.cmd"
if errorlevel 1 exit /b 1
set "PORT=%~2"
if "%PORT%"=="" set "PORT=8000"
powershell -NoProfile -ExecutionPolicy Bypass -File "%HERE%\tools\serve.ps1" -Port %PORT%
exit /b %ERRORLEVEL%


:default
set "PORT=%~1"
if "%PORT%"=="" set "PORT=8000"

call "%HERE%\tools\build.cmd"
if errorlevel 1 (
  echo.
  echo   No se pudo generar. Ver el detalle arriba.
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%HERE%\tools\serve.ps1" -Port %PORT%
set "RC=%ERRORLEVEL%"

REM 3 = no pudo levantar. Cualquier otro codigo (0 = Ctrl+C limpio, etc.)
REM significa que el servidor si corrio: no hay nada que reemplazar.
if not "%RC%"=="3" goto :fin

echo.
echo   ---------------------------------------------------------------
echo   El servidor no arranco. Caigo al modo archivo.
echo   Perdes el F5 en caliente, pero el prototipo se muestra igual.
echo   ---------------------------------------------------------------
echo.
echo   Abriendo el archivo generado (file:///)...
start "" "%MONO%"
echo.

:fin
endlocal
exit /b 0
