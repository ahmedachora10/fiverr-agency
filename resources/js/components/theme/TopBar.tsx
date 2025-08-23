import { useState } from "react";
import { ChevronDown, Globe, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, isRTL, t } = useLanguage();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage as Language);
    }
  }, []);

  return (
    <div className="bg-gradient-primary text-white py-2 px-4 text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
          <span className="font-medium">{t('topbar.save')}</span>
        </div>

        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'} hover:opacity-80 transition-opacity`}
            >
              <Languages className="w-4 h-4" />
              <span>{language === 'en' ? 'EN' : 'العربية'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isOpen && (
              <div className={`absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-1 bg-white text-foreground shadow-lg rounded-lg py-2 min-w-[120px] z-50`}>
                <div
                  className="px-3 py-1 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setLanguage('en');
                    setIsOpen(false);
                    localStorage.setItem('language', 'en');
                  }}
                >
                  English
                </div>
                <div
                  className="px-3 py-1 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setLanguage('ar');
                    setIsOpen(false);
                    localStorage.setItem('language', 'ar');
                  }}
                >
                  العربية
                </div>
              </div>
            )}
          </div>

          <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            <a href="#services" className="hover:opacity-80 transition-opacity">{t('topbar.services')}</a>
            <a href="#how-it-works" className="hover:opacity-80 transition-opacity">{t('topbar.howItWorks')}</a>
            <a href="#testimonials" className="hover:opacity-80 transition-opacity">{t('topbar.testimonials')}</a>
            <a href="#faq" className="hover:opacity-80 transition-opacity">{t('topbar.faq')}</a>
            <a href="#contact" className="hover:opacity-80 transition-opacity">{t('topbar.contact')}</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopBar;