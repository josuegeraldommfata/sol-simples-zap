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
  | "resultado"
  | "agendamento"
  | "horario"
  | "finalizado"
  | "recusado";
