import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLocale } from '@/utils/translation';

interface LocaleContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  isRTL: boolean;
  direction: 'ltr' | 'rtl';
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale?: SupportedLocale;
}

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    // Priority: initialLocale > page props > browser > default
    if (initialLocale) return initialLocale;

    if (typeof window !== 'undefined' && (window as any).page?.props?.locale) {
      return (window as any).page.props.locale as SupportedLocale;
    }

    const browserLang = navigator.language.split('-')[0];
    return (browserLang === 'ar' ? 'ar' : 'en') as SupportedLocale;
  });

  const isRTL = locale === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);

    // Update document direction
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;

    // Store in localStorage for persistence
    localStorage.setItem('locale', newLocale);
  };

  // Set initial document direction
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = locale;
  }, [locale, direction]);

  const value: LocaleContextType = {
    locale,
    setLocale,
    isRTL,
    direction,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

// Hook for getting translation functions with current locale context
export function useTranslationContext() {
  const { locale, isRTL } = useLocale();

  return {
    locale,
    isRTL,
    t: (data: Record<string, string>, field: string, targetLocale?: SupportedLocale) => {
      const useLocale = targetLocale || locale;
      const key = `${field}_${useLocale}`;
      return data[key] || data[`${field}_en`] || '';
    },
    tBest: (data: Record<string, string>, field: string) => {
      const key = `${field}_${locale}`;
      if (data[key] && data[key].trim()) {
        return data[key];
      }
      return data[`${field}_en`] || '';
    },
  };
}
