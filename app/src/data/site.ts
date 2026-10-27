/**
 * Base URL for the mirrored WordPress assets. Empty = serve from /public,
 * or set to https://www.tiptophybrid.com to hot-link the production CDN.
 */
export const ASSET_BASE: string = (import.meta.env?.PUBLIC_ASSET_BASE as string) ?? '';

const asset = (path: string) => `${ASSET_BASE}${path}`;

export const SITE = {
  name: 'Tip Top Hybrid',
  legalName: 'Tip Top Auto Electric',
  origin: 'https://www.tiptophybrid.com',
  phone: '909-238-7028',
  phoneRaw: '+19092387028',
  email: 'TTACSTIPTOP@yahoo.com',
  address: '1894 W 9th St, Upland, CA 91786',
  street: '1894 W 9th St Ste B',
  city: 'Upland',
  state: 'CA',
  zip: '91786',
  mapIframe:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.9960292980645!2d-117.68982782428172!3d34.09524217314086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c331d2c4314489%3A0x1d55653cac313be9!2sTip%20Top%20Hybrid!5e0!3m2!1sen!2sin!4v1769168724618!5m2!1sen!2sin',
  /**
   * Same location, no place card: the `?q=<lat>,<lng>&output=embed` view drops the
   * Google Business Profile overlay (name, address, rating, "Open in Maps") while
   * keeping the pin and the interactive map.
   */
  mapIframeNoCard:
    'https://www.google.com/maps?q=34.09524217314086,-117.68982782428172&z=16&hl=en&output=embed',
  logo: asset('/wp-content/uploads/2025/05/Tip-Top-Hybrid-Logo-White.png'),
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61584789488769',
    instagram: 'https://www.instagram.com/tip_top_hybrid_?igsh=dWs3dmVzcmZsZDBn&utm_source=qr',
    instagramHeader: 'https://www.instagram.com/tiptophybird/',
    google: 'https://share.google/BfZnHIiSuT2CrrbE6',
  },
  /** Tracking ids pulled verbatim from the production site. */
  tracking: {
    gtm: 'GTM-KF7BFWB9',
    ga4: 'G-6L0VTXRB3V',
    googleAds: 'AW-16632046138',
    clarity: 'vmbm134riy',
    callTracking: '//www.gstatic.com/call-tracking/call-tracking_9.js',
  },
} as const;

export const SERVICES = [
  {
    title: 'Hybrid Transaxle & Drivetrain Service',
    href: '/hybrid-transaxle-drivetrain-service/',
    footer: 'Hybrid Transaxle / Drivetrain Service',
  },
  {
    title: 'Engine & Transmission Replacement',
    href: '/hybrid-engine-transmission-replacement/',
    footer: 'Hybrid Engine / Transmission Replacement',
  },
  {
    title: 'Inverter Water Pump Service',
    href: '/inverter-water-pump-service/',
    footer: 'Inverter Water Pump Service',
  },
  {
    title: 'Inverter & Brake Actuator Repair',
    href: '/inverter-brake-actuator-repair/',
    footer: 'Inverter & Brake Actuator Repair',
  },
  {
    title: 'High-Voltage System Repair',
    href: '/high-voltage-system-repair/',
    footer: 'High Voltage System Repair',
  },
  {
    title: 'Hybrid Battery Repair & Replacement',
    href: '/toyota-prius-battery-repair-replacement/',
    footer: 'Toyota Prius / Hybrid Battery Repair & Replacement',
  },
] as const;

/** Cities linked from the “Serving …” paragraph on the home / location pages. */
export const SERVICE_CITIES = [
  'Upland',
  'Montclair',
  'Claremont',
  'Pomona',
  'Chino',
  'Chinohills',
  'Diamond bar',
  'Walnut',
  'Covina',
  'West covina',
  'San dimas',
  'La Verne',
  'Glendora',
  'El monte',
  'Rancho Cucamonga',
  'Etiwanda',
  'Eastvale',
  'Jurupa valley',
  'Fontana',
  'Colton',
  'Rialto',
  'Sierra lakes',
  'San Bernardino',
  'Norco',
  'Corona',
  'Riverside',
  'Baldwin Park',
  'Azusa',
  'Rowland Heights',
  'Loma Linda',
  'Redlands',
  'Whittier',
  'Brea',
  'La Habra',
  'La Puente',
  'Monterey Park',
  'Alhambra',
  'Pasadena',
  'Arcade',
  'Eagle Rock',
  'La Crescenta',
  'Los Angeles',
  'Glendale',
  'Los Feliz',
  'Monrovia',
  'Rosemead',
  'San Gabriel',
  'Yorba Linda',
  'Anaheim',
  'Garden Grove',
  'Lytle Creek',
  'Cajon Junction',
  'Phelan',
  'Wrightwood',
  'Oak Hills',
  'Adelanto',
  'Hesperia',
  'Lugo',
  'Apple Valley',
  'Victorville',
  'Helendale',
  'Baldy Mesa',
  'Muscoy',
  'Alray',
  'Pino Hills',
  'Nealeys',
  'Hunters Ridge',
  'Crestline',
  'Lake Arrowhead',
  'Glen Helen',
] as const;

/** slug -> display name, derived from the `hybrid-vehicle-specialist-<slug>` URLs. */
export const CITY_SLUGS: Record<string, string> = Object.fromEntries(
  SERVICE_CITIES.map((c) => [
    c.toLowerCase().replace(/\s+/g, '-'),
    c,
  ]),
);
