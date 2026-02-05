export interface Lead {
  id: string;
  nome: string;
  cpf: string;
  whatsapp: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  consumo: number;
  tipoImovel: "residencial" | "comercial";
  kwp: number;
  kitNome: string;
  kitValor: number;
  fase?: "monofasico" | "bifasico" | "trifasico";
  tensao?: "110v" | "220v" | "380v";
  tipoTelhado?: "ceramica" | "concreto" | "fibrocimento" | "metalica";
  estruturaTelhado?: "metal" | "madeira" | "concreto";
  consumoMedioKwh?: number;
  status: "quente" | "frio";
  horarioAgendamento?: "manha" | "tarde";
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

export type ChatStep =
  | "welcome"
  | "lgpd"
  | "nome"
  | "cpf"
  | "whatsapp"
  | "cep"
  | "endereco"
  | "numero"
  | "bairro"
  | "consumo"
  | "tipo_imovel"
  | "fase"
  | "tensao"
  | "tipo_telhado"
  | "estrutura_telhado"
  | "consumo_medio"
  | "resultado"
  | "agendamento"
  | "horario"
  | "finalizado"
  | "recusado";
