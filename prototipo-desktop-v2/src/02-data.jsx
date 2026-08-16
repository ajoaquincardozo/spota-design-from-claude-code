// ========================================================================
// 02-data.jsx
// ========================================================================
const PLACES = [
  { id: 'p1', name: 'Café Cobrand', cat: 'Cafetería', hood: 'Palermo', score: 4.8, reviews: 312, affinity: 94, price: '$$', img: 'cafePalermo', tag: 'Popular', visited: true, benefit: '−15% café' },
  { id: 'p2', name: 'Casa Nómade', cat: 'Restaurante', hood: 'Colegiales', score: 4.6, reviews: 182, affinity: 88, price: '$$', img: 'pasta', tag: 'Nuevo' },
  { id: 'p3', name: 'Librería El Refugio', cat: 'Cultura', hood: 'Villa Crespo', score: 4.8, reviews: 310, affinity: 91, price: 'Gratis', img: 'libreria', tag: 'Recomendado', visited: true },
  { id: 'p4', name: 'Arte en las Calles', cat: 'Recorrido', hood: 'Centro', score: 4.5, reviews: 201, affinity: 82, price: 'Gratis', img: 'graffiti' },
  { id: 'p5', name: 'Parque Centenario', cat: 'Aire libre', hood: 'Caballito', score: 4.7, reviews: 154, affinity: 79, price: 'Gratis', img: 'parquePalermo' },
  { id: 'p6', name: 'Bar Tinto', cat: 'Vinos', hood: 'San Telmo', score: 4.7, reviews: 245, affinity: 90, price: '$$$', img: 'vino', benefit: 'Copa cortesía' },
  { id: 'p7', name: 'Feria de Diseño', cat: 'Mercado', hood: 'Palermo', score: 4.7, reviews: 256, affinity: 86, price: 'Gratis', img: 'cocteles', tag: 'Popular' },
  { id: 'p8', name: 'La Birrería', cat: 'Cervecería', hood: 'Chacarita', score: 4.6, reviews: 198, affinity: 84, price: '$$', img: 'cervezaArtesanal' },
  { id: 'p9', name: 'Don Asado', cat: 'Parrilla', hood: 'Boedo', score: 4.9, reviews: 421, affinity: 76, price: '$$$', img: 'parrilla' },
  { id: 'p10', name: 'Helado de Antes', cat: 'Heladería', hood: 'Recoleta', score: 4.8, reviews: 289, affinity: 81, price: '$', img: 'helado' },
];

const CATEGORIES = [
  { id: 'cafe', label: 'Cafés', icon: 'coffee' },
  { id: 'comida', label: 'Comida', icon: 'utensils' },
  { id: 'bares', label: 'Bares', icon: 'bar' },
  { id: 'cultura', label: 'Cultura', icon: 'palette' },
  { id: 'aire', label: 'Aire libre', icon: 'leaf' },
  { id: 'planes', label: 'Planes', icon: 'sparkles' },
];

const REVIEWS = [
  { id: 'r1', user: 'Sol B.', hood: 'Belgrano', score: 5, fama: 92, text: 'Encontré un café de barrio increíble, atención impecable y mesas en patio interno con plantas. Volvería sin dudarlo.' },
  { id: 'r2', user: 'Tomás R.', hood: 'Almagro', score: 5, fama: 87, text: 'Tostado propio, pastelería casera, wifi rápido. Es mi café para trabajar a la mañana.' },
  { id: 'r3', user: 'Micaela L.', hood: 'Villa Urquiza', score: 4, fama: 95, text: 'Lugar precioso. Fui un sábado y estaba llenísimo, pero la atención siguió siendo cuidada.' },
];

const COLLECTIONS = [
  { id: 'c1', name: 'Sábado lluvioso', count: 8, by: 'Sol B.', cover: 'cafePalermo', themeIcon: 'umbrella', public: true },
  { id: 'c2', name: 'Cenas con onda', count: 12, by: 'Tomás R.', cover: 'pasta', themeIcon: 'utensils', public: true },
  { id: 'c3', name: 'Cumple de Mica', count: 5, by: 'Vos', cover: 'cocteles', themeIcon: 'sparkles', public: false },
  { id: 'c4', name: 'Brunches dominicales', count: 9, by: 'Camila V.', cover: 'brunch', themeIcon: 'coffee', public: true },
  { id: 'c5', name: 'Aire libre con perro', count: 6, by: 'Vos', cover: 'parquePalermo', themeIcon: 'leaf', public: false },
  { id: 'c6', name: 'Noches de tragos', count: 11, by: 'Federico M.', cover: 'vino', themeIcon: 'moon', public: true },
];

const PLAN_OPTIONS = [
  { id: 'op1', place: PLACES[0], votes: 4, voters: ['Sol', 'Tomi', 'Mica', 'Vos'] },
  { id: 'op2', place: PLACES[1], votes: 2, voters: ['Mica', 'Vos'] },
  { id: 'op3', place: PLACES[5], votes: 3, voters: ['Sol', 'Tomi', 'Vos'] },
];

const HOSTS = [
  { id: 'h1', name: 'Federico M.', verified: true, fama: 4.9, reviews: 87, hood: 'Palermo', expertise: ['Cafés de especialidad', 'Diseño'], price: 8500, bio: 'Barista y diseñador. Te llevo por los mejores cafés de tercera ola de la ciudad.' },
  { id: 'h2', name: 'Lucía P.', verified: false, fama: 4.7, reviews: 32, hood: 'San Telmo', expertise: ['Historia porteña', 'Tango'], price: 6000, bio: 'Crecí en San Telmo. Conozco cada esquina con su historia. Recorridos a pie con paradas en bares de barrio.' },
  { id: 'h3', name: 'Mateo G.', verified: true, fama: 4.8, reviews: 56, hood: 'Chacarita', expertise: ['Cervecerías', 'Vida nocturna'], price: 7200, bio: 'Cicerone cervecero. Tour de bares artesanales con cata incluida y notas de cada estilo.' },
];

const OFFERS = [
  { id: 'of1', title: 'Cafés de especialidad', user: 'Sol B.', date: 'Sáb 17 mayo', people: 2, hood: 'Palermo', budget: 8000, postulants: 3 },
  { id: 'of2', title: 'Tour de bares en San Telmo', user: 'Tomás R.', date: 'Vie 23 mayo', people: 4, hood: 'San Telmo', budget: 12000, postulants: 5 },
  { id: 'of3', title: 'Brunch para una primera cita', user: 'Mica L.', date: 'Dom 18 mayo', people: 2, hood: 'Villa Crespo', budget: 6500, postulants: 2 },
];

// ─────────────────────────────────────────────────────────────
// Concierge — datos y helpers compartidos con mobile
// (interpretación de query, etiqueta de afinidad, reviewers afines).
// Si más adelante se consolida un design-system.js común, este bloque
// se extrae junto con SearchBar / IntentChips / AffineRow.
// ─────────────────────────────────────────────────────────────
const SEARCH_PLACEHOLDERS = [
  'algo tranquilo en Palermo...',
  'cena romántica el sábado...',
  'café para trabajar con buen wifi...',
  'plan económico con amigos...',
  'qué hacer un domingo lluvioso...',
  'after office en San Telmo...',
];

const AFFINE_REVIEWERS = {
  p1:  ['Mati R.', 'Lu G.', 'Tomás S.'],
  p2:  ['Sofía M.', 'Lu G.'],
  p3:  ['Cami P.', 'Mati R.', 'Andrés L.'],
  p6:  ['Tomás S.', 'Sofía M.'],
  p7:  ['Lu G.', 'Cami P.'],
  p8:  ['Andrés L.'],
  p10: ['Sofía M.', 'Mati R.'],
  p11: ['Cami P.', 'Tomás S.', 'Andrés L.'],
};

function affinityLabel(score) {
  if (score == null) return null;
  if (score >= 88) return { label: 'Alto match', tone: 'primary' };
  if (score >= 78) return { label: 'Buen match', tone: 'soft'    };
  return null;
}

function interpretQuery(text) {
  if (!text) return {};
  const t = text.toLowerCase();
  const out = {};

  const ambiente = [
    { kw: ['tranquilo', 'tranqui', 'relajado', 'silencioso', 'tranquila'], v: 'tranquilo' },
    { kw: ['romántico', 'romántica', 'romantico', 'romantica', 'íntimo', 'intimo'], v: 'romántico' },
    { kw: ['movido', 'fiesta', 'after', 'after office', 'ruidoso'],     v: 'movido' },
    { kw: ['charlar', 'conversar'],                                       v: 'charlar' },
    { kw: ['trabajar', 'wifi', 'laburar', 'remoto'],                      v: 'trabajar' },
    { kw: ['económico', 'economico', 'barato', 'low cost'],               v: 'económico' },
  ];
  for (const a of ambiente) if (a.kw.some(k => t.includes(k))) { out.ambiente = a.v; break; }

  // compañía — el plural va antes del singular para que "amigos" no matchee "amigo"
  const compania = [
    { kw: ['con amigas'],                              v: 'con amigas' },
    { kw: ['con una amiga', 'con amiga', 'una amiga'], v: 'con amiga'  },
    { kw: ['con amigos'],                              v: 'con amigos' },
    { kw: ['con un amigo', 'con amigo', 'un amigo'],   v: 'con amigo'  },
    { kw: ['en pareja', 'mi pareja', 'cita'],          v: 'pareja'     },
    { kw: ['en familia', 'con mi familia'],            v: 'familia'    },
    { kw: ['en grupo', 'grupo'],                       v: 'grupo'      },
    { kw: ['solo', 'sola'],                            v: 'solo'       },
  ];
  for (const c of compania) if (c.kw.some(k => t.includes(k))) { out.compania = c.v; break; }

  const momento = [
    { kw: ['hoy'],                          v: 'hoy'      },
    { kw: ['mañana', 'manana'],             v: 'mañana'   },
    { kw: ['esta noche', 'a la noche'],     v: 'esta noche' },
    { kw: ['esta tarde', 'a la tarde'],     v: 'esta tarde' },
    { kw: ['lunes'],   v: 'lunes'   },
    { kw: ['martes'],  v: 'martes'  },
    { kw: ['miércoles', 'miercoles'], v: 'miércoles' },
    { kw: ['jueves'],  v: 'jueves'  },
    { kw: ['viernes'], v: 'viernes' },
    { kw: ['sábado', 'sabado'], v: 'sábado' },
    { kw: ['domingo'], v: 'domingo' },
    { kw: ['fin de semana', 'finde'], v: 'fin de semana' },
  ];
  for (const m of momento) if (m.kw.some(k => t.includes(k))) { out.momento = m.v; break; }

  const categoria = [
    { kw: ['café', 'cafe', 'cafés', 'cafes', 'cafetería', 'cafeteria'], v: 'cafés' },
    { kw: ['cena', 'cenar', 'comer', 'restaurante', 'comida'],          v: 'comida' },
    { kw: ['bar', 'bares', 'tragos', 'cerveza', 'cervecería'],          v: 'bares' },
    { kw: ['cultura', 'museo', 'librería', 'libreria', 'cine', 'arte'], v: 'cultura' },
    { kw: ['parque', 'aire libre', 'caminar', 'paseo'],                 v: 'aire libre' },
  ];
  for (const c of categoria) if (c.kw.some(k => t.includes(k))) { out.categoria = c.v; break; }

  const zonas = ['Palermo', 'San Telmo', 'Villa Crespo', 'Colegiales', 'Recoleta',
                 'Caballito', 'Chacarita', 'Boedo', 'Centro', 'Belgrano'];
  for (const z of zonas) if (t.includes(z.toLowerCase())) { out.zona = z; break; }

  return out;
}

// ─────────────────────────────────────────────────────────────
// CU-004-002 + CU-007-004/005 — Sets unificados de Ámbito (Colecciones)
// y Actividad (Colecciones + Insights + Campañas). Mantener acá como
// fuente única para evitar drift entre pantallas.
// ─────────────────────────────────────────────────────────────
const SCOPE_OPTIONS = ['Mías', 'Guardadas', 'De la comunidad', 'Todas'];
const ACTIVITY_OPTIONS = ['Café', 'Cena', 'Trago', 'Arte y cultura',
  'Trabajo nómade', 'Tarde con amigos', 'Cita romántica', 'Deporte', 'Todas'];

const CAT_TO_ACTIVITY = {
  'Cafetería': 'Café',
  'Restaurante': 'Cena',
  'Parrilla': 'Cena',
  'Bar': 'Trago',
  'Vinos': 'Trago',
  'Cervecería': 'Trago',
  'Cultura': 'Arte y cultura',
  'Recorrido': 'Arte y cultura',
  'Mercado': 'Arte y cultura',
  'Heladería': 'Tarde con amigos',
  'Aire libre': 'Deporte',
  'Bienestar': 'Deporte',
};
function matchesActivity(place, activity) {
  if (!activity || activity === 'Todas') return true;
  return CAT_TO_ACTIVITY[place.cat] === activity;
}
function collectionMatchCount(c, activity) {
  if (!activity || activity === 'Todas') return null;
  const seed = Math.abs(hashStr(c.id + ':' + activity));
  return Math.max(1, seed % Math.max(2, c.count));
}
const SAVED_COLLECTION_IDS = new Set(['c1', 'c4']);
function collectionIsSaved(c) { return SAVED_COLLECTION_IDS.has(c.id); }
function collectionIsMine(c) { return c.by === 'Vos'; }
function collectionInScope(c, scope) {
  if (!scope || scope === 'Todas') return true;
  if (scope === 'Mías') return collectionIsMine(c);
  if (scope === 'Guardadas') return collectionIsSaved(c);
  if (scope === 'De la comunidad') return !collectionIsMine(c);
  return true;
}

Object.assign(window, { PLACES, CATEGORIES, REVIEWS, COLLECTIONS, PLAN_OPTIONS, HOSTS, OFFERS,
                        SEARCH_PLACEHOLDERS, AFFINE_REVIEWERS, affinityLabel, interpretQuery,
                        SCOPE_OPTIONS, ACTIVITY_OPTIONS, CAT_TO_ACTIVITY,
                        matchesActivity, collectionMatchCount, collectionIsSaved,
                        collectionIsMine, collectionInScope });
