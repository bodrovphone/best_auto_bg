type Translations = Record<string, Record<string, string>>;

const t = (translations: Translations, key: string, lang: string): string => {
  return translations[key]?.[lang] ?? translations[key]?.["bg"] ?? key;
};

export { t };
export type { Translations };
