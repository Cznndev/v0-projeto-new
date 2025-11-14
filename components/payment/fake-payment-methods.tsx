"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/contexts/toast-context"
import { CreditCard, QrCode, FileText, Loader2, CheckCircle, Copy, Calendar, Lock, Smartphone } from "lucide-react"

interface FakePaymentMethodsProps {
  total: number
  onPaymentSuccess: () => void
}

export default function FakePaymentMethods({ total, onPaymentSuccess }: FakePaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<"pix" | "card" | "boleto">("pix")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPixQR, setShowPixQR] = useState(false)
  const [showBoletoCode, setShowBoletoCode] = useState(false)
  const { addToast } = useToast()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    addToast({
      type: "success",
      title: "🎉 Pagamento Aprovado!",
      description: `Pagamento de ${formatPrice(total)} processado com sucesso!`,
      duration: 5000,
    })

    setIsProcessing(false)
    onPaymentSuccess()
  }

  const generatePixCode = () => {
    return (
      "00020126580014BR.GOV.BCB.PIX013636c4c14e-1234-5678-9abc-def012345678520400005303986540" +
      total.toFixed(2) +
      "5802BR5925NAM SKINCARE LTDA6009SAO PAULO62070503***6304ABCD"
    )
  }

  const generateBoletoCode = () => {
    return "34191.79001 01043.510047 91020.150008 1 95630000" + total.toFixed(2).replace(".", "")
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    addToast({
      type: "success",
      title: "Copiado!",
      description: `Código ${type} copiado para a área de transferência`,
      duration: 3000,
    })
  }

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <Card className="border-nam-gray-light">
        <CardHeader>
          <CardTitle className="text-nam-navy">Escolha a forma de pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* PIX */}
            <button
              onClick={() => {
                setSelectedMethod("pix")
                setShowPixQR(false)
                setShowBoletoCode(false)
              }}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedMethod === "pix"
                  ? "border-nam-teal bg-nam-teal/10"
                  : "border-nam-gray-light hover:border-nam-teal/50"
              }`}
            >
              <div className="text-center">
                <QrCode className="w-8 h-8 mx-auto mb-2 text-nam-teal" />
                <h3 className="font-semibold text-nam-navy">PIX</h3>
                <p className="text-sm text-nam-gray-dark">Aprovação instantânea</p>
                <div className="mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Desconto 5%</div>
              </div>
            </button>

            {/* Cartão */}
            <button
              onClick={() => {
                setSelectedMethod("card")
                setShowPixQR(false)
                setShowBoletoCode(false)
              }}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedMethod === "card"
                  ? "border-nam-blue bg-nam-blue/10"
                  : "border-nam-gray-light hover:border-nam-blue/50"
              }`}
            >
              <div className="text-center">
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-nam-blue" />
                <h3 className="font-semibold text-nam-navy">Cartão</h3>
                <p className="text-sm text-nam-gray-dark">Crédito ou Débito</p>
                <div className="mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Até 12x sem juros</div>
              </div>
            </button>

            {/* Boleto */}
            <button
              onClick={() => {
                setSelectedMethod("boleto")
                setShowPixQR(false)
                setShowBoletoCode(false)
              }}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedMethod === "boleto"
                  ? "border-nam-primary bg-nam-primary/10"
                  : "border-nam-gray-light hover:border-nam-primary/50"
              }`}
            >
              <div className="text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-nam-primary" />
                <h3 className="font-semibold text-nam-navy">Boleto</h3>
                <p className="text-sm text-nam-gray-dark">Vencimento em 3 dias</p>
                <div className="mt-2 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Desconto 3%</div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* PIX Payment */}
      {selectedMethod === "pix" && (
        <Card className="border-nam-teal/30 bg-nam-teal/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-nam-navy">
              <QrCode className="w-5 h-5 text-nam-teal" />
              Pagamento via PIX
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-nam-teal/20">
              <div className="flex justify-between items-center mb-4">
                <span className="text-nam-navy font-medium">Valor a pagar:</span>
                <span className="text-2xl font-bold text-nam-teal">
                  {formatPrice(total * 0.95)} {/* 5% discount */}
                </span>
              </div>
              <div className="text-sm text-green-600 mb-4">✅ Desconto de 5% aplicado no PIX!</div>
            </div>

            {!showPixQR ? (
              <Button onClick={() => setShowPixQR(true)} className="w-full bg-nam-teal hover:bg-nam-teal/90 text-white">
                <Smartphone className="w-4 h-4 mr-2" />
                Gerar Código PIX
              </Button>
            ) : (
              <div className="space-y-4">
                {/* Fake QR Code */}
                <div className="bg-white p-6 rounded-lg border-2 border-dashed border-nam-teal/30 text-center">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-nam-teal/20 to-nam-blue/20 rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="w-24 h-24 text-nam-teal" />
                  </div>
                  <p className="text-sm text-nam-gray-dark mb-4">Escaneie o QR Code com seu app do banco</p>

                  {/* PIX Code */}
                  <div className="bg-nam-light p-3 rounded-lg">
                    <Label className="text-xs text-nam-gray-dark">Código PIX (Copia e Cola):</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input value={generatePixCode()} readOnly className="text-xs font-mono" />
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(generatePixCode(), "PIX")}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-nam-teal hover:bg-nam-teal/90 text-white h-12"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verificando Pagamento...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Confirmar Pagamento PIX
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Card Payment */}
      {selectedMethod === "card" && (
        <Card className="border-nam-blue/30 bg-nam-blue/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-nam-navy">
              <CreditCard className="w-5 h-5 text-nam-blue" />
              Pagamento com Cartão
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-nam-blue/20">
              <div className="flex justify-between items-center mb-4">
                <span className="text-nam-navy font-medium">Valor total:</span>
                <span className="text-2xl font-bold text-nam-blue">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cardNumber">Número do Cartão</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cardName">Nome no Cartão</Label>
                <Input id="cardName" placeholder="JOÃO DA SILVA" className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Validade</Label>
                <Input id="expiry" placeholder="MM/AA" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" type="password" className="mt-1" />
              </div>
            </div>

            <div className="bg-nam-light p-3 rounded-lg">
              <Label className="text-sm font-medium text-nam-navy">Parcelas:</Label>
              <select className="w-full mt-1 p-2 border border-nam-gray-light rounded-lg">
                <option>1x de {formatPrice(total)} sem juros</option>
                <option>2x de {formatPrice(total / 2)} sem juros</option>
                <option>3x de {formatPrice(total / 3)} sem juros</option>
                <option>6x de {formatPrice(total / 6)} sem juros</option>
                <option>12x de {formatPrice(total / 12)} sem juros</option>
              </select>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-nam-blue hover:bg-nam-blue/90 text-white h-12"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processando Pagamento...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Pagar com Cartão
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-nam-gray-medium">
              <Lock className="w-3 h-3" />
              <span>Pagamento 100% seguro e criptografado</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Boleto Payment */}
      {selectedMethod === "boleto" && (
        <Card className="border-nam-primary/30 bg-nam-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-nam-navy">
              <FileText className="w-5 h-5 text-nam-primary" />
              Pagamento via Boleto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-nam-primary/20">
              <div className="flex justify-between items-center mb-4">
                <span className="text-nam-navy font-medium">Valor a pagar:</span>
                <span className="text-2xl font-bold text-nam-primary">
                  {formatPrice(total * 0.97)} {/* 3% discount */}
                </span>
              </div>
              <div className="text-sm text-green-600 mb-2">✅ Desconto de 3% aplicado no boleto!</div>
              <div className="flex items-center gap-2 text-sm text-orange-600">
                <Calendar className="w-4 h-4" />
                <span>Vencimento: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>

            {!showBoletoCode ? (
              <Button
                onClick={() => setShowBoletoCode(true)}
                className="w-full bg-nam-primary hover:bg-nam-primary/90 text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Gerar Boleto
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-nam-primary/20">
                  <Label className="text-sm font-medium text-nam-navy">Código de Barras:</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input value={generateBoletoCode()} readOnly className="font-mono text-sm" />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(generateBoletoCode(), "do boleto")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">⚠️ Instruções importantes:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• O boleto pode ser pago em qualquer banco ou lotérica</li>
                    <li>• Pagamento via internet banking ou app do banco</li>
                    <li>• Após o pagamento, o pedido será processado em até 2 dias úteis</li>
                    <li>• Guarde o comprovante de pagamento</li>
                  </ul>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-nam-primary hover:bg-nam-primary/90 text-white h-12"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Confirmando Boleto...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Confirmar Pedido com Boleto
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Security Info */}
      <Card className="bg-nam-light border-nam-gray-light">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-6 text-sm text-nam-gray-dark">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-nam-teal" />
              <span>SSL Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Dados Protegidos</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-nam-blue" />
              <span>PCI Compliant</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
