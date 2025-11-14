"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ThumbsUp, Filter, ChevronLeft, ChevronRight } from "lucide-react"

export function DepoimentosTab() {
  const [selectedRating, setSelectedRating] = useState("all")
  const [currentPage, setCurrentPage] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Carlos Silva",
      age: "32 anos",
      location: "São Paulo, SP",
      text: "Finalmente encontrei produtos que realmente funcionam para minha pele. O gel de limpeza é incrível! Minha pele ficou muito mais limpa e sem oleosidade excessiva.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=Carlos",
      product: "Gel de Limpeza Facial",
      verified: true,
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Rafael Santos",
      age: "28 anos",
      location: "Rio de Janeiro, RJ",
      text: "O hidratante anti-idade fez uma diferença visível em apenas 2 semanas. Recomendo demais! As linhas de expressão diminuíram notavelmente.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=Rafael",
      product: "Hidratante Anti-Idade",
      verified: true,
      date: "2024-01-10",
    },
    {
      id: 3,
      name: "André Costa",
      age: "35 anos",
      location: "Belo Horizonte, MG",
      text: "Kit completo vale muito a pena. Praticidade e qualidade que eu precisava na minha rotina. Todos os produtos funcionam perfeitamente juntos.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=André",
      product: "Kit Completo N.A.M",
      verified: true,
      date: "2024-01-08",
    },
    {
      id: 4,
      name: "Lucas Oliveira",
      age: "26 anos",
      location: "Brasília, DF",
      text: "O sérum de vitamina C deixou minha pele com um brilho natural incrível. Uso há 3 meses e os resultados são visíveis. Excelente custo-benefício!",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=Lucas",
      product: "Sérum Vitamina C",
      verified: true,
      date: "2024-01-05",
    },
    {
      id: 5,
      name: "Pedro Almeida",
      age: "41 anos",
      location: "Porto Alegre, RS",
      text: "Protetor solar perfeito para o dia a dia. Não deixa a pele oleosa e a proteção é excelente. Uso diariamente há 6 meses.",
      rating: 4,
      image: "/placeholder.svg?height=80&width=80&text=Pedro",
      product: "Protetor Solar Facial FPS 60",
      verified: true,
      date: "2024-01-03",
    },
    {
      id: 6,
      name: "Thiago Ferreira",
      age: "29 anos",
      location: "Salvador, BA",
      text: "Esfoliante facial remove todas as impurezas sem agredir a pele. Uso 2x por semana e minha pele está muito mais lisa e uniforme.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=Thiago",
      product: "Esfoliante Facial",
      verified: true,
      date: "2024-01-01",
    },
    {
      id: 7,
      name: "Marcelo Lima",
      age: "38 anos",
      location: "Recife, PE",
      text: "Hidratante matificante é perfeito para minha pele oleosa. Controla a oleosidade o dia todo sem ressecar. Produto excepcional!",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=Marcelo",
      product: "Hidratante Matificante",
      verified: true,
      date: "2023-12-28",
    },
    {
      id: 8,
      name: "Roberto Silva",
      age: "45 anos",
      location: "Curitiba, PR",
      text: "Creme para área dos olhos reduziu significativamente minhas olheiras. Produto de alta qualidade, recomendo para todos os homens.",
      rating: 4,
      image: "/placeholder.svg?height=80&width=80&text=Roberto",
      product: "Creme para Área dos Olhos",
      verified: true,
      date: "2023-12-25",
    },
    {
      id: 9,
      name: "Felipe Rocha",
      age: "31 anos",
      location: "Fortaleza, CE",
      text: "Kit iniciante foi perfeito para começar minha rotina de skincare. Produtos de qualidade e preço justo. Já estou pensando no kit completo!",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=Felipe",
      product: "Kit Iniciante Skincare",
      verified: true,
      date: "2023-12-20",
    },
  ]

  const filteredTestimonials = testimonials.filter(
    (testimonial) => selectedRating === "all" || testimonial.rating.toString() === selectedRating,
  )

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage)
  const currentTestimonials = filteredTestimonials.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: testimonials.filter((t) => t.rating === rating).length,
    percentage: (testimonials.filter((t) => t.rating === rating).length / testimonials.length) * 100,
  }))

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">O que nossos clientes dizem</h2>
          <p className="text-xl text-slate-600 mb-8">Mais de 2.500 homens já transformaram sua rotina de cuidados</p>

          {/* Rating Summary */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-slate-900 mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(averageRating) ? "text-yellow-500 fill-current" : "text-slate-300"}`}
                    />
                  ))}
                </div>
                <p className="text-slate-600">Baseado em {testimonials.length} avaliações</p>
              </div>

              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-8">{rating}★</span>
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-600 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Filtrar por:</span>
          </div>

          {["all", "5", "4", "3", "2", "1"].map((rating) => (
            <Button
              key={rating}
              variant={selectedRating === rating ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedRating(rating)
                setCurrentPage(0)
              }}
              className={
                selectedRating === rating
                  ? "bg-slate-900 hover:bg-slate-800"
                  : "border-slate-300 hover:border-slate-400"
              }
            >
              {rating === "all" ? "Todas" : `${rating}★`}
              <Badge variant="secondary" className="ml-2">
                {rating === "all"
                  ? testimonials.length
                  : testimonials.filter((t) => t.rating.toString() === rating).length}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-500 fill-current" : "text-slate-300"}`}
                    />
                  ))}
                  <span className="text-sm text-slate-600 ml-2">
                    {new Date(testimonial.date).toLocaleDateString("pt-BR")}
                  </span>
                </div>

                {/* Quote */}
                <Quote className="w-8 h-8 text-slate-300 mb-4" />
                <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.text}"</p>

                {/* Product */}
                <div className="mb-4">
                  <Badge variant="outline" className="text-xs">
                    {testimonial.product}
                  </Badge>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          ✓ Verificado
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{testimonial.age}</p>
                    <p className="text-xs text-slate-500">{testimonial.location}</p>
                  </div>
                </div>

                {/* Helpful Button */}
                <div className="mt-4 pt-4 border-t">
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Útil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i)}
                  className={currentPage === i ? "bg-slate-900 hover:bg-slate-800" : ""}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
            >
              Próximo
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold mb-4">Seja o próximo a avaliar!</h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Compartilhe sua experiência com nossos produtos e ajude outros homens a transformarem sua rotina de
                cuidados.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Deixar Avaliação
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
