import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import hiTranslation from './locales/hi.json';
import mrTranslation from './locales/mr.json';
import i18nextHttpBackend from 'i18next-http-backend';

const getCurrentHost = import.meta.env.MODE === "development" ? "http://localhost:5173" : "LINK TO PROD";

i18n
  .use(i18nextHttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: enTranslation,
      },
      hi:{
        translation: hiTranslation,
      },
      mr:{
        translation: mrTranslation,
      }
    },
    lng: 'en', 
    interpolation: {
      escapeValue: false,
    },
    backend:{
        loadPath: `${getCurrentHost}/i18n/{{lng}}.json`,
    }
  });

export default i18n;