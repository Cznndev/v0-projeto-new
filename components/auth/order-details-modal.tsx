"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, MapPin, CreditCard, Calendar, Truck, X } from "lucide-react"
import type { Order } from "@/contexts/auth-context"

interface OrderDetailsModalProps {
  order: Order
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!isOpen) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50"
      case "shipped":
        return "text-blue-600 bg-blue-50"
      case "confirmed":
        return "text-yellow-600 bg-yellow-50"
      case "pending":
        return "text-orange-600 bg-orange-50"
      case "cancelled":
        return "text-red-600 bg-red-50"
      default:
        return "text-slate-600 bg-slate-50"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Entregue"
      case "shipped":
        return "Enviado"
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const getTrackingSteps = (status: string) => {
    const steps = [
      { id: "pending", label: "Pedido Recebido", completed: true },
      { id: "confirmed", label: "Pagamento Confirmado", completed: status !== "pending" },
      { id: "shipped", label: "Produto Enviado", completed: status === "shipped" || status === "delivered" },
      { id: "delivered", label: "Produto Entregue", completed: status === "delivered" },
    ]
    return steps
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Detalhes do Pedido</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">#{order.id}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Status and Date */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Data do Pedido</p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>

          {/* Tracking */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                <Truck className="w-5 h-5" />
                Acompanhamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getTrackingSteps(order.status).map((step, index) => (
                  <div key={step.id} className="flex items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        step.completed ? "bg-green-500 border-green-500" : "border-slate-300 dark:border-slate-600"
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          step.completed ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                    {step.completed && (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Concluído</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Products */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                <Package className="w-5 h-5" />
                Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 dark:text-white">{item.name}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Quantidade: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        R$ {item.price.toFixed(2).replace(".", ",")} cada
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                <MapPin className="w-5 h-5" />
                Endereço de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-700 dark:text-slate-300">
                <p>
                  {order.shippingAddress.street}, {order.shippingAddress.number}
                </p>
                {order.shippingAddress.complement && <p>{order.shippingAddress.complement}</p>}
                <p>{order.shippingAddress.neighborhood}</p>
                <p>
                  {order.shippingAddress.city} - {order.shippingAddress.state}
                </p>
                <p>CEP: {order.shippingAddress.zipCode}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                <CreditCard className="w-5 h-5" />
                Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 dark:text-slate-300">Método de Pagamento:</span>
                <span className="font-medium text-slate-900 dark:text-white">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <span className="text-lg font-semibold text-slate-900 dark:text-white">Total:</span>
                <span className="text-lg font-bold text-green-600">R$ {order.total.toFixed(2).replace(".", ",")}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Rastrear Pedido
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Suporte
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
