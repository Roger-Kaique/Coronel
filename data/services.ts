export interface BarberService {
  id: string;
  name: string;
  price: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  services: BarberService[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "cortes",
    name: "Cortes",
    services: [{ id: "corte", name: "Corte", price: 40 }],
  },
  {
    id: "barba",
    name: "Barba",
    services: [{ id: "barba", name: "Barba", price: 20 }],
  },
  {
    id: "coloracao-transformacao",
    name: "Coloração e transformação",
    services: [
      { id: "coloracao", name: "Coloração", price: 25 },
      { id: "platinado", name: "Platinado", price: 150 },
      { id: "luzes", name: "Luzes", price: 120 },
      { id: "relaxamento", name: "Relaxamento", price: 25 },
    ],
  },
  {
    id: "acabamentos",
    name: "Acabamentos",
    services: [{ id: "sobrancelha", name: "Sobrancelha", price: 10 }],
  },
];
