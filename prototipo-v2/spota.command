#!/bin/sh
# =============================================================================
#  Spota - punto de entrada unico (macOS / Linux). Equivalente de spota.cmd.
#
#  Por defecto intenta levantar el servidor. Si no puede (puerto ocupado, sin
#  runtime, permisos), NO se cuelga: genera el monolito y lo abre con file:///
#  para que puedas mostrar el prototipo igual.
#
#  Modos:
#    ./spota.command                    servidor; si falla -> genera y abre el archivo
#    ./spota.command 9001               idem, en otro puerto
#    ./spota.command --serve [puerto]   solo servidor, sin fallback (para diagnosticar)
#    ./spota.command --file             solo generar y abrir el archivo
#    ./spota.command --output [ruta]    solo generar el monolito, sin abrir nada
#    ./spota.command --help
#
#  Extension .command para que ande con doble click desde Finder.
# =============================================================================

CALLER_PWD="$PWD"                 # OJO: capturar ANTES del cd. Las rutas que pasa el
                                  # usuario son relativas a donde EL esta parado, no a
                                  # donde vive el script.
cd "$(dirname "$0")" || exit 1
HERE="$PWD"
TOOLS="$HERE/tools"
MONO="$HERE/Spota Prototipo.html"

open_file() {
  echo ""
  echo "  Abriendo el archivo generado (file:///)..."
  open "$MONO" >/dev/null 2>&1 || xdg-open "$MONO" >/dev/null 2>&1 || {
    echo "  [AVISO] No pude abrir el browser solo. Abri a mano:"
    echo "          $MONO"
  }
  echo ""
}

usage() {
  # escrito literal a proposito: atarlo a numeros de linea del header se rompe
  # solo con editar un comentario de arriba
  echo ""
  echo "  ./spota.command                    servidor; si falla -> genera y abre el archivo"
  echo "  ./spota.command 9001               idem, en otro puerto"
  echo "  ./spota.command --serve [puerto]   solo servidor, sin fallback (para diagnosticar)"
  echo "  ./spota.command --file             solo generar y abrir el archivo"
  echo "  ./spota.command --output [ruta]    solo generar, sin abrir nada"
  echo "  ./spota.command --help"
  echo ""
  exit 0
}

case "$1" in
  --help|-h)
    usage
    ;;

  --output|-o)
    # Ya hicimos cd al directorio del script, asi que una ruta relativa se
    # resolveria contra el POC en vez de contra el cwd del usuario. Se absolutiza
    # aca, con el CALLER_PWD capturado arriba, y recien ahi se delega.
    if [ -z "$2" ]; then
      exec "$TOOLS/build.sh"
    fi
    case "$2" in
      /*) exec "$TOOLS/build.sh" "$2" ;;
      *)  exec "$TOOLS/build.sh" "$CALLER_PWD/$2" ;;
    esac
    ;;

  --file|-f)
    "$TOOLS/build.sh" || exit 1
    open_file
    exit 0
    ;;

  --serve|-s)
    "$TOOLS/build.sh" || exit 1
    "$TOOLS/serve.sh" "$2"
    exit $?
    ;;

  *)
    PORT="${1:-8000}"

    "$TOOLS/build.sh" || exit 1

    "$TOOLS/serve.sh" "$PORT"
    RC=$?

    # 3 = no pudo levantar. Cualquier otro codigo (0 = Ctrl+C limpio, etc.)
    # significa que el servidor si corrio: no hay nada que reemplazar.
    if [ "$RC" = "3" ]; then
      echo ""
      echo "  ---------------------------------------------------------------"
      echo "  El servidor no arranco. Caigo al modo archivo."
      echo "  Perdes el F5 en caliente, pero el prototipo se muestra igual."
      echo "  ---------------------------------------------------------------"
      open_file
      exit 0
    fi

    exit $RC
    ;;
esac
