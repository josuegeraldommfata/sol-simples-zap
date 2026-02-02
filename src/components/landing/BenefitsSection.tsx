import { Wallet, Leaf, Home, Calendar, Wrench, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Wallet,
    title: "Economia Imediata",
    description: "Reduza sua conta de luz em até 95% já no primeiro mês após a instalação. O dinheiro que você gasta com energia volta pro seu bolso.",
    highlight: "até 95%"
  },
  {
    icon: Calendar,
    title: "Retorno Rápido",
    description: "Seu investimento se paga em média em 3 a 4 anos. Depois disso, é lucro puro por mais de 21 anos.",
    highlight: "3-4 anos"
  },
  {
    icon: Home,
    title: "Valoriza seu Imóvel",
    description: "Imóveis com energia solar são mais valorizados no mercado. Aumente o patrimônio da sua família.",
    highlight: "+8% valor"
  },
  {
    icon: Leaf,
    title: "Energia Limpa",
    description: "Contribua para um planeta mais sustentável. Cada kWh solar evita emissão de CO₂ na atmosfera.",
    highlight: "100% verde"
  },
  {
    icon: Wrench,
    title: "Zero Manutenção",
    description: "Painéis solares praticamente não precisam de manutenção. Apenas limpeza ocasional é suficiente.",
    highlight: "sem stress"
  },
  {
    icon: Award,
    title: "Garantia Estendida",
    description: "Oferecemos 25 anos de garantia nos painéis e 10 anos no inversor. Tranquilidade total.",
    highlight: "25 anos"
  }
];

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Por que escolher energia solar?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4 text-foreground">
            Vantagens que transformam sua vida
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Investir em energia solar é a decisão financeira mais inteligente que você pode tomar hoje.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/30 bg-card"
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <benefit.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <div className="inline-block bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-full mb-3">
                  {benefit.highlight}
                </div>
                <h3 className="text-xl font-bold mb-2 text-card-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
