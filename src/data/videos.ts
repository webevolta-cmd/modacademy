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
    title: 'Լուսավորության գործնական դաս Electrica Group-ում',
    description: '«Ինտերիեր դիզայն» դասընթացի ուսանողները Electrica Group-ի ցուցասրահում են. ներկայացուցիչը ցույց է տալիս ներկառուցվող և կախովի լուսատուներ, LED ժապավեններ, անջատիչներ ու վարդակներ, իսկ ուսանողները մոտիկից ուսումնասիրում են դրանք։',
    category: 'practice',
    thumb: thumbDdPdaHoLjR,
    thumbAlt: 'Electrica Group-ի ցուցասրահում ներկայացուցիչը նմուշներ է ցույց տալիս նստած ուսանողներին',
    url: 'https://www.instagram.com/reel/Dd_pdaHoLjR/',
    date: '2026-10-02',
    duration: 26,
  },
  {
    id: 'DePkN9foA7V',
    title: 'Վարագույրներ և պաստառներ. գործնական դաս Classis Decor-ում',
    description: 'Ուսանողները Classis Decor-ի խանութ-սրահում թերթում են վարագույրի գործվածքների և պաստառների նմուշագրքեր, համեմատում գույներն ու նախշերը և հարցեր տալիս սրահի աշխատակիցներին։',
    category: 'practice',
    thumb: thumbDePkN9foA7V,
    thumbAlt: 'Ուսանողները Classis Decor-ի սրահում՝ բյուրեղյա ջահի տակ, սեղանի շուրջ ուսումնասիրում են գործվածքների նմուշները',
    url: 'https://www.instagram.com/reel/DePkN9foA7V/',
    date: '2026-10-08',
    duration: 27,
  },
  {
    id: 'Dd3ZOwToVf1',
    title: 'Դեկորատիվ ներկեր. գործնական դաս Novacolor Armenia-ում',
    description: 'Novacolor Armenia-ի ցուցասրահում ներկայացուցիչը ուսանողներին ցույց է տալիս դեկորատիվ ծածկույթներով պատեր՝ բետոնի, ժանգի և պատինայի էֆեկտներով։ Ուսանողները շոշափում են մակերեսները և թերթում նմուշների կատալոգները։',
    category: 'practice',
    thumb: thumbDd3ZOwToVf1,
    thumbAlt: 'Novacolor-ի ներկայացուցիչը բացատրում է ուսանողներին՝ «Concrete» նմուշի և դեկորատիվ պատերի մոտ',
    url: 'https://www.instagram.com/reel/Dd3ZOwToVf1/',
    date: '2026-09-29',
    duration: 26,
  },
  {
    id: 'DdojGyXoIjo',
    title: 'Հատակածածկեր. գործնական դաս Top Floor-ում',
    description: 'Top Floor-ի ցուցասրահում ընկերության ներկայացուցիչը ներկայացնում է լամինատի և այլ հատակածածկերի նմուշներ ու գունային կատալոգներ, իսկ ուսանողները մոտիկից զննում են տախտակները և քայլում նմուշների վրայով։',
    category: 'practice',
    thumb: thumbDdojGyXoIjo,
    thumbAlt: 'Ուսանողուհին զննում է լամինատի նմուշը, որը պահում է Top Floor-ի ներկայացուցիչը',
    url: 'https://www.instagram.com/reel/DdojGyXoIjo/',
    date: '2026-09-23',
    duration: 31,
  },
  {
    id: 'DdMLZ8iIVl6',
    title: 'Չափագրման գործնական դաս իրական տարածքում',
    description: '«Ինտերիեր դիզայն» դասընթացի մասնակիցները չվերանորոգված տարածքում ժապավենաչափով և լազերային հեռաչափով չափում են պատերը, դռների ու պատուհանների բացվածքները և արդյունքները գրանցում հատակագծի էսքիզի վրա։',
    category: 'practice',
    thumb: thumbDdMLZ8iIVl6,
    thumbAlt: 'Մասնակցուհին լազերային հեռաչափով չափում է պատը, մյուսը նշումներ է անում հատակագծի էսքիզի վրա',
    url: 'https://www.instagram.com/reel/DdMLZ8iIVl6/',
    date: '2026-09-12',
    duration: 18,
  },
  {
    id: 'DaAA_pOolHx',
    title: 'Գործնական դաս Gevorgyan\'s կահույքի արտադրամասում',
    description: 'Ուսանողները Gevorgyan\'s Premium Furniture-ի արտադրամասում ծանոթանում են նյութերի նմուշներին, պահարանների մեխանիզմներին ու արտադրական հաստոցներին. աշխատակիցները բացատրում են, թե ինչպես է ստեղծվում կահույքը։',
    category: 'practice',
    thumb: thumbDaAAPOolHx,
    thumbAlt: 'Ուսանողուհիները կահույքի արտադրամասում զննում են նյութերի նմուշները',
    url: 'https://www.instagram.com/reel/DaAA_pOolHx/',
    date: '2026-06-25',
    duration: 44,
  },
  {
    id: 'DeRoJTRoQ-A',
    title: 'Վաճառքի կառավարում. աշխատանք առարկությունների հետ',
    description: 'Հատված «Վաճառքի կառավարում» դասընթացի դասից. դասընթացավարը խոսում է առարկության և պատրվակի տարբերության մասին, մասնակիցները նշումներ են անում և մասնակցում հարցուպատասխանի։',
    category: 'practice',
    thumb: thumbDeRoJTRoQA,
    thumbAlt: 'Դասընթացավարը դաս է վարում, մասնակիցները սեղանի շուրջ նշումներ են անում',
    url: 'https://www.instagram.com/reel/DeRoJTRoQ-A/',
    date: '2026-10-09',
    duration: 19,
  },
  {
    id: 'Dcgb-GlIAwY',
    title: 'Աշխատանք սեփական նախագծի վրա խմբի ղեկավարի հետ',
    description: 'Ուսանողները նոութբուքերով աշխատում են իրենց նախագծերի հատակագծերի վրա, իսկ սենյակի մեծ էկրանին ցուցադրվում է հատակագիծ. էկրանի տեքստը նշում է, որ աշխատանքը տարվում է խմբի ղեկավարի հետ։',
    category: 'project',
    thumb: thumbDcgbGlIAwY,
    thumbAlt: 'Մեծ էկրանին և նոութբուքերին՝ ուսանողների նախագծերի հատակագծեր',
    url: 'https://www.instagram.com/reel/Dcgb-GlIAwY/',
    date: '2026-08-26',
    duration: 9,
  },
];
