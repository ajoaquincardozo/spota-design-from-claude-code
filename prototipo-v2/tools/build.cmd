@echo off
REM ============================================================================
REM  Spota mobile - generador (Windows). Equivalente de build.sh.
REM
REM  Una sola fuente (src\ + src\manifest.txt), dos artefactos:
REM
REM    index.html            -> 13 modulos servidos por HTTP, lo usa el modo servidor
REM    Spota Prototipo.html  -> monolito autocontenido, anda en file:/// e IIS
REM
REM  NO SE INVOCA DIRECTO. Es interno: la puerta de entrada es ..\spota.cmd
REM
REM    ..\spota.cmd --output                    genera los dos, en la raiz
REM    ..\spota.cmd --output ..\dist            SOLO el monolito en ..\dist\
REM    ..\spota.cmd --output ..\dist\demo.html  SOLO el monolito con ese nombre
REM
REM  Las rutas son relativas a donde estas parado (no a la ubicacion del script).
REM  Se crean los directorios que falten. Sale con 0 e imprime la ruta absoluta.
REM
REM  DIFERENCIA CON EL DESKTOP: aca cada modulo va en SU PROPIO <script>, separados
REM  por src\_sep.html, en vez de ir todos dentro de uno solo. No es cosmetico: el
REM  mobile depende de que cada modulo tenga scope propio (ver src\_bootstrap.html).
REM  Fusionarlos romperia con "Identifier 'TabBar' has already been declared".
REM
REM  NOTA DE ESTILO: la resolucion de rutas evita bloques ( ) a proposito. Dentro
REM  de un bloque, cmd expande las variables al parsear, y un path con parentesis
REM  -el clasico "Program Files (x86)"- cierra el bloque antes de tiempo y rompe
REM  el script. Por eso se usan etiquetas y goto en vez de if/else con llaves.
REM ============================================================================

setlocal enabledelayedexpansion

REM este script vive en tools\, se trabaja desde la raiz: %~dp0.. normalizado con %%~fI
for %%I in ("%~dp0..") do set "HERE=%%~fI"
set "DEFAULT_NAME=Spota Prototipo.html"

REM --- resolver destino ANTES del cd: las rutas del usuario son relativas a su cwd
set "ONLY_MONOLITH=0"
if "%~1"=="" goto :dest_local

set "ONLY_MONOLITH=1"
if /i "%~x1"==".html" goto :dest_file
set "OUT=%~f1\%DEFAULT_NAME%"
goto :dest_done

:dest_file
set "OUT=%~f1"
goto :dest_done

:dest_local
set "OUT=%HERE%\%DEFAULT_NAME%"

:dest_done

cd /d "%HERE%"

if not exist "src\manifest.txt" (
  echo [ERROR] Falta src\manifest.txt
  exit /b 1
)

REM --- crear el directorio destino si no existe
for %%D in ("%OUT%") do set "OUT_DIR=%%~dpD"
if not exist "!OUT_DIR!" md "!OUT_DIR!" 2>nul
if not exist "!OUT_DIR!" goto :err_dir

set "EXISTED=0"
if exist "!OUT!" set "EXISTED=1"

REM --- artefacto 1: monolito --------------------------------------------------
REM head + open + mod1 + sep + mod2 + sep + ... + modN + close + bootstrap + tail
set "LIST=src\_head.html+src\_open.html"
set "FIRST=1"

for /f "usebackq eol=# delims=" %%F in ("src\manifest.txt") do (
  if not exist "src\%%F" (
    echo [ERROR] Falta el archivo src\%%F ^(listado en manifest.txt^)
    exit /b 1
  )
  if "!FIRST!"=="0" set "LIST=!LIST!+src\_sep.html"
  set "LIST=!LIST!+src\%%F"
  set "FIRST=0"
)

set "LIST=!LIST!+src\_close.html+src\_bootstrap.html+src\_tail.html"

copy /b !LIST! "!OUT!" >nul
if errorlevel 1 goto :err_copy

echo.
if "%EXISTED%"=="1" goto :msg_over
echo   Generado    : !OUT!
goto :msg_done
:msg_over
echo   Sobrescribi : !OUT!
:msg_done

REM --- artefacto 2: index.html (solo en build local) --------------------------
if "%ONLY_MONOLITH%"=="1" goto :sin_index

set "IDX=%HERE%\index.html"

> "!IDX!" type "src\_head.html"
>> "!IDX!" echo ^<!-- Modulos servidos por HTTP. El ORDEN de estos tags es el orden de evaluacion. --^>

for /f "usebackq eol=# delims=" %%F in ("src\manifest.txt") do >> "!IDX!" echo ^<script type="text/spota-jsx" src="src/%%F"^>^</script^>

>> "!IDX!" echo.
>> "!IDX!" type "src\_bootstrap.html"
>> "!IDX!" type "src\_tail.html"

echo   Generado    : !IDX!
goto :fin

:sin_index
echo   (index.html omitido: necesita src\ al lado, no es portable)
goto :fin

:err_dir
echo [ERROR] No se pudo crear el directorio "!OUT_DIR!"
exit /b 1

:err_copy
echo [ERROR] Fallo la concatenacion.
exit /b 1

:fin
echo.
endlocal
exit /b 0
