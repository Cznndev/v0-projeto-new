"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail, ArrowLeft, Share2 } from "lucide-react"

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nam-light to-white">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <div className="w-2 h-2 bg-nam-teal rounded-full opacity-70" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-nam-gray-light">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-nam-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">I.P.N</span>
              </div>
              <span className="text-lg font-bold text-nam-navy">Pedido Confirmado</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white shadow-lg">
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold text-nam-navy mb-4">🎉 Pedido Confirmado!</h1>

              <p className="text-lg text-nam-gray-dark mb-6">
                Seu pedido foi processado com sucesso e já está sendo preparado.
              </p>

              {orderId && (
                <div className="bg-white border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-nam-gray-dark mb-1">Número do Pedido:</p>
                  <p className="text-xl font-bold text-nam-navy font-mono">{orderId}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-nam-teal/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-6 h-6 text-nam-teal" />
                  </div>
                  <h3 className="font-semibold text-nam-navy mb-1">Preparação</h3>
                  <p className="text-sm text-nam-gray-dark">Seu pedido está sendo preparado</p>
                </div>

                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-nam-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Truck className="w-6 h-6 text-nam-blue" />
                  </div>
                  <h3 className="font-semibold text-nam-navy mb-1">Envio</h3>
                  <p className="text-sm text-nam-gray-dark">Entrega em 3-5 dias úteis</p>
                </div>

                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-nam-navy mb-1">Confirmação</h3>
                  <p className="text-sm text-nam-gray-dark">E-mail de confirmação enviado</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mt-6 border-nam-gray-light">
            <CardHeader>
              <CardTitle className="text-nam-navy">Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-nam-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-nam-navy">Confirmação por E-mail</h4>
                  <p className="text-sm text-nam-gray-dark">
                    Você receberá um e-mail com todos os detalhes do seu pedido em alguns minutos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-nam-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-nam-navy">Preparação do Pedido</h4>
                  <p className="text-sm text-nam-gray-dark">
                    Nossa equipe irá preparar seus produtos com todo cuidado e atenção.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-nam-navy">Envio e Entrega</h4>
                  <p className="text-sm text-nam-gray-dark">
                    Você receberá o código de rastreamento assim que o pedido for enviado.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full border-nam-gray-light text-nam-navy hover:bg-nam-gray-light"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuar Comprando
            </Button>

            <Button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Pedido NAM Confirmado!",
                    text: `Meu pedido ${orderId} foi confirmado na NAM Skincare!`,
                    url: window.location.href,
                  })
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  alert("Link copiado para a área de transferência!")
                }
              }}
              className="w-full bg-nam-teal hover:bg-nam-teal/90 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>

          {/* Support Info */}
          <Card className="mt-6 bg-nam-light border-nam-gray-light">
            <CardContent className="text-center py-6">
              <h3 className="font-semibold text-nam-navy mb-2">Precisa de Ajuda?</h3>
              <p className="text-sm text-nam-gray-dark mb-4">
                Nossa equipe está pronta para ajudar com qualquer dúvida sobre seu pedido.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-nam-teal text-nam-teal hover:bg-nam-teal hover:text-white"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  contato@nam.com.br
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-nam-blue text-nam-blue hover:bg-nam-blue hover:text-white"
                >
                  📱 (11) 99999-9999
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
