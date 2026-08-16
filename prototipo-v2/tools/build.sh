#!/bin/sh
# =============================================================================
#  Spota mobile - generador (macOS / Linux). Equivalente de build.cmd.
#
#  Una sola fuente (src/ + src/manifest.txt), dos artefactos:
#
#    index.html            -> 13 modulos servidos por HTTP, lo usa el modo servidor
#    Spota Prototipo.html  -> monolito autocontenido, anda en file:/// e IIS
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
#  DIFERENCIA CON EL DESKTOP: aca cada modulo va en SU PROPIO <script>, separados
#  por src/_sep.html, en vez de ir todos dentro de uno solo. No es cosmetico: el
#  mobile depende de que cada modulo tenga scope propio (ver src/_bootstrap.html).
#  Fusionarlos romperia con "Identifier 'TabBar' has already been declared".
# =============================================================================

set -e

CALLER_PWD="$PWD"                 # antes del cd: las rutas del usuario son relativas a esto
cd "$(dirname "$0")/.."           # este script vive en tools/, se trabaja desde la raiz
HERE="$PWD"

DEFAULT_NAME="Spota Prototipo.html"
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

# ---- artefacto 1: monolito --------------------------------------------------
# head + open + mod1 + sep + mod2 + sep + ... + modN + close + bootstrap + tail
FILES="src/_head.html src/_open.html"
FIRST=1
for m in $MODS; do
  if [ "$FIRST" = "1" ]; then FIRST=0; else FILES="$FILES src/_sep.html"; fi
  FILES="$FILES src/$m"
done
FILES="$FILES src/_close.html src/_bootstrap.html src/_tail.html"

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
      echo "<script type=\"text/spota-jsx\" src=\"src/$m\"></script>"
    done
    echo ""
    cat src/_bootstrap.html
    cat src/_tail.html
  } > "$HERE/index.html"
  echo "  Generado    : $HERE/index.html"
else
  echo "  (index.html omitido: necesita src/ al lado, no es portable)"
fi

echo ""
exit 0
