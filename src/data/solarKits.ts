export interface SolarKit {
  id: number;
  nome: string;
  kwp_min: number;
  kwp_max: number;
  valor: number;
}

export const solarKits: SolarKit[] = [
  { id: 1, nome: "Kit Solar 3 kWp", kwp_min: 0, kwp_max: 3.5, valor: 11999 },
  { id: 2, nome: "Kit Solar 4 kWp", kwp_min: 3.6, kwp_max: 4.5, valor: 13599 },
  { id: 3, nome: "Kit Solar 5 kWp", kwp_min: 4.6, kwp_max: 5.5, valor: 15999 },
  { id: 4, nome: "Kit Solar 6 kWp", kwp_min: 5.6, kwp_max: 6.5, valor: 18499 },
  { id: 5, nome: "Kit Solar 8 kWp", kwp_min: 6.6, kwp_max: 8.5, valor: 21499 },
  { id: 6, nome: "Kit Solar 10 kWp", kwp_min: 8.6, kwp_max: 10.5, valor: 23999 },
  { id: 7, nome: "Kit Solar 15 kWp", kwp_min: 10.6, kwp_max: 99, valor: 26499 },
];

export const consumoOptions = [
  { label: "Até 200 kWh", value: 180 },
  { label: "201 – 350 kWh", value: 300 },
  { label: "351 – 500 kWh", value: 450 },
  { label: "Acima de 500 kWh", value: 650 },
];

export const findKitByKwp = (kwp: number): SolarKit => {
  const kit = solarKits.find((k) => kwp >= k.kwp_min && kwp <= k.kwp_max);
  return kit || solarKits[solarKits.length - 1];
};

export const calculateKwp = (consumo: number, isComercial: boolean): number => {
  let kwp = consumo / 120;
  if (isComercial) {
    kwp *= 1.15;
  }
  return Math.round(kwp * 10) / 10;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value);
};
