import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTracking } from "@/hooks/use-page-tracking";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  priceFrom: string;
  deliveryTime: string;
  rating: number;
  sellersCount: number;
  affiliateLink: string;
  featured?: boolean;
}

const CategoryCard = ({
  icon,
  title,
  description,
  priceFrom,
  deliveryTime,
  rating,
  sellersCount,
  affiliateLink,
  featured = false
}: CategoryCardProps) => {
  const { isRTL, t } = useLanguage();
  const { trackAffiliateClick } = usePageTracking();
  const handleAffiliateClick = () => {
    // Track affiliate click event
    trackAffiliateClick(title);
    // trackEvent('click', 'affiliate_link', title);
    window.open(affiliateLink, '_blank', 'noopener noreferrer');
  };

  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {featured && (
        <Badge className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-accent text-accent-foreground`}>
          {t('services.popular')}
        </Badge>
      )}

      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-hero rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>

          <h3 className="font-heading text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t('services.startingFrom')}</span>
            <span className="font-semibold text-lg text-success">{priceFrom}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t('services.delivery')}</span>
            </div>
            <span className="font-medium">{deliveryTime}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium">{rating}</span>
            </div>
            <span className="text-muted-foreground">{sellersCount} {t('services.sellers')}</span>
          </div>
        </div>

        <Button
          onClick={handleAffiliateClick}
          className="w-full rounded-full font-medium group-hover:scale-105 transition-transform duration-200"
          size="lg"
        >
          {t('services.viewDeals')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;