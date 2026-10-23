// Central registry of authentic imagery. Masters live in src/assets; Astro generates the
// responsive AVIF/WebP variants at build time.
import type { ImageMetadata } from 'astro';

import work01 from '../assets/work/tevosyan-3dsmax-01.jpg';
import work02 from '../assets/work/tevosyan-3dsmax-02.jpg';
import work03 from '../assets/work/tevosyan-3dsmax-03.jpg';
import work04 from '../assets/work/tevosyan-3dsmax-04.jpg';
import work05 from '../assets/work/tevosyan-3dsmax-05.jpg';
import work06 from '../assets/work/tevosyan-3dsmax-06.jpg';
import work07 from '../assets/work/tevosyan-3dsmax-07.jpg';

import electricaGroup from '../assets/environment/electrica-showroom-group.jpg';
import electricaWall from '../assets/environment/electrica-fixtures-wall.jpg';
import classisCatalogues from '../assets/environment/classis-catalogues.jpg';
import classisSampleBooks from '../assets/environment/classis-sample-books.jpg';
import classisTable from '../assets/environment/classis-table-group.jpg';
import capitalTour from '../assets/environment/capital-showroom-tour.jpg';
import salesTable from '../assets/environment/sales-class-table.jpg';
import salesTrainer from '../assets/environment/sales-class-trainer.jpg';

export interface WorkItem {
  id: string;
  image: ImageMetadata;
  title: string;
  alt: string;
}

export const student = {
  name: 'Շուշան Թևոսյան',
  handle: '@tevosyan.design',
  instagram: 'https://www.instagram.com/tevosyan.design/',
  course: '3Ds Max',
  courseSlug: '3ds-max',
  role: '«3Ds Max» դասընթացի շրջանավարտ',
  source: 'https://www.instagram.com/p/DezOW2GCMyH/',
  sourceDate: '2026-10-22',
  // The academy's own words when it presented this portfolio.
  quote: 'Յուրաքանչյուր աշխատանք՝ գիտելիքի, հմտության և ստեղծագործական մտածողության արդյունքն է։',
} as const;

export const work: WorkItem[] = [
  {
    id: 'living',
    image: work01,
    title: 'Հյուրասենյակ՝ խոհանոցային գոտիով',
    alt: 'Ինտերիերի 3D վիզուալիզացիա․ բեժ բուկլե բազմոց, մարմարե կլոր սեղաններ ոսկեգույն հենակներով, ընկույզի խոհանոց և ոսկեգույն ջահ մայրամուտի լույսի ներքո',
  },
  {
    id: 'table-detail',
    image: work02,
    title: 'Մանրամասն՝ մարմար և լույս',
    alt: 'Մոտիկ կադր․ մարմարե կլոր սեղան, ծաղկած ճյուղերով ծաղկաման և մոմեր բեժ բազմոցի ֆոնին',
  },
  {
    id: 'media-wall',
    image: work03,
    title: 'Հանգստի գոտի',
    alt: 'Վերևից տեսք․ բեժ բազմոց, կլոր սեղաններ և լուսավորված պատին ամրացված հեռուստացույց բաց դարակներով',
  },
  {
    id: 'dining',
    image: work04,
    title: 'Ճաշասենյակ',
    alt: 'Ճաշասենյակ․ մարմարե օվալաձև սեղան, բեժ աթոռներ, սպիտակ թիթեղներով ոսկեգույն ջահ և լուսավոր պատուհան վարագույրներով',
  },
  {
    id: 'corridor',
    image: work05,
    title: 'Միջանցքից դեպի հյուրասենյակ',
    alt: 'Միջանցքի տեսք դեպի հյուրասենյակ․ ալիքաձև ռելիեֆով պատ, գծային կախովի լույս և բազմոց պատուհանի մոտ',
  },
  {
    id: 'kitchen',
    image: work06,
    title: 'Խոհանոց',
    alt: 'Խոհանոց․ ընկույզի ստորին պահարաններ, բեժ վերին ճակատներ, մարմարե պատ լուսավորությամբ և ներկառուցված սարքեր',
  },
  {
    id: 'kitchen-corner',
    image: work07,
    title: 'Խոհանոցի անկյուն',
    alt: 'Անկյունային խոհանոց․ ընկույզի և բեժ ճակատներ, մարմարե աշխատանքային մակերես և լուսավորված պատ',
  },
];

export interface PracticeMoment {
  id: string;
  image: ImageMetadata;
  partner: string;
  partnerUrl?: string;
  course: string;
  caption: string;
  alt: string;
  date: string;
  source: string;
}

// Practical lessons and classes documented by the academy (Instagram reels, October 2026).
export const practice: PracticeMoment[] = [
  {
    id: 'electrica-group',
    image: electricaGroup,
    partner: 'Electrica Group',
    partnerUrl: 'https://www.instagram.com/electrica.group/',
    course: 'Ինտերիեր դիզայն',
    caption: 'Լուսավորության տեսակները և դրանց ճիշտ կիրառումը ինտերիերում',
    alt: 'Ուսանողների խումբը լուսավորության սրահում՝ գործնական դասի ընթացքում',
    date: '2026-10-02',
    source: 'https://www.instagram.com/p/Dd_pdaHoLjR/',
  },
  {
    id: 'classis-catalogues',
    image: classisCatalogues,
    partner: 'Classis Decor Armenia',
    partnerUrl: 'https://www.instagram.com/classis_decor_curtains/',
    course: 'Ինտերիեր դիզայն',
    caption: 'Վարագույրներ, գալարավարագույրներ և պաստառներ՝ իրական նմուշներով',
    alt: 'Ուսանողները թերթում են պաստառների և գործվածքների կատալոգներ սրահում',
    date: '2026-10-08',
    source: 'https://www.instagram.com/p/DePkN9foA7V/',
  },
  {
    id: 'capital-interiors',
    image: capitalTour,
    partner: 'Capital Interiors',
    partnerUrl: 'https://www.instagram.com/capital_interiors/',
    course: 'Ինտերիեր դիզայն',
    caption: 'Իտալական կահույքի, ջահերի և խոհանոցների տեսականի',
    alt: 'Ուսանողների խումբը կահույքի և ջահերի սրահում',
    date: '2026-10-10',
    source: 'https://www.instagram.com/p/DeUXZa8Nzc9/',
  },
  {
    id: 'electrica-wall',
    image: electricaWall,
    partner: 'Electrica Group',
    partnerUrl: 'https://www.instagram.com/electrica.group/',
    course: 'Ինտերիեր դիզայն',
    caption: 'Լուսատուների և լուսային լուծումների ներկայացում ցուցապատին',
    alt: 'Գործնական դասի ժամանակ ցուցապատին ներկայացվում են լուսատուների նմուշները',
    date: '2026-10-02',
    source: 'https://www.instagram.com/p/Dd_pdaHoLjR/',
  },
  {
    id: 'classis-sample-books',
    image: classisSampleBooks,
    partner: 'Classis Decor Armenia',
    partnerUrl: 'https://www.instagram.com/classis_decor_curtains/',
    course: 'Ինտերիեր դիզայն',
    caption: 'Գործվածքների և պաստառների նմուշների գրքեր',
    alt: 'Ուսանողները ուսումնասիրում են գործվածքների նմուշների գրքերը',
    date: '2026-10-08',
    source: 'https://www.instagram.com/p/DePkN9foA7V/',
  },
  {
    id: 'sales-class',
    image: salesTable,
    partner: 'MOD Academy',
    course: 'Վաճառքի կառավարում',
    caption: 'Ինտերակտիվ հարցուպատասխան և առարկությունների հետ աշխատանք',
    alt: 'Վաճառքի կառավարման դասը ակադեմիայի լսարանում․ մասնակիցները նշումներ են անում, դասախոսը կանգնած է գրատախտակի մոտ',
    date: '2026-10-09',
    source: 'https://www.instagram.com/p/DeRoJTRoQ-A/',
  },
];

export const extraImages = {
  classisTable,
  salesTrainer,
};
