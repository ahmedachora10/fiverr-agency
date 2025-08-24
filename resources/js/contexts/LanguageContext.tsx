import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import translations from '@/lang/lang.json';
import { usePage } from '@inertiajs/react';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    isRTL: boolean;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const { locale } = usePage().props;
    const [language, setLanguage] = useState<Language>(() => {

        if (typeof window !== 'undefined') {
            return (localStorage.getItem('language') as Language) || locale || 'en';
        }
        return 'en';
    });

    const isRTL = language === 'ar';

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', language);
            document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
            document.documentElement.lang = language;
        }
    }, [language, isRTL]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
