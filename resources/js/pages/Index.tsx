import TopBar from "@/components/theme/TopBar";
import Hero from "@/components/theme/Hero";
import ServicesGrid from "@/components/theme/ServicesGrid";
import Benefits from "@/components/theme/Benefits";
import HowItWorks from "@/components/theme/HowItWorks";
import Testimonials from "@/components/theme/Testimonials";
import FAQ from "@/components/theme/FAQ";
import FinalCTA from "@/components/theme/FinalCTA";
import Footer from "@/components/theme/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Blogs from "@/components/theme/Blogs";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <TopBar />
        <Hero />
        <ServicesGrid />
        <Benefits />
        <HowItWorks />
        <Blogs />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
