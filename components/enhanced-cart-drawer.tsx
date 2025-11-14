"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCartWithToast } from "@/hooks/use-cart-with-toast"
import { ShoppingCart, X, Plus, Minus, Trash2, Gift, Percent, Truck, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"

export function EnhancedCartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCartWithToast()
  const router = useRouter()
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [discount, setDiscount] = useState(0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const freeShippingThreshold = 150
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total)
  const hasFreeShi = total >= freeShippingThreshold

  const applyCoupon = () => {
    const coupons = {
      PRIMEIRA10: 0.1,
      SKINCARE15: 0.15,
      MASCULINO20: 0.2,
      WELCOME15: 0.15,
      SKINCARE10: 0.1,
      SAVE50: 0.5,
    }

    if (coupons[couponCode as keyof typeof coupons]) {
      setAppliedCoupon(couponCode)
      setDiscount(coupons[couponCode as keyof typeof coupons])
      setCouponCode("")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setDiscount(0)
  }

  const finalTotal = total - total * discount

  return (
    <>
      {/* Cart Button */}
      <Button onClick={() => setIsOpen(true)} className="relative bg-slate-900 hover:bg-slate-800">
        <ShoppingCart className="w-5 h-5" />
        {itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full animate-pulse">
            {itemCount}
          </Badge>
        )}
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)} />}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              Carrinho ({itemCount} {itemCount === 1 ? "item" : "itens"})
            </h2>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-2">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Free Shipping Progress */}
          {!hasFreeShi && items.length > 0 && (
            <div className="p-4 bg-blue-50 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Faltam {formatPrice(remainingForFreeShipping)} para frete grátis!
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((total / freeShippingThreshold) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {hasFreeShi && items.length > 0 && (
            <div className="p-4 bg-green-50 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">🎉 Parabéns! Você ganhou frete grátis!</span>
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg mb-2">Seu carrinho está vazio</p>
                <p className="text-slate-500">Adicione produtos para começar suas compras</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <Card key={item.id} className="border-slate-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.name}</h3>
                          <p className="text-slate-600 text-sm mb-2">{formatPrice(item.price)}</p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Coupon Section */}
                <Card className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Percent className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-slate-900">Cupom de Desconto</span>
                    </div>

                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                        <div>
                          <span className="text-sm font-medium text-green-700">{appliedCoupon} aplicado</span>
                          <p className="text-xs text-green-600">-{(discount * 100).toFixed(0)}% de desconto</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeCoupon}
                          className="text-green-700 hover:text-green-800"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Digite seu cupom"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white text-slate-900"
                        />
                        <Button variant="outline" size="sm" onClick={applyCoupon} disabled={!couponCode}>
                          Aplicar
                        </Button>
                      </div>
                    )}

                    <div>
                      <p className="mb-2">Cupons disponíveis:</p>
                      <div className="flex flex-wrap gap-1">
                        {["WELCOME15", "SKINCARE10", "PRIMEIRA10", "SKINCARE15", "MASCULINO20", "SAVE50"].map(
                          (code) => (
                            <button
                              key={code}
                              onClick={() => {
                                setCouponCode(code)
                                applyCoupon()
                              }}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
                            >
                              {code}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clear Cart Button */}
                {items.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Limpar Carrinho
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 p-6 space-y-4">
              {/* Order Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="text-slate-900">{formatPrice(total)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({appliedCoupon}):</span>
                    <span>-{formatPrice(total * discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Frete:</span>
                  <span className="text-slate-900">{hasFreeShi ? "Grátis" : "A calcular"}</span>
                </div>
                <div className="border-t border-slate-200 pt-2">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-slate-900">Total:</span>
                    <span className="text-slate-900">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full bg-slate-900 hover:bg-slate-800 text-lg py-3"
                  onClick={() => {
                    setIsOpen(false)
                    router.push("/checkout")
                  }}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Finalizar Compra
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                  Continuar Comprando
                </Button>
              </div>

              <div className="text-center text-xs text-slate-600 space-y-1">
                <p>🚚 Frete grátis acima de R$ 150</p>
                <p>🔒 Compra 100% segura</p>
                <p>↩️ 30 dias para troca</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
