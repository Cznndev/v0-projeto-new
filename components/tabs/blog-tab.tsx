"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Tag, Search, TrendingUp, BookOpen, Heart } from "lucide-react"

export function BlogTab() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    { id: "all", name: "Todos os Posts", count: 12 },
    { id: "skincare", name: "Skincare Básico", count: 5 },
    { id: "ingredientes", name: "Ingredientes", count: 3 },
    { id: "rotina", name: "Rotina Diária", count: 2 },
    { id: "dicas", name: "Dicas e Truques", count: 2 },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "Guia Completo: Como Começar uma Rotina de Skincare Masculino",
      excerpt: "Descubra os passos essenciais para criar uma rotina de cuidados eficaz e adequada para sua pele.",
      content:
        "Uma rotina de skincare não precisa ser complicada. Comece com os básicos: limpeza, hidratação e proteção solar...",
      image: "/placeholder.svg?height=300&width=400&text=Rotina+Skincare",
      category: "skincare",
      author: "Dr. Carlos Mendes",
      date: "2024-01-20",
      readTime: "8 min",
      tags: ["iniciante", "rotina", "básico"],
      featured: true,
      likes: 245,
    },
    {
      id: 2,
      title: "Vitamina C: O Antioxidante Essencial para Homens",
      excerpt: "Entenda por que a vitamina C deve fazer parte da sua rotina e como usar corretamente.",
      content: "A vitamina C é um dos ingredientes mais poderosos no skincare masculino. Seus benefícios incluem...",
      image: "/placeholder.svg?height=300&width=400&text=Vitamina+C",
      category: "ingredientes",
      author: "Dra. Ana Silva",
      date: "2024-01-18",
      readTime: "6 min",
      tags: ["vitamina-c", "antioxidante", "sérum"],
      featured: false,
      likes: 189,
    },
    {
      id: 3,
      title: "5 Erros Comuns no Skincare Masculino (E Como Evitá-los)",
      excerpt: "Aprenda a identificar e corrigir os erros mais frequentes na rotina de cuidados masculina.",
      content: "Muitos homens cometem erros básicos que podem prejudicar os resultados do skincare...",
      image: "/placeholder.svg?height=300&width=400&text=Erros+Skincare",
      category: "dicas",
      author: "Prof. João Santos",
      date: "2024-01-15",
      readTime: "5 min",
      tags: ["erros", "dicas", "cuidados"],
      featured: true,
      likes: 312,
    },
    {
      id: 4,
      title: "Ácido Hialurônico: Hidratação Profunda para Peles Masculinas",
      excerpt: "Descubra como este ingrediente revolucionário pode transformar a hidratação da sua pele.",
      content: "O ácido hialurônico é capaz de reter até 1000 vezes seu peso em água...",
      image: "/placeholder.svg?height=300&width=400&text=Ácido+Hialurônico",
      category: "ingredientes",
      author: "Dr. Pedro Lima",
      date: "2024-01-12",
      readTime: "7 min",
      tags: ["ácido-hialurônico", "hidratação", "anti-idade"],
      featured: false,
      likes: 156,
    },
    {
      id: 5,
      title: "Rotina Noturna vs Matinal: Qual a Diferença?",
      excerpt: "Entenda por que sua pele precisa de cuidados diferentes durante o dia e a noite.",
      content: "A pele tem necessidades diferentes ao longo do dia. Durante a noite, ela entra em modo de reparação...",
      image: "/placeholder.svg?height=300&width=400&text=Rotina+Dia+Noite",
      category: "rotina",
      author: "Dra. Maria Costa",
      date: "2024-01-10",
      readTime: "6 min",
      tags: ["rotina", "dia", "noite"],
      featured: false,
      likes: 203,
    },
    {
      id: 6,
      title: "Protetor Solar Masculino: Guia Definitivo",
      excerpt: "Tudo que você precisa saber sobre proteção solar específica para homens.",
      content: "A proteção solar é o passo mais importante de qualquer rotina de skincare...",
      image: "/placeholder.svg?height=300&width=400&text=Protetor+Solar",
      category: "skincare",
      author: "Dr. Rafael Oliveira",
      date: "2024-01-08",
      readTime: "9 min",
      tags: ["protetor-solar", "fps", "proteção"],
      featured: true,
      likes: 278,
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter((post) => post.featured)
  const trendingPosts = [...blogPosts].sort((a, b) => b.likes - a.likes).slice(0, 3)

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Blog N.A.M</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Dicas, guias e conhecimento especializado sobre skincare masculino
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-slate-900 hover:bg-slate-800"
                      : "border-slate-300 hover:border-slate-400"
                  }
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {selectedCategory === "all" && !searchTerm && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Posts em Destaque
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.slice(0, 2).map((post) => (
                    <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge className="absolute top-4 left-4 bg-blue-600 text-white">Destaque</Badge>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.date).toLocaleDateString("pt-BR")}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </div>
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{post.title}</h4>
                          <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-600">{post.author}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              Ler Mais
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-slate-600" />
                {searchTerm ? `Resultados para "${searchTerm}"` : "Todos os Artigos"}
              </h3>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">Nenhum artigo encontrado</h4>
                  <p className="text-slate-600">Tente ajustar os filtros ou termo de busca</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                              <Badge variant="outline" className="capitalize">
                                {categories.find((c) => c.id === post.category)?.name}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.date).toLocaleDateString("pt-BR")}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                              </div>
                            </div>

                            <h4 className="text-xl font-bold text-slate-900 mb-3">{post.title}</h4>

                            <p className="text-slate-600 mb-4">{post.excerpt}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-slate-400" />
                                  <span className="text-sm text-slate-600">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Heart className="w-4 h-4 text-slate-400" />
                                  <span className="text-sm text-slate-600">{post.likes}</span>
                                </div>
                              </div>
                              <Button variant="outline">Ler Artigo Completo</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Posts */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                  Mais Populares
                </h4>
                <div className="space-y-4">
                  {trendingPosts.map((post, index) => (
                    <div key={post.id} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-slate-900 text-sm line-clamp-2 mb-1">{post.title}</h5>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Heart className="w-3 h-3" />
                          {post.likes} curtidas
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold mb-3">Newsletter N.A.M</h4>
                <p className="text-slate-300 text-sm mb-4">
                  Receba dicas exclusivas de skincare masculino direto no seu email
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Seu melhor email"
                    className="w-full px-3 py-2 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Inscrever-se</Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags Cloud */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Tags Populares</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "skincare",
                    "rotina",
                    "vitamina-c",
                    "hidratação",
                    "protetor-solar",
                    "anti-idade",
                    "limpeza",
                    "sérum",
                  ].map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-slate-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
