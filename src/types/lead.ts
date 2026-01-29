export interface Lead {
  id: string;
  nome: string;
  cpf: string;
  cep: string;
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
  | "cep"
  | "consumo"
  | "tipo_imovel"
  | "resultado"
  | "agendamento"
  | "horario"
  | "finalizado"
  | "recusado";
