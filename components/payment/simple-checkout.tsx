"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/contexts/toast-context"
import { Loader2, CheckCircle, ShoppingBag } from "lucide-react"
import { SimplePayment } from "@/lib/simple-payment"

interface SimpleCheckoutProps {
  orderData: any
  onSuccess: (order: any) => void
  onError: (error: string) => void
}

export default function SimpleCheckout({ orderData, onSuccess, onError }: SimpleCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { total, items } = useCart()
  const { addToast } = useToast()

  const handleConfirmPayment = async () => {
    setIsProcessing(true)

    try {
      const response = await fetch("/api/process-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderData,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          total,
          discount: 0,
          shipping: total >= 150 ? 0 : 15,
          finalTotal: total + (total >= 150 ? 0 : 15),
        }),
      })

      const result = await response.json()

      if (result.success) {
        addToast({
          type: "success",
          title: "🎉 Pedido Confirmado!",
          description: `Pedido ${result.order.id} foi processado com sucesso!`,
          duration: 8000,
        })
        onSuccess(result.order)
      } else {
        throw new Error(result.error || "Erro ao processar pedido")
      }
    } catch (error: any) {
      console.error("Erro no checkout:", error)
      addToast({
        type: "error",
        title: "Erro no Pedido",
        description: error.message || "Erro ao processar pedido. Tente novamente.",
        duration: 8000,
      })
      onError(error.message || "Erro desconhecido")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="border-nam-gray-light">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-nam-navy">
          <ShoppingBag className="w-5 h-5 text-nam-teal" />
          Finalizar Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resumo do Cliente */}
        <div className="bg-nam-light p-4 rounded-lg">
          <h3 className="font-semibold text-nam-navy mb-3">Dados do Cliente</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Nome:</span> {orderData.firstName} {orderData.lastName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {orderData.email}
            </p>
            <p>
              <span className="font-medium">Telefone:</span> {orderData.phone}
            </p>
          </div>
        </div>

        {/* Resumo do Endereço */}
        <div className="bg-nam-light p-4 rounded-lg">
          <h3 className="font-semibold text-nam-navy mb-3">Endereço de Entrega</h3>
          <div className="text-sm text-nam-gray-dark">
            <p>
              {orderData.street}, {orderData.number}
            </p>
            {orderData.complement && <p>{orderData.complement}</p>}
            <p>{orderData.neighborhood}</p>
            <p>
              {orderData.city} - {orderData.state}
            </p>
            <p>CEP: {orderData.zipCode}</p>
          </div>
        </div>

        {/* Resumo dos Produtos */}
        <div className="bg-nam-light p-4 rounded-lg">
          <h3 className="font-semibold text-nam-navy mb-3">Produtos ({items.length})</h3>
          <div className="space-y-2">
            {items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span className="font-medium">{SimplePayment.formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            {items.length > 3 && <p className="text-xs text-nam-gray-medium">+ {items.length - 3} outros produtos</p>}
          </div>
        </div>

        {/* Total */}
        <div className="bg-nam-teal/10 border border-nam-teal/20 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-nam-navy">Total do Pedido:</span>
            <span className="text-xl font-bold text-nam-teal">
              {SimplePayment.formatCurrency(total + (total >= 150 ? 0 : 15))}
            </span>
          </div>
          {total >= 150 && (
            <p className="text-sm text-nam-teal mt-2 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Frete grátis aplicado!
            </p>
          )}
        </div>

        {/* Botão de Confirmação */}
        <Button
          onClick={handleConfirmPayment}
          disabled={isProcessing}
          className="w-full bg-nam-teal hover:bg-nam-teal/90 text-white h-14 text-lg font-semibold"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              Processando Pedido...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-3" />
              Confirmar Pedido
            </>
          )}
        </Button>

        <div className="text-center">
          <p className="text-xs text-nam-gray-medium">Ao confirmar, você concorda com nossos termos de uso</p>
        </div>
      </CardContent>
    </Card>
  )
}
