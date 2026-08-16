#!/bin/sh
# =============================================================================
#  Spota - servidor estatico nativo (macOS / Linux). Equivalente de serve.ps1.
#  NO SE INVOCA DIRECTO. Es interno: la puerta de entrada es ../spota.command
#
#  CONTRATO DE SALIDA (lo usa spota.command para decidir el fallback):
#    3  = no pude levantar el servidor (puerto ocupado, sin runtime)
#    0  = corrio y se corto limpio
#    *  = cualquier otra cosa; NO es motivo de fallback
#
#  El codigo 3 es dedicado a proposito: si usaramos 1, un Ctrl+C o un error
#  cualquiera se confundiria con "no pudo arrancar" y dispararia el fallback
#  abriendo una ventana de browser al pedo cada vez que cortas el servidor.
#
#  Como se decide que es "no pudo arrancar", en dos capas:
#
#   1. Pre-chequeo de bind ANTES de arrancar. Es la autoridad principal, porque
#      es la unica forma de saberlo con certeza y sin ambiguedad.
#
#      OJO con como se hace: TCPServer.new pone SO_REUSEADDR, y en BSD/macOS eso
#      deja bindear 127.0.0.1 aunque haya alguien en 0.0.0.0 del mismo puerto.
#      Un pre-chequeo sobre 127.0.0.1 da falso negativo. Por eso se bindea la
#      misma direccion que va a usar el servidor (0.0.0.0) y con REUSEADDR en 0.
#
#   2. Heuristica de duracion, como red de seguridad para lo que el pre-chequeo
#      no cubre (race con otro proceso, fallas propias de python3/php). Si el
#      servidor sale con error en menos de 3 segundos, no llego a arrancar. Si
#      duro mas, arranco bien y su salida no es motivo de fallback: eso deja el
#      Ctrl+C afuera sin depender de que codigo devuelva cada runtime.
#
#  Runtimes, en orden de disponibilidad real en un Mac limpio:
#    ruby    -> viene de fabrica
#    python3 -> NO viene por defecto desde macOS 12.3 (requiere Xcode CLT)
#    php     -> ya no viene: Apple lo saco en macOS 12
# =============================================================================

cd "$(dirname "$0")/.." || exit 3   # este script vive en tools/, se sirve la raiz

PORT="${1:-8002}"
URL="http://localhost:$PORT/"

# ---- elegir runtime ---------------------------------------------------------
if   command -v ruby    >/dev/null 2>&1; then RUNTIME="ruby"
elif command -v python3 >/dev/null 2>&1; then RUNTIME="python3"
elif command -v php     >/dev/null 2>&1; then RUNTIME="php"
else
  echo "  [ERROR] No hay ruby, python3 ni php: no se puede levantar un servidor."
  exit 3
fi

# ---- capa 1: pre-chequeo de bind --------------------------------------------
PORT_BUSY=0
case "$RUNTIME" in
  ruby)
    ruby -e '
      require "socket"
      s = Socket.new(:INET, :STREAM)
      s.setsockopt(:SOCKET, :REUSEADDR, 0)
      s.bind(Socket.pack_sockaddr_in(ARGV[0].to_i, "0.0.0.0"))
      s.close
    ' "$PORT" 2>/dev/null || PORT_BUSY=1
    ;;
  python3)
    python3 -c '
import socket, sys
s = socket.socket()
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 0)
s.bind(("0.0.0.0", int(sys.argv[1])))
s.close()
' "$PORT" 2>/dev/null || PORT_BUSY=1
    ;;
esac

if [ "$PORT_BUSY" = "1" ]; then
  echo ""
  echo "  [ERROR] No se puede escuchar en el puerto $PORT (ocupado o bloqueado)."
  echo "          Probar otro:  ./spota.command 9000"
  echo ""
  exit 3
fi

echo ""
echo "  Spota - prototipo desktop (modulos servidos por HTTP)"
echo "  Sirviendo : $(pwd)"
echo "  URL       : $URL"
echo "  Runtime   : $RUNTIME"
echo "  Cortar    : Ctrl+C"
echo ""

[ -f index.html ] || echo "  [AVISO] No hay index.html. Corre ./spota.command --output primero."

if [ "${NO_BROWSER:-0}" != "1" ]; then
  (sleep 1; open "$URL" >/dev/null 2>&1 || xdg-open "$URL" >/dev/null 2>&1 || true) &
fi

# ---- capa 2: arrancar midiendo cuanto duro ----------------------------------
STARTED_AT=$(date +%s)

case "$RUNTIME" in
  ruby)    ruby -run -e httpd . -p "$PORT" --do-not-reverse-lookup ;;
  python3) python3 -m http.server "$PORT" ;;
  php)     php -S "localhost:$PORT" ;;
esac
RC=$?

ELAPSED=$(( $(date +%s) - STARTED_AT ))

if [ "$RC" != "0" ] && [ "$ELAPSED" -lt 3 ]; then
  echo ""
  echo "  [ERROR] El servidor murio apenas arranco (codigo $RC)."
  echo ""
  exit 3
fi

exit $RC
