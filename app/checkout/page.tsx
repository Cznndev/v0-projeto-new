"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { usePromotion } from "@/contexts/promotion-context"
import { useToast } from "@/contexts/toast-context"
import FakePaymentMethods from "@/components/payment/fake-payment-methods"
import { ArrowLeft, Truck, MapPin, User, Tag, X, CheckCircle, AlertCircle, CreditCard } from "lucide-react"

interface FormData {
  // Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string
  cpf: string

  // Address
  zipCode: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

interface FormErrors {
  [key: string]: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { appliedCoupon, applyCoupon, removeCoupon, calculateDiscount } = usePromotion()
  const { addToast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cpf: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [couponCode, setCouponCode] = useState("")
  const [currentStep, setCurrentStep] = useState(1)

  const discount = calculateDiscount(total)
  const shipping = total >= 150 ? 0 : 15
  const finalTotal = total - discount + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, "")
    return numbers.length === 11
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value

    // Apply formatting
    if (field === "phone") {
      formattedValue = formatPhone(value)
    } else if (field === "cpf") {
      formattedValue = formatCPF(value)
    } else if (field === "zipCode") {
      formattedValue = formatZipCode(value)
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }))

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const errors: FormErrors = {}

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) errors.firstName = "Nome é obrigatório"
        if (!formData.lastName.trim()) errors.lastName = "Sobrenome é obrigatório"
        if (!formData.email.trim()) {
          errors.email = "Email é obrigatório"
        } else if (!validateEmail(formData.email)) {
          errors.email = "Email inválido"
        }
        if (!formData.phone.trim()) {
          errors.phone = "Telefone é obrigatório"
        }
        if (!formData.cpf.trim()) {
          errors.cpf = "CPF é obrigatório"
        } else if (!validateCPF(formData.cpf)) {
          errors.cpf = "CPF inválido"
        }
        break

      case 2:
        if (!formData.zipCode.trim()) errors.zipCode = "CEP é obrigatório"
        if (!formData.street.trim()) errors.street = "Rua é obrigatória"
        if (!formData.number.trim()) errors.number = "Número é obrigatório"
        if (!formData.neighborhood.trim()) errors.neighborhood = "Bairro é obrigatório"
        if (!formData.city.trim()) errors.city = "Cidade é obrigatória"
        if (!formData.state.trim()) errors.state = "Estado é obrigatório"
        break
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCouponApply = () => {
    if (couponCode.trim()) {
      applyCoupon(couponCode.trim())
      setCouponCode("")
    }
  }

  const handlePaymentSuccess = async () => {
    // Generate order ID
    const orderId = `NAM-${Date.now().toString().slice(-8)}`

    // Clear cart and redirect to success page
    clearCart()
    router.push(`/checkout/success?orderId=${orderId}`)
  }

  const handleStepNavigation = (nextStep: number) => {
    if (validateStep(currentStep)) {
      setCurrentStep(nextStep)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-nam-light flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 border-nam-gray-light">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-nam-gray-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-nam-gray-medium" />
            </div>
            <h2 className="text-xl font-bold text-nam-navy mb-2">Carrinho vazio</h2>
            <p className="text-nam-gray-dark mb-6">Adicione produtos ao carrinho para continuar</p>
            <Button onClick={() => router.push("/")} className="bg-nam-primary hover:bg-nam-navy text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar às compras
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-nam-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-nam-gray-light">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/")} className="p-2 hover:bg-nam-gray-light">
                <ArrowLeft className="w-5 h-5 text-nam-navy" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-nam-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N.A.M</span>
                </div>
                <span className="text-lg font-bold text-nam-navy">Checkout Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center space-x-4 mb-8">
              {[
                { step: 1, title: "Dados Pessoais", icon: User },
                { step: 2, title: "Endereço", icon: MapPin },
                { step: 3, title: "Pagamento", icon: CreditCard },
              ].map(({ step, title, icon: Icon }) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      currentStep >= step ? "bg-nam-primary text-white" : "bg-nam-gray-light text-nam-gray-medium"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep >= step ? "text-nam-navy" : "text-nam-gray-medium"
                    }`}
                  >
                    {title}
                  </span>
                  {step < 3 && (
                    <div className={`w-8 h-px ml-4 ${currentStep > step ? "bg-nam-primary" : "bg-nam-gray-light"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <Card className="border-nam-gray-light">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-nam-navy">
                    <User className="w-5 h-5 text-nam-teal" />
                    Dados Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-nam-navy mb-1">Nome *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy placeholder-nam-gray-medium transition-colors ${
                          formErrors.firstName ? "border-red-500" : "border-nam-gray-light"
                        }`}
                        placeholder="Seu nome"
                        required
                      />
                      {formErrors.firstName && (
                        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {formErrors.firstName}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-nam-navy mb-1">Sobrenome *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy placeholder-nam-gray-medium transition-colors ${
                          formErrors.lastName ? "border-red-500" : "border-nam-gray-light"
                        }`}
                        placeholder="Seu sobrenome"
                        required
                      />
                      {formErrors.lastName && (
                        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {formErrors.lastName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-nam-navy mb-1">E-mail *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy placeholder-nam-gray-medium transition-colors ${
                        formErrors.email ? "border-red-500" : "border-nam-gray-light"
                      }`}
                      placeholder="seu@email.com"
                      required
                    />
                    {formErrors.email && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {formErrors.email}
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-nam-navy mb-1">Telefone *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy placeholder-nam-gray-medium transition-colors ${
                          formErrors.phone ? "border-red-500" : "border-nam-gray-light"
                        }`}
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                        required
                      />
                      {formErrors.phone && (
                        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {formErrors.phone}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-nam-navy mb-1">CPF *</label>
                      <input
                        type="text"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange("cpf", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy placeholder-nam-gray-medium transition-colors ${
                          formErrors.cpf ? "border-red-500" : "border-nam-gray-light"
                        }`}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        required
                      />
                      {formErrors.cpf && (
                        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {formErrors.cpf}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleStepNavigation(2)}
                    className="w-full bg-nam-teal hover:bg-nam-primary text-white font-medium px-6 py-3 rounded-lg transition-all duration-200"
                  >
                    Continuar para Endereço
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Address */}
            {currentStep === 2 && (
              <Card className="border-nam-gray-light">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-nam-navy">
                    <MapPin className="w-5 h-5 text-nam-teal" />
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-nam-navy mb-1">CEP *</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy placeholder-nam-gray-medium transition-colors ${
                        formErrors.zipCode ? "border-red-500" : "border-nam-gray-light"
                      }`}
                      placeholder="00000-000"
                      maxLength={9}
                      required
                    />
                    {formErrors.zipCode && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {formErrors.zipCode}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-nam-navy mb-1">Rua *</label>
                    <input
                      type="text"
                      value={formData.street}
                      onChange={(e) => handleInputChange("street", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy placeholder-nam-gray-medium transition-colors ${
                        formErrors.street ? "border-red-500" : "border-nam-gray-light"
                      }`}
                      placeholder="Nome da rua"
                      required
                    />
                    {formErrors.street && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {formErrors.street}
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-nam-navy mb-1">Número *</label>
                      <input
                        type="text"
                        value={formData.number}
                        onChange={(e) => handleInputChange("number", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy placeholder-nam-gray-medium transition-colors ${
                          formErrors.number ? "border-red-500" : "border-nam-gray-light"
                        }`}
                        placeholder="123"
                        required
                      />
                      {formErrors.number && (
                        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {formErrors.number}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-nam-navy mb-1">Complemento</label>
                      <input
                        type="text"
                        value={formData.complement}
                        onChange={(e) => handleInputChange("complement", e.target.value)}
                        className="w-full px-4 py-3 border border-nam-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy placeholder-nam-gray-medium transition-colors"
                        placeholder="Apto, bloco, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-nam-navy mb-1">Bairro *</label>
                    <input
                      type="text"
                      value={formData.neighborhood}
                      onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy placeholder-nam-gray-medium transition-colors ${
                        formErrors.neighborhood ? "border-red-500" : "border-nam-gray-light"
                      }`}
                      placeholder="Nome do bairro"
                      required
                    />
                    {formErrors.neighborhood && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {formErrors.neighborhood}
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-nam-navy mb-1">Cidade *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy placeholder-nam-gray-medium transition-colors ${
                          formErrors.city ? "border-red-500" : "border-nam-gray-light"
                        }`}
                        placeholder="Nome da cidade"
                        required
                      />
                      {formErrors.city && (
                        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {formErrors.city}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-nam-navy mb-1">Estado *</label>
                      <select
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy transition-colors ${
                          formErrors.state ? "border-red-500" : "border-nam-gray-light"
                        }`}
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="PR">Paraná</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="BA">Bahia</option>
                        <option value="GO">Goiás</option>
                        <option value="PE">Pernambuco</option>
                        <option value="CE">Ceará</option>
                      </select>
                      {formErrors.state && (
                        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {formErrors.state}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border-nam-gray-light text-nam-navy hover:bg-nam-gray-light"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={() => handleStepNavigation(3)}
                      className="flex-1 bg-nam-teal hover:bg-nam-primary text-white font-medium px-6 py-3 rounded-lg transition-all duration-200"
                    >
                      Ir para Pagamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex gap-4 mb-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="border-nam-gray-light text-nam-navy hover:bg-nam-gray-light"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                </div>

                <FakePaymentMethods total={finalTotal} onPaymentSuccess={handlePaymentSuccess} />
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Products */}
            <Card className="border-nam-gray-light">
              <CardHeader>
                <CardTitle className="text-nam-navy">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border border-nam-gray-light"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-nam-navy text-sm">{item.name}</h4>
                      <p className="text-nam-gray-dark text-sm">Qtd: {item.quantity}</p>
                      <p className="font-semibold text-nam-navy">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Coupon */}
            <Card className="border-nam-gray-light">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-nam-navy">
                  <Tag className="w-5 h-5 text-nam-teal" />
                  Cupom de Desconto
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-nam-teal/10 border border-nam-teal/20 rounded-lg">
                    <div>
                      <p className="font-medium text-nam-navy">{appliedCoupon.code}</p>
                      <p className="text-sm text-nam-gray-dark">{appliedCoupon.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeCoupon}
                      className="text-nam-teal hover:bg-nam-teal/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Digite o cupom"
                      className="flex-1 px-4 py-3 border border-nam-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-nam-teal focus:border-nam-teal bg-white text-nam-navy placeholder-nam-gray-medium"
                    />
                    <Button
                      onClick={handleCouponApply}
                      variant="outline"
                      className="border-nam-teal text-nam-teal hover:bg-nam-teal hover:text-white"
                    >
                      Aplicar
                    </Button>
                  </div>
                )}
                <div className="mt-3 text-xs text-nam-gray-dark">
                  <p className="font-medium mb-1">Cupons disponíveis:</p>
                  <div className="flex flex-wrap gap-1">
                    {["WELCOME15", "SKINCARE10", "PRIMEIRA10", "SKINCARE15", "MASCULINO20", "SAVE50"].map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCouponCode(code)
                          handleCouponApply()
                        }}
                        className="px-2 py-1 bg-nam-teal/10 text-nam-teal rounded text-xs hover:bg-nam-teal/20 transition-colors"
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Totals */}
            <Card className="border-nam-gray-light">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-nam-navy">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-nam-teal">
                      <span>Desconto</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-nam-navy">
                    <span>Frete</span>
                    <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
                  </div>

                  <div className="border-t border-nam-gray-light pt-3">
                    <div className="flex justify-between text-lg font-bold text-nam-navy">
                      <span>Total</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  {total >= 150 && (
                    <div className="flex items-center gap-2 text-nam-teal text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Frete grátis aplicado!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
