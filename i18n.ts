import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./src/locales/en-US.json";

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if the current language is not available
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
