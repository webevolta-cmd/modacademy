// Verified academy details. Every value is traceable in docs/RESEARCH.md (checked 2026-10-23).

export const site = {
  name: 'MOD Academy',
  formerName: 'MOD School',
  tagline: 'Ստեղծի՛ր ապագայիդ պրոֆեսիոնալ ուղին',
  description:
    'Ինտերիեր դիզայնի, 3Ds Max-ի, Corona Renderer-ի, գրաֆիկ դիզայնի և վաճառքի կառավարման դասընթացներ Երևանում՝ գործնական դասերով։',
  phone: {
    display: '+374 93 950 960',
    local: '093 950 960',
    href: 'tel:+37493950960',
    e164: '+37493950960',
  },
  email: 'mod.modacademy@gmail.com',
  address: {
    street: 'Տիգրան Մեծի պողոտա 4',
    short: 'Տիգրան Մեծ 4',
    city: 'Երևան',
    country: 'Հայաստան',
    postalCode: '0010',
    streetLatin: 'Tigran Mets Ave 4',
    cityLatin: 'Yerevan',
    landmark: 'Մհեր Մկրտչյան փողոցի անկյունում, Հանրապետության հրապարակից մի քանի րոպե քայլելով',
  },
  geo: { lat: 40.175927, lng: 44.513697 },
  maps: {
    google: 'https://www.google.com/maps/search/?api=1&query=40.175927%2C44.513697',
    yandex: 'https://yandex.com/maps/org/233735196629/',
    embed: 'https://www.google.com/maps?q=40.175927,44.513697&z=17&hl=hy&output=embed',
  },
  social: {
    instagram: 'https://www.instagram.com/mod_academy_/',
    instagramHandle: '@mod_academy_',
    instagramDirect: 'https://ig.me/m/mod_academy_',
    facebook: 'https://www.facebook.com/www.mod.academy/',
    tiktok: 'https://www.tiktok.com/@mod_academy',
  },
  studio: {
    name: 'MOD Interior & Architecture',
    instagram: 'https://www.instagram.com/mod_interior_architecture/',
    handle: '@mod_interior_architecture',
  },
  // Figures published by the academy itself in its Instagram bio.
  stats: [
    { value: 7, suffix: '+', label: 'տարի' },
    { value: 1000, suffix: '+', label: 'ուսանող' },
  ],
  statsSource: 'Ըստ ակադեմիայի Instagram էջի',
  dataAsOf: '2026-10-23',
} as const;

export const nav = [
  { href: '/#courses', label: 'Դասընթացներ' },
  { href: '/#learning', label: 'Ուսուցում' },
  { href: '/graduates/', label: 'Շրջանավարտներ' },
  { href: '/student-work/', label: 'Աշխատանքներ' },
  { href: '/videos/', label: 'Տեսանյութեր' },
  { href: '/#contact', label: 'Կապ' },
] as const;
