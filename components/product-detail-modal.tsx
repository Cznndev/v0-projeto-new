"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { useCartWithToast } from "@/hooks/use-cart-with-toast"
import { X, Star, ShoppingCart, Heart, Share2, Info, Beaker, BookOpen } from "lucide-react"
import type { ExtendedProduct } from "@/data/products"

interface ProductDetailModalProps {
  product: ExtendedProduct
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const { addItem } = useCartWithToast()
  const [activeTab, setActiveTab] = useState<"features" | "ingredients" | "usage">("features")

  if (!isOpen) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex">
          {/* Image Gallery - Left Side */}
          <div className="w-1/2 p-6">
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Details - Right Side */}
          <div className="w-1/2 p-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                {product.badge && <Badge className="mb-2 bg-blue-600 text-white">{product.badge}</Badge>}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{product.name}</h2>
                <p className="text-slate-600 dark:text-slate-400">{product.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">(4.9) • 127 avaliações</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{formatPrice(product.price)}</span>
              <span className="text-lg text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
              <Badge variant="outline" className="text-green-600 border-green-600">
                -{discount}%
              </Badge>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button
                className="flex-1 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                onClick={() => {
                  addItem(product)
                  onClose()
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Adicionar ao Carrinho
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
              <div className="flex gap-6">
                {[
                  { id: "features", label: "Características", icon: Info },
                  { id: "ingredients", label: "Ingredientes", icon: Beaker },
                  { id: "usage", label: "Como Usar", icon: BookOpen },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as any)}
                    className={`
                      flex items-center gap-2 pb-3 border-b-2 transition-colors
                      ${
                        activeTab === id
                          ? "border-slate-900 dark:border-white text-slate-900 dark:text-white"
                          : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === "features" && product.features && (
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Principais Características</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "ingredients" && product.ingredients && (
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Ingredientes Ativos</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {product.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-center text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        {ingredient}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "usage" && product.howToUse && (
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Como Usar</h4>
                  <ol className="space-y-3">
                    {product.howToUse.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-slate-600 dark:text-slate-400">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Dermatologicamente testado
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Cruelty free
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Fórmula vegana
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Livre de parabenos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
