import CategoryCard from "./CategoryCard";
import { Palette, Video, Code, PenTool, TrendingUp, Shirt } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ServicesGrid = () => {
  const { t } = useLanguage();

  const categories = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: t('services.logoDesign'),
      description: t('services.logoDesc'),
      priceFrom: "$25",
      deliveryTime: "2-3 days",
      rating: 4.9,
      sellersCount: 150,
      affiliateLink: import.meta.env.VITE_LOGO_DESIGN_AFFILIATE_LINK,
      featured: true
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: t('services.videoEditing'),
      description: t('services.videoDesc'),
      priceFrom: "$30",
      deliveryTime: "3-5 days",
      rating: 4.8,
      sellersCount: 120,
      affiliateLink: import.meta.env.VITE_VIDEO_EDITING_AFFILIATE_LINK
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('services.digitalMarketing'),
      description: t('services.digitalDesc'),
      priceFrom: "$50",
      deliveryTime: "3-7 days",
      rating: 4.8,
      sellersCount: 110,
      affiliateLink: import.meta.env.VITE_DIGITAL_MARKETING_AFFILIATE_LINK,
      featured: true
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: t('services.writingSEO'),
      description: t('services.writingDesc'),
      priceFrom: "$60",
      deliveryTime: "2-4 days",
      rating: 4.7,
      sellersCount: 180,
      affiliateLink: import.meta.env.VITE_WRITING_AFFILIATE_LINK,
      // featured: true
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: t('services.webDesign'),
      description: t('services.webDesc'),
      priceFrom: "$80",
      deliveryTime: "5-7 days",
      rating: 4.9,
      sellersCount: 95,
      affiliateLink: import.meta.env.VITE_WEB_DESIGN_AFFILIATE_LINK,
      featured: true
    },
    {
      icon: <Shirt className="w-8 h-8" />,
      title: t('services.tShirtDesign'),
      description: t('services.tShirtDesignDesc'),
      priceFrom: "$20",
      deliveryTime: "5-7 days",
      rating: 4.9,
      sellersCount: 95,
      affiliateLink: import.meta.env.VITE_T_SHIRT_DESIGN_AFFILIATE_LINK
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('services.title')} <span className="bg-gradient-primary bg-clip-text text-transparent">{t('services.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;