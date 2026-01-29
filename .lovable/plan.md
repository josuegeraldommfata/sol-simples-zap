

# Zap Solar ☀️
## MVP de Chatbot de Qualificação de Leads para Energia Solar

### Visão Geral
Um chatbot estilo WhatsApp para qualificação de leads de energia solar na RMC, com dados 100% mockados, pronto para demonstração e venda white label.

---

### 🎨 Design & Experiência
- **Estilo WhatsApp**: Interface verde (#25D366), balões de mensagem, ícones familiares
- **Animação de "digitando..."**: Simula experiência real
- **Responsivo**: Funciona em mobile e desktop
- **Navegação simples**: Abas para alternar entre Chat e Dashboard Admin

---

### 💬 Fluxo do Chatbot

**1. Tela Inicial**
- Mensagem de boas-vindas com emoji ☀️
- Botão "Iniciar Simulação"

**2. Consentimento LGPD**
- Mensagem explicativa
- Botões: Aceitar / Recusar
- Recusa encerra o fluxo com mensagem educada

**3. Coleta de Dados**
- **Nome**: Campo de texto
- **CPF**: Campo com máscara (000.000.000-00)
- **CEP**: Campo com validação (CEPs começando com 13 = RMC válida)
- **Consumo mensal**: Botões rápidos (Até 200kWh, 201-350kWh, etc.)
- **Tipo de imóvel**: Botões (🏠 Residencial / 🏢 Comercial)

**4. Cálculo Automático**
- Fórmula: kWp = consumo ÷ 120
- Bônus +15% para comercial
- Seleção automática do kit ideal via JSON de kits

**5. Resultado Personalizado**
- Mensagem com nome do lead, kWp calculado, kit recomendado e valor

**6. Agendamento**
- Pergunta se quer agendar visita técnica
- Opções de horário (Manhã/Tarde)
- Classificação automática: Quente 🔥 ou Frio ❄️

---

### 📊 Dashboard de Leads

**Funcionalidades:**
- Tabela com todos os leads coletados
- Colunas: Nome, CEP, Kit, Status (Quente/Frio)
- Dados persistidos no navegador (localStorage)
- 3-5 leads fake para demonstração inicial

**Ações mockadas:**
- Botão "Exportar CSV" (gera arquivo fake)
- Botão "Enviar por e-mail" (mostra notificação)
- Filtros por status

---

### 📦 Dados Mockados

**JSON de Kits Solares:**
- Kit 3 kWp - R$ 11.999
- Kit 4 kWp - R$ 13.599
- Kit 5 kWp - R$ 15.999
- Kit 6 kWp - R$ 18.499
- Kit 8 kWp - R$ 21.499
- Kit 10 kWp - R$ 23.999
- Kit 15 kWp - R$ 26.499

---

### ✅ Entregáveis
- MVP 100% funcional no navegador
- Todos os botões operacionais
- Fluxo completo do início ao fim
- Pronto para demo, validação e venda white label

