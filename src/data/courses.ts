// Course catalogue. Facts come from the academy's own announcements (see `sources`).
// Leave a field null when it is not publicly confirmed — the UI then invites visitors to
// request current details instead of showing a guess.
import type { ImageMetadata } from 'astro';
import { work } from './media';
import interiorPlan from '../assets/courses/interior-floor-plan.jpg';
import salesConversation from '../assets/courses/sales-conversation.jpg';

export type CategoryId = 'design' | 'visual' | 'business';
export type InterestId = 'space' | 'visual' | 'graphic' | 'sales';
export type LevelId = 'new' | 'pro';

export interface Schedule {
  /** How often the group meets. */
  frequency: string;
  /** Length of each lesson. */
  length: string;
}

// Every course meets on the same rhythm.
// A no-break space keeps «3 անգամ» on one line.
export const weeklySchedule: Schedule = { frequency: 'Շաբաթական 3\u00a0անգամ', length: '90-ական րոպե' };

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
  schedule: Schedule | null;
  fee: { amount: number; unit: string } | null;
  start: string | null;
  image: ImageMetadata | null;
  /** CSS object-position for the image wherever a card or the course header crops it. */
  imagePosition?: string;
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
  'Արժեքներն ու ժամանակացույցը՝ 2026 թ. հոկտեմբերի դրությամբ։ Հայտդ ստանալուց հետո կներկայացնենք ընթացիկ պայմաններն ու մեկնարկի ամսաթիվը։';

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
      'Վեց ամսում սովորիր նախագծել գեղեցիկ ու ֆունկցիոնալ ինտերիերներ՝ գաղափարից մինչև ամբողջական նախագիծ։ Գործնական պարապմունքներն ու այցելությունները Երևանի դիզայնի սրահներ կօգնեն հասկանալ նյութերը, համադրել գույներն ու աշխատել լուսավորության հետ։',
    intro: [
      'Սովորիր ստեղծել տարածքներ, որտեղ գեղեցկությունն ու հարմարավետությունը լրացնում են միմյանց։ Վեց ամսվա ընթացքում կբացահայտես ինտերիերի նախագծման սկզբունքները, կսովորես համադրել լույսը, նյութերն ու համամասնությունները՝ հաշվի առնելով տարածքն օգտագործող մարդու կարիքները։ Գիտելիքներդ կամրապնդես գործնական առաջադրանքներով։',
      'Դասընթացը շարունակվում է նաև Երևանի դիզայնի սրահներում։ Այստեղ կծանոթանաս գործվածքների ու պաստառների նմուշներին, կուսումնասիրես կահույքն ու լուսատուները և մասնագետների հետ կքննարկես դրանց ընտրության ու համադրման սկզբունքները։ Այս փորձը կօգնի ավելի հիմնավորված լուծումներ առաջարկել քո նախագծերում։',
    ],
    audience: [
      'Եթե ուզում ես ինտերիեր դիզայնը դարձնել քո մասնագիտությունը',
      'Եթե քեզ համար կարևոր է նյութերը, լույսն ու կահույքն ընտրել ոչ միայն էկրանին, այլև իրական նմուշներով',
    ],
    focus: [
      {
        title: 'Գործվածքներ և պաստառներ',
        text: 'Classis Decor Armenia-ում մեր ուսանողներն իրական նմուշներով ծանոթացել են վարագույրների, գալարավարագույրների և պաստառների տեսականուն։',
      },
      {
        title: 'Կահույք և ջահեր',
        text: 'Capital Interiors-ում մեր ուսանողները մոտիկից ծանոթացել են իտալական կահույքի, ջահերի և խոհանոցների տեսականուն։',
      },
      {
        title: 'Լուսավորություն',
        text: 'Electrica Group-ի հետ գործնական դասում մեր ուսանողները սովորել են լուսավորության տեսակներն ու դրանց ճիշտ կիրառումն ինտերիերում։',
      },
    ],
    tools: [],
    level: null,
    duration: '6 ամիս',
    schedule: weeklySchedule,
    fee: { amount: 67000, unit: 'ամսական' },
    start: null,
    image: interiorPlan,
    imagePosition: '62% 58%',
    imageAlt: 'Ինտերիերի հատակագիծ՝ կարմիր գծերով, կողքին՝ փայտի, բուկլե գործվածքի և արույրի նմուշներ արևոտ աշխատասեղանին',
    imageCredit: 'Նախագծի առաջին քայլը՝ հատակագիծ և նյութերի ընտրություն',
    related: 'practice',
    finder: {
      interests: ['space'],
      levels: ['new', 'pro'],
      reason: {
        new: 'Դասեր լսարանում և դիզայնի սրահներում․ նյութերը, լույսն ու կահույքը կտեսնես ոչ թե նկարում, այլ իրական տարածքում։',
        pro: 'Սրահներում անցկացվող գործնական դասերից հետո նյութերը, լուսավորությունն ու կահավորումը կընտրես ավելի վստահ։',
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
    summary:
      'Քո գաղափարներին տուր ծավալ, լույս ու իրական տեսք։ Սովորիր 3D մոդելավորում և ստեղծիր ինտերիերի ֆոտոռեալիստիկ պատկերներ՝ ձևավորելով քո առաջին պորտֆոլիոն։',
    intro: [
      'Սովորիր ներկայացնել տարածքը դեռ մինչև դրա իրականացումը։ 3Ds Max-ը կյուրացնես զրոյից՝ եռաչափ մոդելների ստեղծումից մինչև նյութերի, լուսավորության ու մանրամասների մշակումը՝ ստանալով իրական լուսանկարի տպավորություն ստեղծող պատկերներ։',
      'Դասընթացի ընթացքում ստեղծած աշխատանքները կդառնան քո առաջին պորտֆոլիոն՝ ապագա պատվիրատուներին ու գործատուներին հմտություններդ ներկայացնելու համար։ Իսկ մեր շրջանավարտների արդյունքներին կարող ես ծանոթանալ «Ուսանողական աշխատանքներ» բաժնում։',
    ],
    audience: [
      'Եթե սկսում ես զրոյից և ուզում ես սովորել 3Ds Max',
      'Եթե ինտերիեր դիզայներ ես և ուզում ես քո գաղափարները ներկայացնել ֆոտոռեալիստիկ վիզուալիզացիայով',
    ],
    focus: [
      { title: 'Մոդելավորում', text: 'Կմոդելավորես տարածությունը և ինտերիերի տարրերը 3Ds Max-ում։' },
      { title: 'Ռենդեր', text: 'Կսովորես ֆոտոռեալիստիկ վիզուալիզացիա V-Ray կամ Corona ռենդերերներով։' },
      { title: 'Պորտֆոլիո', text: 'Քո ուսանողական աշխատանքները կդառնան անձնական պորտֆոլիոյի հիմք։' },
    ],
    tools: ['3Ds Max', 'V-Ray', 'Corona Renderer'],
    level: 'Սկսնակների համար՝ զրոյից',
    duration: null,
    schedule: weeklySchedule,
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
        new: 'Կսովորես 3Ds Max զրոյից՝ առաջին մոդելից մինչև վերջնական ռենդեր։',
        pro: 'Եթե արդեն աշխատում ես ինտերիերի ոլորտում, 3Ds Max-ը կօգնի քո գաղափարները ներկայացնել ֆոտոռեալիստիկ վիզուալիզացիայով։',
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
      'Հաղորդիր քո ռենդերներին ավելի բնական լույս, իրատեսական նյութեր ու արտահայտիչ մանրամասներ։ Մեկամսյա անհատական դասընթաց՝ ինտերիերի դիզայներների և 3D վիզուալիզատորների համար, ովքեր ցանկանում են կատարելագործել իրենց աշխատանքները։',
    intro: [
      'Corona Renderer Level UP-ը մեր անհատական դասընթացն է ոլորտում արդեն աշխատող մասնագետների համար։ Կկատարելագործես հմտություններդ, ռենդերներդ կդարձնես ավելի պրոֆեսիոնալ և ետ չես մնա թրենդներից։',
      'Դասընթացը տևում է մեկ ամիս․ դասերն անցկացվում են շաբաթական 3 անգամ՝ 90-ական րոպե, անհատական ձևաչափով։',
    ],
    audience: [
      'Եթե արդեն աշխատում ես ինտերիեր դիզայնի կամ 3D վիզուալիզացիայի ոլորտում և ուզում ես կատարելագործել հմտություններդ',
      'Եթե փնտրում ես ավելի բարդ, պրոֆեսիոնալ և որակյալ ռենդերային լուծումներ',
      'Եթե ուզում ես բարձրացնել քո մրցունակությունը շուկայում',
      'Եթե ֆրիլանսեր ես և ուզում ես ուժեղացնել պորտֆոլիոդ',
    ],
    focus: [
      { title: 'Ռենդերի որակ', text: 'Կսովորես ավելի բարդ ու որակյալ ռենդերային լուծումներ։' },
      { title: 'Անհատական ձևաչափ', text: 'Անհատական դասեր՝ շաբաթական 3 անգամ, 90-ական րոպե։' },
      { title: 'Պորտֆոլիո', text: 'Քո պորտֆոլիոն կդառնա ավելի ուժեղ՝ նաև ֆրիլանս աշխատանքի համար։' },
    ],
    tools: ['Corona Renderer'],
    level: 'Գործող մասնագետների համար',
    duration: '1 ամիս',
    schedule: weeklySchedule,
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
        pro: 'Քեզ համար է, եթե արդեն աշխատում ես ինտերիեր դիզայնում կամ 3D վիզուալիզացիայում և ուզում ես ավելի որակյալ ռենդերներ։',
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
      'Սովորիր ստեղծել դիզայն, որը գրավում է ուշադրությունն ու հիշվում։ Չորս ամսում զարգացրու քո ստեղծագործական մտածողությունը և ձեռք բեր գաղափարներդ պրոֆեսիոնալ ներկայացնելու հմտություններ։ Դասերն անցկացվում են շաբաթական 3 անգամ՝ 90-ական րոպե։',
    intro: [
      'Ստեղծիր դիզայն, որը պատմում է, համոզում ու հիշվում։ Մեր «Գրաֆիկ դիզայն» դասընթացում կսովորես գույների, տառատեսակների և պատկերների միջոցով գաղափարներին տալ հստակ ու արտահայտիչ ձև՝ բրենդինգից մինչև տպագիր և թվային նյութեր։ Չորս ամիս շարունակ՝ շաբաթական 3 խմբային դասով, կզարգացնես ստեղծագործական մտածողությունդ և դիզայնի հմտություններդ՝ փորձառու մասնագետների ուղղորդմամբ։',
      'Քո առաջին քայլը սկսվում է այստեղ։ Ուղարկիր հայտ կամ զանգահարիր՝ ծանոթանալու ուսումնական ծրագրին, կիրառվող գործիքներին և առաջիկա խմբի մեկնարկի ամսաթվին։',
    ],
    audience: [
      'Եթե ուզում ես զբաղվել գրաֆիկ դիզայնով և վիզուալ հաղորդակցությամբ',
      'Եթե արդեն փորձում ես ուժերդ դիզայնում և ուզում ես համակարգել ու զարգացնել հմտություններդ',
    ],
    focus: [],
    tools: [],
    level: null,
    duration: '4 ամիս',
    schedule: weeklySchedule,
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
        new: 'Չորս ամսում կսովորես գրաֆիկ դիզայն՝ խմբով և փորձառու մասնագետների հետ։',
        pro: 'Քառամսյա խմբային դասընթաց, որը կօգնի համակարգել և զարգացնել քո հմտությունները գրաֆիկ դիզայնում։',
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
      'Չորս ամսում սովորիր ճիշտ հարցերով բացահայտել հաճախորդի իրական կարիքները, ներկայացնել առաջարկիդ արժեքը և առարկությունները վերածել վաճառքի հնարավորության։',
    intro: [
      'Արդյունավետ վաճառքը սկսվում է հաճախորդին հասկանալուց։ Սովորիր ճիշտ հարցեր տալ, ուշադիր լսել և բացահայտել՝ ինչն է կարևոր նրա համար։ Դասընթացի ընթացքում կսովորես առաջարկդ ներկայացնել հաճախորդի կարիքներին համապատասխան, հիմնավորել դրա արժեքը և վստահ վարել զրույցը՝ առաջին շփումից մինչև գնման որոշում։',
      'Հաճախորդի հարցերն ու առարկությունները զրույցը շարունակելու հնարավորություն են։ Գործնական վարժությունների և քննարկումների միջոցով կսովորես հասկանալ նրա կասկածների պատճառները, տալ հիմնավորված պատասխաններ և օգնել կայացնել վստահ որոշում՝ առանց ճնշման։',
      'Առարկությունը դեռ մերժում չէ։ Դասերի ընթացքում կքննարկես վաճառքի իրական իրավիճակներ, կգտնես հաճախորդի մտահոգություններին արձագանքելու ճիշտ մոտեցումներ և կսովորես զրույցը շարունակել վստահ ու հիմնավորված։',
    ],
    audience: [
      'Եթե աշխատում ես կամ ուզում ես աշխատել վաճառքի ոլորտում',
      'Եթե ուզում ես վստահ աշխատել հաճախորդների առարկությունների հետ',
    ],
    focus: [
      { title: 'Հաճախորդի կարիքները', text: 'Կսովորես ակտիվ լսել և ճիշտ հարցերով բացահայտել, թե ինչ է իրականում պետք հաճախորդին։' },
      { title: 'Առաջարկի արժեքը', text: 'Կներկայացնես առաջարկիդ արժեքը և կկառուցես վստահության վրա հիմնված զրույց։' },
      { title: 'Առարկություններ', text: 'Վստահ կարձագանքես առարկություններին և դրանք կվերածես վաճառքի հնարավորության։' },
      { title: 'Ինտերակտիվ դասեր', text: 'Հարցուպատասխան և կենդանի քննարկումներ դասընթացավարի հետ։' },
    ],
    tools: [],
    level: null,
    duration: '4 ամիս',
    schedule: weeklySchedule,
    fee: { amount: 77000, unit: 'ամսական' },
    start: null,
    image: salesConversation,
    imagePosition: '50% 45%',
    imageAlt: 'Բաց նոթատետր՝ կարմիր թանաքով գծված վաճառքի զրույցի սխեմայով՝ հարցից մինչև ձեռքսեղմում, կողքին՝ երկու բաժակ սուրճ և կարմիր գրիչ',
    imageCredit: 'Վաճառքի զրույց՝ հարցից մինչև համաձայնություն',
    related: 'sales',
    finder: {
      interests: ['sales'],
      levels: ['new', 'pro'],
      reason: {
        new: 'Կսովորես ճիշտ հարցեր տալ, ակտիվ լսել և վստահ աշխատել առարկությունների հետ։',
        pro: 'Կհամակարգես վաճառքի քո փորձը և առարկությունների հետ կաշխատես ավելի արդյունավետ։',
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
