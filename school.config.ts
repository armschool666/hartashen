/**
 * Կոնֆիգ կոնկրետ դպրոցի։
 *
 * Սա է միակ տեղը, որ պետք է փոխել, երբ կայքը կլոնավորվում է
 * մեկ այլ դպրոցի համար։ Տեքստերը (անուն, նկարագրություն, հասցե) տեղայնացված են.
 * փոխիր այստեղ — ոչ hardcod-ներ կոդում կամ messages/*.json-ում։
 */

export type SchoolLocale = "hy" | "ru" | "en";

type LocalizedString = Record<SchoolLocale, string>;

export interface SchoolConfig {
  /** Домен сайта без протокола, для SEO/metadata */
  domain: string;
  /** Email школы — используется в footer, contact page, mailto-форме */
  email: string;
  /** Телефон в международном формате (для tel:) и локально для отображения */
  phone: {
    display: string;
    tel: string;
  };
  /** Соц. сети — оставить пустую строку, чтобы скрыть ссылку */
  social: {
    facebook: string;
    youtube: string;
  };
  /** Координаты для встроенной карты OpenStreetMap */
  map: {
    lat: number;
    lon: number;
    /** Половина видимого охвата карты по широте/долготе (градусы) */
    bboxRadius: number;
  };
  /** Логотип и hero-изображение из /public */
  assets: {
    logo: string;
    heroImage: string;
  };
  /** Локализованные строки */
  name: LocalizedString;
  shortName: LocalizedString;
  tagline: LocalizedString;
  address: LocalizedString;
  region: LocalizedString;
}

export const schoolConfig: SchoolConfig = {
  domain: "hartashenschool.am",
  email: "hartashen.shirak@gmail.com",
  phone: {
    display: "+374 96 36-27-44",
    tel: "+37496362744",
  },
  social: {
    facebook: "",
    youtube: "",
  },
  map: {
    lat: 41.0120,
    lon: 43.6080,
    bboxRadius: 0.02,
  },
  assets: {
    logo: "/logo.jpg",
    heroImage: "/dproc.jpg",
  },
  name: {
    hy: "Հարթաշենի հիմնական դպրոց",
    ru: "Основная школа Арташен",
    en: "Hartashen Basic School",
  },
  shortName: {
    hy: "Հարթաշեն",
    ru: "Арташен",
    en: "Hartashen",
  },
  tagline: {
    hy: "Պաշտոնական տեղեկատվական հարթակ",
    ru: "Официальный информационный портал",
    en: "Official information portal",
  },
  address: {
    hy: "ՀՀ Շիրակի մարզ, գ. Հարթաշեն",
    ru: "РА Ширакская область, с. Арташен",
    en: "RA Shirak region, village Hartashen",
  },
  region: {
    hy: "Շիրակի մարզ",
    ru: "Ширакская область",
    en: "Shirak Region",
  },
};

export function bboxString(): string {
  const { lat, lon, bboxRadius } = schoolConfig.map;
  return [
    lon - bboxRadius,
    lat - bboxRadius / 2,
    lon + bboxRadius,
    lat + bboxRadius / 2,
  ].join(",");
}

export function mapEmbedUrl(): string {
  const { lat, lon } = schoolConfig.map;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bboxString()}&layer=mapnik&marker=${lat},${lon}`;
}
