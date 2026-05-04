// Datos mockeados para Spota — lugares, hosts, usuarios, ofertas, etc.

const PLACES = [
  { id: 'p1', name: 'Café Cobrand', cat: 'Cafetería', hood: 'Palermo', score: 4.8, reviews: 312, affinity: 94, price: '$$', img: 'cafePalermo', tag: 'Popular', visited: true, benefit: '−15% café' },
  { id: 'p2', name: 'Casa Nómade', cat: 'Restaurante', hood: 'Colegiales', score: 4.6, reviews: 182, affinity: 88, price: '$$', img: 'pasta', tag: 'Nuevo' },
  { id: 'p3', name: 'Librería El Refugio', cat: 'Cultura', hood: 'Villa Crespo', score: 4.8, reviews: 310, affinity: 91, price: 'Gratis', img: 'libreria', tag: 'Recomendado', visited: true },
  { id: 'p4', name: 'Arte en las Calles', cat: 'Recorrido', hood: 'Centro', score: 4.5, reviews: 201, affinity: 82, price: 'Gratis', img: 'graffiti' },
  { id: 'p5', name: 'Parque Centenario', cat: 'Aire libre', hood: 'Caballito', score: 4.7, reviews: 154, affinity: 79, price: 'Gratis', img: 'parquePalermo' },
  { id: 'p6', name: 'Bar Tinto', cat: 'Vinos', hood: 'San Telmo', score: 4.7, reviews: 245, affinity: 90, price: '$$$', img: 'vino', benefit: 'Copa cortesía' },
  { id: 'p7', name: 'Feria de Diseño', cat: 'Mercado', hood: 'Palermo', score: 4.7, reviews: 256, affinity: 86, price: 'Gratis', img: 'feriaPalermo', tag: 'Popular' },
  { id: 'p8', name: 'La Birrería', cat: 'Cervecería', hood: 'Chacarita', score: 4.6, reviews: 198, affinity: 84, price: '$$', img: 'cervezaArtesanal' },
  { id: 'p9', name: 'Don Asado', cat: 'Parrilla', hood: 'Boedo', score: 4.9, reviews: 421, affinity: 76, price: '$$$', img: 'parrilla' },
  { id: 'p10', name: 'Helado de Antes', cat: 'Heladería', hood: 'Recoleta', score: 4.8, reviews: 289, affinity: 81, price: '$', img: 'helado' },
  { id: 'p11', name: 'Cine Lorca', cat: 'Cultura', hood: 'Recoleta', score: 4.7, reviews: 167, affinity: 88, price: '$$', img: 'museo' },
  { id: 'p12', name: 'Estudio Yoga Sur', cat: 'Bienestar', hood: 'San Telmo', score: 4.9, reviews: 98, affinity: 72, price: '$$', img: 'yoga' },
];

const REVIEWS = [
  { id: 'r1', user: 'Sol B.', hood: 'Belgrano', score: 5, fama: 92, text: 'Encontré un bar de barrio increíble y conocí gente hermosa. Spota ya es parte de mis planes de finde.', place: 'Bar Tinto' },
  { id: 'r2', user: 'Tomás R.', hood: 'Almagro', score: 5, fama: 87, text: 'Me encanta apoyar lugares locales y descubrir esas joyitas que no están en las guías típicas.', place: 'Casa Nómade' },
  { id: 'r3', user: 'Micaela L.', hood: 'Villa Urquiza', score: 5, fama: 95, text: 'La comunidad de Spota siempre recomienda lo mejor. ¡100% recomendado!', place: 'Café Cobrand' },
];

const HOSTS = [
  { id: 'h1', name: 'Federico M.', verified: true, fama: 4.9, reviews: 87, hood: 'Palermo', expertise: ['Cafés de especialidad', 'Diseño'], price: 8500, bio: 'Barista y diseñador. Te llevo por los mejores cafés de tercera ola de la ciudad.' },
  { id: 'h2', name: 'Lucía P.', verified: false, fama: 4.7, reviews: 32, hood: 'San Telmo', expertise: ['Historia porteña', 'Tango'], price: 6000, bio: 'Crecí en San Telmo. Conozco cada esquina con su historia.' },
  { id: 'h3', name: 'Mateo G.', verified: true, fama: 4.8, reviews: 56, hood: 'Chacarita', expertise: ['Cervecerías', 'Vida nocturna'], price: 7200, bio: 'Cicerone cervecero. Tour de bares artesanales con cata incluida.' },
];

const COLLECTIONS = [
  { id: 'c1', name: 'Sábado lluvioso', count: 8, by: 'Sol B.', cover: 'cafePalermo', emoji: '☔', public: true },
  { id: 'c2', name: 'Cenas con onda', count: 12, by: 'Tomás R.', cover: 'pasta', emoji: '🍝', public: true },
  { id: 'c3', name: 'Cumple de Mica', count: 5, by: 'Vos', cover: 'cocteles', emoji: '🎉', public: false },
  { id: 'c4', name: 'Brunches dominicales', count: 9, by: 'Camila V.', cover: 'brunch', emoji: '🍳', public: true },
];

const PLAN_OPTIONS = [
  { id: 'op1', place: PLACES[0], votes: 4, voters: ['Sol', 'Tomi', 'Mica', 'Vos'] },
  { id: 'op2', place: PLACES[1], votes: 2, voters: ['Mica', 'Vos'] },
  { id: 'op3', place: PLACES[5], votes: 3, voters: ['Sol', 'Tomi', 'Lu'] },
];

const CATEGORIES = [
  { id: 'cafe', label: 'Cafés', icon: 'coffee' },
  { id: 'comida', label: 'Comida', icon: 'utensils' },
  { id: 'bares', label: 'Bares', icon: 'bar' },
  { id: 'cultura', label: 'Cultura', icon: 'palette' },
  { id: 'aire', label: 'Aire libre', icon: 'leaf' },
  { id: 'planes', label: 'Planes', icon: 'sparkles' },
];

const SEARCH_PLACEHOLDERS = [
  'algo tranquilo en Palermo...',
  'cena romántica el sábado...',
  'café para trabajar con buen wifi...',
  'plan económico con amigos...',
  'qué hacer un domingo lluvioso...',
  'after office en San Telmo...',
];

Object.assign(window, { PLACES, REVIEWS, HOSTS, COLLECTIONS, PLAN_OPTIONS, CATEGORIES, SEARCH_PLACEHOLDERS });
