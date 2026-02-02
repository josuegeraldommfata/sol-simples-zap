import { Sun, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Sun className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-card-foreground">Zap Solar ☀️</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Transformando o sol em economia para mais de 500 famílias na região de Campinas. 
              Energia limpa, sustentável e que cabe no seu bolso.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-card-foreground mb-4">Contato</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>(19) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>contato@zapsolar.com.br</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span>Campinas - SP<br />Região Metropolitana</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-card-foreground mb-4">Links Úteis</h4>
            <div className="space-y-2 text-muted-foreground">
              <a href="#" className="block hover:text-primary transition-colors">Sobre Nós</a>
              <a href="#" className="block hover:text-primary transition-colors">Projetos Realizados</a>
              <a href="#" className="block hover:text-primary transition-colors">Blog</a>
              <a href="#" className="block hover:text-primary transition-colors">Política de Privacidade</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Zap Solar. Todos os direitos reservados.</p>
          <p className="mt-1">MVP de Demonstração • Pronto para White Label</p>
        </div>
      </div>
    </footer>
  );
};
