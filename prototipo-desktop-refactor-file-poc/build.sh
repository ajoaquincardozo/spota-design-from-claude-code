#!/bin/sh
# =============================================================================
#  Spota - build del prototipo desktop (equivalente macOS / Linux de build.cmd)
#
#  Mismo contrato: _head.html + modulos del manifest + _tail.html -> un HTML.
#  Solo usa `cat`. Existe para poder probar el POC fuera de Windows.
# =============================================================================

set -e
cd "$(dirname "$0")"

OUT="Spota Prototipo Desktop.html"
FILES="src/_head.html"

[ -f src/manifest.txt ] || { echo "[ERROR] Falta src/manifest.txt"; exit 1; }

while IFS= read -r f; do
  case "$f" in ''|'#'*) continue ;; esac
  [ -f "src/$f" ] || { echo "[ERROR] Falta el archivo src/$f (listado en manifest.txt)"; exit 1; }
  FILES="$FILES src/$f"
done < src/manifest.txt

FILES="$FILES src/_tail.html"

# shellcheck disable=SC2086
cat $FILES > "$OUT"

echo ""
echo "  OK - \"$OUT\" generado ($(wc -l < "$OUT" | tr -d ' ') lineas)."
echo "  Abrilo con doble click (anda en file:///) o copialo a IIS."
echo ""
