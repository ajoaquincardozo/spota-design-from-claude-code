// ========================================================================
// 01-tokens.jsx
// ========================================================================
const SPOTA = {
  c: {
    primary: '#2F6F5E', primaryDark: '#1F4F44', primaryLight: '#4A8A78', primarySoft: '#E2EEE9',
    secondary: '#B85C38', secondaryDark: '#9A4928', secondaryLight: '#D17A55', secondarySoft: '#F7E3D7',
    accent: '#E9A23B', accentSoft: '#FBEBC8',
    bg: '#FFF8ED', bgAlt: '#FFFDF7', surface: '#FFFFFF',
    line: '#EADFC9', lineSoft: '#F0E6D2',
    text: '#2B2523', textSoft: '#6B5E55', textMuted: '#9A8B7E',
    success: '#3F8B5E', danger: '#C84B3A',
  },
  font: {
    ui: '"DM Sans", "Inter", system-ui, -apple-system, sans-serif',
    serif: '"Fraunces", "Times New Roman", serif',
  },
  radius: { sm: 8, md: 12, lg: 16, xl: 20, pill: 9999 },
  shadow: {
    card: '0 1px 2px rgba(43,37,35,0.04), 0 4px 16px rgba(43,37,35,0.06)',
    cardHover: '0 2px 4px rgba(43,37,35,0.06), 0 12px 28px rgba(43,37,35,0.10)',
    pop: '0 8px 24px rgba(43,37,35,0.12), 0 2px 6px rgba(43,37,35,0.06)',
    nav: '0 2px 12px rgba(43,37,35,0.06)',
  },
};

const PHOTOS = {
  cafe: 'photo-1554118811-1e0d58224f24',
  cafePalermo: 'photo-1521017432531-fbd92d768814',
  bar: 'photo-1514933651103-005eec06c04b',
  pasta: 'photo-1551183053-bf91a1d81141',
  brunch: 'photo-1533089860892-a7c6f0a88666',
  libreria: 'photo-1521587760476-6c12a4b040da',
  graffiti: 'photo-1551033406-611cf9a28f67',
  parquePalermo: 'photo-1565689157206-0fddef7589a2',
  cervezaArtesanal: 'photo-1535958636474-b021ee887b13',
  vino: 'photo-1510812431401-41d2bd2722f3',
  cocteles: 'photo-1551024506-0bccd828d307',
  parrilla: 'photo-1546964124-0cce460f38ef',
  helado: 'photo-1501443762994-82bd5dace89a',
  museo: 'photo-1565060169187-5284f59c1e9b',
  yoga: 'photo-1545205597-3d9d02c29597',
};
function photo(key, w = 800, h = 600) {
  const id = PHOTOS[key] || PHOTOS.cafe;
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=70`;
}

function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h) + s.charCodeAt(i); return h; }
function avatar(seed, w = 120) {
  const ids = [
    'photo-1494790108377-be9c29b29330', 'photo-1535713875002-d1d0cf377fde',
    'photo-1438761681033-6461ffad8d80', 'photo-1472099645785-5658abf4ff4e',
    'photo-1500648767791-00dcc994a43e', 'photo-1517841905240-472988babdf9',
    'photo-1531123897727-8f129e1688ce', 'photo-1487412720507-e7ab37603c6f',
  ];
  return `https://images.unsplash.com/${ids[Math.abs(hashStr(seed)) % ids.length]}?w=${w}&h=${w}&fit=crop&auto=format&q=70`;
}

Object.assign(window, { SPOTA, PHOTOS, photo, avatar });
