import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Add type declaration for window.INITIAL_LANGUAGE
declare global {
  interface Window {
    INITIAL_LANGUAGE?: string;
  }
}

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {
          "followUs": "Suivez-nous",
          "services": "Nos Services",
          "computerSales": "Vente et Service Informatique",
          "computerDesc": "Large gamme d'ordinateurs et d'accessoires. Services de réparation expert pour toutes les marques.",
          "mobileRepair": "Réparation Mobile",
          "mobileDesc": "Services de réparation professionnels pour smartphones et tablettes.",
          "consoleRepair": "Réparation Console",
          "consoleDesc": "Services de réparation et d'entretien de consoles de jeux.",
          "techConsult": "Consultation Technique",
          "techDesc": "Conseils d'experts pour tous vos besoins technologiques, y compris la récupération de compte et l'utilisation d'ordinateur.",
          "visitUs": "Visitez-nous",
          "businessHours": "Heures d'ouverture",
          "monFri": "Lundi - Vendredi: 10h00 - 17h00",
          "saturday": "Samedi: Fermé",
          "sunday": "Dimanche: Fermé",
          "callUs": "Appelez-nous",
          "allRights": "Tous droits réservés."
        }
      },
      en: {
        translation: {
          "followUs": "Follow us",
          "services": "Our Services",
          "computerSales": "Computer Sales & Service",
          "computerDesc": "Wide range of computers and accessories. Expert repair services for all brands.",
          "mobileRepair": "Mobile Device Repair",
          "mobileDesc": "Professional repair services for smartphones and tablets.",
          "consoleRepair": "Console Repair",
          "consoleDesc": "Gaming console repair and maintenance services.",
          "techConsult": "Tech Consultation",
          "techDesc": "Expert guidance for all your tech needs, including account recovery and computer usage.",
          "visitUs": "Visit Us",
          "businessHours": "Business Hours",
          "monFri": "Monday - Friday: 10:00 AM - 5:00 PM",
          "saturday": "Saturday: Closed",
          "sunday": "Sunday: Closed",
          "callUs": "Call us",
          "allRights": "All rights reserved."
        }
      }
    },
    lng: 'fr', // Default language
    fallbackLng: "fr",
    detection: {
      order: ['path', 'htmlTag', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

// Set initial language based on URL if available
if (typeof window !== 'undefined') {
  // Check if prerendered language is available
  const prerenderedLang = window.INITIAL_LANGUAGE;
  
  if (prerenderedLang) {
    i18n.changeLanguage(prerenderedLang);
  } else {
    // Fallback to path detection
    const initialLang = window.location.pathname.startsWith('/en') ? 'en' : 'fr';
    i18n.changeLanguage(initialLang);
  }
}

export default i18n;