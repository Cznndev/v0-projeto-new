import type { Product } from "@/contexts/cart-context"

export interface ProductImage {
  url: string
  alt: string
  type?: "main" | "detail" | "usage" | "ingredients"
}

export interface ExtendedProduct extends Product {
  images: ProductImage[]
  features?: string[]
  ingredients?: string[]
  howToUse?: string[]
}

export const products: ExtendedProduct[] = [
  // Canetas Clássicas
  {
    id: "caneta-infinity-preta",
    name: "Infinity Pen Clássica - Preta",
    price: 34.9,
    originalPrice: 49.9,
    description: "Caneta recarregável com tinta infinita e design elegante",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "classico",
    badge: "Mais Vendido",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Pen Clássica - Preta",
        type: "main",
      },
    ],
    features: ["Recarregável", "Tinta Infinita", "Design Premium", "Ponta Precisa"],
    ingredients: ["Tinta Especial", "Corpo em Metal", "Ponta de Titânio", "Clipagem Magnética"],
    howToUse: ["Pressione para escrever", "Recarregue conforme necessário", "Limpe a ponta regularmente", "Guarde em local seco"],
  },
  {
    id: "caneta-infinity-azul",
    name: "Infinity Pen Clássica - Azul",
    price: 34.9,
    originalPrice: 49.9,
    description: "Design elegante com tinta azul infinita",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "classico",
    badge: "",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Pen Clássica - Azul",
        type: "main",
      },
    ],
    features: ["Recarregável", "Tinta Premium", "Escrita Suave", "Ergonômica"],
    ingredients: ["Tinta Azul Infinita", "Corpo em Metal", "Ponta de Titânio", "Clipagem Segura"],
  },
  {
    id: "caneta-infinity-vermelho",
    name: "Infinity Pen Clássica - Vermelho",
    price: 34.9,
    originalPrice: 49.9,
    description: "Caneta com tinta vermelha e corpo premium",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "classico",
    badge: "Novidade",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Pen Clássica - Vermelho",
        type: "main",
      },
    ],
    features: ["Recarregável", "Tinta Vermelha", "Design Elegante", "Ponta Precisa"],
    ingredients: ["Tinta Vermelha", "Metal Premium", "Ponta Magnético"],
  },
  {
    id: "caneta-infinity-bambu",
    name: "Infinity Pen Bambu",
    price: 29.90,
    originalPrice: 49.90,
    description: "Caneta recarregável com corpo em bambu natural e tinta infinita",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "classico",
    badge: "Eco-friendly",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Pen Bambu",
        type: "main",
      },
    ],
    features: ["Recarregável", "Bambu Natural", "Sustentável", "Elegante"],
    ingredients: ["Corpo Bambu", "Tinta Infinita", "Ponta Precisa", "Clipagem Segura"],
  },

  // Canetas Premium
  {
    id: "caneta-executive-gold",
    name: "Infinity Executive - Dourada",
    price: 149.9,
    originalPrice: 199.9,
    description: "Caneta premium com acabamento em ouro e estojo de couro",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "premium",
    badge: "Premium",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Executive - Dourada",
        type: "main",
      },
    ],
    features: ["Acabamento Ouro", "Estojo Couro", "Tinta Infinita", "Presente Perfeito"],
    ingredients: ["Corpo Ouro 24K", "Couro Legítimo", "Tinta Premium", "Ponta Preciosa"],
  },
  {
    id: "caneta-executive-prata",
    name: "Infinity Executive - Prateada",
    price: 149.9,
    originalPrice: 199.9,
    description: "Elegância em prata com tinta infinita de longa duração",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "premium",
    badge: "Premium",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Executive - Prateada",
        type: "main",
      },
    ],
    features: ["Acabamento Prata", "Estojo Premium", "Tinta Infinita", "Recarregável"],
    ingredients: ["Corpo Prata Polida", "Estojo Couro", "Tinta Luxo", "Ponta Precisa"],
  },
  {
    id: "caneta-executive-rosewood",
    name: "Infinity Executive - Madeira de Rosa",
    price: 169.9,
    originalPrice: 219.9,
    description: "Caneta artesanal com corpo em madeira de rosa nobilitada",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "premium",
    badge: "Premium",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Executive - Madeira de Rosa",
        type: "main",
      },
    ],
    features: ["Madeira Natural", "Design Artesanal", "Tinta Infinita", "Edição Limitada"],
    ingredients: ["Madeira de Rosa", "Metal Precioso", "Tinta Premium", "Acabamento Natural"],
  },
  {
    id: "caneta-infinity-elegante",
    name: "Infinity Pen Elegante",
    price: 99.90,
    originalPrice: 149.90,
    description: "Caneta premium com acabamento metálico e design sofisticado",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "premium",
    badge: "Premium",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Pen Elegante",
        type: "main",
      },
    ],
    features: ["Acabamento Premium", "Metal Polido", "Tinta Infinita", "Presente Perfeito"],
    ingredients: ["Corpo Metal Premium", "Acabamento Polido", "Tinta Luxo", "Ponta Preciosa"],
  },

  // Canetas Especiais
  {
    id: "caneta-touch-screen",
    name: "Infinity TouchPen - Digital",
    price: 89.9,
    originalPrice: 119.9,
    description: "Caneta com ponta touchscreen para tablets e smartphones",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "especial",
    badge: "Novidade",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity TouchPen",
        type: "main",
      },
    ],
    features: ["Ponta TouchScreen", "Escreve em Papel", "Compatível com Todos", "Recarregável"],
    ingredients: ["Ponta Capacitiva", "Tinta Infinita", "Bateria Recargável", "Corpo Ergonômico"],
  },
  {
    id: "caneta-fiber-colors",
    name: "Infinity Fiber - 12 Cores",
    price: 67.9,
    originalPrice: 89.9,
    description: "Conjunto com 12 cores diferentes de canetas finebrow",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "especial",
    badge: "Oferta",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Fiber - 12 Cores",
        type: "main",
      },
    ],
    features: ["12 Cores Vibrantes", "Ponta Fina", "Tinta à Base de Água", "Secagem Rápida"],
    ingredients: ["Tinta Biodegradável", "Ponta de Fibra", "Corpo Plástico Reciclado", "Pigmentos Naturais"],
  },
  {
    id: "caneta-gel-metalico",
    name: "Infinity Gel - Metálico",
    price: 59.9,
    originalPrice: 79.9,
    description: "Caneta gel com efeito metálico brilhante",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "especial",
    badge: "",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Gel - Metálico",
        type: "main",
      },
    ],
    features: ["Efeito Metálico", "Escrita Suave", "Tinta Infinita", "Design Moderno"],
    ingredients: ["Tinta Gel Metálica", "Corpo Ergonômico", "Ponta Precisa", "Pigmentos Premium"],
  },
  {
    id: "caneta-infinity-conforto",
    name: "Infinity Pen Conforto",
    price: 49.90,
    originalPrice: 79.90,
    description: "Caneta ergonômica com corpo texturizado para máximo conforto na escrita",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "especial",
    badge: "Ergonômica",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Pen Conforto",
        type: "main",
      },
    ],
    features: ["Ergonômica", "Textura Antideslizante", "Tinta Infinita", "Escrita Confortável"],
    ingredients: ["Corpo Texturizado", "Borracha Antideslizante", "Tinta Premium", "Ponta Precisa"],
  },

  // Canetas para Profissionais
  {
    id: "caneta-architect-pro",
    name: "Infinity Architect Pro",
    price: 129.9,
    originalPrice: 169.9,
    description: "Caneta profissional para arquitetos e designers com traço preciso",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "profissional",
    badge: "Profissional",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Architect Pro",
        type: "main",
      },
    ],
    features: ["Traço 0.5mm", "Tinta Infinita", "Resistente à Água", "Para Projetos"],
    ingredients: ["Tinta à Prova d'Água", "Ponta de Precisão", "Corpo Metal", "Refil Profissional"],
  },
  {
    id: "caneta-calligraphy-set",
    name: "Infinity Calligraphy - Kit Completo",
    price: 199.9,
    originalPrice: 279.9,
    description: "Kit profissional de caligrafia com 5 pontas diferentes",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "profissional",
    badge: "Premium",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Calligraphy Kit",
        type: "main",
      },
    ],
    features: ["5 Pontas", "Tinta Infinita", "Estojo Premium", "Guia de Caligrafia"],
    ingredients: ["Pontas de Diferentes Espessuras", "Tinta Luxuosa", "Estojo de Couro", "Manual Incluso"],
  },
  {
    id: "caneta-signature",
    name: "Infinity Signature - Assinatura",
    price: 89.9,
    originalPrice: 119.9,
    description: "Caneta ideal para assinaturas importantes e documentos",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "profissional",
    badge: "",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Signature",
        type: "main",
      },
    ],
    features: ["Traço Elegante", "Tinta Permanente", "Presença Formal", "Recarregável"],
    ingredients: ["Tinta Indelével", "Ponta Própria para Assinatura", "Corpo Premium", "Clip Decorativo"],
  },
  {
    id: "caneta-infinity-foco",
    name: "Infinity Pen Foco",
    price: 55.00,
    originalPrice: 89.90,
    description: "Caneta com ponta fina para escrita precisa e concentrada",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "profissional",
    badge: "Profissional",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Pen Foco",
        type: "main",
      },
    ],
    features: ["Ponta Fina", "Traço Preciso", "Tinta Infinita", "Para Profissionais"],
    ingredients: ["Corpo Metal", "Ponta Fina Precisa", "Tinta Premium", "Clipagem Magnética"],
  },

  // Kits Especiais
  {
    id: "kit-infinity-complete",
    name: "Kit Completo Infinity",
    price: 399.9,
    originalPrice: 599.9,
    description: "Todos os modelos em um kit exclusivo com estojo de luxo",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "kit",
    badge: "Oferta Especial",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Kit Completo Infinity",
        type: "main",
      },
    ],
    features: ["8 Canetas Diferentes", "Estojo de Couro", "Tinta Infinita", "Apresentação Premium"],
    ingredients: ["Variedade de Cores e Estilos", "Estojo Couro Legítimo", "Acessórios Inclusos", "Certificado de Autenticidade"],
  },
  {
    id: "kit-startup",
    name: "Kit Iniciante Infinity",
    price: 149.9,
    originalPrice: 219.9,
    description: "Kit perfeito para quem está começando com as canetas Infinity",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "kit",
    badge: "Mais Vendido",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Kit Iniciante",
        type: "main",
      },
    ],
    features: ["3 Cores Clássicas", "Estojo Prático", "Guia de Uso", "Refil Bônus"],
    ingredients: ["Canetas Preta, Azul e Vermelha", "Estojo Protetor", "Manual", "Refil Extra"],
  },
  {
    id: "kit-artist-pro",
    name: "Kit Artista Profissional",
    price: 349.9,
    originalPrice: 479.9,
    description: "Kit para artistas com variedade de estilos e pontas",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "kit",
    badge: "Premium",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Kit Artista",
        type: "main",
      },
    ],
    features: ["6 Estilos Diferentes", "Pontas Variadas", "Estojo Premium", "Tinta Infinita"],
    ingredients: ["Canetas Especializadas", "Estojo Couro", "Acessórios Profissionais", "Guia de Técnicas"],
  },
  {
    id: "caneta-infinity-kit-completo",
    name: "Infinity Pen Kit Completo",
    price: 149.90,
    originalPrice: 199.90,
    description: "Kit com caneta, estojo de couro, caderno e chaveiro",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "kit",
    badge: "Oferta Especial",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Pen Kit Completo",
        type: "main",
      },
    ],
    features: ["Caneta Premium", "Estojo Couro", "Caderno Branco", "Chaveiro"],
    ingredients: ["Caneta Metal", "Estojo Couro Legítimo", "Caderno Premium", "Chaveiro Metal"],
  },
  {
    id: "caneta-infinity-cores",
    name: "Infinity Pen - Paleta de Cores",
    price: 89.90,
    originalPrice: 129.90,
    description: "Conjunto com múltiplas cores de canetas Infinity",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "kit",
    badge: "Colorido",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        alt: "Infinity Pen - Paleta de Cores",
        type: "main",
      },
    ],
    features: ["Múltiplas Cores", "Tinta Infinita", "Conjunto Completo", "Versátil"],
    ingredients: ["6 Cores Diferentes", "Tinta Infinita", "Corpos Metal", "Pontas Precisas"],
  },
]

export const categories = [
  { id: "all", name: "Todas as Canetas" },
  { id: "classico", name: "Clássicas" },
  { id: "premium", name: "Premium" },
  { id: "especial", name: "Especiais" },
  { id: "profissional", name: "Profissionais" },
  { id: "kit", name: "Kits" },
]
