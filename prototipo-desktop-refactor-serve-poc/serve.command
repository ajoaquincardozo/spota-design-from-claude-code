#!/bin/sh
# =============================================================================
#  Spota - servidor estatico nativo de macOS / Linux.
#
#  Extension .command para que ande con doble click desde Finder.
#  Prueba runtimes en orden de disponibilidad real en un Mac limpio:
#
#    1. ruby   -> viene de fabrica en macOS (WEBrick). Es el que se usa aca.
#    2. python3 -> NO viene de fabrica desde macOS 12.3; solo si hay Xcode CLT.
#    3. php    -> ya no viene: Apple lo saco en macOS 12.
#
#  Cortar con Ctrl+C.
# =============================================================================

cd "$(dirname "$0")" || exit 1

PORT="${1:-8002}"
URL="http://localhost:$PORT/"

echo ""
echo "  Spota - prototipo desktop (modulos servidos por HTTP)"
echo "  Sirviendo : $(pwd)"
echo "  URL       : $URL"
echo "  Cortar    : Ctrl+C"
echo ""

if command -v ruby >/dev/null 2>&1; then
  echo "  Runtime   : ruby ($(ruby -e 'print RUBY_VERSION'))"
  echo ""
  (sleep 1; open "$URL" 2>/dev/null || true) &
  exec ruby -run -e httpd . -p "$PORT" --do-not-reverse-lookup

elif command -v python3 >/dev/null 2>&1; then
  echo "  Runtime   : python3 ($(python3 -V 2>&1))"
  echo ""
  (sleep 1; open "$URL" 2>/dev/null || true) &
  exec python3 -m http.server "$PORT"

elif command -v php >/dev/null 2>&1; then
  echo "  Runtime   : php ($(php -r 'echo PHP_VERSION;'))"
  echo ""
  (sleep 1; open "$URL" 2>/dev/null || true) &
  exec php -S "localhost:$PORT"

else
  echo "  [ERROR] No hay ruby, python3 ni php en esta maquina."
  echo ""
  echo "  Sin runtime no hay servidor, y sin servidor esta version no arranca"
  echo "  (Babel no puede bajar los .jsx sobre file:///)."
  echo "  Usar el POC v1 (concatenacion), que no depende de nada."
  echo ""
  exit 1
fi
