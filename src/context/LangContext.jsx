import { createContext, useState, useContext, useCallback } from 'react';
import en from '../i18n/en.json';
import es from '../i18n/es.json';

const translations = { en, es };
const LangContext = createContext();

export function LangProvider({ children }) {
    const [lang, setLang] = useState('en');

    const toggleLang = useCallback(() => {
        setLang(prev => prev === 'en' ? 'es' : 'en');
    }, []);

    const t = useCallback((path) => {
        const keys = path.split('.');
        let value = translations[lang];
        for (const key of keys) {
            value = value?.[key];
        }
        return value || path;
    }, [lang]);

    const getList = useCallback((path) => {
        const keys = path.split('.');
        let value = translations[lang];
        for (const key of keys) {
            value = value?.[key];
        }
        return value || [];
    }, [lang]);

    return (
        <LangContext.Provider value={{ lang, toggleLang, t, getList }}>
            {children}
        </LangContext.Provider>
    );
}

export function useLang() {
    const context = useContext(LangContext);
    if (!context) throw new Error('useLang must be used within LangProvider');
    return context;
}
