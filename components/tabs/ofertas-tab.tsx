"use client"

import { useState, useEffect } from "react"
import { useCartWithToast } from "@/hooks/use-cart-with-toast"
import { usePromotion } from "@/contexts/promotion-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Flame, Gift, Zap, Tag, Timer, TrendingUp, Package, Percent, ShoppingCart, Heart } from 'lucide-react'
import { products } from "@/data/products"

interface OfferProduct {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  description: string
  discount: number
  category: string
  badge: string
  timeLeft?: number
  stock?: number
  sold?: number
}

export function OfertasTab() {
  const { addItem } = useCartWithToast()
  const { applyCoupon } = usePromotion()
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  // Flash Sale Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Ofertas especiais baseadas nos produtos existentes
  const flashSaleProducts: OfferProduct[] = [
    {
      ...products.find((p) => p.id === "kit-infinity-complete")!,
      discount: 40,
      price: 239.94,
      timeLeft: timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds,
      stock: 15,
      sold: 85,
    },
    {
      ...products.find((p) => p.id === "caneta-infinity-elegante")!,
      discount: 35,
      price: 84.44,
      timeLeft: timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds,
      stock: 8,
      sold: 42,
    },
    {
      ...products.find((p) => p.id === "caneta-executive-gold")!,
      discount: 30,
      price: 104.93,
      timeLeft: timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds,
      stock: 12,
      sold: 38,
    },
  ]

  const dailyDeals: OfferProduct[] = [
    {
      ...products.find((p) => p.id === "kit-startup")!,
      discount: 25,
      price: 149.93,
      stock: 20,
      sold: 30,
    },
    {
      ...products.find((p) => p.id === "caneta-infinity-bambu")!,
      discount: 20,
      price: 63.92,
      stock: 25,
      sold: 15,
    },
    {
      ...products.find((p) => p.id === "caneta-infinity-conforto")!,
      discount: 15,
      price: 76.42,
      stock: 30,
      sold: 20,
    },
  ]

  const coupons = [
    {
      code: "FLASH50",
      discount: 50,
      type: "fixed" as const,
      minValue: 200,
      description: "R$ 50 OFF em compras acima de R$ 200",
      color: "bg-red-500",
      icon: <Flame className="w-5 h-5" />,
    },
    {
      code: "PRIMEIRA30",
      discount: 30,
      type: "percentage" as const,
      description: "30% OFF na primeira compra",
      color: "bg-green-500",
      icon: <Gift className="w-5 h-5" />,
    },
    {
      code: "COMBO25",
      discount: 25,
      type: "percentage" as const,
      minValue: 150,
      description: "25% OFF em combos acima de R$ 150",
      color: "bg-blue-500",
      icon: <Package className="w-5 h-5" />,
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-8 h-8 text-red-500" />
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Ofertas Especiais</h2>
            <Flame className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Descontos imperdíveis por tempo limitado! Aproveite nossas melhores ofertas.
          </p>
        </div>

        {/* Flash Sale */}
        <div className="mb-16">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-red-500 to-pink-600 text-white mb-8">
            <CardContent className="py-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Zap className="w-8 h-8 text-yellow-300" />
                  <h3 className="text-3xl font-bold">FLASH SALE</h3>
                  <Zap className="w-8 h-8 text-yellow-300" />
                </div>
                <p className="text-xl mb-6">Até 40% OFF - Termina em:</p>
                <div className="flex items-center justify-center gap-4 text-2xl font-bold">
                  <div className="bg-white/20 rounded-lg p-3 min-w-[80px] timer-digit">
                    <div>{timeLeft.hours.toString().padStart(2, "0")}</div>
                    <div className="text-sm font-normal">Horas</div>
                  </div>
                  <div className="text-3xl animate-pulse">:</div>
                  <div className="bg-white/20 rounded-lg p-3 min-w-[80px] timer-digit">
                    <div>{timeLeft.minutes.toString().padStart(2, "0")}</div>
                    <div className="text-sm font-normal">Min</div>
                  </div>
                  <div className="text-3xl animate-pulse">:</div>
                  <div className="bg-white/20 rounded-lg p-3 min-w-[80px] timer-digit">
                    <div>{timeLeft.seconds.toString().padStart(2, "0")}</div>
                    <div className="text-sm font-normal">Seg</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {flashSaleProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover-lift transition-all-smooth border-2 border-red-200 dark:border-red-800 relative overflow-hidden animate-glow"
              >
                <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-sm font-bold z-10">
                  -{product.discount}%
                </div>
                <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 px-2 py-1 text-xs font-bold z-10">
                  <Timer className="w-3 h-3 inline mr-1" />
                  FLASH
                </div>

                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{product.name}</h4>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-red-600">{formatPrice(product.price)}</span>
                        <span className="text-sm text-slate-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Stock Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600 dark:text-slate-300">Vendidos: {product.sold}</span>
                        <span className="text-slate-600 dark:text-slate-300">Restam: {product.stock}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all duration-1000 stock-progress"
                          style={{ width: `${(product.sold! / (product.sold! + product.stock!)) * 100}%` }}
                        />
                      </div>
                    </div>

                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
                      onClick={() => addItem(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Daily Deals */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8 flex items-center justify-center gap-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            Ofertas do Dia
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {dailyDeals.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg relative"
              >
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                  -{product.discount}%
                </div>

                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-900"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{product.name}</h4>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-slate-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      >
                        Economize {formatPrice(product.originalPrice - product.price)}
                      </Badge>
                    </div>

                    <Button
                      className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                      onClick={() => addItem(product)}
                    >
                      Adicionar ao Carrinho
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Coupons */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8 flex items-center justify-center gap-2">
            <Tag className="w-8 h-8 text-green-600" />
            Cupons de Desconto
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {coupons.map((coupon, index) => (
              <Card
                key={coupon.code}
                className="border-0 shadow-lg hover-lift transition-all-smooth relative overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute top-0 left-0 w-full h-2 ${coupon.color}`} />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 ${coupon.color} rounded-full flex items-center justify-center text-white`}
                    >
                      {coupon.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">{coupon.code}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{coupon.description}</p>
                    </div>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        {coupon.type === "percentage" ? `${coupon.discount}%` : formatPrice(coupon.discount)}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        {coupon.type === "percentage" ? "DE DESCONTO" : "DE DESCONTO"}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full button-bounce interactive-element"
                    onClick={(e) => {
                      navigator.clipboard.writeText(coupon.code)
                      applyCoupon(coupon.code)
                      // Adicionar feedback visual
                      const button = e.currentTarget
                      button.classList.add("success-animation")
                      setTimeout(() => button.classList.remove("success-animation"), 1000)
                    }}
                  >
                    <Tag className="w-4 h-4 mr-2 icon-bounce" />
                    Copiar Cupom
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <CardContent className="py-12 text-center">
            <Percent className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h3 className="text-3xl font-bold mb-4">Não Perca Essas Ofertas!</h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
              Descontos especiais por tempo limitado. Aproveite agora e transforme sua rotina de skincare com economia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8">
                <Flame className="w-5 h-5 mr-2" />
                Ver Todas as Ofertas
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-400 text-slate-300 hover:bg-slate-800 text-lg px-8"
              >
                <Gift className="w-5 h-5 mr-2" />
                Cadastrar para Ofertas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
