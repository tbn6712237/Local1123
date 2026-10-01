import { useApp } from '../context/AppContext';
import { Language, TRANSLATIONS } from './translations';
import { PHRASE_DICT_EN, PHRASE_DICT_KO } from './phraseDict';

export const useT = () => {
  const { lang = 'vi' } = useApp();

  const currentDict = TRANSLATIONS[lang as Language] || TRANSLATIONS.vi;

  // Fallback Proxy ensures any key accessed never crashes with undefined or error
  const t = new Proxy(currentDict, {
    get(target, prop: string) {
      if (prop in target) {
        return target[prop];
      }
      if (prop in TRANSLATIONS.vi) {
        return TRANSLATIONS.vi[prop];
      }
      if (prop in TRANSLATIONS.en) {
        return TRANSLATIONS.en[prop];
      }
      return prop;
    }
  });

  const l = (vi: string, en?: string, ko?: string): string => {
    if (lang === 'en' && en) return en;
    if (lang === 'ko' && ko) return ko;
    return vi;
  };

  const loc = (val: any): string => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'object') {
      return val[lang] || val['vi'] || val['en'] || val['ko'] || Object.values(val)[0] || '';
    }
    const str = String(val).trim();
    if (!str) return '';

    if (lang === 'en') {
      if (PHRASE_DICT_EN[str]) return PHRASE_DICT_EN[str];
      const lower = str.toLowerCase();
      if (PHRASE_DICT_EN[lower]) return PHRASE_DICT_EN[lower];
      // Check if known key is in dictionary with trimmed punctuation
      const clean = str.replace(/^[•✓⚡🛡️\s]+|[→\s]+$/g, '').trim();
      if (PHRASE_DICT_EN[clean]) {
        return str.replace(clean, PHRASE_DICT_EN[clean]);
      }
    } else if (lang === 'ko') {
      if (PHRASE_DICT_KO[str]) return PHRASE_DICT_KO[str];
      const clean = str.replace(/^[•✓⚡🛡️\s]+|[→\s]+$/g, '').trim();
      if (PHRASE_DICT_KO[clean]) {
        return str.replace(clean, PHRASE_DICT_KO[clean]);
      }
    }
    return str;
  };

  return {
    t,
    lang,
    l,
    loc
  };
};

