"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { useCartWithToast } from "@/hooks/use-cart-with-toast"
import { useAuth } from "@/contexts/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { CartDrawer } from "@/components/cart-drawer"
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Info,
  Beaker,
  BookOpen,
  Shield,
  Award,
  User,
  MessageSquare,
  Plus,
  Minus,
} from "lucide-react"
import { products, type ExtendedProduct } from "@/data/products"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCartWithToast()
  const { user } = useAuth()
  const [product, setProduct] = useState<ExtendedProduct | null>(null)
  const [activeTab, setActiveTab] = useState<"features" | "ingredients" | "usage">("features")
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === params.id)
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [params.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Carregando produto...</p>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </Button>
              <img src="/images/nam-logo.png" alt="NAM - New Age Men" className="h-8 w-auto" />
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user && (
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Olá, {user.firstName}</span>
                </Button>
              )}
              <CartDrawer />
            </div>
          </div>
        </div>
      </header>

      {/* Product Details */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery
              images={product.images}
              productName={product.name}
              selectedIndex={selectedImageIndex}
              onImageSelect={setSelectedImageIndex}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              {product.badge && <Badge className="mb-3 bg-blue-600 text-white">{product.badge}</Badge>}
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{product.name}</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-slate-600 dark:text-slate-400">(4.9) • 127 avaliações</span>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                <MessageSquare className="w-4 h-4 mr-1" />
                Ver avaliações
              </Button>
            </div>

            {/* Price */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{formatPrice(product.price)}</span>
                <span className="text-xl text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
                <Badge variant="outline" className="text-green-600 border-green-600 text-lg px-3 py-1">
                  -{discount}%
                </Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                💳 Em até 12x de {formatPrice(product.price / 12)} sem juros
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                🚚 Frete grátis para compras acima de R$ 150
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Quantidade:</span>
                <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[60px] font-medium">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-3">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-lg py-3"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "text-red-600 border-red-600" : ""}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <div className="flex gap-6 mb-6">
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

              {/* Tab Content */}
              <div className="space-y-4">
                {activeTab === "features" && product.features && (
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Principais Características</h4>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "ingredients" && product.ingredients && (
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Ingredientes Ativos</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {product.ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 text-center text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                          {ingredient}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "usage" && product.howToUse && (
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Como Usar</h4>
                    <ol className="space-y-4">
                      {product.howToUse.map((step, index) => (
                        <li key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="text-slate-600 dark:text-slate-400 pt-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Certificações e Garantias</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Shield className="w-4 h-4" />
                  Dermatologicamente testado
                </div>
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Award className="w-4 h-4" />
                  Cruelty free
                </div>
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Shield className="w-4 h-4" />
                  Fórmula vegana
                </div>
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Award className="w-4 h-4" />
                  Livre de parabenos
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Produtos Relacionados</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div
                      className="relative overflow-hidden rounded-t-lg"
                      onClick={() => router.push(`/produto/${relatedProduct.id}`)}
                    >
                      <img
                        src={relatedProduct.images[0]?.url || relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {relatedProduct.badge && (
                        <Badge className="absolute top-3 left-3 bg-blue-600 text-white">{relatedProduct.badge}</Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{relatedProduct.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {formatPrice(relatedProduct.price)}
                          </span>
                          <span className="text-sm text-slate-500 line-through">
                            {formatPrice(relatedProduct.originalPrice)}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            addItem(relatedProduct)
                          }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
