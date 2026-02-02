import { Zap, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onOpenChat: () => void;
}

export const CTASection = ({ onOpenChat }: CTASectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-whatsapp-dark to-primary relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-yellow-400 blur-[100px]" />
        <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-yellow-400 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 rounded-full px-4 py-2 mb-6 font-semibold">
            <Clock className="w-4 h-4" />
            Oferta por tempo limitado
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Não perca mais dinheiro com conta de luz alta!
          </h2>
          
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            A cada mês que você espera, é dinheiro jogado fora. 
            Faça sua simulação <strong>gratuita</strong> agora e descubra quanto pode economizar.
          </p>

          {/* Offer box */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-lg mx-auto border border-white/20">
            <div className="text-sm uppercase tracking-wider opacity-80 mb-2">Bônus exclusivo</div>
            <div className="text-2xl font-bold mb-2">🎁 Instalação GRÁTIS</div>
            <div className="text-sm opacity-80">Para os próximos 10 clientes que fecharem este mês</div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onOpenChat}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-yellow-400/30 transition-all hover:scale-105"
            >
              <Zap className="w-5 h-5 mr-2" />
              Quero Economizar Agora!
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-full"
            >
              <Phone className="w-5 h-5 mr-2" />
              Ligar: (19) 99999-9999
            </Button>
          </div>

          {/* Trust text */}
          <p className="mt-8 text-sm opacity-70">
            ✓ Sem compromisso &nbsp; ✓ Orçamento em minutos &nbsp; ✓ Financiamento facilitado
          </p>
        </div>
      </div>
    </section>
  );
};
