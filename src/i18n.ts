import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

export enum ELangSupport {
  en = 'en',
  he = 'he',
}

export enum EDirection {
  rtl = 'rtl',
  ltr = 'ltr',
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnEmptyString: false,
    debug: true,
    lng: ELangSupport.he,
    fallbackLng: ELangSupport.he,
    interpolation: {
      escapeValue: false, // Не экранировать HTML-код
    },
  })

export default i18n
