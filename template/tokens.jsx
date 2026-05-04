// Spota Design Tokens — Paleta "Cercanía Local"
const SPOTA = {
  // Paletas (la app puede tener varios temas en el futuro; por ahora una)
  c: {
    primary: '#2F6F5E',      // Verde petróleo
    primaryDark: '#1F4F44',
    primaryLight: '#4A8A78',
    primarySoft: '#E2EEE9',  // fondo sutil verde
    secondary: '#B85C38',    // Terracota
    secondaryDark: '#9A4928',
    secondaryLight: '#D17A55',
    secondarySoft: '#F7E3D7',
    accent: '#E9A23B',       // Arena dorada
    accentSoft: '#FBEBC8',
    bg: '#FFF8ED',           // Crema
    bgAlt: '#FFFDF7',        // Crema más claro
    surface: '#FFFFFF',
    line: '#EADFC9',         // borde sobre crema
    lineSoft: '#F0E6D2',
    text: '#2B2523',         // Marrón oscuro
    textSoft: '#6B5E55',
    textMuted: '#9A8B7E',
    success: '#3F8B5E',
    danger: '#C84B3A',
  },
  font: {
    ui: '"DM Sans", "Inter", system-ui, -apple-system, sans-serif',
    serif: '"Fraunces", "Times New Roman", serif',
  },
  radius: {
    sm: 8, md: 12, lg: 16, xl: 20, pill: 9999,
  },
  shadow: {
    card: '0 1px 2px rgba(43,37,35,0.04), 0 4px 16px rgba(43,37,35,0.06)',
    cardHover: '0 2px 4px rgba(43,37,35,0.06), 0 12px 28px rgba(43,37,35,0.10)',
    pop: '0 8px 24px rgba(43,37,35,0.12), 0 2px 6px rgba(43,37,35,0.06)',
    nav: '0 -2px 16px rgba(43,37,35,0.06)',
  },
};

// Density helpers
function density(d) {
  // d: 'compact' | 'cozy' | 'spacious'
  if (d === 'compact') return { cardGap: 8, cardPad: 10, sectionGap: 16, listGap: 8, imgH: 140, fontScale: 0.94 };
  if (d === 'spacious') return { cardGap: 16, cardPad: 16, sectionGap: 28, listGap: 16, imgH: 200, fontScale: 1.06 };
  return { cardGap: 12, cardPad: 12, sectionGap: 22, listGap: 12, imgH: 170, fontScale: 1 };
}

// Unsplash helper — query → photo url
function img(query, w = 800, h = 600) {
  const q = encodeURIComponent(query);
  return `https://source.unsplash.com/${w}x${h}/?${q}`;
}

// Curated Unsplash photo IDs por tipo (más estables que /random)
const PHOTOS = {
  cafe: 'photo-1554118811-1e0d58224f24',
  cafePalermo: 'photo-1521017432531-fbd92d768814',
  bar: 'photo-1514933651103-005eec06c04b',
  barDeco: 'photo-1538488881038-e252a119ace7',
  pasta: 'photo-1551183053-bf91a1d81141',
  brunch: 'photo-1533089860892-a7c6f0a88666',
  feria: 'photo-1555529669-e69e7aa0ba9a',
  feriaPalermo: 'photo-1488459716781-31db52582fe9',
  libreria: 'photo-1521587760476-6c12a4b040da',
  libreriaCerrada: 'photo-1507842217343-583bb7270b66',
  arteCalle: 'photo-1499856871958-5b9627545d1a',
  graffiti: 'photo-1551033406-611cf9a28f67',
  parque: 'photo-1568667256549-094345857637',
  parquePalermo: 'photo-1565689157206-0fddef7589a2',
  bicis: 'photo-1502301197179-65228ab57f78',
  cerveza: 'photo-1508253730651-e5ace80a7025',
  cervezaArtesanal: 'photo-1535958636474-b021ee887b13',
  vino: 'photo-1510812431401-41d2bd2722f3',
  cocteles: 'photo-1551024506-0bccd828d307',
  asado: 'photo-1544025162-d76694265947',
  parrilla: 'photo-1546964124-0cce460f38ef',
  pizza: 'photo-1565299624946-b28f40a0ae38',
  restoElegante: 'photo-1517248135467-4c7edcad34c4',
  cafeMesa: 'photo-1495474472287-4d71bcdd2085',
  rooftop: 'photo-1514933651103-005eec06c04b',
  museo: 'photo-1565060169187-5284f59c1e9b',
  jazz: 'photo-1485579149621-3123dd979885',
  taller: 'photo-1556761175-5973dc0f32e7',
  yoga: 'photo-1545205597-3d9d02c29597',
  panaderia: 'photo-1555507036-ab1f4038808a',
  helado: 'photo-1501443762994-82bd5dace89a',
};
function photo(key, w = 800, h = 600) {
  const id = PHOTOS[key] || PHOTOS.cafe;
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=70`;
}

// Avatares
function avatar(seed, w = 120) {
  // Usa unsplash people queries deterministas via dicebear style stub fallback
  const ids = [
    'photo-1494790108377-be9c29b29330', // mujer 1
    'photo-1535713875002-d1d0cf377fde', // hombre 1
    'photo-1438761681033-6461ffad8d80', // mujer 2
    'photo-1472099645785-5658abf4ff4e', // hombre 2
    'photo-1500648767791-00dcc994a43e', // hombre 3
    'photo-1517841905240-472988babdf9', // hombre 4
    'photo-1531123897727-8f129e1688ce', // mujer 3
    'photo-1487412720507-e7ab37603c6f', // hombre 5
    'photo-1544005313-94ddf0286df2', // mujer 4
    'photo-1607746882042-944635dfe10e', // mujer 5
    'photo-1539571696357-5a69c17a67c6', // hombre 6
    'photo-1573496359142-b8d87734a5a2', // mujer 6
  ];
  const idx = Math.abs(hashStr(seed)) % ids.length;
  return `https://images.unsplash.com/${ids[idx]}?w=${w}&h=${w}&fit=crop&auto=format&q=70`;
}
function hashStr(s) {
  let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h) + s.charCodeAt(i);
  return h;
}

Object.assign(window, { SPOTA, density, photo, avatar, img });
