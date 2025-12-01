import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

/**
 * Home Page
 * Main landing page for LLC Labida
 * Combines all sections: Header, Hero, Services, Why Us, Contact, Footer
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
