#!/bin/sh
# =============================================================================
#  Spota - generador (macOS / Linux). Equivalente de build.cmd.
#
#  Una sola fuente (src/ + src/manifest.txt), dos artefactos:
#
#    index.html                    -> 19 <script src>, lo consume el modo servidor
#    Spota Prototipo Desktop.html  -> monolito autocontenido, anda en file:/// e IIS
#
#  NO SE INVOCA DIRECTO. Es interno: la puerta de entrada es ../spota.command
#
#    ../spota.command --output                    genera los dos, en la raiz
#    ../spota.command --output ../dist            SOLO el monolito en ../dist/
#    ../spota.command --output ../dist/demo.html  SOLO el monolito con ese nombre
#
#  Las rutas son relativas a donde estas parado (no a la ubicacion del script).
#  Se crean los directorios que falten. Sale con 0 e imprime la ruta absoluta.
#
#  Por que --output emite solo el monolito: index.html necesita src/ al lado
#  para funcionar, asi que copiado a un destino arbitrario quedaria roto. El
#  monolito es autocontenido y sobrevive en cualquier carpeta.
# =============================================================================

set -e

CALLER_PWD="$PWD"                 # antes del cd: las rutas del usuario son relativas a esto
cd "$(dirname "$0")/.."           # este script vive en tools/, se trabaja desde la raiz
HERE="$PWD"

DEFAULT_NAME="Spota Prototipo Desktop.html"
MANIFEST="src/manifest.txt"

[ -f "$MANIFEST" ] || { echo "[ERROR] Falta $MANIFEST"; exit 1; }

# ---- leer el manifest -------------------------------------------------------
MODS=""
while IFS= read -r line; do
  case "$line" in ''|'#'*) continue ;; esac
  [ -f "src/$line" ] || { echo "[ERROR] Falta src/$line (listado en manifest.txt)"; exit 1; }
  MODS="$MODS $line"
done < "$MANIFEST"

[ -n "$MODS" ] || { echo "[ERROR] El manifest no lista ningun modulo"; exit 1; }

# ---- resolver destino del monolito ------------------------------------------
if [ -n "$1" ]; then
  case "$1" in
    /*) TARGET="$1" ;;
    *)  TARGET="$CALLER_PWD/$1" ;;
  esac
  case "$TARGET" in
    *.html|*.HTML) OUT_DIR=$(dirname "$TARGET"); OUT_NAME=$(basename "$TARGET") ;;
    *)             OUT_DIR="$TARGET";            OUT_NAME="$DEFAULT_NAME" ;;
  esac
  ONLY_MONOLITH=1
else
  OUT_DIR="$HERE"; OUT_NAME="$DEFAULT_NAME"; ONLY_MONOLITH=0
fi

mkdir -p "$OUT_DIR"
OUT_DIR=$(cd "$OUT_DIR" && pwd)          # canonicalizar para imprimir absoluto
OUT="$OUT_DIR/$OUT_NAME"

[ -f "$OUT" ] && EXISTED=1 || EXISTED=0

# ---- artefacto 1: monolito (concatenacion) ----------------------------------
FILES="src/_head.html src/_open.html"
for m in $MODS; do FILES="$FILES src/$m"; done
FILES="$FILES src/_close.html src/_tail.html"

# shellcheck disable=SC2086
cat $FILES > "$OUT"

echo ""
if [ "$EXISTED" = "1" ]; then
  echo "  Sobrescribi : $OUT"
else
  echo "  Generado    : $OUT"
fi

# ---- artefacto 2: index.html (solo en build local) --------------------------
if [ "$ONLY_MONOLITH" = "0" ]; then
  {
    cat src/_head.html
    echo "<!-- Modulos servidos por HTTP. El ORDEN de estos tags es el orden de evaluacion. -->"
    for m in $MODS; do
      echo "<script type=\"text/babel\" data-presets=\"react\" src=\"src/$m\"></script>"
    done
    cat src/_tail.html
  } > "$HERE/index.html"
  echo "  Generado    : $HERE/index.html"
else
  echo "  (index.html omitido: necesita src/ al lado, no es portable)"
fi

echo ""
exit 0
