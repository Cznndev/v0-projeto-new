"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppointmentModal } from "@/components/appointment/appointment-modal"
import {
  Sparkles,
  Zap,
  Droplets,
  Wind,
  Star,
  Flame,
  Shield,
  Clock,
  Award,
  Phone,
  Calendar,
  ChevronRight,
} from "lucide-react"

const services = [
  {
    id: "1",
    name: "Peeling Químico",
    description: "Renovação celular profunda para uma pele mais jovem e uniforme",
    price: 180,
    duration: 45,
    icon: Sparkles,
    category: "Renovação",
    benefits: ["Remove células mortas", "Uniformiza o tom", "Reduz manchas", "Estimula colágeno"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "2",
    name: "Peeling de Diamante",
    description: "Microdermoabrasão com cristais de diamante para renovação celular",
    price: 150,
    duration: 40,
    icon: Star,
    category: "Renovação",
    benefits: ["Esfoliação profunda", "Pele mais lisa", "Reduz poros", "Melhora textura"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "3",
    name: "Limpeza de Pele",
    description: "Limpeza profunda com extração de cravos e hidratação",
    price: 120,
    duration: 60,
    icon: Droplets,
    category: "Limpeza",
    benefits: ["Remove impurezas", "Desobstrui poros", "Hidrata profundamente", "Previne acne"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "4",
    name: "Limpeza com Hidrosucção",
    description: "Limpeza avançada com tecnologia de hidrosucção",
    price: 160,
    duration: 50,
    icon: Wind,
    category: "Limpeza",
    benefits: ["Sucção de impurezas", "Hidratação intensa", "Pele mais macia", "Resultado imediato"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "5",
    name: "Revitalização Facial",
    description: "Tratamento completo para revitalizar e rejuvenescer a pele",
    price: 200,
    duration: 70,
    icon: Zap,
    category: "Anti-Aging",
    benefits: ["Estimula colágeno", "Reduz rugas", "Melhora elasticidade", "Efeito lifting"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "6",
    name: "Jato de Plasma",
    description: "Tecnologia avançada para rejuvenescimento sem cirurgia",
    price: 300,
    duration: 45,
    icon: Flame,
    category: "Anti-Aging",
    benefits: ["Lifting não cirúrgico", "Reduz flacidez", "Estimula colágeno", "Resultados duradouros"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "7",
    name: "Skinbooster",
    description: "Hidratação profunda com ácido hialurônico",
    price: 250,
    duration: 30,
    icon: Droplets,
    category: "Hidratação",
    benefits: ["Hidratação intensa", "Melhora elasticidade", "Pele mais jovem", "Efeito natural"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "8",
    name: "Microagulhamento",
    description: "Estimulação do colágeno através de microagulhas",
    price: 180,
    duration: 50,
    icon: Shield,
    category: "Renovação",
    benefits: ["Estimula colágeno", "Reduz cicatrizes", "Melhora textura", "Uniformiza tom"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "9",
    name: "Anti-Aging",
    description: "Protocolo completo contra o envelhecimento",
    price: 280,
    duration: 80,
    icon: Award,
    category: "Anti-Aging",
    benefits: ["Reduz rugas", "Melhora firmeza", "Uniformiza tom", "Efeito rejuvenescedor"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "10",
    name: "Drenagem Linfática Facial",
    description: "Massagem especializada para reduzir inchaço e toxinas",
    price: 140,
    duration: 45,
    icon: Wind,
    category: "Relaxamento",
    benefits: ["Reduz inchaço", "Melhora circulação", "Efeito relaxante", "Desintoxica"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "11",
    name: "Hidrabalm Lips",
    description: "Tratamento especializado para hidratação labial",
    price: 80,
    duration: 20,
    icon: Droplets,
    category: "Hidratação",
    benefits: ["Hidrata lábios", "Reduz ressecamento", "Efeito volumizador", "Proteção UV"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "12",
    name: "Bio Estimulador Sculptra",
    description: "Estimulação natural do colágeno para resultados duradouros",
    price: 400,
    duration: 40,
    icon: Star,
    category: "Anti-Aging",
    benefits: ["Estimula colágeno", "Resultados graduais", "Efeito natural", "Longa duração"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=center&q=80",
  },
]

const categories = ["Todos", "Renovação", "Limpeza", "Anti-Aging", "Hidratação", "Relaxamento"]

export function ServicosTab() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [appointmentModal, setAppointmentModal] = useState<{
    isOpen: boolean
    service?: (typeof services)[0]
  }>({ isOpen: false })

  const filteredServices =
    selectedCategory === "Todos" ? services : services.filter((service) => service.category === selectedCategory)

  const handleSchedule = (service: (typeof services)[0]) => {
    setAppointmentModal({ isOpen: true, service })
  }

  const closeAppointmentModal = () => {
    setAppointmentModal({ isOpen: false })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-nam-navy mb-4">Nossos Serviços</h2>
        <p className="text-xl text-nam-gray-medium max-w-3xl mx-auto">
          Tratamentos estéticos especializados para o homem moderno. Tecnologia avançada e resultados comprovados.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`${
              selectedCategory === category
                ? "bg-nam-teal hover:bg-nam-blue text-white"
                : "border-nam-gray-medium text-nam-gray-dark hover:bg-nam-teal hover:text-white"
            } transition-all duration-300`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredServices.map((service, index) => {
          const IconComponent = service.icon
          return (
            <Card
              key={service.id}
              className="group hover:shadow-xl transition-all duration-300 border-nam-gray-light hover:border-nam-teal animate-slide-in-bottom"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="relative overflow-hidden">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nam-navy/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-nam-teal text-white">{service.category}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="w-5 h-5" />
                      <span className="font-semibold">R$ {service.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm opacity-90">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration} min</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-nam-navy group-hover:text-nam-teal transition-colors">
                  {service.name}
                </CardTitle>
                <CardDescription className="text-nam-gray-medium">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-nam-navy mb-2">Benefícios:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-sm text-nam-gray-medium">
                          <ChevronRight className="w-3 h-3 text-nam-teal" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleSchedule(service)}
                      className="flex-1 bg-nam-teal hover:bg-nam-blue text-white transition-colors"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
                      className="border-nam-teal text-nam-teal hover:bg-nam-teal hover:text-white"
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-nam-navy to-nam-blue rounded-2xl p-8 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">Pronto para Transformar sua Pele?</h3>
        <p className="text-xl mb-6 text-nam-gray-light">Agende sua consulta e descubra o tratamento ideal para você</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-nam-teal hover:bg-nam-teal/90 text-white px-8"
            onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
          >
            <Phone className="w-5 h-5 mr-2" />
            WhatsApp
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-nam-navy px-8"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Ver Agenda
          </Button>
        </div>
      </div>

      {/* Appointment Modal */}
      {appointmentModal.service && (
        <AppointmentModal
          isOpen={appointmentModal.isOpen}
          onClose={closeAppointmentModal}
          serviceId={appointmentModal.service.id}
          serviceName={appointmentModal.service.name}
          servicePrice={appointmentModal.service.price}
          serviceDuration={appointmentModal.service.duration}
        />
      )}
    </div>
  )
}
