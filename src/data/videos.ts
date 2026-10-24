// A small, curated set of the academy's own videos that help a prospective student decide.
// Each entry was reviewed (frames and speech) before its description was written; playback opens
// the original post on Instagram. Thumbnails are stored with the site so they always load.
import type { ImageMetadata } from 'astro';
import thumbDdPdaHoLjR from '../assets/videos/Dd_pdaHoLjR.jpg';
import thumbDePkN9foA7V from '../assets/videos/DePkN9foA7V.jpg';
import thumbDd3ZOwToVf1 from '../assets/videos/Dd3ZOwToVf1.jpg';
import thumbDdojGyXoIjo from '../assets/videos/DdojGyXoIjo.jpg';
import thumbDdMLZ8iIVl6 from '../assets/videos/DdMLZ8iIVl6.jpg';
import thumbDaAAPOolHx from '../assets/videos/DaAA_pOolHx.jpg';
import thumbDeRoJTRoQA from '../assets/videos/DeRoJTRoQ-A.jpg';
import thumbDcgbGlIAwY from '../assets/videos/Dcgb-GlIAwY.jpg';






export type VideoCategory = 'graduate' | 'student' | 'practice' | 'course' | 'project';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  thumb: ImageMetadata;
  thumbAlt: string;
  url: string;
  date: string;
  /** Duration in seconds, when known. */
  duration?: number;
}

export const videoCategoryLabels: Record<VideoCategory, string> = {
  graduate: 'Շրջանավարտներ',
  student: 'Ուսանողների փորձը',
  practice: 'Գործնական դասեր',
  course: 'Դասընթացների մասին',
  project: 'Նախագծեր',
};

export const videos: VideoItem[] = [
  {
    id: 'Dd_pdaHoLjR',
    title: 'Լուսավորության դաս Electrica Group-ի ցուցասրահում',
    description: 'Այս դասն անցնում է Electrica Group-ի ցուցասրահում․ ներկայացուցչի ուղեկցությամբ «Ինտերիեր դիզայն» դասընթացի ուսանողները մոտիկից ծանոթանում են ներկառուցվող և կախովի լուսատուներին, LED ժապավեններին, անջատիչներին ու վարդակներին։',
    category: 'practice',
    thumb: thumbDdPdaHoLjR,
    thumbAlt: 'Electrica Group-ի ցուցասրահում ներկայացուցիչը նմուշներ է ցույց տալիս նստած ուսանողներին',
    url: 'https://www.instagram.com/reel/Dd_pdaHoLjR/',
    date: '2026-10-02',
    duration: 26,
  },
  {
    id: 'DePkN9foA7V',
    title: 'Գործվածքներ, պաստառներ, նախշեր․ գործնական դաս Classis Decor-ում',
    description: 'Classis Decor-ի խանութ-սրահում ուսանողները թերթում են վարագույրի գործվածքների ու պաստառների նմուշագրքերը, համեմատում գույներն ու նախշերը և իրենց հարցերն ուղղում սրահի աշխատակիցներին։',
    category: 'practice',
    thumb: thumbDePkN9foA7V,
    thumbAlt: 'Ուսանողները Classis Decor-ի սրահում՝ բյուրեղյա ջահի տակ, սեղանի շուրջ ուսումնասիրում են գործվածքների նմուշները',
    url: 'https://www.instagram.com/reel/DePkN9foA7V/',
    date: '2026-10-08',
    duration: 27,
  },
  {
    id: 'Dd3ZOwToVf1',
    title: 'Դեկորատիվ ներկեր․ գործնական դաս Novacolor Armenia-ում',
    description: 'Պատը կարող է հիշեցնել բետոն, ժանգ կամ պատինա․ Novacolor Armenia-ի ցուցասրահում ներկայացուցիչն ուսանողներին ցույց է տալիս նման դեկորատիվ ծածկույթներ, իսկ նրանք շոշափում են մակերեսները և թերթում նմուշների կատալոգները։',
    category: 'practice',
    thumb: thumbDd3ZOwToVf1,
    thumbAlt: 'Novacolor-ի ներկայացուցիչը բացատրում է ուսանողներին՝ «Concrete» նմուշի և դեկորատիվ պատերի մոտ',
    url: 'https://www.instagram.com/reel/Dd3ZOwToVf1/',
    date: '2026-09-29',
    duration: 26,
  },
  {
    id: 'DdojGyXoIjo',
    title: 'Հատակածածկեր․ գործնական դաս Top Floor-ում',
    description: 'Top Floor-ի ցուցասրահում ընկերության ներկայացուցիչն ուսանողներին ներկայացնում է լամինատի և այլ հատակածածկերի նմուշներ ու գունային կատալոգներ։ Ուսանողները մոտիկից զննում են տախտակները և նույնիսկ քայլում նմուշների վրայով։',
    category: 'practice',
    thumb: thumbDdojGyXoIjo,
    thumbAlt: 'Ուսանողուհին զննում է լամինատի նմուշը, որը պահում է Top Floor-ի ներկայացուցիչը',
    url: 'https://www.instagram.com/reel/DdojGyXoIjo/',
    date: '2026-09-23',
    duration: 31,
  },
  {
    id: 'DdMLZ8iIVl6',
    title: 'Իրական տարածք, իրական չափեր․ չափագրման դաս',
    description: 'Նախագիծը սկսվում է չափագրումից․ «Ինտերիեր դիզայն» դասընթացի մասնակիցները չվերանորոգված տարածքում ժապավենաչափով և լազերային հեռաչափով չափում են պատերը, դռների ու պատուհանների բացվածքները և ամեն ինչ գրանցում հատակագծի էսքիզի վրա։',
    category: 'practice',
    thumb: thumbDdMLZ8iIVl6,
    thumbAlt: 'Մասնակցուհին լազերային հեռաչափով չափում է պատը, մյուսը նշումներ է անում հատակագծի էսքիզի վրա',
    url: 'https://www.instagram.com/reel/DdMLZ8iIVl6/',
    date: '2026-09-12',
    duration: 18,
  },
  {
    id: 'DaAA_pOolHx',
    title: 'Ինչպես է ծնվում կահույքը․ դաս Gevorgyan\'s արտադրամասում',
    description: 'Gevorgyan\'s Premium Furniture-ի արտադրամասում ուսանողները ծանոթանում են նյութերի նմուշներին, պահարանների մեխանիզմներին և արտադրական հաստոցներին, իսկ աշխատակիցները պատմում են, թե ինչպես է ստեղծվում կահույքը։',
    category: 'practice',
    thumb: thumbDaAAPOolHx,
    thumbAlt: 'Ուսանողուհիները կահույքի արտադրամասում զննում են նյութերի նմուշները',
    url: 'https://www.instagram.com/reel/DaAA_pOolHx/',
    date: '2026-06-25',
    duration: 44,
  },
  {
    id: 'DeRoJTRoQ-A',
    title: 'Առարկությո՞ւն, թե պատրվակ․ վաճառքի կառավարման դաս',
    description: 'Հատված «Վաճառքի կառավարում» դասընթացից․ դասընթացավարը բացատրում է, թե ինչով է առարկությունը տարբերվում պատրվակից, իսկ մասնակիցները նշումներ են անում և ներգրավվում հարցուպատասխանի մեջ։',
    category: 'practice',
    thumb: thumbDeRoJTRoQA,
    thumbAlt: 'Դասընթացավարը դաս է վարում, մասնակիցները սեղանի շուրջ նշումներ են անում',
    url: 'https://www.instagram.com/reel/DeRoJTRoQ-A/',
    date: '2026-10-09',
    duration: 19,
  },
  {
    id: 'Dcgb-GlIAwY',
    title: 'Սեփական նախագիծ՝ խմբի ղեկավարի ուղեկցությամբ',
    description: 'Յուրաքանչյուրն աշխատում է իր նախագծի վրա․ ուսանողները խմբի ղեկավարի հետ նոութբուքերով մշակում են իրենց հատակագծերը, իսկ սենյակի մեծ էկրանին հատակագիծ է ցուցադրվում։',
    category: 'project',
    thumb: thumbDcgbGlIAwY,
    thumbAlt: 'Մեծ էկրանին և նոութբուքերին՝ ուսանողների նախագծերի հատակագծեր',
    url: 'https://www.instagram.com/reel/Dcgb-GlIAwY/',
    date: '2026-08-26',
    duration: 9,
  },
];
