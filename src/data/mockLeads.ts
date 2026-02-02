import { Lead } from "@/types/lead";

export const mockLeads: Lead[] = [
  {
    id: "1",
    nome: "João Silva",
    cpf: "123.456.789-00",
    whatsapp: "(19) 99123-4567",
    cep: "13045-000",
    endereco: "Rua das Flores",
    numero: "123",
    bairro: "Jardim Primavera",
    consumo: 300,
    tipoImovel: "residencial",
    kwp: 2.5,
    kitNome: "Kit Solar 3 kWp",
    kitValor: 11999,
    status: "quente",
    horarioAgendamento: "manha",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    cpf: "987.654.321-00",
    whatsapp: "(19) 98765-4321",
    cep: "13070-123",
    endereco: "Av. Brasil",
    numero: "456",
    bairro: "Centro",
    consumo: 450,
    tipoImovel: "comercial",
    kwp: 4.3,
    kitNome: "Kit Solar 4 kWp",
    kitValor: 13599,
    status: "quente",
    horarioAgendamento: "tarde",
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    nome: "Carlos Santos",
    cpf: "456.789.123-00",
    whatsapp: "(19) 97654-3210",
    cep: "13025-456",
    endereco: "Rua dos Ipês",
    numero: "789",
    bairro: "Vila Nova",
    consumo: 180,
    tipoImovel: "residencial",
    kwp: 1.5,
    kitNome: "Kit Solar 3 kWp",
    kitValor: 11999,
    status: "frio",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "4",
    nome: "Ana Costa",
    cpf: "321.654.987-00",
    whatsapp: "(19) 99876-5432",
    cep: "13090-789",
    endereco: "Rua das Palmeiras",
    numero: "1010",
    bairro: "Jardim Europa",
    consumo: 650,
    tipoImovel: "comercial",
    kwp: 6.2,
    kitNome: "Kit Solar 6 kWp",
    kitValor: 18499,
    status: "quente",
    horarioAgendamento: "manha",
    createdAt: new Date("2024-01-22"),
  },
  {
    id: "5",
    nome: "Pedro Ferreira",
    cpf: "654.321.987-00",
    whatsapp: "(19) 98234-5678",
    cep: "13100-000",
    endereco: "Av. Independência",
    numero: "222",
    bairro: "Taquaral",
    consumo: 300,
    tipoImovel: "residencial",
    kwp: 2.5,
    kitNome: "Kit Solar 3 kWp",
    kitValor: 11999,
    status: "frio",
    createdAt: new Date("2024-01-25"),
  },
];

const LEADS_STORAGE_KEY = "zap_solar_leads";

export const getStoredLeads = (): Lead[] => {
  const stored = localStorage.getItem(LEADS_STORAGE_KEY);
  if (stored) {
    const leads = JSON.parse(stored);
    return leads.map((lead: Lead) => ({
      ...lead,
      createdAt: new Date(lead.createdAt),
    }));
  }
  // Initialize with mock leads
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(mockLeads));
  return mockLeads;
};

export const saveLead = (lead: Lead): void => {
  const leads = getStoredLeads();
  leads.push(lead);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
};

export const clearLeads = (): void => {
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(mockLeads));
};
