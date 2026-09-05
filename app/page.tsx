import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSeoSection from "@/components/AboutSeoSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";
import TikTokSection from "@/components/TikTokSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { buildFaqPageSchema } from "@/lib/seoContent";

/**
 * Home Page
 * Main landing page for Labida LLC
 * Combines all sections: Header, Hero, Services, About, Why Us, Work, FAQ, Contact, Footer
 */
export default function Home() {
  const faqSchema = buildFaqPageSchema();

  return (
    <main className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSeoSection />
      <WhyUsSection />
      <TikTokSection />
      <FAQSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
