import { Shield, Users, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Benefits = () => {
  const { t } = useLanguage();
  
  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: t('benefits.curatedSellers'),
      description: t('benefits.curatedDesc')
    },
    {
      icon: <Shield className="w-8 h-8 text-success" />,
      title: t('benefits.secureCheckout'),
      description: t('benefits.secureDesc')
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-accent" />,
      title: t('benefits.moneyBack'),
      description: t('benefits.moneyBackDesc')
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            {t('benefits.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-2xl shadow-card flex items-center justify-center">
                {benefit.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;