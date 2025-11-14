"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/contexts/toast-context"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react"

export function ContatoTab() {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    addToast({
      type: "success",
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em até 24 horas.",
      duration: 5000,
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Telefone",
      info: "(11) 99999-9999",
      description: "Atendimento de segunda a sexta, 9h às 18h",
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email",
      info: "contato@newagemen.com.br",
      description: "Resposta em até 24 horas",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
      title: "WhatsApp",
      info: "(11) 99999-9999",
      description: "Chat direto para dúvidas rápidas",
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-600" />,
      title: "Endereço",
      info: "São Paulo, SP",
      description: "Atendimento presencial com agendamento",
    },
  ]

  const socialMedia = [
    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", handle: "@newagemen", color: "bg-pink-600" },
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", handle: "/newagemen", color: "bg-blue-600" },
    { icon: <Twitter className="w-5 h-5" />, name: "Twitter", handle: "@newagemen", color: "bg-sky-600" },
    { icon: <Youtube className="w-5 h-5" />, name: "YouTube", handle: "/newagemen", color: "bg-red-600" },
  ]

  const faqItems = [
    {
      question: "Qual o prazo de entrega?",
      answer: "Entregamos em todo o Brasil. O prazo varia de 3 a 7 dias úteis, dependendo da sua região.",
    },
    {
      question: "Os produtos são testados dermatologicamente?",
      answer: "Sim! Todos os nossos produtos passam por rigorosos testes dermatológicos antes do lançamento.",
    },
    {
      question: "Posso trocar um produto?",
      answer: "Claro! Você tem até 30 dias para trocar qualquer produto, desde que esteja lacrado.",
    },
    {
      question: "Como escolher o produto ideal para minha pele?",
      answer: "Nossa equipe pode te ajudar! Entre em contato conosco e faremos uma consultoria personalizada.",
    },
  ]

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Entre em Contato</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Estamos aqui para ajudar você a encontrar os melhores produtos para sua pele
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-blue-600" />
                  Envie sua Mensagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nome Completo *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                        placeholder="Seu nome completo"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                        placeholder="seu@email.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                        placeholder="(11) 99999-9999"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Assunto *</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="duvida-produto">Dúvida sobre produto</option>
                        <option value="pedido">Acompanhar pedido</option>
                        <option value="troca-devolucao">Troca/Devolução</option>
                        <option value="consultoria">Consultoria de skincare</option>
                        <option value="parceria">Parceria/Colaboração</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Mensagem *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                      placeholder="Descreva sua dúvida ou mensagem..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 hover:bg-slate-800 py-3">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{contact.title}</h4>
                      <p className="text-slate-900 font-medium">{contact.info}</p>
                      <p className="text-sm text-slate-600">{contact.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-600" />
                  Horário de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Segunda - Sexta</span>
                    <span className="font-medium">9h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sábado</span>
                    <span className="font-medium">9h às 14h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Domingo</span>
                    <span className="font-medium text-red-600">Fechado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Siga-nos nas Redes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialMedia.map((social, index) => (
                    <Button key={index} variant="outline" className="flex items-center gap-2 p-3 h-auto">
                      <div
                        className={`w-8 h-8 ${social.color} rounded-full flex items-center justify-center text-white`}
                      >
                        {social.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium">{social.name}</div>
                        <div className="text-xs text-slate-600">{social.handle}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Perguntas Frequentes</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">{faq.question}</h4>
                      <p className="text-slate-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <CardContent className="py-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Precisa de Ajuda Imediata?</h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Nossa equipe de especialistas está pronta para ajudar você a escolher os produtos ideais para sua pele
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
                <Button size="lg" variant="outline" className="border-slate-400 text-slate-300 hover:bg-slate-800">
                  <Phone className="w-5 h-5 mr-2" />
                  Ligar Agora
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
