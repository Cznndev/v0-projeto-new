"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCartWithToast } from "@/hooks/use-cart-with-toast"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Filter, Grid, List, Search, Eye, ExternalLink } from "lucide-react"
import { products, categories, type ExtendedProduct } from "@/data/products"

export function ProdutosTab() {
  const router = useRouter()
  const { addItem } = useCartWithToast()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<ExtendedProduct | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "discount":
        return b.originalPrice - b.price - (a.originalPrice - a.price)
      case "name":
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const openProductModal = (product: ExtendedProduct) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeProductModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const goToProductPage = (productId: string) => {
    router.push(`/produto/${productId}`)
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Nossos Produtos</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Uma linha completa de cuidados desenvolvida especialmente para as necessidades da pele masculina
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white text-slate-900"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 mr-4">
                <Filter className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Categorias:</span>
              </div>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-slate-900 hover:bg-slate-800 text-white"
                      : "border-slate-300 hover:border-slate-400 text-slate-700"
                  }
                >
                  {category.name}
                  {category.id !== "all" && (
                    <Badge variant="secondary" className="ml-2">
                      {products.filter((p) => p.category === category.id).length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white text-slate-900"
              >
                <option value="name">Ordenar por Nome</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
                <option value="discount">Maior Desconto</option>
              </select>

              <div className="flex border border-slate-300 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600">
            {sortedProducts.length} produto{sortedProducts.length !== 1 ? "s" : ""} encontrado
            {sortedProducts.length !== 1 ? "s" : ""}
            {searchTerm && ` para "${searchTerm}"`}
          </p>
        </div>

        {/* Products Grid/List */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-slate-600 mb-4">Tente ajustar os filtros ou termo de busca</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="transition-all duration-200 hover:scale-105"
            >
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div
            className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}
          >
            {sortedProducts.map((product, index) => (
              <Card
                key={product.id}
                className={`
                  group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg
                  ${viewMode === "list" ? "flex flex-row" : ""}
                  hover:scale-105
                `}
                onClick={() => goToProductPage(product.id)}
              >
                <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                  <div
                    className={`
                      relative overflow-hidden
                      ${viewMode === "list" ? "w-48 flex-shrink-0" : "rounded-t-lg"}
                    `}
                  >
                    <img
                      src={product.images[0]?.url || product.image || "/placeholder.svg"}
                      alt={product.images[0]?.alt || product.name}
                      className={`
                        object-cover group-hover:scale-110 transition-transform duration-500
                        ${viewMode === "list" ? "w-full h-full" : "w-full h-64"}
                      `}
                      loading="lazy"
                    />
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 bg-blue-600 text-white">{product.badge}</Badge>
                    )}

                    {/* Image Gallery Indicator */}
                    {product.images.length > 1 && (
                      <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        +{product.images.length - 1} fotos
                      </div>
                    )}

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          openProductModal(product)
                        }}
                        className="bg-white/90 hover:bg-white text-slate-900"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          goToProductPage(product.id)
                        }}
                        className="bg-white/90 hover:bg-white text-slate-900"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Ver Página
                      </Button>
                    </div>
                  </div>

                  <div className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                    <div>
                      <h4
                        className={`font-bold text-slate-900 mb-2 transition-colors ${viewMode === "list" ? "text-xl" : "text-lg"}`}
                      >
                        {product.name}
                      </h4>
                      <p
                        className={`text-slate-600 mb-4 transition-colors ${viewMode === "list" ? "text-base" : "text-sm"}`}
                      >
                        {product.description}
                      </p>

                      {/* Features Preview */}
                      {product.features && product.features.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {product.features.slice(0, 2).map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {product.features.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{product.features.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-slate-900 ${viewMode === "list" ? "text-2xl" : "text-xl"}`}>
                            R$ {product.price.toFixed(2).replace(".", ",")}
                          </span>
                          <span
                            className={`text-slate-500 line-through ${viewMode === "list" ? "text-lg" : "text-sm"}`}
                          >
                            R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 hover:scale-105"
                          onClick={(e) => {
                            e.stopPropagation()
                            addItem(product)
                          }}
                        >
                          Adicionar ao Carrinho
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            openProductModal(product)
                          }}
                          className="px-3"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetailModal product={selectedProduct} isOpen={isModalOpen} onClose={closeProductModal} />
        )}
      </div>
    </div>
  )
}
