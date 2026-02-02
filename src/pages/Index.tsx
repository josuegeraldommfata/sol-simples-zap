import { HeroSection } from "@/components/landing/HeroSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

const Index = () => {
  const handleOpenChat = () => {
    // Trigger the chat widget to open
    const event = new CustomEvent('openChatWidget');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onOpenChat={handleOpenChat} />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection onOpenChat={handleOpenChat} />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
