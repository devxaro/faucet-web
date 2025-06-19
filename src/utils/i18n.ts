import { use } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@assets/translations/en.json";

use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      translation: en,
    },
  },
});
