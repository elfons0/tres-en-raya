import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
.use(detector)
.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  // language resources
  resources: {
    en: {
      translation: {
        title: "Tic-Tac-Toe",
        players: "Two players",
        easy: "CPU (Easy)",
        hard: "CPU (Hard)",
        next_round: "Next round"
      },
    },
    es: {
      translation: {
        title: "Tres en raya",
        players: "Dos Jugadores",
        easy: "CPU (Facil)",
        hard: "CPU (Dificil)",
        next_round: "Siguiente ronda"
      },
    },
  },
});

export default i18n;
