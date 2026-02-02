import { MessageCircle, Calculator, FileCheck, Wrench, Zap } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Simulação Grátis",
    description: "Faça uma simulação em 2 minutos pelo nosso chat. Sem compromisso, sem burocracia."
  },
  {
    icon: Calculator,
    number: "02",
    title: "Projeto Personalizado",
    description: "Nossa equipe técnica analisa seu consumo e projeta o sistema ideal para você."
  },
  {
    icon: FileCheck,
    number: "03",
    title: "Aprovação Simples",
    description: "Financiamento facilitado com parcelas que cabem no seu bolso. Aprovação rápida."
  },
  {
    icon: Wrench,
    number: "04",
    title: "Instalação Express",
    description: "Equipe especializada instala em 1 a 2 dias. Você nem precisa ficar em casa."
  },
  {
    icon: Zap,
    number: "05",
    title: "Economia Garantida",
    description: "Pronto! Sua conta de luz despenca já no próximo mês. É só aproveitar!"
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Simples e rápido
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4 text-foreground">
            Como funciona?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Em 5 passos simples você começa a economizar. Nós cuidamos de tudo.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex gap-6 mb-8 last:mb-0 group"
            >
              {/* Number and line */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-border mt-4 min-h-[40px]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-card-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
