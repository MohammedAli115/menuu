
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const initI18n = async () => {
    await i18n
        .use(Backend)
        .use(initReactI18next)
        .init({
            fallbackLng: 'de',
            supportedLngs: ['en', 'ar', 'de'],
            debug: false,
            interpolation: {
                escapeValue: false,
            },
            backend: {
                loadPath: '/locales/{{lng}}/translation.json',
            },
            react: {
                useSuspense: true,
            }
        });
};

initI18n().catch(console.error);

export default i18n;