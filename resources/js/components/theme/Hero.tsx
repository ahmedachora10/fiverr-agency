import { Button } from "@/components/ui/button";
import { Star, Users, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { isRTL, t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {t('hero.title')}
              <span className="bg-gradient-primary bg-clip-text text-transparent"> {t('hero.titleHighlight')}</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start`}>
              <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-button hover:shadow-button-hover">
                <a href={import.meta.env.VITE_HOME_AFFILIATE_LINK} target="_blank">{t('hero.exploreDeals')}</a>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full">
                <a href="#services">{t('hero.compareServices')}</a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-border">
              <div className={`flex items-center justify-center ${isRTL ? 'lg:justify-end space-x-reverse space-x-2' : 'lg:justify-start space-x-2'}`}>
                <Users className="w-5 h-5 text-success" />
                <span className="text-sm font-medium">{t('hero.sellers')}</span>
              </div>
              <div className={`flex items-center justify-center ${isRTL ? 'lg:justify-end space-x-reverse space-x-2' : 'lg:justify-start space-x-2'}`}>
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">{t('hero.average')}</span>
              </div>
              <div className={`flex items-center justify-center ${isRTL ? 'lg:justify-end space-x-reverse space-x-2' : 'lg:justify-start space-x-2'}`}>
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm font-medium">{t('hero.secureCheckout')}</span>
              </div>
              <div className={`flex items-center justify-center ${isRTL ? 'lg:justify-end space-x-reverse space-x-2' : 'lg:justify-start space-x-2'}`}>
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">{t('hero.fastDelivery')}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
              <img
                src="/hero-services.jpg"
                alt="Professional freelance services including logo design, video editing, web development, writing, and digital marketing"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating elements */}
            <div className={`absolute -top-4 ${isRTL ? '-left-4' : '-right-4'} bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
              {t('hero.topRated')}
            </div>
            <div className={`absolute -bottom-4 ${isRTL ? '-right-4' : '-left-4'} bg-white p-4 rounded-xl shadow-lg`}>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm font-medium">{t('hero.ordersThisWeek')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;