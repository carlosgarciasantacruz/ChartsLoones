import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from './locales/en/translation';
import translationES from './locales/es/translation';

const resources = {
    en: {
      translation: translationEN
    },
    es: {
      translation: translationES
    }
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es",
    fallbackLng: "en", // use en if detected lng is not available

    saveMissing: true, // send not translated keys to endpoint

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;