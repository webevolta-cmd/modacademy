// Graduation photographs and graduate stories. Each entry keeps its source for the record
// (docs/research/SOURCES.md); the site itself presents them in the academy's own voice.
import type { ImageMetadata } from 'astro';
import grad1ElenVanoyanCertificate from '../assets/graduates/elen-vanoyan-certificate.jpg';
import grad2GraduationEvening2026Group from '../assets/graduates/graduation-evening-2026-group.jpg';
import grad3SyuziArsenyanCertificate from '../assets/graduates/syuzi-arsenyan-certificate.jpg';
import grad4KarolinaSargsyanCertificate from '../assets/graduates/karolina-sargsyan-certificate.jpg';
import grad5KristineSahakyanCeremony from '../assets/graduates/kristine-sahakyan-ceremony.jpg';
import grad6AstghikSayadyanCertificate from '../assets/graduates/astghik-sayadyan-certificate.jpg';
import grad7ArmineBabayanCertificate from '../assets/graduates/armine-babayan-certificate.jpg';
import grad8GraduationEvening2025Hall from '../assets/graduates/graduation-evening-2025-hall.jpg';
import grad9DasbgBceurS01Certificate from '../assets/graduates/dasbg-bceur-s01-certificate.jpg';
import grad10SusannaVardanyanCertificate from '../assets/graduates/susanna-vardanyan-certificate.jpg';
import grad11KristineSahakyanCertificate from '../assets/graduates/kristine-sahakyan-certificate.jpg';
import grad12GraduationEvening2026Certificate from '../assets/graduates/graduation-evening-2026-certificate.jpg';
import grad13GraduationEvening2026Toast from '../assets/graduates/graduation-evening-2026-toast.jpg';
import grad14SyuziArsenyanCeremony from '../assets/graduates/syuzi-arsenyan-ceremony.jpg';
import grad15AstghikSayadyanCeremony from '../assets/graduates/astghik-sayadyan-ceremony.jpg';
import grad16GraduationEvening2026Walk from '../assets/graduates/graduation-evening-2026-walk.jpg';
import grad17GraduationEvening2025Stage from '../assets/graduates/graduation-evening-2025-stage.jpg';
import grad18Dac56uvcfupS01Certificate from '../assets/graduates/dac56uvcfup-s01-certificate.jpg';
import grad19Da48ye0ihceS02Certificate from '../assets/graduates/da48ye0ihce-s02-certificate.jpg';
import grad20Dzr29dwikctS01Certificate from '../assets/graduates/dzr29dwikct-s01-certificate.jpg';
import grad21Daioaeocn6S01Certificate from '../assets/graduates/daioaeocn-6-s01-certificate.jpg';
import grad22Dzfcvg4iez3S01Certificate from '../assets/graduates/dzfcvg4iez3-s01-certificate.jpg';
import grad23Dzcmbueik5jS01Certificate from '../assets/graduates/dzcmbueik5j-s01-certificate.jpg';
import storySyuziArsenyan from '../assets/graduates/story-syuzi-arsenyan.jpg';
import storyShushanTevosyan from '../assets/graduates/story-shushan-tevosyan.jpg';
import storyHasmikAbovyan from '../assets/graduates/story-hasmik-abovyan.jpg';

export interface GraduationPhoto {
  id: string;
  image: ImageMetadata;
  alt: string;
  caption: string;
  date: string;
  source: string;
}

export type Attribution = 'academy' | 'own' | 'independent';

export interface GraduateStory {
  slug: string;
  name: string;
  nameLatin: string;
  course: string;
  courseSlug?: string;
  image: ImageMetadata;
  imageAlt: string;
  /** One sentence about the graduate's professional step after the course. */
  outcome: string;
  attribution: Attribution;
  /** Optional verbatim words of the graduate, only when published by them. */
  quote?: { text: string; source: string };
  source: string;
  sourceDate: string;
  links: { label: string; url: string }[];
  /** Student-work project on /student-work/, when one exists. */
  project?: string;
}

export const graduationPhotos: GraduationPhoto[] = [
  {
    id: 'elen-vanoyan-certificate',
    image: grad1ElenVanoyanCertificate,
    alt: 'Էլեն Վանոյանը MOD Academy-ի վկայականը ձեռքին՝ կոստյումով տղամարդու կողքին',
    caption: 'Էլեն Վանոյան՝ «3D MAX and Corona Renderer» դասընթացի վկայականով',
    date: '2025-07-10',
    source: 'https://www.instagram.com/p/DL7D_2WBfWl/',
  },
  {
    id: 'graduation-evening-2026-group',
    image: grad2GraduationEvening2026Group,
    alt: 'Շրջանավարտների խումբը MOD Academy-ի վկայականները ձեռքներին՝ ավարտական երեկոյին',
    caption: 'Ավարտական երեկո․ շրջանավարտները վկայականներով',
    date: '2026-06-02',
    source: 'https://www.instagram.com/p/DZFIICBoU_4/',
  },
  {
    id: 'syuzi-arsenyan-certificate',
    image: grad3SyuziArsenyanCertificate,
    alt: 'Սյուզի Արսենյանը MOD Academy-ի վկայականը ձեռքին՝ մուգ կոստյումներով երկու տղամարդու միջև',
    caption: 'Սյուզի Արսենյան՝ «Ինտերիեր դիզայն» դասընթացի վկայականով',
    date: '2026-09-02',
    source: 'https://www.instagram.com/p/DcyiPfRiK_b/',
  },
  {
    id: 'karolina-sargsyan-certificate',
    image: grad4KarolinaSargsyanCertificate,
    alt: 'Կառոլինա Սարգսյանը MOD Academy-ի վկայականը ձեռքին՝ կոստյումով տղամարդու կողքին',
    caption: 'Կառոլինա Սարգսյան՝ «3D MAX and Corona Renderer» դասընթացի վկայականով',
    date: '2025-07-12',
    source: 'https://www.instagram.com/p/DMALEmitD1l/',
  },
  {
    id: 'kristine-sahakyan-ceremony',
    image: grad5KristineSahakyanCeremony,
    alt: 'Քրիստինե Սահակյանը վկայականով MOD Academy-ի պաստառի առջև՝ կոստյումով տղամարդու և սպիտակ բաճկոնով կնոջ միջև',
    caption: 'Քրիստինե Սահակյան՝ վկայականների հանձնման օրը',
    date: '2026-09-06',
    source: 'https://www.instagram.com/p/Dc8z8vGCPHB/',
  },
  {
    id: 'astghik-sayadyan-certificate',
    image: grad6AstghikSayadyanCertificate,
    alt: 'Աստղիկ Սայադյանը MOD Academy-ի վկայականը ձեռքին՝ մուգ կոստյումներով երկու տղամարդու միջև',
    caption: 'Աստղիկ Սայադյան՝ «3Ds Max» դասընթացի վկայականով',
    date: '2026-09-11',
    source: 'https://www.instagram.com/p/DdJpOP8CJLc/',
  },
  {
    id: 'armine-babayan-certificate',
    image: grad7ArmineBabayanCertificate,
    alt: 'Արմինե Բաբայանը MOD Academy-ի վկայականը ձեռքին՝ կոստյումով տղամարդու կողքին',
    caption: 'Արմինե Բաբայան՝ «3D MAX and Corona Renderer» դասընթացի վկայականով',
    date: '2025-06-17',
    source: 'https://www.instagram.com/p/DLAgG-YKV-e/',
  },
  {
    id: 'graduation-evening-2025-hall',
    image: grad8GraduationEvening2025Hall,
    alt: 'Լեփ-լեցուն դահլիճ MOD Academy-ի ավարտական երեկոյին',
    caption: 'Ավարտական երեկոյի լեփ-լեցուն դահլիճը',
    date: '2025-12-08',
    source: 'https://www.instagram.com/p/DSAOOg6jwHX/',
  },
  {
    id: 'dasbg-bceur-s01-certificate',
    image: grad9DasbgBceurS01Certificate,
    alt: 'Հասմիկ Աբովյանը բաց վարդագույն պիջակով՝ ձեռքին MOD Academy-ի շրջանակված վկայական (CERTIFICATE), մուգ փայտապատ պատի ֆոնին, երկու կողմում՝ մուգ կոստյումներով երկու տղամարդ',
    caption: 'Հասմիկ Աբովյան՝ «3Ds Max» դասընթացի վկայականով',
    date: '2026-07-02',
    source: 'https://www.instagram.com/p/DaSbG-BCEUr/',
  },
  {
    id: 'susanna-vardanyan-certificate',
    image: grad10SusannaVardanyanCertificate,
    alt: 'Սուսաննա Վարդանյանը MOD Academy-ի վկայականը ձեռքին՝ մուգ կոստյումներով երկու տղամարդու միջև',
    caption: 'Սուսաննա Վարդանյան՝ վկայականով',
    date: '2026-03-24',
    source: 'https://www.instagram.com/p/DWRVsRziMjT/',
  },
  {
    id: 'kristine-sahakyan-certificate',
    image: grad11KristineSahakyanCertificate,
    alt: 'Քրիստինե Սահակյանը MOD Academy-ի վկայականը ձեռքին՝ մուգ կոստյումներով երկու տղամարդու միջև',
    caption: 'Քրիստինե Սահակյան՝ վկայականով',
    date: '2026-09-06',
    source: 'https://www.instagram.com/p/Dc8z8vGCPHB/',
  },
  {
    id: 'graduation-evening-2026-certificate',
    image: grad12GraduationEvening2026Certificate,
    alt: 'Շրջանավարտը MOD Academy-ի վկայականը ձեռքին՝ երկու կնոջ միջև, ավարտական երեկոյին',
    caption: 'Ավարտական երեկո․ վկայականը ձեռքին',
    date: '2026-06-02',
    source: 'https://www.instagram.com/p/DZFIICBoU_4/',
  },
  {
    id: 'graduation-evening-2026-toast',
    image: grad13GraduationEvening2026Toast,
    alt: 'Ավարտական երեկոյի մասնակիցները շամպայնի բաժակներ են բարձրացնում',
    caption: 'Ավարտական երեկոյից հետո՝ շնորհավորանքներ',
    date: '2026-06-02',
    source: 'https://www.instagram.com/p/DZFIICBoU_4/',
  },
  {
    id: 'syuzi-arsenyan-ceremony',
    image: grad14SyuziArsenyanCeremony,
    alt: 'Սյուզի Արսենյանը վկայականով MOD Academy-ի պաստառի առջև՝ չորս մասնակիցների հետ',
    caption: 'Սյուզի Արսենյան՝ վկայականների հանձնման արարողությանը',
    date: '2026-09-02',
    source: 'https://www.instagram.com/p/DcyiPfRiK_b/',
  },
  {
    id: 'astghik-sayadyan-ceremony',
    image: grad15AstghikSayadyanCeremony,
    alt: 'Աստղիկ Սայադյանը վկայականով MOD Academy-ի պաստառի առջև՝ ծաղկեփնջով երիտասարդ կնոջ և կոստյումով տղամարդու հետ',
    caption: 'Աստղիկ Սայադյան՝ վկայականների հանձնման արարողությանը',
    date: '2026-09-11',
    source: 'https://www.instagram.com/p/DdJpOP8CJLc/',
  },
  {
    id: 'graduation-evening-2026-walk',
    image: grad16GraduationEvening2026Walk,
    alt: 'Շրջանավարտը վկայականը ձեռքին քայլում է պրոյեկցիոն էկրանի առջևով',
    caption: 'Ավարտական երեկո․ վկայականը ձեռքին՝ էկրանի առջև',
    date: '2026-06-02',
    source: 'https://www.instagram.com/p/DZFIICBoU_4/',
  },
  {
    id: 'graduation-evening-2025-stage',
    image: grad17GraduationEvening2025Stage,
    alt: 'Ելույթ բեմից MOD Academy-ի ավարտական երեկոյին, առաջին պլանում՝ վկայական',
    caption: 'Ավարտական երեկո․ ելույթ բեմից',
    date: '2025-12-08',
    source: 'https://www.instagram.com/p/DSAOOg6jwHX/',
  },
  {
    id: 'dac56uvcfup-s01-certificate',
    image: grad18Dac56uvcfupS01Certificate,
    alt: 'Քրիստինե Սիմոնյանը սև պիջակով՝ ձեռքին MOD Academy-ի շրջանակված վկայական (CERTIFICATE), մուգ փայտապատ պատի ֆոնին, երկու կողմում՝ մուգ կոստյումներով երկու տղամարդ',
    caption: 'Քրիստինե Սիմոնյան՝ «Ինտերիեր դիզայն» դասընթացի վկայականով',
    date: '2026-06-26',
    source: 'https://www.instagram.com/p/DaC56UvCFuP/',
  },
  {
    id: 'da48ye0ihce-s02-certificate',
    image: grad19Da48ye0ihceS02Certificate,
    alt: 'Պերճուհի Կոստանյանը սև վերնաշապիկով և մեծ սև տառերով բեժ կիսաշրջազգեստով՝ ձեռքին MOD Academy-ի շրջանակված վկայական (CERTIFICATE), մուգ փայտապատ պատի ֆոնին, երկու կողմում՝ մուգ կոստյումներով երկու տղամարդ',
    caption: 'Պերճուհի Կոստանյան՝ «3Ds Max» դասընթացի վկայականով',
    date: '2026-07-17',
    source: 'https://www.instagram.com/p/Da48yE0iHcE/',
  },
  {
    id: 'dzr29dwikct-s01-certificate',
    image: grad20Dzr29dwikctS01Certificate,
    alt: 'Անի Թումասյանը սև պիջակով և բաց ջինսով՝ ձեռքին MOD Academy-ի շրջանակված վկայական (CERTIFICATE), մուգ փայտապատ պատի ֆոնին, երկու կողմում՝ մուգ կոստյումներով երկու տղամարդ',
    caption: 'Անի Թումասյան՝ «Ինտերիեր դիզայն» դասընթացի վկայականով',
    date: '2026-06-17',
    source: 'https://www.instagram.com/p/DZr29DwiKCt/',
  },
  {
    id: 'daioaeocn-6-s01-certificate',
    image: grad21Daioaeocn6S01Certificate,
    alt: 'Մարիամ Մխիթարյանը կարմիր-սպիտակ վանդակավոր վերնաշապիկով և ջինսով՝ ձեռքին MOD Academy-ի շրջանակված վկայական (CERTIFICATE), մուգ փայտապատ պատի ֆոնին, երկու կողմում՝ մուգ կոստյումներով երկու տղամարդ',
    caption: 'Մարիամ Մխիթարյան՝ «3Ds Max» դասընթացի վկայականով',
    date: '2026-07-08',
    source: 'https://www.instagram.com/p/DaioAeoCN_6/',
  },
  {
    id: 'dzfcvg4iez3-s01-certificate',
    image: grad22Dzfcvg4iez3S01Certificate,
    alt: 'Մելինե Մարտիրոսյանը սև պիջակով և ջինսով՝ ձեռքին MOD Academy-ի շրջանակված վկայական (CERTIFICATE), մուգ փայտապատ պատի ֆոնին, երկու կողմում՝ մուգ կոստյումներով երկու տղամարդ',
    caption: 'Մելինե Մարտիրոսյան՝ «Ինտերիեր դիզայն» դասընթացի վկայականով',
    date: '2026-06-12',
    source: 'https://www.instagram.com/p/DZfcVG4iEZ3/',
  },
  {
    id: 'dzcmbueik5j-s01-certificate',
    image: grad23Dzcmbueik5jS01Certificate,
    alt: 'Շուշան Ալեքսանյանը կրեմագույն պիջակով և սև զգեստով՝ ձեռքին MOD Academy-ի շրջանակված վկայական (CERTIFICATE), մուգ փայտապատ պատի ֆոնին, երկու կողմում՝ մուգ կոստյումներով երկու տղամարդ',
    caption: 'Շուշան Ալեքսանյան՝ «3Ds Max» դասընթացի վկայականով',
    date: '2026-06-11',
    source: 'https://www.instagram.com/p/DZcmbUeiK5J/',
  },
];

export const graduateStories: GraduateStory[] = [
  {
    slug: 'syuzi-arsenyan',
    name: 'Սյուզի Արսենյան',
    nameLatin: 'Syuzi Arsenyan',
    course: 'Ինտերիեր դիզայն',
    courseSlug: 'interior-design',
    image: storySyuziArsenyan,
    imageAlt: 'Սյուզի Արսենյանը MOD Academy-ի վկայականը ձեռքին',
    outcome: 'Ավարտելուց հետո Սյուզին սկսեց աշխատել ոլորտում և այսօր ստեղծում է արժեքավոր ու ֆունկցիոնալ դիզայններ խոշոր նախագծերի համար։',
    attribution: 'academy',
    source: 'https://www.instagram.com/p/DcyiPfRiK_b/',
    sourceDate: '2026-09-02',
    links: [],
    project: 'arsenyan-apartment',
  },
  {
    slug: 'shushan-tevosyan',
    name: 'Շուշան Թևոսյան',
    nameLatin: 'Shushan Tevosyan',
    course: '3Ds Max',
    courseSlug: '3ds-max',
    image: storyShushanTevosyan,
    imageAlt: 'Շուշան Թևոսյանի 3D վիզուալիզացիան՝ ճաշասենյակ օվալաձև մարմարե սեղանով և ոսկեգույն ջահով',
    outcome: 'Այսօր Շուշանն աշխատում է որպես ֆրիլանս ինտերիեր դիզայներ և 3D վիզուալիզատոր՝ ստեղծելով ֆունկցիոնալ ու գեղեցիկ տարածքներ և դրանց ֆոտոռեալիստիկ վիզուալիզացիաները 3ds Max-ով և Corona Renderer-ով։',
    attribution: 'own',
    source: 'https://www.behance.net/shushantevosyan',
    sourceDate: '2026-10-24',
    links: [{ label: 'Behance պորտֆոլիո', url: 'https://www.behance.net/shushantevosyan' }, { label: 'Instagram՝ @tevosyan.design', url: 'https://www.instagram.com/tevosyan.design/' }],
    project: 'tevosyan-living-kitchen',
  },
  {
    slug: 'hasmik-abovyan',
    name: 'Հասմիկ Աբովյան',
    nameLatin: 'Hasmik Abovyan',
    course: '3Ds Max',
    courseSlug: '3ds-max',
    image: storyHasmikAbovyan,
    imageAlt: 'Հասմիկ Աբովյանը MOD Academy-ի վկայականը ձեռքին',
    outcome: 'Դասընթացն ավարտելուց հետո Հասմիկը ձեռք բերած հմտությունները հաջողությամբ կիրառում է իրական նախագծերում։',
    attribution: 'academy',
    source: 'https://www.instagram.com/p/DaSbG-BCEUr/',
    sourceDate: '2026-07-02',
    links: [],
    project: 'abovyan-hasmik-apartment',
  },
];

