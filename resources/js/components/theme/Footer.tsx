import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { Link } from "@inertiajs/react";


const Footer = () => {
  const { isRTL, t } = useLanguage();
  const { trackAffiliateFooterClick } = usePageTracking();

  function handleAffiliateClick(event: React.MouseEvent<HTMLAnchorElement>, link: string) {
    event.preventDefault();
    trackAffiliateFooterClick(event.currentTarget.textContent);
    window.open(link, '_blank', 'noopener noreferrer');
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="border-b border-white/10 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-heading text-2xl font-bold mb-4">
              {t('footer.newsletter')}
            </h3>
            <p className="text-white/80 mb-6">
              {t('footer.newsletterDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary" className="px-6">
                {t('footer.subscribe')}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">{t('footer.brand')}</h3>
            <p className="text-white/80 mb-4 leading-relaxed">
              {t('footer.brandDesc')}
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-white/60 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-white/60 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-white/60 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 hover:text-white/60 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2 text-white/80">
              <li><Link target="_blank" to={import.meta.env.VITE_T_SHIRT_DESIGN_AFFILIATE_LINK} onClick={(event) => handleAffiliateClick(event, import.meta.env.VITE_T_SHIRT_DESIGN_AFFILIATE_LINK)} className="hover:text-white transition-color">{t('footer.logoDesign')}</Link></li>
              <li><Link target="_blank" to={import.meta.env.VITE_VIDEO_EDITING_AFFILIATE_LINK} onClick={(event) => handleAffiliateClick(event, import.meta.env.VITE_VIDEO_EDITING_AFFILIATE_LINK)} className="hover:text-white transition-colors">{t('footer.videoEditing')}</Link></li>
              <li><Link target="_blank" to={import.meta.env.VITE_WEB_DESIGN_AFFILIATE_LINK} onClick={(event) => handleAffiliateClick(event, import.meta.env.VITE_WEB_DESIGN_AFFILIATE_LINK)} className="hover:text-white transition-colors">{t('footer.webDesign')}</Link></li>
              <li><Link target="_blank" to={import.meta.env.VITE_WRITING_AFFILIATE_LINK} onClick={(event) => handleAffiliateClick(event, import.meta.env.VITE_WRITING_AFFILIATE_LINK)} className="hover:text-white transition-colors">{t('footer.writingSEO')}</Link></li>
              <li><Link target="_blank" to={import.meta.env.VITE_DIGITAL_MARKETING_AFFILIATE_LINK} onClick={(event) => handleAffiliateClick(event, import.meta.env.VITE_DIGITAL_MARKETING_AFFILIATE_LINK)} className="hover:text-white transition-colors">{t('footer.digitalMarketing')}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.aboutUs')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.howItWorks')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.affiliateProgram')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.partners')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.blog')}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.helpCenter')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.contactUs')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.termsOfService')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.affiliateDisclosure')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>
            {t('footer.copyright')}
          </p>
          <div className={`flex items-center mt-4 md:mt-0 ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            <Mail className="w-4 h-4" />
            <span>{t('footer.email')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;