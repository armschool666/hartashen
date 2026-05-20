/**
 * Конфиг конкретной школы.
 *
 * Это единственное место, которое нужно менять, чтобы клонировать сайт
 * под другую школу. Тексты (название, описание, адрес) локализованы:
 * правьте здесь — никаких хардкодов в коде или messages/*.json.
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
  domain: "hatsikschool.am",
  email: "info@hatsikschool.am",
  phone: {
    display: "+374 93 26-71-26",
    tel: "+37493267126",
  },
  social: {
    facebook: "https://www.facebook.com/hatsikvil1966",
    youtube: "https://www.youtube.com/",
  },
  map: {
    lat: 40.818,
    lon: 43.885,
    bboxRadius: 0.04,
  },
  assets: {
    logo: "/logo.jpg",
    heroImage: "/school.jpg",
  },
  name: {
    hy: "Հացիկի միջնակարգ դպրոց",
    ru: "Средняя школа села Ацик",
    en: "Hatsik Secondary School",
  },
  shortName: {
    hy: "Հացիկ",
    ru: "Ацик",
    en: "Hatsik",
  },
  tagline: {
    hy: "Պաշտոնական տեղեկատվական հարթակ",
    ru: "Официальный информационный портал",
    en: "Official information portal",
  },
  address: {
    hy: "ՀՀ Շիրակի մարզ, Հացիկ գյուղ, N13 փողոց, փակուղի 1, շենք 3",
    ru: "РА, Ширакская область, село Ацик, ул. N13, тупик 1, дом 3",
    en: "Shirak Region, Hatsik village, N13 St., dead-end 1, building 3, Armenia",
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
