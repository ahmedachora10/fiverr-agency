import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTracking } from "@/hooks/use-page-tracking";

const FinalCTA = () => {
  const { isRTL, t } = useLanguage();
  const { trackAffiliateClick } = usePageTracking();

  function handleAffiliateClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    trackAffiliateClick('Explore All');
    window.open(import.meta.env.VITE_HOME_AFFILIATE_LINK, '_blank', 'noopener noreferrer');
  }

  return (
    <section className="py-20 bg-gradient-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-20"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className={`flex items-center justify-center mb-6 ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
          <Sparkles className="w-8 h-8" />
          <span className="text-xl font-semibold">{t('finalCTA.ready')}</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          {t('finalCTA.title')}
        </h2>

        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('finalCTA.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleAffiliateClick}
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            {t('finalCTA.exploreAll')}
            {isRTL ? <ArrowLeft className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} /> : <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />}
          </Button>

          <div className={`flex items-center text-sm opacity-75 ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            <span>{t('finalCTA.secure')}</span>
            <span>{t('finalCTA.fast')}</span>
            <span>{t('finalCTA.guarantee')}</span>
          </div>
        </div>

        <div className="mt-8 text-sm opacity-75">
          <p>
            {t('finalCTA.disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;