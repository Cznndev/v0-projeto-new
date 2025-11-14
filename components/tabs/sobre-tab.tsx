"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Award, Truck, Users, Heart, Leaf, CheckCircle, Calendar, MapPin } from 'lucide-react'

export function SobreTab() {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Qualidade Premium",
      description: "Cada caneta é feita com materiais de excelência internacional",
    },
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      title: "Tinta Infinita",
      description: "Tecnologia única que oferece escrita contínua e sem limite",
    },
    {
      icon: <Truck className="w-6 h-6 text-purple-600" />,
      title: "Entrega Rápida",
      description: "Receba suas canetas em casa com frete grátis acima de R$ 150",
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      title: "Recarregável",
      description: "Canetas sustentáveis que reduzem desperdício de plástico",
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      title: "Design Ergonômico",
      description: "Confortáveis para uso prolongado em qualquer atividade",
    },
    {
      icon: <Heart className="w-6 h-6 text-red-600" />,
      title: "Garantia Vitalícia",
      description: "Assistência técnica permanente e reposição de peças",
    },
  ]

  const timeline = [
    {
      year: "2018",
      title: "Conceito Inovador",
      description: "Nasceu a ideia da caneta com tinta infinita e recarregável",
    },
    {
      year: "2019",
      title: "Desenvolvimento da Tecnologia",
      description: "Criamos a fórmula única que permite escrita sem limite",
    },
    {
      year: "2021",
      title: "Lançamento da Marca",
      description: "InfinityPen é apresentada ao mercado com grande aceitação",
    },
    {
      year: "2022",
      title: "Expansão Global",
      description: "Consolidamos nossa posição como marca inovadora internacionalmente",
    },
    {
      year: "2024",
      title: "Nova Era de Escrita",
      description: "Reinventamos a forma como as pessoas escrevem todos os dias",
    },
  ]

  const stats = [
    { number: "500K+", label: "Clientes Globais" },
    { number: "25", label: "Modelos Únicos" },
    { number: "4.9", label: "Avaliação Média" },
    { number: "95%", label: "Recomendação" },
  ]

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-slate-100 text-slate-900">Nossa História</Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            <span className="text-blue-600">InfinityPen</span> — Escrita Sem Limites
          </h2>
          <div className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed space-y-6">
            <p>
              InfinityPen nasceu da crença de que a escrita é um ato infinito e importante.
              <strong className="text-slate-800">
                {" "}
                Revolucionamos a indústria de canetas com uma tecnologia que permite escrever sem se preocupar com o fim.
              </strong>
            </p>
            <p>
              Enquanto o mercado oferecia canetas descartáveis, identificamos uma oportunidade clara:
              <strong className="text-slate-800">
                {" "}
                criar canetas premium, recarregáveis e com tinta verdadeiramente infinita.
              </strong>
            </p>
            <p>
              A proposta da InfinityPen é simples mas transformadora:
              <strong className="text-blue-600">
                {" "}
                democratizar o acesso a canetas de qualidade excepcional, permitindo que todos desfrutem de uma experiência de escrita perfeita.
              </strong>
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg">
              <CardContent className="py-8">
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Escrita Perfeita, Sempre</h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Desenvolvemos uma experiência completa de escrita que combina inovação tecnológica, design elegante e sustentabilidade. Cada caneta InfinityPen é feita para durar e oferecer o melhor desempenho em qualquer situação.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700">Tecnologia de tinta infinita patenteada</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700">Designs para todos os estilos e profissões</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700">Sustentáveis e 100% recarregáveis</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700">Garantia vitalícia incluída</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=600&h=500&fit=crop&crop=center&q=80"
              alt="Canetas InfinityPen Premium"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-slate-900">Inovadores</span>
              </div>
              <p className="text-sm text-slate-600">Canetas com tinta infinita</p>
            </div>
          </div>
        </div>

        {/* Company Logo Section */}
        <div className="text-center mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">InfinityPen</h3>
            <p className="text-slate-600 leading-relaxed">
              Mais que uma caneta, uma experiência de escrita revolucionária. InfinityPen acredita que a qualidade, o design e a inovação devem estar ao alcance de todos.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">O que nos torna únicos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Nossa Jornada</h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-slate-200 hidden md:block"></div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <Badge variant="outline" className="font-semibold">
                            {item.year}
                          </Badge>
                        </div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-slate-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:block w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <CardContent className="p-8 text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <h3 className="text-2xl font-bold mb-4">Onde Estamos</h3>
            <p className="text-slate-300 mb-4">
              Sediados em São Paulo, enviamos para todo o Brasil e mundo com rapidez e segurança
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                <span>Entrega Global</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Compra Segura</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
