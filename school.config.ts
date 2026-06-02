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
  domain: "maralik2school.am",
  email: "maralik-tiv2@mail.ru",
  phone: {
    display: "+374 98-27-07-69",
    tel: "+37498270769",
  },
  social: {
    facebook: "https://www.facebook.com/t.iv.erku.dproc.maralik",
    youtube: "",
  },
  map: {
    lat: 40.577581, 
    lon: 43.866813,
    bboxRadius: 0.02,
  },
  assets: {
    logo: "/logo.jpg",
    heroImage: "/school.jpg",
  },
  name: {
    hy: "Մարալիկի թիվ 2 միջնակարգ դպրոց",
    ru: "Средняя школа Маралик № 2",
    en: "Maralik Secondary School No. 2",
  },
  shortName: {
    hy: "Մարալիկ 2",
    ru: "Маралик 2",
    en: "Maralik 2",
  },
  tagline: {
    hy: "Պաշտոնական տեղեկատվական հարթակ",
    ru: "Официальный информационный портал",
    en: "Official information portal",
  },
  address: {
    hy: "ՀՀ Շիրակի մարզ, քաղաք Մարալիկ, Կոլտնտեսականների 2 / 1",
    ru: "РА Ширакская область г. Маралик, Кольтнецекёнканер 2/1",
    en: "RA Shirak region city Maralik, Koltnetseksyonkaner 2 / 1",
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
