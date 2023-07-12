import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fi from "../public/locales/fi/translation.json"
import en from "../public/locales/en/translation.json"

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

if (typeof document !== 'undefined') {
  i18n
    .use(Backend)
    .use(LanguageDetector)
}

if (!i18n.isInitialized) {
  i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'fi',
    debug: false,
    interpolation: {
      escapeValue: false, 
    },
    defaultNS: 'translation',
    lng: 'fi',
  });
}

export default i18n;