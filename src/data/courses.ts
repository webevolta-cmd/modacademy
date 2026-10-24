// Course catalogue. Facts come from the academy's own announcements (see `sources`).
// Leave a field null when it is not publicly confirmed — the UI then invites visitors to
// request current details instead of showing a guess.
import type { ImageMetadata } from 'astro';
import { work, practice } from './media';

export type CategoryId = 'design' | 'visual' | 'business';
export type InterestId = 'space' | 'visual' | 'graphic' | 'sales';
export type LevelId = 'new' | 'pro';

export interface ScheduleGroup {
  days: string;
  daysShort: string;
  time: string;
}

export interface Course {
  slug: string;
  title: string;
  kicker: string;
  category: CategoryId;
  format: string;
  summary: string;
  intro: string[];
  audience: string[];
  focus: { title: string; text: string }[];
  tools: string[];
  level: string | null;
  duration: string | null;
  schedule: ScheduleGroup[] | null;
  scheduleNote?: string;
  fee: { amount: number; unit: string } | null;
  start: string | null;
  image: ImageMetadata | null;
  imageAlt: string;
  imageCredit: string;
  related: 'work' | 'practice' | 'sales' | null;
  finder: {
    interests: InterestId[];
    levels: LevelId[];
    reason: Partial<Record<LevelId, string>>;
  };
  sources: { label: string; url: string; date: string }[];
}

export const categories: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'Բոլորը' },
  { id: 'design', label: 'Դիզայն' },
  { id: 'visual', label: '3D վիզուալիզացիա' },
  { id: 'business', label: 'Բիզնես' },
];

export const priceNote =
  'Արժեքներն ու ժամանակացույցները՝ ըստ ակադեմիայի 2026 թ. հոկտեմբերի հրապարակումների։ Ընթացիկ պայմաններն ու մեկնարկի ամսաթիվը ճշտվում են հայտից հետո։';

const pinnedPost = {
  label: 'Instagram · դասընթացների ամփոփում',
  url: 'https://www.instagram.com/p/DeerP2liLhF/',
  date: '2026-10-14',
};

export const courses: Course[] = [
  {
    slug: 'interior-design',
    title: 'Ինտերիեր դիզայն',
    kicker: 'Դիզայն',
    category: 'design',
    format: 'Խմբային դասընթաց',
    summary:
      'Վեցամսյա դասընթաց ինտերիերի դիզայնի ուղղությամբ՝ ակադեմիայի լսարանում և Երևանի դիզայնի սրահներում անցկացվող գործնական դասերով։',
    intro: [
      'Ինտերիեր դիզայնը սկսվում է տարածությունը տեսնելուց՝ լույսը, նյութերը, համամասնություններն ու մարդու առօրյան։ MOD Academy-ի «Ինտերիեր դիզայն» դասընթացը տևում է վեց ամիս և անցկացվում է խմբերով։',
      'Դասընթացի ընթացքում ուսանողները գործնական դասերի են մասնակցում Երևանի դիզայնի սրահներում․ ծանոթանում են իրական կահույքին, լուսավորությանը, գործվածքներին և պաստառներին ու հարցեր ուղղում սրահների մասնագետներին։',
    ],
    audience: [
      'Նրանց համար, ովքեր ցանկանում են ինտերիեր դիզայնը դարձնել իրենց մասնագիտությունը',
      'Նրանց համար, ովքեր ուզում են նյութեր, լուսավորություն և կահավորում ընտրել ոչ միայն էկրանին, այլև իրական նմուշներով',
    ],
    focus: [
      {
        title: 'Գործվածքներ և պաստառներ',
        text: '«Ինտերիեր դիզայն» դասընթացի ուսանողները Classis Decor Armenia-ում ծանոթացել են վարագույրների, գալարավարագույրների և պաստառների տեսականուն։',
      },
      {
        title: 'Կահույք և ջահեր',
        text: 'Ակադեմիայի ուսանողների այցը Capital Interiors՝ իտալական կահույքի, ջահերի և խոհանոցների տեսականու հետ ծանոթություն։',
      },
      {
        title: 'Լուսավորություն',
        text: 'Ակադեմիայի ուսանողների գործնական դասը Electrica Group-ի հետ՝ լուսավորության տեսակները և դրանց ճիշտ կիրառումն ինտերիերում։',
      },
    ],
    tools: [],
    level: null,
    duration: '6 ամիս',
    schedule: [
      { days: 'Երկուշաբթի, չորեքշաբթի, ուրբաթ', daysShort: 'Երկ · Չրք · Ուրբ', time: '11:00–12:30' },
      { days: 'Երեքշաբթի, հինգշաբթի, շաբաթ', daysShort: 'Երք · Հնգ · Շբթ', time: '19:30–21:00' },
    ],
    scheduleNote: 'Երկու խումբ՝ ցերեկային և երեկոյան',
    fee: { amount: 67000, unit: 'ամսական' },
    start: null,
    image: practice[1].image,
    imageAlt: 'Ինտերիեր դիզայնի ուսանողները գործնական դասին՝ պաստառների և գործվածքների սրահում',
    imageCredit: 'Գործնական դաս Classis Decor Armenia-ում · հրապարակված՝ 08.10.2026',
    related: 'practice',
    finder: {
      interests: ['space'],
      levels: ['new', 'pro'],
      reason: {
        new: 'Համադրում է լսարանային դասերը գործնական այցերի հետ՝ նյութերը, լույսը և կահույքը տեսնելով իրական տարածքում։',
        pro: 'Գործնական դասերը սրահներում օգնում են ավելի վստահ ընտրել նյութեր, լուսավորություն և կահավորում։',
      },
    },
    sources: [
      pinnedPost,
      { label: 'Instagram · գործնական դաս Capital Interiors-ում', url: 'https://www.instagram.com/p/DeUXZa8Nzc9/', date: '2026-10-10' },
      { label: 'Instagram · գործնական դաս Classis Decor Armenia-ում', url: 'https://www.instagram.com/p/DePkN9foA7V/', date: '2026-10-08' },
      { label: 'Instagram · գործնական դաս Electrica Group-ում', url: 'https://www.instagram.com/p/Dd_pdaHoLjR/', date: '2026-10-02' },
    ],
  },
  {
    slug: '3ds-max',
    title: '3Ds Max',
    kicker: '3D վիզուալիզացիա',
    category: 'visual',
    format: 'Դասընթաց',
    summary: '3D մոդելավորում և ինտերիերի ֆոտոռեալիստիկ վիզուալիզացիա՝ զրոյից մինչև պորտֆոլիո։',
    intro: [
      '3Ds Max-ն ինտերիերի և ճարտարապետական վիզուալիզացիայի հիմնական գործիքներից է։ Ըստ ակադեմիայի՝ այն կարելի է սովորել զրոյից՝ մոդելավորումից մինչև ռենդեր։',
      'Ակադեմիան իր Instagram էջում ներկայացնում է շրջանավարտների պորտֆոլիոներ։ Այս կայքի «Ուսանողական աշխատանքներ» բաժնում ներկայացված են «3Ds Max» դասընթացի շրջանավարտ Շուշան Թևոսյանի ինտերիերային վիզուալիզացիաները։',
    ],
    audience: [
      'Սկսնակների համար, ովքեր ուզում են սովորել 3Ds Max զրոյից',
      'Ինտերիեր դիզայներների համար, ովքեր ուզում են իրենց գաղափարները ներկայացնել ֆոտոռեալիստիկ վիզուալիզացիայով',
    ],
    focus: [
      { title: 'Մոդելավորում', text: 'Ինտերիերի տարրերի և տարածության 3D մոդելավորում 3Ds Max-ում։' },
      { title: 'Ռենդեր', text: 'Ֆոտոռեալիստիկ վիզուալիզացիա՝ V-Ray կամ Corona ռենդերերներով։' },
      { title: 'Պորտֆոլիո', text: 'Ուսանողական աշխատանքներ, որոնք դառնում են անձնական պորտֆոլիոյի հիմք։' },
    ],
    tools: ['3Ds Max', 'V-Ray', 'Corona Renderer'],
    level: 'Սկսնակների համար՝ զրոյից',
    duration: null,
    schedule: null,
    fee: null,
    start: null,
    image: work[0].image,
    imageAlt: work[0].alt,
    imageCredit: 'Ուսանողական աշխատանք · Շուշան Թևոսյան, «3Ds Max» դասընթացի շրջանավարտ',
    related: 'work',
    finder: {
      interests: ['visual', 'space'],
      levels: ['new', 'pro'],
      reason: {
        new: 'Ըստ ակադեմիայի՝ 3Ds Max-ը կարելի է սովորել զրոյից՝ մոդելավորումից մինչև ռենդեր։',
        pro: 'Եթե արդեն աշխատում եք ինտերիերի ոլորտում, 3Ds Max-ը կօգնի գաղափարները ներկայացնել ֆոտոռեալիստիկ վիզուալիզացիայով։',
      },
    },
    sources: [
      { label: 'Instagram · շրջանավարտի պորտֆոլիո', url: 'https://www.instagram.com/p/DezOW2GCMyH/', date: '2026-10-22' },
      { label: 'TikTok · «Սովորիր 0-ից»', url: 'https://www.tiktok.com/@mod_academy/video/7635568609019890962', date: '2026-05-03' },
      { label: 'YouTube · վեբինար «3Ds MAX + V-Ray/Corona»', url: 'https://www.youtube.com/watch?v=no6VBxqSiUU', date: '2026-05-25' },
    ],
  },
  {
    slug: 'corona-renderer',
    title: 'Corona Renderer Level UP',
    kicker: '3D վիզուալիզացիա · Կատարելագործում',
    category: 'visual',
    format: 'Անհատական դասընթաց',
    summary:
      'Մեկամսյա անհատական դասընթաց գործող ինտերիեր դիզայներների և 3D վիզուալիզատորների համար, ովքեր ցանկանում են բարձրացնել ռենդերների որակը։',
    intro: [
      'Corona Renderer Level UP-ը MOD Academy-ի անհատական դասընթացն է արդեն ոլորտում աշխատող մասնագետների համար, ովքեր ցանկանում են կատարելագործել հմտությունները և ետ չմնալ թրենդներից։',
      'Դասընթացը տևում է մեկ ամիս՝ շաբաթական երկու օր, երկուական ժամ։',
    ],
    audience: [
      'Նրանց համար, ովքեր արդեն աշխատում են ինտերիեր դիզայնի կամ 3D վիզուալիզացիայի ոլորտում և ցանկանում են կատարելագործել իրենց հմտությունները',
      'Նրանց համար, ովքեր փնտրում են ավելի բարդ, պրոֆեսիոնալ և որակյալ ռենդերային լուծումներ',
      'Նրանց համար, ովքեր ցանկանում են բարձրացնել իրենց մրցունակությունը շուկայում',
      'Ֆրիլանսերների համար, ովքեր ցանկանում են ուժեղացնել իրենց պորտֆոլիոն',
    ],
    focus: [
      { title: 'Ռենդերի որակ', text: 'Ավելի բարդ, պրոֆեսիոնալ և որակյալ ռենդերային լուծումներ։' },
      { title: 'Անհատական ձևաչափ', text: 'Շաբաթական երկու հանդիպում՝ 09:00–11:00 կամ 11:00–13:00 ժամերին։' },
      { title: 'Պորտֆոլիո', text: 'Ավելի ուժեղ պորտֆոլիո, այդ թվում՝ ֆրիլանս աշխատանքի համար։' },
    ],
    tools: ['Corona Renderer'],
    level: 'Գործող մասնագետների համար',
    duration: '1 ամիս',
    schedule: [
      { days: 'Շաբաթական 2 օր, 2 ժամ', daysShort: 'Շաբաթական 2 օր', time: '09:00–11:00 կամ 11:00–13:00' },
    ],
    fee: { amount: 77000, unit: 'ամբողջ դասընթացի համար' },
    start: null,
    image: null,
    imageAlt: '',
    imageCredit: '',
    related: 'work',
    finder: {
      interests: ['visual', 'space'],
      levels: ['pro'],
      reason: {
        pro: 'Նախատեսված է արդեն աշխատող ինտերիեր դիզայներների և 3D վիզուալիզատորների համար, ովքեր ուզում են ավելի որակյալ ռենդերներ։',
      },
    },
    sources: [
      { label: 'Instagram · Corona Renderer Level UP', url: 'https://www.instagram.com/p/DehIqTPoOkF/', date: '2026-10-15' },
    ],
  },
  {
    slug: 'graphic-design',
    title: 'Գրաֆիկ դիզայն',
    kicker: 'Դիզայն',
    category: 'design',
    format: 'Խմբային դասընթաց',
    summary:
      'Քառամսյա երեկոյան դասընթաց գրաֆիկ դիզայնի ուղղությամբ։ Դասերն անցկացվում են երեքշաբթի, հինգշաբթի և շաբաթ օրերին՝ 19:30–21:00։',
    intro: [
      'Գրաֆիկ դիզայնը վիզուալ հաղորդակցության լեզուն է՝ բրենդից և տպագիր նյութերից մինչև թվային միջավայր։ MOD Academy-ի «Գրաֆիկ դիզայն» դասընթացը տևում է չորս ամիս և անցկացվում է երեկոյան խմբով։',
      'Դասընթացի մանրամասն ծրագիրը, օգտագործվող ծրագրերը և մոտակա խմբի մեկնարկը ճշտեք ակադեմիայում՝ հայտ ուղարկելով կամ զանգահարելով։',
    ],
    audience: [
      'Նրանց համար, ովքեր ցանկանում են զբաղվել վիզուալ հաղորդակցությամբ և գրաֆիկ դիզայնով',
    ],
    focus: [],
    tools: [],
    level: null,
    duration: '4 ամիս',
    schedule: [{ days: 'Երեքշաբթի, հինգշաբթի, շաբաթ', daysShort: 'Երք · Հնգ · Շբթ', time: '19:30–21:00' }],
    fee: { amount: 50000, unit: 'ամսական' },
    start: null,
    image: null,
    imageAlt: '',
    imageCredit: '',
    related: null,
    finder: {
      interests: ['graphic'],
      levels: ['new', 'pro'],
      reason: {
        new: 'Քառամսյա երեկոյան դասընթաց նրանց համար, ովքեր ուզում են զբաղվել գրաֆիկ դիզայնով։',
        pro: 'Քառամսյա երեկոյան ձևաչափը հարմար է աշխատանքին զուգահեռ սովորելու համար։',
      },
    },
    sources: [pinnedPost],
  },
  {
    slug: 'sales-management',
    title: 'Վաճառքի կառավարում',
    kicker: 'Բիզնես',
    category: 'business',
    format: 'Խմբային դասընթաց',
    summary:
      'Քառամսյա դասընթաց՝ ինտերակտիվ ձևաչափով, առարկությունների հետ աշխատանքի և վաճառքի հմտությունների զարգացմամբ։',
    intro: [
      '«Վաճառքի կառավարում» դասընթացում մասնակիցներն ինտերակտիվ ձևաչափով զարգացնում են առարկությունների հետ արդյունավետ աշխատելու և դրանք վաճառքի հնարավորության վերածելու հմտությունները։',
      '«Առարկությունը դեռ մերժում չէ»․ դասերն անցնում են ինտերակտիվ հարցուպատասխանի ձևաչափով՝ ակադեմիայի լսարանում։',
    ],
    audience: [
      'Նրանց համար, ովքեր աշխատում են կամ ցանկանում են աշխատել վաճառքի ոլորտում',
      'Նրանց համար, ովքեր ուզում են վստահ աշխատել հաճախորդների առարկությունների հետ',
    ],
    focus: [
      { title: 'Առարկություններ', text: 'Ինչպես արձագանքել առարկություններին և դրանք վերածել վաճառքի հնարավորության։' },
      { title: 'Ինտերակտիվ դասեր', text: 'Հարցուպատասխան և քննարկումներ դասընթացավարի հետ։' },
    ],
    tools: [],
    level: null,
    duration: '4 ամիս',
    schedule: [{ days: 'Երեքշաբթի, հինգշաբթի, շաբաթ', daysShort: 'Երք · Հնգ · Շբթ', time: '17:30–19:00' }],
    fee: { amount: 77000, unit: 'ամսական' },
    start: null,
    image: practice[5].image,
    imageAlt: practice[5].alt,
    imageCredit: '«Վաճառքի կառավարում» դասընթացի դաս · հրապարակված՝ 09.10.2026',
    related: 'sales',
    finder: {
      interests: ['sales'],
      levels: ['new', 'pro'],
      reason: {
        new: 'Ինտերակտիվ դասեր՝ վաճառքի և առարկությունների հետ աշխատանքի հմտություններով։',
        pro: 'Կօգնի համակարգել վաճառքի փորձը և ավելի արդյունավետ աշխատել առարկությունների հետ։',
      },
    },
    sources: [
      pinnedPost,
      { label: 'Instagram · «Առարկությունը դեռ մերժում չէ»', url: 'https://www.instagram.com/p/DeRoJTRoQ-A/', date: '2026-10-09' },
    ],
  },
];

export function formatFee(amount: number): string {
  // Armenian convention: narrow no-break space as thousands separator, dram sign after the number.
  return `${amount.toLocaleString('en-US').replace(/,/g, ' ')} ֏`;
}

export function courseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
