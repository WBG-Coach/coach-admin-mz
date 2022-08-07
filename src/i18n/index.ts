import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import pt from "./pt.json";

const resources = {
  "en-US": { translation: en },
  "pt-MZ": { translation: pt },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en-US",
  keySeparator: ".",
  cache: { enabled: true },
  compatibilityJSON: "v3",
  interpolation: { escapeValue: false },
});

export default i18n;
