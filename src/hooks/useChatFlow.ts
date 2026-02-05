import { useState, useCallback, useRef, useEffect } from "react";
import { ChatMessage, ChatStep, Lead } from "@/types/lead";
import { calculateKwp, findKitByKwp, formatCurrency, consumoOptions, estimateSavings } from "@/data/solarKits";
import { saveLead } from "@/data/mockLeads";

interface LeadData {
  nome: string;
  cpf: string;
  whatsapp: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  consumo: number;
  tipoImovel: "residencial" | "comercial";
  fase?: "monofasico" | "bifasico" | "trifasico";
  tensao?: "110v" | "220v" | "380v";
  tipoTelhado?: "ceramica" | "concreto" | "fibrocimento" | "metalica";
  estruturaTelhado?: "metal" | "madeira" | "concreto";
  consumoMedioKwh?: number; // média mensal em kWh (soma 12 meses / 12)
}

interface ChatFlowState {
  messages: ChatMessage[];
  step: ChatStep;
  leadData: Partial<LeadData>;
  isTyping: boolean;
  inputType: "text" | "cpf" | "cep" | "phone" | "buttons" | "none";
  buttons: { label: string; value: string }[];
}

const TYPING_DELAY = 1200;

const createMessage = (type: "bot" | "user", content: string): ChatMessage => ({
  id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  type,
  content,
  timestamp: new Date(),
});

export const useChatFlow = () => {
  const [state, setState] = useState<ChatFlowState>({
    messages: [],
    step: "welcome",
    leadData: {},
    isTyping: false,
    inputType: "none",
    buttons: [],
  });

  const timeoutRef = useRef<NodeJS.Timeout>();

  const addBotMessage = useCallback((content: string, callback?: () => void) => {
    setState((prev) => ({ ...prev, isTyping: true, inputType: "none", buttons: [] }));
    
    timeoutRef.current = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isTyping: false,
        messages: [...prev.messages, createMessage("bot", content)],
      }));
      callback?.();
    }, TYPING_DELAY);
  }, []);

  const addUserMessage = useCallback((content: string) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, createMessage("user", content)],
    }));
  }, []);

  const setInputType = useCallback((
    inputType: ChatFlowState["inputType"],
    buttons: ChatFlowState["buttons"] = []
  ) => {
    setState((prev) => ({ ...prev, inputType, buttons }));
  }, []);

  const startChat = useCallback(() => {
    addBotMessage(
      "Olá 👋 Sou o assistente da Zap Solar ☀️\n\nVou te ajudar a simular seu sistema fotovoltaico em menos de 2 minutos!",
      () => {
        setState((prev) => ({ ...prev, step: "welcome" }));
        setInputType("buttons", [{ label: "▶️ Iniciar Simulação", value: "start" }]);
      }
    );
  }, [addBotMessage, setInputType]);

  const handleWelcome = useCallback(() => {
    addUserMessage("▶️ Iniciar Simulação");
    addBotMessage(
      "Antes de continuar, precisamos do seu consentimento para uso dos dados conforme a LGPD (Lei Geral de Proteção de Dados).\n\nSeus dados serão usados apenas para gerar sua simulação personalizada.",
      () => {
        setState((prev) => ({ ...prev, step: "lgpd" }));
        setInputType("buttons", [
          { label: "✅ Aceito", value: "accept" },
          { label: "❌ Não aceito", value: "reject" },
        ]);
      }
    );
  }, [addUserMessage, addBotMessage, setInputType]);

  const handleLgpd = useCallback((accepted: boolean) => {
    addUserMessage(accepted ? "✅ Aceito" : "❌ Não aceito");
    
    if (!accepted) {
      addBotMessage(
        "Entendemos sua decisão! 🙏\n\nSe mudar de ideia, estamos aqui para ajudar. Até breve! ☀️",
        () => {
          setState((prev) => ({ ...prev, step: "recusado", inputType: "none" }));
        }
      );
      return;
    }

    addBotMessage("Ótimo! Vamos começar 😄\n\nQual é o seu nome?", () => {
      setState((prev) => ({ ...prev, step: "nome" }));
      setInputType("text");
    });
  }, [addUserMessage, addBotMessage, setInputType]);

  const handleNome = useCallback((nome: string) => {
    addUserMessage(nome);
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, nome } }));
    
    addBotMessage(`Prazer, ${nome}! 👋\n\nAgora, qual é o seu CPF?`, () => {
      setState((prev) => ({ ...prev, step: "cpf" }));
      setInputType("cpf");
    });
  }, [addUserMessage, addBotMessage, setInputType]);

  const handleCpf = useCallback((cpf: string) => {
    addUserMessage(cpf);
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, cpf } }));
    
    addBotMessage("Perfeito! 📱\n\nQual é o seu número de WhatsApp?", () => {
      setState((prev) => ({ ...prev, step: "whatsapp" }));
      setInputType("phone");
    });
  }, [addUserMessage, addBotMessage, setInputType]);

  const handleWhatsapp = useCallback((whatsapp: string) => {
    addUserMessage(whatsapp);
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, whatsapp } }));
    
    addBotMessage("Ótimo! 📍\n\nQual é o CEP do imóvel onde será instalado o sistema solar?", () => {
      setState((prev) => ({ ...prev, step: "cep" }));
      setInputType("cep");
    });
  }, [addUserMessage, addBotMessage, setInputType]);

  const handleCep = useCallback((cep: string) => {
    addUserMessage(cep);
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, cep } }));
    
    const isRmc = cep.startsWith("13");
    const cepMessage = isRmc
      ? "Excelente! Você está na região de Campinas, onde atendemos! 🎯"
      : "Notamos que você está fora da RMC, mas vamos continuar sua simulação! 📊";

    addBotMessage(`${cepMessage}\n\nAgora me diga o nome da rua/avenida:`, () => {
      setState((prev) => ({ ...prev, step: "endereco" }));
      setInputType("text");
    });
  }, [addUserMessage, addBotMessage, setInputType]);

  const handleEndereco = useCallback((endereco: string) => {
    addUserMessage(endereco);
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, endereco } }));
    
    addBotMessage("Qual é o número do imóvel? 🏠", () => {
      setState((prev) => ({ ...prev, step: "numero" }));
      setInputType("text");
    });
  }, [addUserMessage, addBotMessage, setInputType]);

  const handleNumero = useCallback((numero: string) => {
    addUserMessage(numero);
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, numero } }));
    
    addBotMessage("E qual é o bairro? 📍", () => {
      setState((prev) => ({ ...prev, step: "bairro" }));
      setInputType("text");
    });
  }, [addUserMessage, addBotMessage, setInputType]);

  const handleBairro = useCallback((bairro: string) => {
    addUserMessage(bairro);
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, bairro } }));
    
    addBotMessage("Perfeito! 📊\n\nQual é a média do seu consumo mensal de energia?", () => {
      setState((prev) => ({ ...prev, step: "consumo" }));
      setInputType("buttons", consumoOptions.map((opt) => ({
        label: opt.label,
        value: opt.value.toString(),
      })));
    });
  }, [addUserMessage, addBotMessage, setInputType]);

  const handleConsumo = useCallback((consumoStr: string, label: string) => {
    const consumo = parseInt(consumoStr);
    addUserMessage(label);
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, consumo } }));
    
    addBotMessage("Qual é o tipo do seu imóvel?", () => {
      setState((prev) => ({ ...prev, step: "tipo_imovel" }));
      setInputType("buttons", [
        { label: "🏠 Residencial", value: "residencial" },
        { label: "🏢 Comercial", value: "comercial" },
      ]);
    });
  }, [addUserMessage, addBotMessage, setInputType]);

  const handleTipoImovel = useCallback((tipo: "residencial" | "comercial", label: string) => {
    addUserMessage(label);
    // After choosing property type, collect electrical and roof details before calculating kit
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, tipoImovel: tipo }, step: "fase" }));
    setInputType("buttons", [
      { label: "⚡ Monofásico", value: "monofasico" },
      { label: "⚡⚡ Bifásico", value: "bifasico" },
      { label: "⚡⚡⚡ Trifásico", value: "trifasico" },
    ]);
  }, [addBotMessage, setInputType]);

  const handleFase = useCallback((fase: string, label: string) => {
    addUserMessage(label);
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, fase: fase as any }, step: "tensao" }));
    setInputType("buttons", [
      { label: "110v", value: "110v" },
      { label: "220v", value: "220v" },
      { label: "380v", value: "380v" },
    ]);
  }, [addUserMessage, setInputType]);

  const handleTensao = useCallback((tensao: string, label: string) => {
    addUserMessage(label);
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, tensao: tensao as any }, step: "tipo_telhado" }));
    setInputType("buttons", [
      { label: "Cerâmica", value: "ceramica" },
      { label: "Concreto", value: "concreto" },
      { label: "Fibrocimento", value: "fibrocimento" },
      { label: "Metálica", value: "metalica" },
    ]);
  }, [addUserMessage, setInputType]);

  const handleTipoTelhado = useCallback((tipo: string, label: string) => {
    addUserMessage(label);
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, tipoTelhado: tipo as any }, step: "estrutura_telhado" }));
    setInputType("buttons", [
      { label: "Metal", value: "metal" },
      { label: "Madeira", value: "madeira" },
      { label: "Concreto", value: "concreto" },
    ]);
  }, [addUserMessage, setInputType]);

  const handleEstruturaTelhado = useCallback((estrutura: string, label: string) => {
    addUserMessage(label);
    // Ask for the average monthly consumption in kWh (soma 12 meses / 12)
    addBotMessage("Agora informe a média do seu consumo mensal em kWh (soma dos últimos 12 meses / 12). Ex: 450", () => {
      setState((prev) => ({ ...prev, step: "consumo_medio" }));
      setInputType("text");
    });
    setState((prev) => ({ ...prev, leadData: { ...prev.leadData, estruturaTelhado: estrutura as any } }));
  }, [addUserMessage, addBotMessage, setInputType]);

  const handleConsumoMedio = useCallback((text: string) => {
    // numeric value expected
    const consumoMedioKwh = parseFloat(text.replace(/[^0-9\.]/g, "")) || 0;
    addUserMessage(text);

    setState((prev) => {
      const leadData = { ...prev.leadData, consumoMedioKwh } as any;
      const isComercial = leadData.tipoImovel === "comercial";
      // calculate recommended kWp based on provided average consumption
      const kwp = calculateKwp(consumoMedioKwh, isComercial);
      const kit = findKitByKwp(kwp);
      const savings = estimateSavings(consumoMedioKwh, 0.9, 0.85); // 90% offset, R$0.85/kWh default

      // save lead and show pre-orçamento
      setTimeout(() => {
        addBotMessage(
          `Perfeito! ✅\n\nCom média de consumo de ${consumoMedioKwh} kWh/mês, estimamos um sistema de ~${kwp} kWp.\n\n👉 Recomendamos o *${kit.nome}* com investimento estimado de ${formatCurrency(kit.valor)}.\n\nEconomia estimada: ${formatCurrency(savings.economiaMensal)} / mês • ${formatCurrency(savings.economiaAnual)} / 12 meses.\n\nPodendo financiar em até 24 meses (mediante análise de crédito).`,
          () => {
            setState((prev) => ({ ...prev, step: "agendamento" }));
            setInputType("buttons", [
              { label: "📅 Sim, quero agendar!", value: "agendar" },
              { label: "❌ Não, obrigado", value: "nao" },
            ]);
          }
        );
      }, 200);

      return {
        ...prev,
        leadData: {
          ...leadData,
          kwp,
          kitNome: kit.nome,
          kitValor: kit.valor,
        } as any,
      };
    });
  }, [addUserMessage, addBotMessage]);

  const handleAgendamento = useCallback((quer: boolean) => {
    addUserMessage(quer ? "📅 Sim, quero agendar!" : "❌ Não, obrigado");

    if (!quer) {
      setState((prev) => {
        const lead: Lead = {
          id: Date.now().toString(),
          nome: prev.leadData.nome || "",
          cpf: prev.leadData.cpf || "",
          whatsapp: prev.leadData.whatsapp || "",
          cep: prev.leadData.cep || "",
          endereco: prev.leadData.endereco || "",
          numero: prev.leadData.numero || "",
          bairro: prev.leadData.bairro || "",
          consumo: prev.leadData.consumo || 0,
          tipoImovel: prev.leadData.tipoImovel || "residencial",
          kwp: (prev.leadData as any).kwp || 0,
          kitNome: (prev.leadData as any).kitNome || "",
          kitValor: (prev.leadData as any).kitValor || 0,
          fase: (prev.leadData as any).fase,
          tensao: (prev.leadData as any).tensao,
          tipoTelhado: (prev.leadData as any).tipoTelhado,
          estruturaTelhado: (prev.leadData as any).estruturaTelhado,
          consumoMedioKwh: (prev.leadData as any).consumoMedioKwh,
          status: "frio",
          createdAt: new Date(),
        };
        saveLead(lead);
        return prev;
      });

      addBotMessage(
        "Sem problemas! 😊\n\nSua simulação foi salva. Se tiver interesse futuramente, é só nos chamar!\n\n☀️ Obrigado por usar a Zap Solar!",
        () => {
          setState((prev) => ({ ...prev, step: "finalizado", inputType: "none" }));
        }
      );
      return;
    }

    addBotMessage("Ótimo! 🎉\n\nQual horário é melhor para você?", () => {
      setState((prev) => ({ ...prev, step: "horario" }));
      setInputType("buttons", [
        { label: "🌅 Manhã (8h - 12h)", value: "manha" },
        { label: "🌇 Tarde (13h - 18h)", value: "tarde" },
      ]);
    });
  }, [addUserMessage, addBotMessage, setInputType]);

  const handleHorario = useCallback((horario: "manha" | "tarde", label: string) => {
    addUserMessage(label);

    setState((prev) => {
      const lead: Lead = {
        id: Date.now().toString(),
        nome: prev.leadData.nome || "",
        cpf: prev.leadData.cpf || "",
        whatsapp: prev.leadData.whatsapp || "",
        cep: prev.leadData.cep || "",
        endereco: prev.leadData.endereco || "",
        numero: prev.leadData.numero || "",
        bairro: prev.leadData.bairro || "",
        consumo: prev.leadData.consumo || 0,
        tipoImovel: prev.leadData.tipoImovel || "residencial",
        kwp: (prev.leadData as any).kwp || 0,
        kitNome: (prev.leadData as any).kitNome || "",
        kitValor: (prev.leadData as any).kitValor || 0,
        fase: (prev.leadData as any).fase,
        tensao: (prev.leadData as any).tensao,
        tipoTelhado: (prev.leadData as any).tipoTelhado,
        estruturaTelhado: (prev.leadData as any).estruturaTelhado,
        consumoMedioKwh: (prev.leadData as any).consumoMedioKwh,
        status: "quente",
        horarioAgendamento: horario,
        createdAt: new Date(),
      };
      saveLead(lead);
      return prev;
    });

    addBotMessage(
      "Perfeito! ✅\n\nSua visita técnica foi agendada. Nossa equipe entrará em contato em breve para confirmar a data.\n\n☀️ Obrigado por escolher a Zap Solar! Até breve!",
      () => {
        setState((prev) => ({ ...prev, step: "finalizado", inputType: "none" }));
      }
    );
  }, [addUserMessage, addBotMessage]);

  const handleButtonClick = useCallback((value: string, label: string) => {
    switch (state.step) {
      case "welcome":
        handleWelcome();
        break;
      case "lgpd":
        handleLgpd(value === "accept");
        break;
      case "consumo":
        handleConsumo(value, label);
        break;
      case "fase":
        handleFase(value, label);
        break;
      case "tensao":
        handleTensao(value, label);
        break;
      case "tipo_telhado":
        handleTipoTelhado(value, label);
        break;
      case "estrutura_telhado":
        handleEstruturaTelhado(value, label);
        break;
      case "tipo_imovel":
        handleTipoImovel(value as "residencial" | "comercial", label);
        break;
      case "agendamento":
        handleAgendamento(value === "agendar");
        break;
      case "horario":
        handleHorario(value as "manha" | "tarde", label);
        break;
    }
  }, [state.step, handleWelcome, handleLgpd, handleConsumo, handleTipoImovel, handleAgendamento, handleHorario]);

  const handleTextInput = useCallback((text: string) => {
    switch (state.step) {
      case "nome":
        handleNome(text);
        break;
      case "cpf":
        handleCpf(text);
        break;
      case "whatsapp":
        handleWhatsapp(text);
        break;
      case "cep":
        handleCep(text);
        break;
      case "endereco":
        handleEndereco(text);
        break;
      case "numero":
        handleNumero(text);
        break;
      case "bairro":
        handleBairro(text);
        break;
      case "consumo_medio":
        handleConsumoMedio(text);
        break;
    }
  }, [state.step, handleNome, handleCpf, handleWhatsapp, handleCep, handleEndereco, handleNumero, handleBairro]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    messages: state.messages,
    isTyping: state.isTyping,
    inputType: state.inputType,
    buttons: state.buttons,
    step: state.step,
    startChat,
    handleButtonClick,
    handleTextInput,
  };
};
