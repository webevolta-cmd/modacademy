// Student-work projects. Several views of one interior are one project. Every project names its
// author and course exactly as the academy (or the author) published them, with the source post.
// Academy studio work and the illustrative hero film are never listed here.
import type { ImageMetadata } from 'astro';
import { work, student } from './media';
import pvArsenyanApartment01 from '../assets/projects/arsenyan-apartment/arsenyan-apartment-01.jpg';
import pvArsenyanApartment02 from '../assets/projects/arsenyan-apartment/arsenyan-apartment-02.jpg';
import pvArsenyanApartment03 from '../assets/projects/arsenyan-apartment/arsenyan-apartment-03.jpg';
import pvArsenyanApartment04 from '../assets/projects/arsenyan-apartment/arsenyan-apartment-04.jpg';
import pvArsenyanApartment05 from '../assets/projects/arsenyan-apartment/arsenyan-apartment-05.jpg';
import pvArsenyanApartment06 from '../assets/projects/arsenyan-apartment/arsenyan-apartment-06.jpg';
import pvArsenyanApartment07 from '../assets/projects/arsenyan-apartment/arsenyan-apartment-07.jpg';
import pvArsenyanApartment08 from '../assets/projects/arsenyan-apartment/arsenyan-apartment-08.jpg';
import pvSayadyanOpenLiving01 from '../assets/projects/sayadyan-open-living/sayadyan-open-living-01.jpg';
import pvSayadyanOpenLiving02 from '../assets/projects/sayadyan-open-living/sayadyan-open-living-02.jpg';
import pvSayadyanOpenLiving03 from '../assets/projects/sayadyan-open-living/sayadyan-open-living-03.jpg';
import pvSayadyanOpenLiving04 from '../assets/projects/sayadyan-open-living/sayadyan-open-living-04.jpg';
import pvSayadyanOpenLiving05 from '../assets/projects/sayadyan-open-living/sayadyan-open-living-05.jpg';
import pvSayadyanOpenLiving06 from '../assets/projects/sayadyan-open-living/sayadyan-open-living-06.jpg';
import pvSayadyanOpenLiving07 from '../assets/projects/sayadyan-open-living/sayadyan-open-living-07.jpg';
import pvSahakyanApartment01 from '../assets/projects/sahakyan-apartment/sahakyan-apartment-01.jpg';
import pvSahakyanApartment02 from '../assets/projects/sahakyan-apartment/sahakyan-apartment-02.jpg';
import pvSahakyanApartment03 from '../assets/projects/sahakyan-apartment/sahakyan-apartment-03.jpg';
import pvSahakyanApartment04 from '../assets/projects/sahakyan-apartment/sahakyan-apartment-04.jpg';
import pvSahakyanApartment05 from '../assets/projects/sahakyan-apartment/sahakyan-apartment-05.jpg';
import pvSahakyanApartment06 from '../assets/projects/sahakyan-apartment/sahakyan-apartment-06.jpg';
import pvSahakyanApartment07 from '../assets/projects/sahakyan-apartment/sahakyan-apartment-07.jpg';
import pvSahakyanApartment08 from '../assets/projects/sahakyan-apartment/sahakyan-apartment-08.jpg';
import pvSahakyanApartment09 from '../assets/projects/sahakyan-apartment/sahakyan-apartment-09.jpg';
import pvSahakyanApartment10 from '../assets/projects/sahakyan-apartment/sahakyan-apartment-10.jpg';
import pvSahakyanApartment11 from '../assets/projects/sahakyan-apartment/sahakyan-apartment-11.jpg';
import pvVardanyanLivingRoom01 from '../assets/projects/vardanyan-living-room/vardanyan-living-room-01.jpg';
import pvVardanyanLivingRoom02 from '../assets/projects/vardanyan-living-room/vardanyan-living-room-02.jpg';
import pvVardanyanLivingRoom03 from '../assets/projects/vardanyan-living-room/vardanyan-living-room-03.jpg';
import pvVardanyanLivingRoom04 from '../assets/projects/vardanyan-living-room/vardanyan-living-room-04.jpg';
import pvVardanyanLivingRoom05 from '../assets/projects/vardanyan-living-room/vardanyan-living-room-05.jpg';
import pvVardanyanLivingRoom06 from '../assets/projects/vardanyan-living-room/vardanyan-living-room-06.jpg';
import pvAleksanyanKhachaturApartment01 from '../assets/projects/aleksanyan-khachatur-apartment/aleksanyan-khachatur-apartment-01.jpg';
import pvAleksanyanKhachaturApartment02 from '../assets/projects/aleksanyan-khachatur-apartment/aleksanyan-khachatur-apartment-02.jpg';
import pvAleksanyanKhachaturApartment03 from '../assets/projects/aleksanyan-khachatur-apartment/aleksanyan-khachatur-apartment-03.jpg';
import pvAleksanyanKhachaturApartment04 from '../assets/projects/aleksanyan-khachatur-apartment/aleksanyan-khachatur-apartment-04.jpg';
import pvAleksanyanKhachaturApartment05 from '../assets/projects/aleksanyan-khachatur-apartment/aleksanyan-khachatur-apartment-05.jpg';
import pvAleksanyanKhachaturApartment06 from '../assets/projects/aleksanyan-khachatur-apartment/aleksanyan-khachatur-apartment-06.jpg';
import pvAleksanyanKhachaturApartment07 from '../assets/projects/aleksanyan-khachatur-apartment/aleksanyan-khachatur-apartment-07.jpg';
import pvAleksanyanKhachaturApartment08 from '../assets/projects/aleksanyan-khachatur-apartment/aleksanyan-khachatur-apartment-08.jpg';
import pvAleksanyanKhachaturApartment09 from '../assets/projects/aleksanyan-khachatur-apartment/aleksanyan-khachatur-apartment-09.jpg';
import pvAleksanyanKhachaturApartment10 from '../assets/projects/aleksanyan-khachatur-apartment/aleksanyan-khachatur-apartment-10.jpg';
import pvKostanyanPerchuhiLivingKitchen01 from '../assets/projects/kostanyan-perchuhi-living-kitchen/kostanyan-perchuhi-living-kitchen-01.jpg';
import pvKostanyanPerchuhiLivingKitchen02 from '../assets/projects/kostanyan-perchuhi-living-kitchen/kostanyan-perchuhi-living-kitchen-02.jpg';
import pvKostanyanPerchuhiLivingKitchen03 from '../assets/projects/kostanyan-perchuhi-living-kitchen/kostanyan-perchuhi-living-kitchen-03.jpg';
import pvKostanyanPerchuhiLivingKitchen04 from '../assets/projects/kostanyan-perchuhi-living-kitchen/kostanyan-perchuhi-living-kitchen-04.jpg';
import pvKostanyanPerchuhiLivingKitchen05 from '../assets/projects/kostanyan-perchuhi-living-kitchen/kostanyan-perchuhi-living-kitchen-05.jpg';
import pvKostanyanPerchuhiLivingKitchen06 from '../assets/projects/kostanyan-perchuhi-living-kitchen/kostanyan-perchuhi-living-kitchen-06.jpg';
import pvKostanyanPerchuhiLivingKitchen07 from '../assets/projects/kostanyan-perchuhi-living-kitchen/kostanyan-perchuhi-living-kitchen-07.jpg';
import pvKostanyanPerchuhiLivingKitchen08 from '../assets/projects/kostanyan-perchuhi-living-kitchen/kostanyan-perchuhi-living-kitchen-08.jpg';
import pvMkhitaryanMariamLivingDining01 from '../assets/projects/mkhitaryan-mariam-living-dining/mkhitaryan-mariam-living-dining-01.jpg';
import pvMkhitaryanMariamLivingDining02 from '../assets/projects/mkhitaryan-mariam-living-dining/mkhitaryan-mariam-living-dining-02.jpg';
import pvMkhitaryanMariamLivingDining03 from '../assets/projects/mkhitaryan-mariam-living-dining/mkhitaryan-mariam-living-dining-03.jpg';
import pvMkhitaryanMariamLivingDining04 from '../assets/projects/mkhitaryan-mariam-living-dining/mkhitaryan-mariam-living-dining-04.jpg';
import pvMkhitaryanMariamLivingDining05 from '../assets/projects/mkhitaryan-mariam-living-dining/mkhitaryan-mariam-living-dining-05.jpg';
import pvMkhitaryanMariamLivingDining06 from '../assets/projects/mkhitaryan-mariam-living-dining/mkhitaryan-mariam-living-dining-06.jpg';
import pvMkhitaryanMariamLivingDining07 from '../assets/projects/mkhitaryan-mariam-living-dining/mkhitaryan-mariam-living-dining-07.jpg';
import pvAbovyanHasmikApartment01 from '../assets/projects/abovyan-hasmik-apartment/abovyan-hasmik-apartment-01.jpg';
import pvAbovyanHasmikApartment02 from '../assets/projects/abovyan-hasmik-apartment/abovyan-hasmik-apartment-02.jpg';
import pvAbovyanHasmikApartment03 from '../assets/projects/abovyan-hasmik-apartment/abovyan-hasmik-apartment-03.jpg';
import pvAbovyanHasmikApartment04 from '../assets/projects/abovyan-hasmik-apartment/abovyan-hasmik-apartment-04.jpg';
import pvAbovyanHasmikApartment05 from '../assets/projects/abovyan-hasmik-apartment/abovyan-hasmik-apartment-05.jpg';
import pvAbovyanHasmikApartment06 from '../assets/projects/abovyan-hasmik-apartment/abovyan-hasmik-apartment-06.jpg';
import pvAbovyanHasmikApartment07 from '../assets/projects/abovyan-hasmik-apartment/abovyan-hasmik-apartment-07.jpg';
import pvAbovyanHasmikApartment08 from '../assets/projects/abovyan-hasmik-apartment/abovyan-hasmik-apartment-08.jpg';
import pvAbovyanHasmikApartment09 from '../assets/projects/abovyan-hasmik-apartment/abovyan-hasmik-apartment-09.jpg';
import pvSimonyanKristineApartment01 from '../assets/projects/simonyan-kristine-apartment/simonyan-kristine-apartment-01.jpg';
import pvSimonyanKristineApartment02 from '../assets/projects/simonyan-kristine-apartment/simonyan-kristine-apartment-02.jpg';
import pvSimonyanKristineApartment03 from '../assets/projects/simonyan-kristine-apartment/simonyan-kristine-apartment-03.jpg';
import pvSimonyanKristineApartment04 from '../assets/projects/simonyan-kristine-apartment/simonyan-kristine-apartment-04.jpg';
import pvSimonyanKristineApartment05 from '../assets/projects/simonyan-kristine-apartment/simonyan-kristine-apartment-05.jpg';
import pvSimonyanKristineApartment06 from '../assets/projects/simonyan-kristine-apartment/simonyan-kristine-apartment-06.jpg';
import pvSimonyanKristineApartment07 from '../assets/projects/simonyan-kristine-apartment/simonyan-kristine-apartment-07.jpg';
import pvSimonyanKristineApartment08 from '../assets/projects/simonyan-kristine-apartment/simonyan-kristine-apartment-08.jpg';
import pvSimonyanKristineApartment09 from '../assets/projects/simonyan-kristine-apartment/simonyan-kristine-apartment-09.jpg';
import pvSimonyanKristineApartment10 from '../assets/projects/simonyan-kristine-apartment/simonyan-kristine-apartment-10.jpg';
import pvTumasyanAniApartment01 from '../assets/projects/tumasyan-ani-apartment/tumasyan-ani-apartment-01.jpg';
import pvTumasyanAniApartment02 from '../assets/projects/tumasyan-ani-apartment/tumasyan-ani-apartment-02.jpg';
import pvTumasyanAniApartment03 from '../assets/projects/tumasyan-ani-apartment/tumasyan-ani-apartment-03.jpg';
import pvTumasyanAniApartment04 from '../assets/projects/tumasyan-ani-apartment/tumasyan-ani-apartment-04.jpg';
import pvTumasyanAniApartment05 from '../assets/projects/tumasyan-ani-apartment/tumasyan-ani-apartment-05.jpg';
import pvTumasyanAniApartment06 from '../assets/projects/tumasyan-ani-apartment/tumasyan-ani-apartment-06.jpg';
import pvTumasyanAniApartment07 from '../assets/projects/tumasyan-ani-apartment/tumasyan-ani-apartment-07.jpg';
import pvTumasyanAniApartment08 from '../assets/projects/tumasyan-ani-apartment/tumasyan-ani-apartment-08.jpg';
import pvTumasyanAniApartment09 from '../assets/projects/tumasyan-ani-apartment/tumasyan-ani-apartment-09.jpg';
import pvTumasyanAniApartment10 from '../assets/projects/tumasyan-ani-apartment/tumasyan-ani-apartment-10.jpg';
import pvMartirosyanMelineApartment01 from '../assets/projects/martirosyan-meline-apartment/martirosyan-meline-apartment-01.jpg';
import pvMartirosyanMelineApartment02 from '../assets/projects/martirosyan-meline-apartment/martirosyan-meline-apartment-02.jpg';
import pvMartirosyanMelineApartment03 from '../assets/projects/martirosyan-meline-apartment/martirosyan-meline-apartment-03.jpg';
import pvMartirosyanMelineApartment04 from '../assets/projects/martirosyan-meline-apartment/martirosyan-meline-apartment-04.jpg';
import pvMartirosyanMelineApartment05 from '../assets/projects/martirosyan-meline-apartment/martirosyan-meline-apartment-05.jpg';
import pvMartirosyanMelineApartment06 from '../assets/projects/martirosyan-meline-apartment/martirosyan-meline-apartment-06.jpg';
import pvMartirosyanMelineApartment07 from '../assets/projects/martirosyan-meline-apartment/martirosyan-meline-apartment-07.jpg';
import pvMartirosyanMelineApartment08 from '../assets/projects/martirosyan-meline-apartment/martirosyan-meline-apartment-08.jpg';
import pvMartirosyanMelineApartment09 from '../assets/projects/martirosyan-meline-apartment/martirosyan-meline-apartment-09.jpg';
import pvMartirosyanMelineApartment10 from '../assets/projects/martirosyan-meline-apartment/martirosyan-meline-apartment-10.jpg';
import pvAleksanyanShushanHouse01 from '../assets/projects/aleksanyan-shushan-house/aleksanyan-shushan-house-01.jpg';
import pvAleksanyanShushanHouse02 from '../assets/projects/aleksanyan-shushan-house/aleksanyan-shushan-house-02.jpg';
import pvAleksanyanShushanHouse03 from '../assets/projects/aleksanyan-shushan-house/aleksanyan-shushan-house-03.jpg';
import pvAleksanyanShushanHouse04 from '../assets/projects/aleksanyan-shushan-house/aleksanyan-shushan-house-04.jpg';
import pvAleksanyanShushanHouse05 from '../assets/projects/aleksanyan-shushan-house/aleksanyan-shushan-house-05.jpg';
import pvAleksanyanShushanHouse06 from '../assets/projects/aleksanyan-shushan-house/aleksanyan-shushan-house-06.jpg';
import pvAleksanyanShushanHouse07 from '../assets/projects/aleksanyan-shushan-house/aleksanyan-shushan-house-07.jpg';
import pvAleksanyanShushanHouse08 from '../assets/projects/aleksanyan-shushan-house/aleksanyan-shushan-house-08.jpg';
import pvMariamAslanyanOpenPlanLiving01 from '../assets/projects/mariam-aslanyan-open-plan-living/mariam-aslanyan-open-plan-living-01.jpg';
import pvMariamAslanyanOpenPlanLiving02 from '../assets/projects/mariam-aslanyan-open-plan-living/mariam-aslanyan-open-plan-living-02.jpg';
import pvMariamAslanyanOpenPlanLiving03 from '../assets/projects/mariam-aslanyan-open-plan-living/mariam-aslanyan-open-plan-living-03.jpg';
import pvMariamAslanyanOpenPlanLiving04 from '../assets/projects/mariam-aslanyan-open-plan-living/mariam-aslanyan-open-plan-living-04.jpg';
import pvNaraDanielyanApartment01 from '../assets/projects/nara-danielyan-apartment/nara-danielyan-apartment-01.jpg';
import pvNaraDanielyanApartment02 from '../assets/projects/nara-danielyan-apartment/nara-danielyan-apartment-02.jpg';
import pvNaraDanielyanApartment03 from '../assets/projects/nara-danielyan-apartment/nara-danielyan-apartment-03.jpg';
import pvNaraDanielyanApartment04 from '../assets/projects/nara-danielyan-apartment/nara-danielyan-apartment-04.jpg';
import pvNaraDanielyanApartment05 from '../assets/projects/nara-danielyan-apartment/nara-danielyan-apartment-05.jpg';
import pvNaraDanielyanApartment06 from '../assets/projects/nara-danielyan-apartment/nara-danielyan-apartment-06.jpg';
import pvNaraDanielyanApartment07 from '../assets/projects/nara-danielyan-apartment/nara-danielyan-apartment-07.jpg';
import pvNaraDanielyanApartment08 from '../assets/projects/nara-danielyan-apartment/nara-danielyan-apartment-08.jpg';
import pvNaraDanielyanApartment09 from '../assets/projects/nara-danielyan-apartment/nara-danielyan-apartment-09.jpg';
import pvKarolinaSargsyanOpenPlanLivingKitchen01 from '../assets/projects/karolina-sargsyan-open-plan-living-kitchen/karolina-sargsyan-open-plan-living-kitchen-01.jpg';
import pvKarolinaSargsyanOpenPlanLivingKitchen02 from '../assets/projects/karolina-sargsyan-open-plan-living-kitchen/karolina-sargsyan-open-plan-living-kitchen-02.jpg';
import pvKarolinaSargsyanOpenPlanLivingKitchen03 from '../assets/projects/karolina-sargsyan-open-plan-living-kitchen/karolina-sargsyan-open-plan-living-kitchen-03.jpg';
import pvKarolinaSargsyanOpenPlanLivingKitchen04 from '../assets/projects/karolina-sargsyan-open-plan-living-kitchen/karolina-sargsyan-open-plan-living-kitchen-04.jpg';
import pvKarolinaSargsyanOpenPlanLivingKitchen05 from '../assets/projects/karolina-sargsyan-open-plan-living-kitchen/karolina-sargsyan-open-plan-living-kitchen-05.jpg';
import pvNairaAzaryanMountainView01 from '../assets/projects/naira-azaryan-mountain-view/naira-azaryan-mountain-view-01.jpg';
import pvNairaAzaryanMountainView02 from '../assets/projects/naira-azaryan-mountain-view/naira-azaryan-mountain-view-02.jpg';
import pvNairaAzaryanMountainView03 from '../assets/projects/naira-azaryan-mountain-view/naira-azaryan-mountain-view-03.jpg';
import pvNairaAzaryanMountainView04 from '../assets/projects/naira-azaryan-mountain-view/naira-azaryan-mountain-view-04.jpg';
import pvNairaAzaryanMountainView05 from '../assets/projects/naira-azaryan-mountain-view/naira-azaryan-mountain-view-05.jpg';
import pvNairaAzaryanMountainView06 from '../assets/projects/naira-azaryan-mountain-view/naira-azaryan-mountain-view-06.jpg';
import pvNairaAzaryanMountainView07 from '../assets/projects/naira-azaryan-mountain-view/naira-azaryan-mountain-view-07.jpg';
import pvElenVanoyanApartment01 from '../assets/projects/elen-vanoyan-apartment/elen-vanoyan-apartment-01.jpg';
import pvElenVanoyanApartment02 from '../assets/projects/elen-vanoyan-apartment/elen-vanoyan-apartment-02.jpg';
import pvElenVanoyanApartment03 from '../assets/projects/elen-vanoyan-apartment/elen-vanoyan-apartment-03.jpg';
import pvElenVanoyanApartment04 from '../assets/projects/elen-vanoyan-apartment/elen-vanoyan-apartment-04.jpg';
import pvElenVanoyanApartment05 from '../assets/projects/elen-vanoyan-apartment/elen-vanoyan-apartment-05.jpg';
import pvElenVanoyanApartment06 from '../assets/projects/elen-vanoyan-apartment/elen-vanoyan-apartment-06.jpg';
import pvElenVanoyanApartment07 from '../assets/projects/elen-vanoyan-apartment/elen-vanoyan-apartment-07.jpg';
import pvElenVanoyanApartment08 from '../assets/projects/elen-vanoyan-apartment/elen-vanoyan-apartment-08.jpg';
import pvMarineShahnazaryanApartment01 from '../assets/projects/marine-shahnazaryan-apartment/marine-shahnazaryan-apartment-01.jpg';
import pvMarineShahnazaryanApartment02 from '../assets/projects/marine-shahnazaryan-apartment/marine-shahnazaryan-apartment-02.jpg';
import pvMarineShahnazaryanApartment03 from '../assets/projects/marine-shahnazaryan-apartment/marine-shahnazaryan-apartment-03.jpg';
import pvMarineShahnazaryanApartment04 from '../assets/projects/marine-shahnazaryan-apartment/marine-shahnazaryan-apartment-04.jpg';
import pvMarineShahnazaryanApartment05 from '../assets/projects/marine-shahnazaryan-apartment/marine-shahnazaryan-apartment-05.jpg';
import pvMarineShahnazaryanApartment06 from '../assets/projects/marine-shahnazaryan-apartment/marine-shahnazaryan-apartment-06.jpg';
import pvMarineShahnazaryanApartment07 from '../assets/projects/marine-shahnazaryan-apartment/marine-shahnazaryan-apartment-07.jpg';
import pvMarineShahnazaryanApartment08 from '../assets/projects/marine-shahnazaryan-apartment/marine-shahnazaryan-apartment-08.jpg';
import pvAniNasibyanDoubleHeightLoft01 from '../assets/projects/ani-nasibyan-double-height-loft/ani-nasibyan-double-height-loft-01.jpg';
import pvAniNasibyanDoubleHeightLoft02 from '../assets/projects/ani-nasibyan-double-height-loft/ani-nasibyan-double-height-loft-02.jpg';
import pvAniNasibyanDoubleHeightLoft03 from '../assets/projects/ani-nasibyan-double-height-loft/ani-nasibyan-double-height-loft-03.jpg';
import pvAniNasibyanDoubleHeightLoft04 from '../assets/projects/ani-nasibyan-double-height-loft/ani-nasibyan-double-height-loft-04.jpg';
import pvAniNasibyanDoubleHeightLoft05 from '../assets/projects/ani-nasibyan-double-height-loft/ani-nasibyan-double-height-loft-05.jpg';

export interface ProjectView {
  image: ImageMetadata;
  title: string;
  alt: string;
}

export interface ProjectFilm {
  desktop: string;
  mobile: string;
  poster: string;
  posterMobile: string;
  /** How the film relates to the original work — always shown with it. */
  note: string;
}

export interface Project {
  slug: string;
  title: string;
  category: 'visualization' | 'interior';
  author: {
    name: string;
    nameLatin: string;
    handle?: string;
    instagram?: string;
    role: string;
  };
  /** Course as the source names it; left empty when the source does not say. */
  course: string;
  courseSlug?: string;
  summary: string;
  views: ProjectView[];
  source: string;
  sourceDate: string;
  /** Disclosure shown with the images (e.g. resolution enhancement). */
  imageNote?: string;
  film?: ProjectFilm;
}

export const categoryLabels: Record<Project['category'], string> = {
  visualization: '3D վիզուալիզացիա',
  interior: 'Ինտերիեր դիզայն',
};

export const projects: Project[] = [
  {
    slug: 'tevosyan-living-kitchen',
    title: 'Հյուրասենյակ՝ խոհանոցային գոտիով',
    category: 'visualization',
    author: {
      name: student.name,
      nameLatin: 'Shushan Tevosyan',
      handle: student.handle,
      instagram: student.instagram,
      role: student.role,
    },
    course: '3Ds Max',
    courseSlug: '3ds-max',
    summary:
      'Բնակարանի հյուրասենյակի, ճաշասենյակի և խոհանոցի 3D վիզուալիզացիաներ։ Ավարտական պորտֆոլիո՝ «3Ds Max» դասընթացից։',
    views: work.map((w) => ({ image: w.image, title: w.title, alt: w.alt })),
    source: student.source,
    sourceDate: student.sourceDate,
    film: {
      desktop: '/media/hero/hero-desktop-v2.mp4',
      mobile: '/media/hero/hero-mobile-v2.mp4',
      poster: '/media/hero/hero-desktop-v2-poster.webp',
      posterMobile: '/media/hero/hero-mobile-v2-poster.webp',
      note: 'Նույն ինտերիերը՝ կինեմատոգրաֆիկ շարժման մեջ։',
    },
  },
  // ── Research import (generated) ──
  {
    slug: 'arsenyan-apartment',
    title: 'Բնակարան՝ ընկույզի երեսպատմամբ և բնանկարային պաստառներով',
    category: 'interior',
    author: {
      name: 'Սյուզի Արսենյան',
      nameLatin: 'Syuzi Arsenyan',
      role: '«Ինտերիեր դիզայն» դասընթացի շրջանավարտ',
    },
    course: 'Ինտերիեր դիզայն',
    courseSlug: 'interior-design',
    summary: 'Բնակարանի ննջասենյակի, սանհանգույցի, միջանցքի և հյուրասենյակ-խոհանոցի վիզուալիզացիաներ։ Ավարտական պորտֆոլիո՝ «Ինտերիեր դիզայն» դասընթացից։',
    views: [
      { image: pvArsenyanApartment01, title: 'Ննջասենյակ', alt: 'Ննջասենյակ՝ ցածր փափուկ մահճակալով, ապակե սկավառակներով ջահով, կաղապարված շրջանակում դասական բնանկարով պաստառով և պատի լուսատուներով' },
      { image: pvArsenyanApartment02, title: 'Ննջասենյակ՝ վերևից', alt: 'Նույն ննջասենյակը վերևից․ մոխրագույն մահճակալին կատու է պառկած, վերևում՝ ապակե ջահը, պատին՝ բնանկարով պաստառ, պատուհանին՝ մուգ վարագույրներ, հատակին՝ եղևնաձև մանրահատակ' },
      { image: pvArsenyanApartment03, title: 'Սանհանգույց', alt: 'Սանհանգույց՝ ընկույզի փայտե պատերով, խոշորանախշ մարմարե պատով, օվալաձև հայելով, ընկույզի պահարանի վրա քարե լվացարանով և զուգարանակոնքով' },
      { image: pvArsenyanApartment04, title: 'Միջանցք', alt: 'Միջանցք՝ նախշավոր ապակե դռներով զգեստապահարանով, ընկույզի պանելին՝ դիմանկարի գծանկար, պատին՝ սև-սպիտակ լուսանկարներ, ներքևում՝ կաղապարված պանելներ' },
      { image: pvArsenyanApartment05, title: 'Հյուրասենյակ, խոհանոց և ճաշասենյակ', alt: 'Բաց հյուրասենյակ՝ օղակաձև ջահով և գծային լուսատուներով, սպիտակ բազմոց, մարմարե սեղան, բիոբուխարի և բնանկարով պաստառ, խորքում՝ սպիտակ խոհանոց կանաչ մարմարե պատով և կանաչ մարմարե ճաշասեղան' },
      { image: pvArsenyanApartment06, title: 'Հյուրասենյակ՝ վերևից', alt: 'Հյուրասենյակը վերևից․ սպիտակ բազմոց, կարմիր երակներով մարմարե խորանարդաձև սեղան՝ սիգարների տուփով, պատին՝ հեռուստացույց, ընկույզի պանել և բիոբուխարի' },
      { image: pvArsenyanApartment07, title: 'Բազկաթոռի անկյուն', alt: 'Հյուրասենյակի անկյուն՝ սպիտակ բուկլե բազկաթոռով, հատակի լամպով, դասական բնանկարով պաստառով, կաղապարներով և մուգ եղևնաձև մանրահատակով' },
      { image: pvArsenyanApartment08, title: 'Ճաշասեղանի աթոռներ', alt: 'Մոտիկից՝ փայտե շրջանակով փափուկ աթոռներ, կանաչ մարմարե սեղան և թափանցիկ վարագույրներ' },
    ],
    source: 'https://www.instagram.com/p/DcyiPfRiK_b/',
    sourceDate: '2026-09-02',
  },
  {
    slug: 'sayadyan-open-living',
    title: 'Բաց հյուրասենյակ և խոհանոց՝ պտուտակաձև աստիճանով',
    category: 'visualization',
    author: {
      name: 'Աստղիկ Սայադյան',
      nameLatin: 'Astghik Sayadyan',
      role: '«3Ds Max» դասընթացի շրջանավարտ',
    },
    course: '3Ds Max',
    courseSlug: '3ds-max',
    summary: 'Բաց հյուրասենյակի, խոհանոցի և ներքին այգու 3D վիզուալիզացիաներ։ Ավարտական պորտֆոլիո՝ «3Ds Max» դասընթացից։',
    views: [
      { image: pvSayadyanOpenLiving01, title: 'Հյուրասենյակ՝ պտուտակաձև աստիճանով', alt: 'Սպիտակ ցածր մոդուլային բազմոց և կլոր փայտե սեղան, խորքում՝ սպիտակ պտուտակաձև աստիճան և բույսեր, մեծ պատուհաններից երևում է կանաչ բնապատկեր' },
      { image: pvSayadyanOpenLiving02, title: 'Հյուրասենյակ՝ բուխարիով', alt: 'Հյուրասենյակ՝ քարե երեսպատմամբ պատի մեջ բուխարիով, սպիտակ բազմոցով, կլոր սուրճի սեղանով, պուֆով և երկու սև բազկաթոռով, հատակից առաստաղ պատուհաններից երևում են անտառապատ բլուրներ' },
      { image: pvSayadyanOpenLiving03, title: 'Բուխարու պատը', alt: 'Հյուրասենյակը՝ դեպի բուխարիով քարե պատը․ սպիտակ բազմոց և փայտե սեղան, երկու կողմում՝ մեծ պատուհաններ դեպի կանաչ բնապատկեր' },
      { image: pvSayadyanOpenLiving04, title: 'Պտուտակաձև աստիճան', alt: 'Սպիտակ պտուտակաձև աստիճան բարձրացված հարթակի վրա՝ արմավենիներով և բույսերով, ձախում՝ մեծ պատուհան' },
      { image: pvSayadyanOpenLiving05, title: 'Խոհանոցային կղզի', alt: 'Խոհանոց՝ կլորացված փայտե կղզով և երեք փայտե աթոռակով, վերևում՝ երկու գծային կախովի լուսատու, պատին՝ երկար հորիզոնական պատուհան' },
      { image: pvSayadyanOpenLiving06, title: 'Խոհանոց', alt: 'Խոհանոց՝ փայտե և չժանգոտվող պողպատե պահարաններով, ներկառուցված ջեռոցներով և լվացարանով, աջում՝ հորիզոնական պատուհան' },
      { image: pvSayadyanOpenLiving07, title: 'Ներքին այգի', alt: 'Ներքին այգի՝ արմավենիներով և բույսերով, երկու մուգ շագանակագույն բազկաթոռ և ձվաձև հատակի լամպ, խորքում՝ խոհանոցը' },
    ],
    source: 'https://www.instagram.com/p/DdJpOP8CJLc/',
    sourceDate: '2026-09-11',
  },
  {
    slug: 'sahakyan-apartment',
    title: 'Բնակարան՝ հյուրասենյակ, խոհանոց, ննջասենյակ և մանկական սենյակ',
    category: 'interior',
    author: {
      name: 'Քրիստինե Սահակյան',
      nameLatin: 'Kristine Sahakyan',
      role: 'Ուսանող',
    },
    course: 'Ինտերիեր դիզայն',
    courseSlug: 'interior-design',
    summary: 'Բնակարանի հյուրասենյակի, խոհանոցի, ննջասենյակի, մանկական սենյակի և լոգասենյակի վիզուալիզացիաներ՝ ուսանողի և դասընթացավարների 6-ամսյա համատեղ աշխատանքի արդյունքը։',
    views: [
      { image: pvSahakyanApartment01, title: 'Հյուրասենյակից դեպի խոհանոց', alt: 'Երկար տեսարան հյուրասենյակից դեպի ճաշասենյակ և մուգ խոհանոց՝ մարմարե պատով, առաջին պլանում՝ սպիտակ փափուկ բազմոց, ձիթենի և ապակե սեղան' },
      { image: pvSahakyanApartment02, title: 'Ճաշասենյակ', alt: 'Ճաշասենյակի գոտի՝ կլոր սեղանով, մուգ կանաչ փափուկ աթոռներով, սկավառակաձև կախովի լուսատուով, փայտե դարակաշարով և հեռուստացույցով' },
      { image: pvSahakyanApartment03, title: 'Ճաշասենյակ և խոհանոց', alt: 'Ճաշասենյակ և խոհանոց՝ մուգ վերին պահարաններով, փայտե ստորին պահարաններով և մարմարե պատով, առջևում՝ կլոր սեղան կանաչ աթոռներով' },
      { image: pvSahakyanApartment04, title: 'Խոհանոցի դետալ', alt: 'Խոհանոցի մոտիկ տեսարան՝ սև ծորակով, սև լվացարանով և մարմարե պատով ու աշխատանքային մակերեսով' },
      { image: pvSahakyanApartment05, title: 'Բազմոց', alt: 'Բեժ բազմոց ձիթապտղագույն բարձերով, ապակե սուրճի սեղան՝ սկուտեղով, խորքում՝ ձիթենի և թափանցիկ վարագույրներ' },
      { image: pvSahakyanApartment06, title: 'Ննջասենյակ', alt: 'Ննջասենյակ՝ մահճակալով, աղեղնաձև հատակի լամպով, դասական արձանի գլխով պաստառով, մուգ վարագույրներով և պատին՝ հեռուստացույցով' },
      { image: pvSahakyanApartment07, title: 'Զգեստապահարան ննջասենյակում', alt: 'Ննջասենյակի անկյուն՝ սև շերտավոր միջնապատի հետևում բաց զգեստապահարանով, կանաչ կաշվե բազկաթոռով և Դավթի արձանի գլխով պաստառով' },
      { image: pvSahakyanApartment08, title: 'Մանկական սենյակ', alt: 'Մանկական սենյակ՝ երկու մահճակալով, կախովի գրասեղանով և համակարգչով, ազատ ձևի լուսավորված հայելով, խաղալիքներով դարակներով և պղպջակաձև ջահով' },
      { image: pvSahakyanApartment09, title: 'Մանկական սենյակ՝ վերևից', alt: 'Մանկական սենյակը վերևից․ երկու փափուկ մահճակալ, նրանց միջև կլոր կոմոդ, պատին՝ կենդանիների գծային նկարազարդում, վերևում՝ պղպջակաձև ջահ' },
      { image: pvSahakyanApartment10, title: 'Գրասեղանի անկյուն', alt: 'Մանկական սենյակի գրասեղանի անկյուն՝ վարդագույն աթոռով, սեղանի լամպով և համակարգչով, շերտավոր պատով և թափանցիկ վարագույրներով' },
      { image: pvSahakyanApartment11, title: 'Լոգասենյակ', alt: 'Լոգասենյակ՝ ապակե ցնցուղախցիկով, լուսավորված փայտե պահարանի վրա մարմարե լվացարանով, փայտե պանելներով և բարձր հայելով' },
    ],
    source: 'https://www.instagram.com/p/Dc8z8vGCPHB/',
    sourceDate: '2026-09-06',
  },
  {
    slug: 'vardanyan-living-room',
    title: 'Հյուրասենյակ՝ մարմարե հեռուստապատով և բյուրեղյա ջահով',
    category: 'interior',
    author: {
      name: 'Սուսաննա Վարդանյան',
      nameLatin: 'Susanna Vardanyan',
      handle: '@susanna__vardanyaan',
      instagram: 'https://www.instagram.com/susanna__vardanyaan/',
      role: 'Ուսանողուհի',
    },
    course: '',
    summary: 'Հյուրասենյակի վիզուալիզացիաներ՝ մասնագիտական ճանապարհի առաջին լուրջ քայլը։',
    views: [
      { image: pvVardanyanLivingRoom01, title: 'Հյուրասենյակ', alt: 'Հյուրասենյակ՝ սպիտակ բազմոցով, ոսկեգույն շրջանակով աղյուսագույն թավշյա բազկաթոռով, երկու կլոր մարմարե սեղանով, բյուրեղյա ճյուղաձև ջահով և ոսկեգույն լուսային շերտերով կաղապարված պանելներով' },
      { image: pvVardanyanLivingRoom02, title: 'Հեռուստապատ և բուխարի', alt: 'Հյուրասենյակ՝ սպիտակ մարմարե հեռուստապատով և բիոբուխարիով, լուսավորված դարակներով, բյուրեղյա ջահով, թափանցիկ վարագույրներով և բաց փայտե հատակով' },
      { image: pvVardanyanLivingRoom03, title: 'Հեռուստապատը՝ դիմացից', alt: 'Դիմացից՝ մարմարե հեռուստապատը բիոբուխարիով, առջևում՝ երկու մարմարե սուրճի սեղան, վերևում՝ բյուրեղյա ջահը' },
      { image: pvVardanyanLivingRoom04, title: 'Նստելու գոտի', alt: 'Սպիտակ բազմոց և աղյուսագույն բազկաթոռներ մարմարե սեղանների շուրջ, պատին՝ ոսկեգույն ուղղահայաց լուսատուներ' },
      { image: pvVardanyanLivingRoom05, title: 'Հյուրասենյակ և խոհանոց', alt: 'Հյուրասենյակի անկյուն՝ բազմոցով և աղյուսագույն բազկաթոռով, խորքում՝ խոհանոց ներկառուցված ջեռոցներով' },
      { image: pvVardanyanLivingRoom06, title: 'Սեղանների դետալ', alt: 'Մոտիկից՝ ոսկեգույն հենակով կլոր մարմարե սեղաններ, ճյուղերով ապակե ծաղկաման և սպիտակ բազմոց' },
    ],
    source: 'https://www.instagram.com/p/DWRVsRziMjT/',
    sourceDate: '2026-03-24',
  },
  {
    slug: 'aleksanyan-khachatur-apartment',
    title: 'Բնակարան՝ կաղապարազարդ պատերով և պղնձագույն շեշտերով',
    category: 'interior',
    author: {
      name: 'Խաչատուր Ալեքսանյան',
      nameLatin: 'Khachatur Aleksanyan',
      role: '«Ինտերիեր դիզայն» դասընթացի շրջանավարտ',
    },
    course: 'Ինտերիեր դիզայն',
    courseSlug: 'interior-design',
    summary: 'Բնակարանի ինտերիերի նախագիծ՝ հյուրասենյակ-խոհանոց, երկու ննջասենյակ, միջանցք և մարմարե լոգասենյակ։ Ավարտական պորտֆոլիո՝ «Ինտերիեր դիզայն» դասընթացից։',
    views: [
      { image: pvAleksanyanKhachaturApartment01, title: 'Հյուրասենյակ-աշխատասենյակ', alt: 'Հեռուստացույցի պատ՝ բաց երանգի քարե պանելներով և երկու ուղղահայաց ոսկեգույն լուսատուով, ցածր կախովի պահարան, առջևում՝ սև ապակե մակերեսով և խցանանման հենարանով սեղան նոութբուքով, առաստաղին՝ գծային լուսատուներ' },
      { image: pvAleksanyanKhachaturApartment02, title: 'Ննջասենյակ', alt: 'Ննջասենյակ՝ մահճակալի գլխավերևում մուգ կանաչ ռելիեֆային պատի պանել, սպիտակ փափուկ մահճակալ, փայտե պատի հատված լուսավորված դարակներով, պատուհանի մոտ՝ աշխատանքային սեղան համակարգչով, «եղևնաձև» մանրահատակ' },
      { image: pvAleksanyanKhachaturApartment03, title: 'Հյուրասենյակ', alt: 'Մուգ մոխրագույն մոդուլային բազմոց, սև ապակե սուրճի սեղան և ճաշասեղան խցանանման հենարաններով, կլոր թիկնակով աթոռներ, սպիտակ կաղապարազարդ պատեր և «եղևնաձև» մանրահատակ' },
      { image: pvAleksanyanKhachaturApartment04, title: 'Խոհանոց և ճաշասեղան', alt: 'Սպիտակ դռներով խոհանոց՝ փայտե վերին խորշով, պղնձագույն կախովի լուսատուներ սև ապակե ճաշասեղանի վերևում, բաց և մուգ աթոռներ, սեղանին՝ նոութբուք և ծաղիկներ' },
      { image: pvAleksanyanKhachaturApartment05, title: 'Միջանցք', alt: 'Մուտքի միջանցք՝ սպիտակ երակներով մուգ մարմարե հատակ, մուգ փայտե զգեստապահարան և պատի երեսպատում, կախովի նստարան և դարակ լամպով, սպիտակ կաղապարազարդ պատեր, խորքում՝ սպիտակ դուռ' },
      { image: pvAleksanyanKhachaturApartment06, title: 'Հյուրասենյակ', alt: 'Լուսավոր հյուրասենյակ՝ մոխրագույն մոդուլային բազմոց, խցանանման հենարանով սեղան նոութբուքով, սպիտակ կաղապարազարդ պատեր, օդորակիչ, պատուհանի մոտ՝ պղնձագույն կախովի լուսատուներ, առաստաղին՝ գծային լուսատուներ' },
      { image: pvAleksanyanKhachaturApartment07, title: 'Աղջկա ննջասենյակ', alt: 'Ննջասենյակ՝ վարդագույն փափուկ գլխամասով մահճակալ կետավոր անկողնով, սպիտակ կոմոդ, սպիտակ դուռ, ոսկեգույն եզրերով ներկառուցված սպիտակ պահարաններ և սեղան՝ կոր փայտե աթոռով' },
      { image: pvAleksanyanKhachaturApartment08, title: 'Լոգասենյակ', alt: 'Լոգասենյակ՝ բորդո ծեփապատ պատ սև ցնցուղային վահանակով, ապակե միջնորմ, մարմարապատ պատ՝ կախովի զուգարանակոնքով և վերևում փայտե պահարանով, կոր փայտե լվացարանի պահարան մարմարե մակերեսով, օվալաձև հայելի և բաց փայտե դարակներ' },
      { image: pvAleksanyanKhachaturApartment09, title: 'Ննջասենյակ՝ աշխատանքային անկյունով', alt: 'Սպիտակ ներկառուցված զգեստապահարան հայելապատ դռնով, գրքերով բաց դարակներ, մարմարանման մակերեսով գրասեղան և սպիտակ աթոռ, հատակի լամպ, «եղևնաձև» մանրահատակ' },
      { image: pvAleksanyanKhachaturApartment10, title: 'Լոգասենյակ', alt: 'Վերևից տեսք՝ մարմարե լվացարան կլոր խեցիով և ոսկեգույն ծորակով, կոր փայտե պահարան, կախովի բիդե, ոսկեգույն շրջանակով օվալաձև հայելի, բորդո պատ' },
    ],
    source: 'https://www.instagram.com/p/DbVwJQ4CMCW/',
    sourceDate: '2026-07-28',
  },
  {
    slug: 'kostanyan-perchuhi-living-kitchen',
    title: 'Հյուրասենյակ, կանաչ խոհանոց և հանգստի գոտի',
    category: 'visualization',
    author: {
      name: 'Պերճուհի Կոստանյան',
      nameLatin: 'Perchuhi Kostanyan',
      role: '«3Ds Max» դասընթացի շրջանավարտ',
    },
    course: '3Ds Max',
    courseSlug: '3ds-max',
    summary: 'Բաց հատակագծով հյուրասենյակ-խոհանոցի և պրոյեկտորով հանգստի գոտու վիզուալիզացիաներ։ Ավարտական պորտֆոլիո՝ «3Ds Max» դասընթացից։',
    views: [
      { image: pvKostanyanPerchuhiLivingKitchen01, title: 'Հյուրասենյակ', alt: 'Մոխրագույն մոդուլային բազմոց՝ ուղղված պատին ամրացված հեռուստացույցին, ցածր փայտե պահարան, փայտե սկավառակներից կախովի ջահ, մեծ պատի ժամացույց, բարձր տնային բույս' },
      { image: pvKostanyanPerchuhiLivingKitchen02, title: 'Հյուրասենյակ-խոհանոց', alt: 'Բաց տարածք՝ առջևում մոխրագույն մոդուլային բազմոց և կլոր սեղանիկներ, խորքում ճաշասեղան փայտե աթոռներով, կանաչ-սպիտակ խոհանոց, ձախում՝ մուգ փայտե բարձր պահարաններ, սպիտակ դաշնամուր' },
      { image: pvKostanyanPerchuhiLivingKitchen03, title: 'Հյուրասենյակ-խոհանոց', alt: 'Այլ տեսանկյուն՝ մուգ փայտե բարձր պահարաններ և լուսավորված ապակե ցուցապահարան, մոխրագույն բազմոց, խոհանոցային կղզի՝ բարձր աթոռներով, կանաչ խոհանոց' },
      { image: pvKostanyanPerchuhiLivingKitchen04, title: 'Հյուրասենյակ-խոհանոց', alt: 'Մոխրագույն բազմոց, ճաշասեղան և բարձր աթոռներ, կանաչ խոհանոց, մեծ պատուհանի մոտ՝ սպիտակ դաշնամուր և ձիթապտղագույն հռոմեական վարագույրներ' },
      { image: pvKostanyanPerchuhiLivingKitchen05, title: 'Հանգստի գոտի', alt: 'Առաստաղից կախված պրոյեկտոր, մեծ պատուհան ձիթապտղագույն հռոմեական վարագույրով, բեժ ցածր բազմոց, քարանման օվալաձև սեղան, փափուկ պուֆ, փայտե գրասեղան աթոռով, արմավենի' },
      { image: pvKostanyanPerchuhiLivingKitchen06, title: 'Խոհանոցային կղզի', alt: 'Կանաչ խոհանոցային կղզի՝ ներկառուցված գինու սառնարանով, կանաչ նստատեղով երկու փայտե աթոռ, խորքում՝ հյուրասենյակ հեռուստացույցով, պատի ժամացույց, սպիտակ դաշնամուր' },
      { image: pvKostanyanPerchuhiLivingKitchen07, title: 'Հանգստի գոտի', alt: 'Պրոյեկտորով հանգստի սենյակ՝ պատուհանից բացվող կանաչ բնապատկեր, բեժ բազմոց, ցածր օվալաձև սեղան, գրասեղան, փափուկ պուֆ' },
      { image: pvKostanyanPerchuhiLivingKitchen08, title: 'Հանգստի գոտի', alt: 'Այլ տեսանկյուն՝ երկու պատուհան ձիթապտղագույն վարագույրներով, շագանակագույն և մանուշակագույն փափուկ պուֆեր, լամպով գրասեղան, բեժ բազմոց' },
    ],
    source: 'https://www.instagram.com/p/Da48yE0iHcE/',
    sourceDate: '2026-07-17',
  },
  {
    slug: 'mkhitaryan-mariam-living-dining',
    title: 'Հյուրասենյակ և ճաշասենյակ՝ քարե տեքստուրայով և կախովի աստիճանով',
    category: 'visualization',
    author: {
      name: 'Մարիամ Մխիթարյան',
      nameLatin: 'Mariam Mkhitaryan',
      role: '«3Ds Max» դասընթացի շրջանավարտ',
    },
    course: '3Ds Max',
    courseSlug: '3ds-max',
    summary: 'Հյուրասենյակի, բուխարու անկյունի և ճաշասենյակի վիզուալիզացիաներ։ Ավարտական պորտֆոլիո՝ «3Ds Max» դասընթացից։',
    views: [
      { image: pvMkhitaryanMariamLivingDining01, title: 'Հյուրասենյակ', alt: 'Բեժ մոդուլային բազմոց բաց գորգի վրա, հեռուստացույցի պատ՝ վերևում բնական քարի կոպիտ տեքստուրա, կողքին փայտե շերտավոր պանել, մեծ պատուհանից երևում են քաղաքի բարձրահարկերը, աջում՝ աստիճանի ապակե բազրիք' },
      { image: pvMkhitaryanMariamLivingDining02, title: 'Հեռուստացույցի պատ', alt: 'Մոտիկից՝ լուսավորված քարե տեքստուրայով պատ, մոխրագույն պանել հեռուստացույցով, ցածր մոխրագույն պահարան, մարմարե սուրճի սեղան ծաղկած ճյուղերով ծաղկամանով, փայտե շերտավոր պանել' },
      { image: pvMkhitaryanMariamLivingDining03, title: 'Ճաշասենյակ', alt: 'Երկար ճաշասեղան՝ բաց մակերեսով և սև հենարանով, կանաչ նստատեղով փայտե աթոռներ, ալիքաձև ոսկեգույն-սպիտակ կախովի լուսատու, փայտապատ պատ, թափանցիկ վարագույրներ' },
      { image: pvMkhitaryanMariamLivingDining04, title: 'Ճաշասենյակ', alt: 'Նույն ճաշասենյակը մուգ մոխրագույն վարագույրներով և ավելի մուգ հատակով, սեղանի կենտրոնում՝ դեկորատիվ ծառ' },
      { image: pvMkhitaryanMariamLivingDining05, title: 'Բուխարի', alt: 'Մոխրագույն բետոնանման բուխարու պատ՝ սև փայտի վառարանով, վառելափայտով լի խորշ, բեժ բազմոցներ և կլոր թիկնակով բազկաթոռ' },
      { image: pvMkhitaryanMariamLivingDining06, title: 'Աստիճան և հյուրասենյակ', alt: 'Կախովի աստիճան՝ լուսավորված աստիճաններով և ապակե բազրիքով, բեժ բազմոց կողային սեղանիկով, քարե տեքստուրայով պատ, աստիճանի տակ՝ գրադարակ' },
      { image: pvMkhitaryanMariamLivingDining07, title: 'Հյուրասենյակ', alt: 'Վերևից տեսք՝ բեժ մոդուլային բազմոց, սպիտակ բազկաթոռ, քարե տեքստուրայով և փայտե շերտերով հեռուստացույցի պատ, ձիթենու ծառ տակառում, կաղնու մանրահատակ' },
    ],
    source: 'https://www.instagram.com/p/DaioAeoCN_6/',
    sourceDate: '2026-07-08',
  },
  {
    slug: 'abovyan-hasmik-apartment',
    title: 'Բնակարան՝ ընկուզենու երանգներով և մարմարե կղզիով խոհանոցով',
    category: 'visualization',
    author: {
      name: 'Հասմիկ Աբովյան',
      nameLatin: 'Hasmik Abovyan',
      role: '«3Ds Max» դասընթացի շրջանավարտ',
    },
    course: '3Ds Max',
    courseSlug: '3ds-max',
    summary: 'Բնակարանի հյուրասենյակի, բաց խոհանոց-ճաշասենյակի և ննջասենյակի վիզուալիզացիաներ։ Ավարտական պորտֆոլիո՝ «3Ds Max» դասընթացից։',
    views: [
      { image: pvAbovyanHasmikApartment01, title: 'Հյուրասենյակ', alt: 'Կրեմագույն փափուկ մոդուլային բազմոց, կամարաձև պատուհաններ սպիտակեղենի վարագույրներով, հեռուստացույցի պատ՝ բաց փայտի շերտավոր պանելով և ընկուզենու բարձր դարակաշարով' },
      { image: pvAbovyanHasmikApartment02, title: 'Խոհանոց և ճաշասենյակ', alt: 'Ընկուզենու փայտից խոհանոցային խորշեր՝ լուսավորված դարակներով և մարմարե պանելով, մոխրագույն մարմարե կղզի սև աթոռներով, կլոր սև ճաշասեղան եղեգնահյուս թիկնակով աթոռներով, կամարաձև սև կախովի լուսատու' },
      { image: pvAbovyanHasmikApartment03, title: 'Խոհանոցային կղզի', alt: 'Տեսք մարմարե կղզու երկայնքով դեպի ճաշասեղանը և կամարաձև դռան բացվածքը, պատին՝ գիպսե ռելիեֆային կտավ, առջևում՝ բազմոց' },
      { image: pvAbovyanHasmikApartment04, title: 'Ճաշասենյակ', alt: 'Կլոր սև սեղան, եղեգնահյուս և փայտե աթոռներ, ընկուզենու շերտավոր կոմոդ, ռելիեֆային աբստրակտ կտավ, կամարաձև պատուհան' },
      { image: pvAbovyanHasmikApartment05, title: 'Խոհանոց', alt: 'Մարմարե կղզի երեք սև բարձր աթոռով, ընկուզենու պահարաններ, ներկառուցված սուրճի մեքենա, բաց դարակներ բաժակներով' },
      { image: pvAbovyanHasmikApartment06, title: 'Ճաշասեղան', alt: 'Վերևից տեսք՝ կլոր սև սեղան գրքերով, ծաղկամանով և ձիթենու ճյուղերով, եղեգնահյուս աթոռներ, արևի լույս' },
      { image: pvAbovyanHasmikApartment07, title: 'Ննջասենյակ', alt: 'Կրեմագույն փափուկ մահճակալ հյուսված ծածկոցներով, ընկուզենու պատի պանել՝ վանդակավոր հատվածով, աշխատանքային խորշ բաց դարակներով, կախովի լամպ, պաստառ-կտավ' },
      { image: pvAbovyanHasmikApartment08, title: 'Ննջասենյակ', alt: 'Այլ տեսանկյուն՝ ընկուզենու և վանդակավոր պանել, կախովի լամպ, պաստառ-կտավ, դարակներ բույսով, կրեմագույն մահճակալ' },
      { image: pvAbovyanHasmikApartment09, title: 'Ննջասենյակ', alt: 'Ճակատային տեսք՝ ընկուզենու պանել վանդակավոր հատվածով, երկու կախովի լամպ, պաստառ-կտավ, մոխրագույն ծածկոցով մահճակալ' },
    ],
    source: 'https://www.instagram.com/p/DaSbG-BCEUr/',
    sourceDate: '2026-07-02',
  },
  {
    slug: 'simonyan-kristine-apartment',
    title: 'Բնակարան՝ սպիտակ կաղապարազարդ պատերով և կապույտ բազմոցով',
    category: 'interior',
    author: {
      name: 'Քրիստինե Սիմոնյան',
      nameLatin: 'Kristine Simonyan',
      role: '«Ինտերիեր դիզայն» դասընթացի շրջանավարտ',
    },
    course: 'Ինտերիեր դիզայն',
    courseSlug: 'interior-design',
    summary: 'Բնակարանի հյուրասենյակ-խոհանոցի, ննջասենյակների, մանկական սենյակի, լոգասենյակների և միջանցքի վիզուալիզացիաներ։ Ավարտական պորտֆոլիո՝ «Ինտերիեր դիզայն» դասընթացից։',
    views: [
      { image: pvSimonyanKristineApartment01, title: 'Մանկական սենյակ', alt: 'Սպիտակ կաղապարազարդ պատեր, մոխրագույն ալիքաձև փափուկ գլխամասով մահճակալ-բազմոց, սպիտակ գրասեղան աթոռով, երկրաչափական կտավ, կլոր գորգ, գծային լուսատու' },
      { image: pvSimonyanKristineApartment02, title: 'Հյուրասենյակ-խոհանոց', alt: 'Մուգ ընկուզենու օրգանական ձևի սուրճի սեղան սպիտակ գորգի վրա, կապույտ թավշյա բազմոց, սպիտակ դասական դռներով խոհանոց՝ բարձր աթոռներով բար-սեղանով, կախովի լուսատուներ' },
      { image: pvSimonyanKristineApartment03, title: 'Խոհանոց', alt: 'Սպիտակ դասական դռներով պահարաններ, մարմարանման պատ՝ ներքևից LED լուսավորությամբ, ջրվեժաձև բար-սեղան սպիտակ բարձր աթոռներով, ոսկեգույն կախովի լուսատուներ' },
      { image: pvSimonyanKristineApartment04, title: 'Լոգասենյակ', alt: 'Վերևից տեսք՝ ազատ կանգնող օվալաձև լոգարան, երկու ուղղանկյուն սպիտակ լվացարան շերտավոր փայտե պահարանների վրա, մուգ թերթաքարանման հատակ, հայելի' },
      { image: pvSimonyanKristineApartment05, title: 'Լոգասենյակ', alt: 'Բեժ խոշոր սալիկներ, ազատ կանգնող լոգարան, մուգ պատ՝ լուսավորված հայելիով, երկտեղանի լվացարան մուգ պահարանի վրա, սև դուռ' },
      { image: pvSimonyanKristineApartment06, title: 'Հյուրասենյակ', alt: 'Հեռուստացույցի պատ՝ սպիտակ մարմարանման պանելներ սև ուղղահայաց շերտերով, ներկառուցված բուխարի, կաղապարազարդ շրջանակներ, ընկուզենու սուրճի սեղան, կապույտ բազմոց, սև դուռ' },
      { image: pvSimonyanKristineApartment07, title: 'Հյուրասենյակ', alt: 'Կողային տեսք՝ սպիտակ շերտավոր պահարան բուխարիով, մարմարանման պատ հեռուստացույցով, թափանցիկ վարագույրներ, ընկուզենու սեղան' },
      { image: pvSimonyanKristineApartment08, title: 'Հյուրասենյակ', alt: 'Վերևից տեսք՝ կապույտ բազմոց և բազկաթոռ, ընկուզենու սուրճի սեղան, սպիտակ բար-սեղան, կապույտ կիսալուսնով աբստրակտ կտավ, պատուհան թափանցիկ վարագույրներով' },
      { image: pvSimonyanKristineApartment09, title: 'Հյուրասենյակ', alt: 'Կապույտ բազմոց կաղապարազարդ պատի մոտ, կապույտ աբստրակտ կտավ, ընկուզենու օվալաձև սեղան, ձախում՝ բար-սեղան բարձր աթոռներով' },
      { image: pvSimonyanKristineApartment10, title: 'Ննջասենյակ', alt: 'Կաղապարազարդ պատին ամրացված հեռուստացույց, սպիտակ մակերեսով կախովի պահարան, մոխրագույն ծածկոցով մահճակալ' },
    ],
    source: 'https://www.instagram.com/p/DaC56UvCFuP/',
    sourceDate: '2026-06-26',
  },
  {
    slug: 'tumasyan-ani-apartment',
    title: 'Բնակարան՝ բաց փայտի, կանաչ մարմարի և ապակե բլոկների համադրությամբ',
    category: 'interior',
    author: {
      name: 'Անի Թումասյան',
      nameLatin: 'Ani Tumasyan',
      role: '«Ինտերիեր դիզայն» դասընթացի շրջանավարտ',
    },
    course: 'Ինտերիեր դիզայն',
    courseSlug: 'interior-design',
    summary: 'Բնակարանի հյուրասենյակի, ճաշի անկյունի, մուտքի, ննջասենյակի, պատանու սենյակի և լոգասենյակի վիզուալիզացիաներ։ Ավարտական պորտֆոլիո՝ «Ինտերիեր դիզայն» դասընթացից։',
    views: [
      { image: pvTumasyanAniApartment01, title: 'Հյուրասենյակ', alt: 'Կրեմագույն կոր բուկլե բազմոց, շերտավոր փայտե կլոր սուրճի սեղան, բաց փայտի կամարաձև պատի խորշեր, ապակե բլոկներից միջնորմ, կախովի դարակներ բույսերով, առաստաղին՝ գծային լույս' },
      { image: pvTumasyanAniApartment02, title: 'Ննջասենյակ', alt: 'Մահճակալի հետևում լուսավորված սպիտակ գիպսե պանել՝ արևաճառագայթային ռելիեֆով, փայտե պատի երեսպատում, բեժ փափուկ մահճակալ՝ ձիթապտղականաչ ծածկոցով, պատի լուսատուներ' },
      { image: pvTumasyanAniApartment03, title: 'Մուտք', alt: 'Փայտե երեսպատում «եղևնաձև» նախշով և կլոր սև բռնակով դռներով պահարան, սև լուսավորված դարակներ, կամարաձև հայելի, կանաչ մարմարի վրա կլոր լուսատուներ, կախովի նստարան' },
      { image: pvTumasyanAniApartment04, title: 'Ննջասենյակ', alt: 'Պատին՝ հեռուստացույց փայտե և սև ցածր պահարանի վերևում, հայելու մեջ արտացոլված ռելիեֆային պանել, ձիթապտղականաչ վարագույրներ, սև դարակաշար, մուգ արձանիկ' },
      { image: pvTumasyanAniApartment05, title: 'Լոգասենյակ', alt: 'Տրավերտինանման պատեր, ներկառուցված լոգարան ոսկեգույն ծորակներով, տաքացվող սրբիչակալ, կանաչ մարմարե կախովի լվացարան, կլոր հայելիով խորշ, փայտե պանել' },
      { image: pvTumasyanAniApartment06, title: 'Ննջասենյակ', alt: 'Ընդհանուր տեսք՝ ռելիեֆային լուսավոր պանել, մահճակալ, «եղևնաձև» նախշով փայտե պահարան, հեռուստացույց ցածր պահարանի վրա, առաստաղին՝ գծային լույս' },
      { image: pvTumasyanAniApartment07, title: 'Մուտք', alt: 'Մուտքի դուռ, սև կախիչներ, կանաչ մարմարե շերտ երեք կլոր լուսատուով, կախովի նստարան և սև դարակ, LED եզրով կամարաձև հայելի' },
      { image: pvTumasyanAniApartment08, title: 'Ճաշի անկյուն', alt: 'Փոքր սեղան շերտավոր հենարանով, կանաչ փափուկ աթոռներ, սև գնդաձև կախովի լուսատու, «եղևնաձև» նախշով փայտե պատ, ապակե բլոկներ, խոհանոցային պահարաններ' },
      { image: pvTumasyanAniApartment09, title: 'Պատանու սենյակ', alt: 'Բորդո պատ կլոր գիպսե ռելիեֆով, զգեստապահարանին՝ սև-սպիտակ սամուրայի պատկեր, սպիտակ գրասեղան բուկլե աթոռով, սև շրջանակով մահճակալ, գծային լուսատուներ' },
      { image: pvTumasyanAniApartment10, title: 'Ննջասենյակ', alt: 'Պատուհան ձիթապտղականաչ վարագույրներով, մահճակալ կանաչ ծածկոցով, լուսավոր ռելիեֆային պանել, պատին՝ հեռուստացույց' },
    ],
    source: 'https://www.instagram.com/p/DZr29DwiKCt/',
    sourceDate: '2026-06-17',
  },
  {
    slug: 'martirosyan-meline-apartment',
    title: 'Բնակարան՝ ձիթապտղականաչ և բորդո գույներով, շախմատաձև նախշերով',
    category: 'interior',
    author: {
      name: 'Մելինե Մարտիրոսյան',
      nameLatin: 'Meline Martirosyan',
      role: '«Ինտերիեր դիզայն» դասընթացի շրջանավարտ',
    },
    course: 'Ինտերիեր դիզայն',
    courseSlug: 'interior-design',
    summary: 'Բնակարանի հյուրասենյակ-ճաշասենյակի, խոհանոցի, ննջասենյակի և լոգասենյակի վիզուալիզացիաներ։ Ավարտական պորտֆոլիո՝ «Ինտերիեր դիզայն» դասընթացից։',
    views: [
      { image: pvMartirosyanMelineApartment01, title: 'Ննջասենյակ՝ մանրամաս', alt: 'Ձիթապտղականաչ փափուկ գլխամաս, կարմիր-սպիտակ շախմատաձև ծածկոց, նարնջագույն բարձ, կարմիր կողային սեղանիկ, փայտե վանդակավոր պանել, կերամիկական կախովի լուսատու, շրջանակված աբստրակտ գրաֆիկա' },
      { image: pvMartirosyanMelineApartment02, title: 'Հյուրասենյակ-ճաշասենյակ', alt: 'Ձիթապտղականաչ կոր բազմոց, քանդակային ցածր սեղան, կլոր սև ճաշասեղան խողովակաձև մետաղե աթոռներով, թղթե գնդաձև լուսատու, արմատափայտի նախշով պատեր, լուսավորված դարակներ մարմարե ֆոնով' },
      { image: pvMartirosyanMelineApartment03, title: 'Խոհանոց', alt: 'Մուգ ընկուզենու բարձր պահարաններ և բեժ վերին պահարաններ, կանաչ մակերես, սյունանման քանդակային բար-սեղան բորդո աթոռներով, ութանկյուն և կետավոր նախշով սալիկապատ հատակ' },
      { image: pvMartirosyanMelineApartment04, title: 'Ճաշի անկյուն', alt: 'Կլոր սև սեղան խողովակաձև աթոռներով, պատուհանի մոտ թղթե գնդաձև լուսատու, մարմարե ֆոնով ներկառուցված դարակներ, ձիթապտղականաչ բազմոց' },
      { image: pvMartirosyanMelineApartment05, title: 'Խոհանոց', alt: 'Ընկուզենու և բեժ պահարաններ, ապակե լամպերով գծային կախովի լուսատու, քանդակային հենարանով բար-սեղան, բորդո բարձր աթոռներ, ներկառուցված սև ջեռոցներ' },
      { image: pvMartirosyanMelineApartment06, title: 'Հյուրասենյակ', alt: 'Սպիտակ ռելիեֆային սալիկներով պատ հեռուստացույցով, մուգ կարմիր ցածր պահարան, սպիտակ քանդակային սեղան, կլոր ճաշասեղան խողովակաձև աթոռներով, թղթե լուսատու, դեղին կտավ' },
      { image: pvMartirosyanMelineApartment07, title: 'Ննջասենյակ', alt: 'Ճակատային տեսք՝ ձիթապտղականաչ մահճակալ շախմատաձև ծածկոցով, նարնջա-կարմիր բազմաթև ջահ, երկու շրջանակված գծանկար, գծավոր պաստառ, փայտե վանդակավոր պանելներ' },
      { image: pvMartirosyanMelineApartment08, title: 'Ննջասենյակ', alt: 'Թեք տեսանկյուն՝ մահճակալ, կամարաձև հայելիով հարդարանքի սեղան, նախշավոր պուֆ, գծավոր պաստառ, վարագույրներ' },
      { image: pvMartirosyanMelineApartment09, title: 'Ննջասենյակ', alt: 'Պատուհանով ննջասենյակ, ձիթապտղականաչ մահճակալ, կարմիր դաշնամուր, գրադարակներ, նարնջագույն ջահ' },
      { image: pvMartirosyanMelineApartment10, title: 'Հարդարանքի անկյուն', alt: 'Կամարաձև հայելի մուգ փայտե սեղանի վրա, կանաչ նախշավոր պուֆ, շախմատաձև ծածկոց, գծավոր պաստառ և վարագույր' },
    ],
    source: 'https://www.instagram.com/p/DZfcVG4iEZ3/',
    sourceDate: '2026-06-12',
  },
  {
    slug: 'aleksanyan-shushan-house',
    title: 'Տուն՝ փայտե աստիճանով, սև խոհանոցով և երկու ննջասենյակով',
    category: 'visualization',
    author: {
      name: 'Շուշան Ալեքսանյան',
      nameLatin: 'Shushan Aleksanyan',
      role: '«3Ds Max» դասընթացի շրջանավարտ',
    },
    course: '3Ds Max',
    courseSlug: '3ds-max',
    summary: 'Տան հյուրասենյակ-ճաշասենյակի, խոհանոցի և երկու ննջասենյակի վիզուալիզացիաներ։ Ավարտական պորտֆոլիո՝ «3Ds Max» դասընթացից։',
    views: [
      { image: pvAleksanyanShushanHouse01, title: 'Հյուրասենյակ', alt: 'Բարձր առաստաղով հյուրասենյակ՝ մեծ կրեմագույն մոդուլային բազմոց, մուգ սուրճի սեղաններ, բաց փայտե աստիճան, շերտավոր ապակե միջնորմ, աղեղնաձև հատակի լամպ, օղակաձև կախովի լուսատու, խորքում՝ ճաշասեղան' },
      { image: pvAleksanyanShushanHouse02, title: 'Ննջասենյակ', alt: 'Ննջասենյակ՝ մուգ ընկուզենու վանդակաձև պատի երեսպատում, մոխրագույն փափուկ մահճակալ ձիթապտղականաչ ծածկոցով, սպիտակ ռելիեֆային կտավ, կողային լամպ, առաստաղին՝ գծային լույս' },
      { image: pvAleksanyanShushanHouse03, title: 'Երկրորդ ննջասենյակ', alt: 'Բեժ փափուկ պանելներով պատ փայտե շերտերով, վանդակավոր ծածկոցով մահճակալ, վարագույրներ, կլոր կողային սեղանիկ, ներքևի ձախ անկյունում՝ սև ուղղանկյուն (մուգ կահույք կամ ռենդերի արտեֆակտ)' },
      { image: pvAleksanyanShushanHouse04, title: 'Երկրորդ ննջասենյակ', alt: 'Ճակատային տեսք՝ բեժ փափուկ պանելներով պատ, շերտավոր փայտե պանել, երկու կլոր կողային սեղանիկ, վանդակավոր ծածկոց' },
      { image: pvAleksanyanShushanHouse05, title: 'Խոհանոց', alt: 'Սև փայլատ պահարաններ և կղզի, տրավերտինե պատ, կղզու շարունակությունը՝ ճաշասեղան սև բարձր աթոռներով, առաստաղի կետային լուսատուներ' },
      { image: pvAleksanyanShushanHouse06, title: 'Ճաշասենյակ', alt: 'Երկար մուգ սեղան ոսկեգույն ոտքերով մոխրագույն փափուկ աթոռներով, կոր երեսպատմամբ սյուն, մուգ փայտե աստիճան, շերտավոր ապակե միջնորմ, խորքում՝ մուտք' },
      { image: pvAleksanyanShushanHouse07, title: 'Հյուրասենյակ-ճաշասենյակ', alt: 'Ընդհանուր տեսք՝ երկար ճաշասեղան, աղեղնաձև հատակի լամպ, կրեմագույն բազմոց, հեռուստացույցի պատ, փայտե աստիճան' },
      { image: pvAleksanyanShushanHouse08, title: 'Հյուրասենյակ-ճաշասենյակ', alt: 'Տեսք աստիճանի կողմից՝ ճաշասեղան, հյուրասենյակ, այգի նայող պատուհան, փայտե աստիճանի հարթակ' },
    ],
    source: 'https://www.instagram.com/p/DZcmbUeiK5J/',
    sourceDate: '2026-06-11',
  },
  {
    slug: 'mariam-aslanyan-open-plan-living',
    title: 'Բաց պլանավորմամբ հյուրասենյակ, խոհանոց և ճաշասենյակ՝ բաց երանգներով',
    category: 'visualization',
    author: {
      name: 'Մարիամ Ասլանյան',
      nameLatin: 'Mariam Aslanyan',
      role: 'Ուսանողուհի',
    },
    course: '3D MAX and Corona Renderer',
    courseSlug: '3ds-max',
    summary: 'Բաց պլանավորմամբ հյուրասենյակի, խոհանոցի և ճաշասենյակի վիզուալիզացիաներ։ Ստեղծվել է «3D MAX and Corona Renderer» դասընթացի ընթացքում։',
    views: [
      { image: pvMariamAslanyanOpenPlanLiving01, title: 'Հյուրասենյակ', alt: 'Բաց բեժ բազմոց, օղակաձև կախովի ջահ և սև շրջանակով ապակե միջնապատ, որի հետևում երևում է խոհանոցը' },
      { image: pvMariamAslanyanOpenPlanLiving02, title: 'Հյուրասենյակի TV գոտի', alt: 'TV պատ՝ ցածր պահարանով և պատից կախված աշխատանքային սեղանով, վերևում՝ օղակաձև ջահ, աջում՝ դեկորատիվ ծառ սպիտակ ծաղկամանում' },
      { image: pvMariamAslanyanOpenPlanLiving03, title: 'Խոհանոց և ճաշասենյակ', alt: 'Փայտե և սպիտակ ճակատներով գծային խոհանոց, կլոր ճաշասեղան մուգ փայտե ոտքերով աթոռներով և սև շրջանակով ապակե միջնապատ' },
      { image: pvMariamAslanyanOpenPlanLiving04, title: 'Ճաշասեղան', alt: 'Կլոր ճաշասեղան մոխրագույն փափուկ նստատեղերով աթոռներով, հետևում՝ սպիտակ և փայտե ներկառուցված խոհանոց' },
    ],
    source: 'https://www.instagram.com/p/DMFKpcaBT-X/',
    sourceDate: '2025-07-14',
  },
  {
    slug: 'nara-danielyan-apartment',
    title: 'Բնակարանի ինտերիեր՝ մոխրագույնի, փայտի և մարմարի համադրությամբ',
    category: 'visualization',
    author: {
      name: 'Նառա Դանիելյան',
      nameLatin: 'Nara Danielyan',
      role: 'Ուսանող',
    },
    course: '',
    summary: 'Հյուրասենյակի, խոհանոց-ճաշասենյակի, նախասենյակի և ննջասենյակի վիզուալիզացիաներ։ Ստեղծվել է մեզ մոտ ուսման ընթացքում։',
    views: [
      { image: pvNaraDanielyanApartment01, title: 'Հյուրասենյակ', alt: 'Հյուրասենյակի TV պատ՝ բաց մոխրագույն և փայտե պահարաններով, բաց դարակներով և առաստաղի գծային լուսատուներով' },
      { image: pvNaraDanielyanApartment02, title: 'Խոհանոց և ճաշասենյակ', alt: 'Սպիտակ մարմարե ճաշասեղան մոխրագույն փափուկ աթոռներով, հետևում՝ փայտե պատ-պահարաններով խոհանոց, սև գլանաձև օդաքարշ և մարմարե սյուն' },
      { image: pvNaraDanielyanApartment03, title: 'Ճաշասենյակ և հյուրասենյակ', alt: 'Մարմարե ճաշասեղան մուգ աթոռներով, հետևում՝ մոխրագույն բազմոցով հյուրասենյակ, կլոր դեկորատիվ պանո և մարմարե սյուն' },
      { image: pvNaraDanielyanApartment04, title: 'Հյուրասենյակ', alt: 'Մոխրագույն բազմոց և կլոր սեղանիկներ, պատին՝ կլոր նարնջագույն-սպիտակ պանո, ձախում՝ փայտե երեսպատմամբ թաքնված դուռ' },
      { image: pvNaraDanielyanApartment05, title: 'Նախասենյակ', alt: 'Նախասենյակ՝ փափուկ պուֆ, պատից կախված փայտե կոնսոլ և փայտե շերտավոր սյուն, հետևում՝ ճաշասենյակը' },
      { image: pvNaraDanielyanApartment06, title: 'Խոհանոց', alt: 'Խոհանոց՝ փայտե բարձր պահարաններ ներկառուցված ջեռոցով, մարմարե պատ, սև գլանաձև օդաքարշ և մոխրագույն ստորին պահարաններ' },
      { image: pvNaraDanielyanApartment07, title: 'Ննջասենյակ', alt: 'Ննջասենյակի TV պատ՝ սպիտակ ալիքաձև 3D պանելով, մուգ փայտե կախովի պահարան և աշխատասեղան' },
      { image: pvNaraDanielyanApartment08, title: 'Ննջասենյակ', alt: 'Ննջասենյակ՝ մոխրագույն մահճակալ, մուգ վարագույրներ մեծ պատուհանի մոտ, փայտե աշխատասեղան և պատին ամրացված հեռուստացույց' },
      { image: pvNaraDanielyanApartment09, title: 'Ննջասենյակ', alt: 'Մահճակալի պատ՝ սև մարմար, մոխրագույն փափուկ պանելներ և երկու կողմերում կախովի լամպեր' },
    ],
    source: 'https://www.instagram.com/p/DMCeri8KBb3/',
    sourceDate: '2025-07-13',
  },
  {
    slug: 'karolina-sargsyan-open-plan-living-kitchen',
    title: 'Բաց պլանավորմամբ հյուրասենյակ-խոհանոց՝ մոխրագույն և փայտե երանգներով',
    category: 'visualization',
    author: {
      name: 'Կառոլինա Սարգսյան',
      nameLatin: 'Karolina Sargsyan',
      role: 'Ուսանողուհի',
    },
    course: '3D MAX and Corona Renderer',
    courseSlug: '3ds-max',
    summary: 'Բաց պլանավորմամբ հյուրասենյակի և խոհանոցի վիզուալիզացիաներ։ Ստեղծվել է «3D MAX and Corona Renderer» դասընթացի ընթացքում։',
    views: [
      { image: pvKarolinaSargsyanOpenPlanLivingKitchen01, title: 'Ճաշասենյակ և հյուրասենյակ', alt: 'Կլոր կաղնեփայտե ճաշասեղան մոխրագույն աթոռներով, հետևում՝ փայտե TV պատով հյուրասենյակ և մեծ ապակե դռներ՝ կանաչ ծառերի տեսարանով' },
      { image: pvKarolinaSargsyanOpenPlanLivingKitchen02, title: 'Հյուրասենյակի TV պատ', alt: 'TV պատ՝ փայտե պանելներով և բաց քարե երեսպատմամբ, ցածր դարակ գրքերով, առջևում՝ բազմոցի թիկնակ' },
      { image: pvKarolinaSargsyanOpenPlanLivingKitchen03, title: 'Հյուրասենյակ', alt: 'Բաց մոխրագույն անկյունային բազմոց՝ բարձերով և փափուկ ծածկոցներով, առջևում՝ երկու օվալաձև սեղանիկ, փայտե հատակ' },
      { image: pvKarolinaSargsyanOpenPlanLivingKitchen04, title: 'Խոհանոց', alt: 'Մոխրագույն անկյունային խոհանոց՝ սև ներկառուցված ջեռոցներով և քարե պատով, առջևում՝ կլոր փայտե սեղան չորս աթոռով' },
      { image: pvKarolinaSargsyanOpenPlanLivingKitchen05, title: 'Ընդհանուր տեսք', alt: 'Ընդհանուր տեսք՝ բազմոց և սեղանիկներ առջևում, ձախում՝ փայտե TV պատ, հետևում՝ ճաշասեղան և մոխրագույն խոհանոց' },
    ],
    source: 'https://www.instagram.com/p/DMALEmitD1l/',
    sourceDate: '2025-07-12',
  },
  {
    slug: 'naira-azaryan-mountain-view',
    title: 'Լեռնային տեսարանով ինտերիեր՝ հյուրասենյակ, խոհանոց, ննջասենյակ, զգեստապահարան և լոգասենյակ',
    category: 'visualization',
    author: {
      name: 'Նաիրա Ազարյան',
      nameLatin: 'Naira Azaryan',
      role: 'Ուսանող',
    },
    course: '',
    summary: 'Լեռնային տեսարանով ինտերիերի վիզուալիզացիաներ։ Ստեղծվել է մեզ մոտ ուսման ընթացքում։',
    views: [
      { image: pvNairaAzaryanMountainView01, title: 'Պատուհանի անկյուն', alt: 'Անկյունային պանորամային պատուհանների մոտ երկու մուգ բազկաթոռ և կլոր սեղան, պատուհաններից երևում են եղևնիներ և ձյունածածկ լեռներ' },
      { image: pvNairaAzaryanMountainView02, title: 'Խոհանոց', alt: 'Խոհանոց՝ փայտե բարձր պահարաններով, սպիտակ ստորին պահարաններով և բարձր սեղան-բարով՝ մոխրագույն աթոռներով' },
      { image: pvNairaAzaryanMountainView03, title: 'Հյուրասենյակ', alt: 'Մեծ բեժ մոդուլային բազմոց ռելիեֆային գորգի վրա, հետևում՝ պանորամային պատուհաններ անտառապատ լեռների տեսարանով' },
      { image: pvNairaAzaryanMountainView04, title: 'Հյուրասենյակ և խոհանոց', alt: 'Հյուրասենյակի ընդհանուր տեսք՝ բեժ բազմոց առջևում, հետևում՝ փայտե խոհանոց և բար-սեղան, բարձր պատուհաններ եղևնիների տեսարանով' },
      { image: pvNairaAzaryanMountainView05, title: 'Լոգասենյակ', alt: 'Լոգասենյակ՝ մոխրաբեժ ազատ կանգնող լոգարան, մեծ սալիկներով պատ, սև ուղղահայաց սրբիչատաքացուցիչ և փայտե բաց դարակներ' },
      { image: pvNairaAzaryanMountainView06, title: 'Զգեստապահարան-սենյակ', alt: 'Ապակե միջնապատի հետևում զգեստապահարան-սենյակ՝ լուսավորված ապակե պահարաններով և կենտրոնում բաց փայտե դարակաշարով' },
      { image: pvNairaAzaryanMountainView07, title: 'Ննջասենյակ', alt: 'Ննջասենյակ՝ բաց բեժ փափուկ մահճակալ, սպիտակ բազկաթոռ, հատակի լամպ և պատուհանից երևացող լեռնային տեսարան' },
    ],
    source: 'https://www.instagram.com/p/DL9fo0UhbNI/',
    sourceDate: '2025-07-11',
  },
  {
    slug: 'elen-vanoyan-apartment',
    title: 'Բնակարան մոխրագույն դեկորատիվ սվաղով՝ հյուրասենյակ-խոհանոց և ննջասենյակ',
    category: 'visualization',
    author: {
      name: 'Էլեն Վանոյան',
      nameLatin: 'Elen Vanoyan',
      role: 'Ուսանողուհի',
    },
    course: '3D MAX and Corona Renderer',
    courseSlug: '3ds-max',
    summary: 'Հյուրասենյակ-խոհանոցի և ննջասենյակի վիզուալիզացիաներ։ Ստեղծվել է «3D MAX and Corona Renderer» դասընթացի ընթացքում։',
    views: [
      { image: pvElenVanoyanApartment01, title: 'Ճաշասեղան', alt: 'Քարե երկար ճաշասեղան շագանակագույն կլոր թիկնակով աթոռներով, պատուհանին՝ մուգ շերտավարագույրներ, պատին՝ աբստրակտ պանո' },
      { image: pvElenVanoyanApartment02, title: 'Հյուրասենյակի TV պատ', alt: 'TV պատ՝ քարե երեսպատմամբ և LED լուսավորությամբ, սպիտակ մարմարե կախովի պահարաններ, մուգ կանաչ բազմոց և օղակաձև ջահ' },
      { image: pvElenVanoyanApartment03, title: 'Հյուրասենյակ', alt: 'Մուգ կանաչ թավշյա մոդուլային բազմոց և կլոր մարմարե սեղանիկ, հետևում՝ ճաշասեղան և բաց երանգի խոհանոց, վերևում՝ օղակաձև ջահ' },
      { image: pvElenVanoyanApartment04, title: 'Խոհանոց', alt: 'Խոհանոց՝ բաց մոխրագույն վերին պահարաններ, մարմարե պատ և քարե կղզի, առջևում՝ մուգ կանաչ բազմոց և մարմարե սեղանիկ' },
      { image: pvElenVanoyanApartment05, title: 'Հյուրասենյակ', alt: 'Մուգ կանաչ բազմոց և կլոր մարմարե սեղանիկ՝ ապակե գնդերով ամանով, հետևում՝ ճաշասեղանի աթոռներ' },
      { image: pvElenVanoyanApartment06, title: 'Ննջասենյակ', alt: 'Ննջասենյակ՝ մոխրագույն մահճակալ, սպիտակ ռելիեֆային պանո, մետաղական կլոր լամպ և պատուհան շերտավարագույրներով' },
      { image: pvElenVanoyanApartment07, title: 'Ննջասենյակ', alt: 'Ննջասենյակի ճակատային տեսք՝ մահճակալ, երկու մոխրագույն գիշերասեղանիկ և սպիտակ ռելիեֆային պանո դեկորատիվ սվաղով պատին' },
      { image: pvElenVanoyanApartment08, title: 'Ննջասենյակը երեկոյան', alt: 'Ննջասենյակը երեկոյան լուսավորությամբ՝ անկողնու մոտիկ պլան, մետաղական կլոր լամպ և մութ պատուհան' },
    ],
    source: 'https://www.instagram.com/p/DL7D_2WBfWl/',
    sourceDate: '2025-07-10',
  },
  {
    slug: 'marine-shahnazaryan-apartment',
    title: 'Բնակարան՝ մոխրականաչ դասական խոհանոցով և մոլդինգներով հյուրասենյակով',
    category: 'visualization',
    author: {
      name: 'Մարինե Շահնազարյան',
      nameLatin: 'Marine Shahnazaryan',
      role: 'Ուսանողուհի',
    },
    course: '',
    summary: 'Խոհանոցի, հյուրասենյակի և ճաշասենյակի վիզուալիզացիաներ։ Ստեղծվել է մեզ մոտ ուսման ընթացքում։',
    views: [
      { image: pvMarineShahnazaryanApartment01, title: 'Խոհանոց', alt: 'Մոխրականաչ դասական ճակատներով երկշարք խոհանոց, մուգ փայտե կղզի բարձր աթոռներով, սև-սպիտակ սալիկապատ հատակ' },
      { image: pvMarineShahnazaryanApartment02, title: 'Խոհանոց', alt: 'Կաղնեփայտե խոհանոցային կղզի, կախովի լամպեր, պատուհանագոգին՝ փափուկ նստատեղ, հետևում՝ ապակե դռներ դեպի հյուրասենյակ' },
      { image: pvMarineShahnazaryanApartment03, title: 'Հյուրասենյակ', alt: 'Բեժ մոդուլային բազմոց, մոլդինգներով շրջանակված պատեր, փայտե բաց դարակաշար գրքերով և փորագրված տերևանախշ պանո' },
      { image: pvMarineShahnazaryanApartment04, title: 'Հյուրասենյակ և ճաշասենյակ', alt: 'Բեժ բազմոց և բաց դարակաշար, հետևում՝ ճաշասեղան կախովի լամպերով և պատուհաններ հռոմեական վարագույրներով' },
      { image: pvMarineShahnazaryanApartment05, title: 'TV պատ', alt: 'TV պատ մոլդինգներով, փայտե ցածր պահարան, կլոր փայտե սեղանիկ և կանաչ բույսեր' },
      { image: pvMarineShahnazaryanApartment06, title: 'Ճաշասենյակ', alt: 'Փայտե ճաշասեղան փափուկ աթոռներով, հետևում՝ հյուրասենյակը, եղևնաձև փայտե հատակ' },
      { image: pvMarineShahnazaryanApartment07, title: 'Պահարան և գինու դարակ', alt: 'Մոխրականաչ բարձր պահարան և մուգ փայտե գինու դարակ բաժակներով ու շշերով, աջում՝ պատուհանագոգի նստատեղ' },
      { image: pvMarineShahnazaryanApartment08, title: 'Խոհանոցը ապակե դռների միջով', alt: 'Խոհանոցի տեսքը վանդակավոր ապակե դռների միջով' },
    ],
    source: 'https://www.instagram.com/p/DL4sR_8I3IJ/',
    sourceDate: '2025-07-09',
  },
  {
    slug: 'ani-nasibyan-double-height-loft',
    title: 'Կրկնակի բարձրությամբ ինտերիեր՝ կախովի աստիճաններով, սև խոհանոցով և ննջասենյակով',
    category: 'visualization',
    author: {
      name: 'Անի Նասիբյան',
      nameLatin: 'Ani Nasibyan',
      role: 'Ուսանողուհի',
    },
    course: '3D MAX and Corona Renderer',
    courseSlug: '3ds-max',
    summary: 'Կրկնակի բարձրությամբ հյուրասենյակ-խոհանոցի և ննջասենյակի վիզուալիզացիաներ։ Ստեղծվել է «3D MAX and Corona Renderer» դասընթացի ընթացքում։',
    views: [
      { image: pvAniNasibyanDoubleHeightLoft01, title: 'Հյուրասենյակ', alt: 'Կրկնակի բարձրությամբ հյուրասենյակ՝ բարձր պատուհաններ, սև կոնսոլային աստիճաններ բետոնե սալերով պատի երկայնքով, մոխրագույն բազմոց և սև խոհանոց' },
      { image: pvAniNasibyanDoubleHeightLoft02, title: 'Խոհանոց', alt: 'Սև խոհանոցային կղզի փայտե սեղանի մակերեսով, սև օդաքարշ, ճաշասեղան աստիճանների տակ և մեծ պատուհաններ ծառերի տեսարանով' },
      { image: pvAniNasibyanDoubleHeightLoft03, title: 'Խոհանոց և անտրեսոլ', alt: 'Վերևում՝ անտրեսոլ ապակե բազրիքով, ներքևում՝ մոխրագույն և փայտե խոհանոց, ճաշասեղան և բետոնե սալերով պատ LED գծերով' },
      { image: pvAniNasibyanDoubleHeightLoft04, title: 'Հյուրասենյակ', alt: 'Հյուրասենյակ՝ մոխրագույն բազմոց, սև TV պահարան և բարձր պատուհան, որից երևում են ծառեր և դաշտ' },
      { image: pvAniNasibyanDoubleHeightLoft05, title: 'Ննջասենյակ', alt: 'Ննջասենյակ՝ ընկույզագույն փայտե պատի պանելներ, բետոնե սալերով պատ LED լուսավորությամբ, մահճակալ նախշավոր ծածկոցով և փայտե գիշերասեղանիկ' },
    ],
    source: 'https://www.instagram.com/p/DLzs_CaIC3j/',
    sourceDate: '2025-07-07',
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

/** «Author · «Course» դասընթաց», or just the author when the source names no course. */
export const byline = (p: Project) => (p.course ? `${p.author.name} · «${p.course}» դասընթաց` : p.author.name);
