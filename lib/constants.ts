export const SITE_CONFIG = {
  name: "New Age Men",
  description: "Skincare masculino premium com serviços estéticos especializados",
  url: "https://nam-skincare.vercel.app",
  ogImage: "/images/nam-logo.png",
  links: {
    instagram: "https://instagram.com/newagemen",
    whatsapp: "https://wa.me/5511999999999",
    email: "contato@newagemen.com.br",
  },
}

export const SHIPPING_CONFIG = {
  freeShippingThreshold: 150,
  defaultShippingCost: 15,
  estimatedDays: "3-5 dias úteis",
}

export const APPOINTMENT_CONFIG = {
  workingHours: {
    start: 9,
    end: 18,
  },
  workingDays: [1, 2, 3, 4, 5, 6], // Monday to Saturday
  slotDuration: 60, // minutes
  maxAdvanceDays: 30,
}
