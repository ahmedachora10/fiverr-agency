import TopBar from "@/components/theme/TopBar";
import Hero from "@/components/theme/Hero";
import ServicesGrid from "@/components/theme/ServicesGrid";
import Benefits from "@/components/theme/Benefits";
import HowItWorks from "@/components/theme/HowItWorks";
import Testimonials from "@/components/theme/Testimonials";
import FAQ from "@/components/theme/FAQ";
import FinalCTA from "@/components/theme/FinalCTA";
import Blogs from "@/components/theme/Blogs";
import FrontAppLayout from "@/layouts/front-app-layout";

const Index = () => {
  return (
    <FrontAppLayout>
      <div className="min-h-screen bg-background">
        <Hero />
        <ServicesGrid />
        <Benefits />
        <HowItWorks />
        <Blogs />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </div>
    </FrontAppLayout>
  );
};

export default Index;
