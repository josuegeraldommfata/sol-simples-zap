import { Sun, Zap, TrendingDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onOpenChat: () => void;
}

export const HeroSection = ({ onOpenChat }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-whatsapp-dark via-primary to-whatsapp-dark">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-yellow-400 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-yellow-400 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-500 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Sun className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Líder em Energia Solar na RMC</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Chega de pagar caro na{" "}
            <span className="text-yellow-400">conta de luz</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Reduza até <strong className="text-yellow-400">95%</strong> da sua conta de energia 
            com painéis solares. Investimento que se paga em{" "}
            <strong className="text-yellow-400">menos de 4 anos</strong>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-yellow-400">500+</div>
              <div className="text-sm opacity-80">Sistemas Instalados</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-yellow-400">95%</div>
              <div className="text-sm opacity-80">Economia Média</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-yellow-400">25</div>
              <div className="text-sm opacity-80">Anos de Garantia</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-yellow-400">4.9★</div>
              <div className="text-sm opacity-80">Avaliação Google</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onOpenChat}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-yellow-400/30 transition-all hover:scale-105"
            >
              <Zap className="w-5 h-5 mr-2" />
              Simular Minha Economia
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-full"
            >
              Ver Projetos Realizados
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-10 opacity-70">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Instalação Segura</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              <span className="text-sm">Financiamento Facilitado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};
