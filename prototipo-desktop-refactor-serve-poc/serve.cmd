@echo off
REM ============================================================================
REM  Spota - lanzador del servidor en Windows.
REM
REM  Existe para dos cosas:
REM   1. que funcione con doble click, sin abrir PowerShell a mano
REM   2. saltear el ExecutionPolicy, que en muchas maquinas corporativas o de
REM      universidad viene en Restricted y no deja correr un .ps1 suelto
REM
REM  Uso:  serve.cmd          -> puerto 8002
REM        serve.cmd 9000     -> puerto 9000
REM ============================================================================

setlocal

set "PORT=%~1"
if "%PORT%"=="" set "PORT=8002"

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" -Port %PORT%

if errorlevel 1 (
  echo.
  echo   El servidor no pudo arrancar. Ver el detalle arriba.
  echo.
)

pause
endlocal
