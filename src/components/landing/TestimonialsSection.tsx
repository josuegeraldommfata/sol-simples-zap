import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Carlos Mendes",
    location: "Campinas - SP",
    text: "Minha conta de luz era R$ 450 por mês. Hoje pago apenas a taxa mínima! Em 3 anos já recuperei todo o investimento. Recomendo demais!",
    rating: 5,
    savings: "R$ 5.400/ano",
    avatar: "CM"
  },
  {
    name: "Maria Silva",
    location: "Indaiatuba - SP",
    text: "Atendimento impecável do início ao fim. Equipe profissional, instalação rápida e o resultado superou minhas expectativas. Melhor decisão!",
    rating: 5,
    savings: "R$ 4.200/ano",
    avatar: "MS"
  },
  {
    name: "Roberto Almeida",
    location: "Valinhos - SP",
    text: "Como empresário, a economia foi essencial. Reduzi 92% dos custos com energia da minha empresa. O financiamento coube no orçamento.",
    rating: 5,
    savings: "R$ 18.000/ano",
    avatar: "RA"
  },
  {
    name: "Fernanda Costa",
    location: "Vinhedo - SP",
    text: "Tinha medo de não valer a pena, mas me surpreendi. Já no primeiro mês vi a diferença na conta. Agora indico para todos os vizinhos!",
    rating: 5,
    savings: "R$ 3.600/ano",
    avatar: "FC"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Depoimentos reais
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4 text-foreground">
            Quem instalou, aprovou!
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mais de 500 famílias na região de Campinas já economizam com energia solar.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-card-foreground mb-6 text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 bg-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Economia</div>
                    <div className="text-primary font-bold">{testimonial.savings}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
