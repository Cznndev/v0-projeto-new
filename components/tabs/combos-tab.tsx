"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { Gift, Star, Check, Zap } from 'lucide-react'

const combos = [
  {
    id: "combo-starter",
    name: "Combo Iniciante",
    description: "3 canetas clássicas para começar sua jornada com a InfinityPen",
    price: 89.9,
    originalPrice: 129.9,
    items: ["Preta", "Azul", "Vermelha"],
    savings: 40,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&h=300&fit=crop&crop=center&q=80",
    badge: "Mais Vendido",
    features: ["3 cores clássicas", "Tinta infinita", "Recarregáveis", "Estojo básico"],
  },
  {
    id: "combo-professional",
    name: "Combo Profissional",
    description: "Kit completo para profissionais com variedade de pontas e cores",
    price: 249.9,
    originalPrice: 349.9,
    items: ["Executive Gold", "Architect Pro", "Signature", "Fiber 12 cores"],
    savings: 100,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop&crop=center&q=80",
    badge: "Premium",
    features: ["4 estilos diferentes", "Pontas variadas", "Estojo couro", "Manual profissional"],
  },
  {
    id: "combo-luxury",
    name: "Combo Luxo",
    description: "Presente premium com canetas de acabamento ouro e prata",
    price: 279.9,
    originalPrice: 399.9,
    items: ["Executive Dourada", "Executive Prateada", "TouchPen", "Estojo de couro"],
    savings: 120,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop&crop=center&q=80",
    badge: "Luxo",
    features: ["Acabamento premium", "Para presentear", "Estojo luxuoso", "Certificado"],
  },
  {
    id: "combo-artist",
    name: "Combo Artista",
    description: "Para criadores e artistas - várias cores e estilos de escrita",
    price: 199.9,
    originalPrice: 299.9,
    items: ["Fiber 12 cores", "Gel Metálico", "TouchPen", "Preta Clássica"],
    savings: 100,
    image: "https://images.unsplash.com/photo-1513201099205-b0c5b844b5ecw?w=400&h=300&fit=crop&crop=center&q=80",
    badge: "Criativo",
    features: ["Expressão criativa", "Múltiplos estilos", "Cores vibrantes", "Digital + Papel"],
  },
  {
    id: "combo-ultimate",
    name: "Combo Ultimate",
    description: "O combo definitivo - todas as canetas InfinityPen em um estojo luxuoso",
    price: 599.9,
    originalPrice: 899.9,
    items: ["Todas as canetas", "Estojo deluxe", "Acessórios premium", "Certificado"],
    savings: 300,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&h=300&fit=crop&crop=center&q=80",
    badge: "Oferta Especial",
    features: ["Coleção completa", "Estojo deluxe", "Presente exclusivo", "Garantia estendida"],
  },
]

export function CombosTab() {
  const { addToCart } = useCart()

  const handleAddToCart = (combo: typeof combos[0]) => {
    addToCart({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      image: combo.image,
      quantity: 1,
      description: combo.description,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gift className="w-8 h-8 text-infinity-copper" />
          <h2 className="text-4xl font-bold text-infinity-charcoal">Combos Especiais</h2>
        </div>
        <p className="text-xl text-infinity-charcoal/70 max-w-3xl mx-auto">
          Aproveite combos exclusivos com as melhores canetas InfinityPen. Economize ao comprar kits completos.
        </p>
      </div>

      {/* Combos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        {combos.map((combo, index) => (
          <Card
            key={combo.id}
            className="group hover:shadow-xl transition-all duration-300 border-infinity-mint/30 hover:border-infinity-copper animate-slide-in-bottom overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="relative overflow-hidden p-0">
              <div className="relative h-40 mb-0 rounded-t-lg overflow-hidden">
                <img
                  src={combo.image || "/placeholder.svg"}
                  alt={combo.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-infinity-charcoal/40 to-transparent" />
                {combo.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-infinity-copper text-white font-semibold">{combo.badge}</Badge>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-600 text-white flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Economize R$ {combo.savings}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <CardTitle className="text-infinity-charcoal group-hover:text-infinity-copper transition-colors">
                  {combo.name}
                </CardTitle>
                <CardDescription className="text-infinity-charcoal/60 text-sm">{combo.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {/* Items */}
              <div className="space-y-2 border-b border-infinity-mint/20 pb-3">
                <p className="text-sm font-semibold text-infinity-charcoal">Inclui:</p>
                {combo.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-infinity-charcoal/70">
                    <Check className="w-4 h-4 text-infinity-mint flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-1">
                {combo.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-infinity-charcoal/60">
                    <Star className="w-3 h-3 text-infinity-copper" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="border-t border-infinity-mint/20 pt-3 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-infinity-charcoal">R$ {combo.price.toFixed(2).replace('.', ',')}</span>
                  <span className="text-sm text-infinity-charcoal/40 line-through">R$ {combo.originalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddToCart(combo)}
                    className="flex-1 bg-infinity-copper hover:bg-infinity-copper/90 text-white font-semibold transition-colors"
                  >
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-infinity-charcoal to-infinity-charcoal/80 rounded-2xl p-8 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">Encontre seu Combo Perfeito</h3>
        <p className="text-lg mb-6 text-gray-300">
          Todos os nossos combos incluem tinta infinita, garantia vitalícia e frete grátis para compras acima de R$ 150
        </p>
        <Button size="lg" className="bg-infinity-mint hover:bg-infinity-mint/90 text-infinity-charcoal px-8 font-semibold">
          Ver Todos os Produtos
        </Button>
      </div>
    </div>
  )
}
