import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.ts'
import es from './locales/es.ts'
import vi from './locales/vi.ts'
import zh from './locales/zh.ts'

export const LANGUAGES = [
    { code: 'en', label: 'English', htmlLang: 'en' },
    { code: 'es', label: 'Español', htmlLang: 'es' },
    { code: 'vi', label: 'Tiếng Việt', htmlLang: 'vi' },
    { code: 'zh', label: '中文', htmlLang: 'zh-Hans' },
] as const

export type LanguageCode = typeof LANGUAGES[number]['code']

const STORAGE_KEY = 'site-language'

function initialLanguage(): LanguageCode {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved && LANGUAGES.some(l => l.code === saved)) return saved as LanguageCode
    } catch { /* storage unavailable */ }
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase()
    return (LANGUAGES.find(l => l.code === browser)?.code ?? 'en')
}

function syncHtmlLang(code: string) {
    document.documentElement.lang = LANGUAGES.find(l => l.code === code)?.htmlLang ?? 'en'
}

void i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        es: { translation: es },
        vi: { translation: vi },
        zh: { translation: zh },
    },
    lng: initialLanguage(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false }, // React already escapes
    returnObjects: true,
})

syncHtmlLang(i18n.language)
i18n.on('languageChanged', code => {
    syncHtmlLang(code)
    try { localStorage.setItem(STORAGE_KEY, code) } catch { /* storage unavailable */ }
})

export default i18n
