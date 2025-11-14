"use client"

import { useState } from "react"
import { CartDrawer } from "@/components/cart-drawer"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"
import { UserProfile } from "@/components/auth/user-profile"
import { NavigationTabs } from "@/components/navigation-tabs"
import { ProdutosTab } from "@/components/tabs/produtos-tab"
import { SobreTab } from "@/components/tabs/sobre-tab"
import { DepoimentosTab } from "@/components/tabs/depoimentos-tab"
import { ContatoTab } from "@/components/tabs/contato-tab"
import { OfertasTab } from "@/components/tabs/ofertas-tab"
import { CombosTab } from "@/components/tabs/combos-tab"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, Truck, Award, User, Flame } from 'lucide-react'
import { products } from "@/data/products"

export default function HomePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("ofertas")
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const renderTabContent = () => {
    switch (activeTab) {
      case "ofertas":
        return <OfertasTab />
      case "produtos":
        return <ProdutosTab />
      case "combos":
        return <CombosTab />
      case "sobre":
        return <SobreTab />
      case "depoimentos":
        return <DepoimentosTab />
      case "contato":
        return <ContatoTab />
      default:
        return <OfertasTab />
    }
  }

  return (
    <div className="min-h-screen bg-infinity-white transition-colors duration-300">
      {/* Header */}
      <header className="bg-infinity-white shadow-sm border-b border-infinity-mint/20 transition-all-smooth">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <img
                src="/images/infinity-pen-logo.svg"
                alt="InfinityPen"
                className="h-12 w-auto hover-scale transition-transform-smooth filter drop-shadow-lg"
              />
              <span className="text-2xl font-bold text-infinity-charcoal hidden sm:inline">InfinityPen</span>
            </div>

            <div className="flex items-center space-x-4 animate-slide-in-right">
              {user ? (
                <Button
                  variant="ghost"
                  onClick={() => setShowProfile(true)}
                  className="flex items-center gap-2 text-infinity-charcoal hover:text-infinity-copper button-bounce interactive-element"
                >
                  <User className="w-5 h-5 icon-bounce" />
                  <span className="hidden sm:inline">Olá, {user.firstName}</span>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => setShowLogin(true)}
                  className="text-infinity-charcoal hover:text-infinity-copper button-bounce interactive-element"
                >
                  Entrar
                </Button>
              )}
              <CartDrawer />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-infinity-charcoal via-infinity-charcoal to-infinity-copper text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="animate-slide-in-left">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-red-600 text-white animate-pulse badge-pulse">
                    <Flame className="w-3 h-3 mr-1 icon-bounce" />
                    OFERTAS ESPECIAIS
                  </Badge>
                  <Badge className="bg-infinity-mint text-infinity-charcoal animate-slide-in-right font-semibold">
                    Canetas Premium
                  </Badge>
                </div>
                <h2 className="text-5xl font-bold mb-6 leading-tight animate-slide-in-bottom">
                  Escrita Infinita com
                  <span className="text-infinity-copper animate-gradient"> InfinityPen</span>
                </h2>
                <p
                  className="text-xl text-gray-200 mb-8 leading-relaxed animate-slide-in-bottom"
                  style={{ animationDelay: "0.2s" }}
                >
                  Canetas recarregáveis com tinta infinita. Qualidade premium, design elegante e sustentabilidade em cada traço.
                </p>
                <div
                  className="flex flex-col sm:flex-row gap-4 animate-slide-in-bottom"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-lg px-8 animate-glow button-bounce interactive-element"
                    onClick={() => setActiveTab("ofertas")}
                  >
                    <Flame className="w-5 h-5 mr-2 icon-bounce" />
                    Ver Ofertas
                  </Button>
                  <Button
                    size="lg"
                    className="bg-infinity-mint hover:bg-opacity-90 text-infinity-charcoal text-lg px-8 font-semibold button-bounce interactive-element"
                    onClick={() => setActiveTab("combos")}
                  >
                    Combos Especiais
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 text-gray-200 hover:bg-infinity-mint hover:border-infinity-mint hover:text-infinity-charcoal text-lg px-8 button-bounce interactive-element"
                    onClick={() => setActiveTab("produtos")}
                  >
                    Ver Produtos
                  </Button>
                </div>
                <div
                  className="flex items-center gap-8 mt-8 animate-slide-in-bottom"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-infinity-mint icon-bounce" />
                    <span className="text-sm">Tinta Infinita Premium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-infinity-mint icon-bounce" />
                    <span className="text-sm">Garantia Vitalícia</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <img
                src="https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=600&h=600&fit=crop&crop=center&q=80"
                alt="Canetas InfinityPen Premium"
                className="rounded-2xl shadow-2xl hover-scale transition-transform-smooth animate-float"
              />
              <div
                className="absolute -bottom-6 -left-6 bg-white text-infinity-charcoal p-4 rounded-xl shadow-lg animate-scale-in hover-lift"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-infinity-copper fill-current star-fill" />
                  <span className="font-bold">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600">+500k clientes satisfeitos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} productCount={products.length} />

      {/* Tab Content */}
      <main>{renderTabContent()}</main>

      {/* Footer */}
      <footer className="bg-infinity-charcoal text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/images/infinity-pen-logo.svg"
                  alt="InfinityPen"
                  className="h-8 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 mb-4">
                Canetas recarregáveis com tinta infinita para uma escrita sem limites.
              </p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-infinity-copper fill-current star-fill" />
                ))}
                <span className="text-sm text-gray-400 ml-2">4.9/5 (500k+ avaliações)</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Navegação</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => setActiveTab("ofertas")}
                    className="hover:text-infinity-mint transition-colors flex items-center gap-2"
                  >
                    <Flame className="w-4 h-4 text-red-500" />
                    Ofertas Especiais
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("combos")}
                    className="hover:text-infinity-mint transition-colors"
                  >
                    Combos Especiais
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab("produtos")} className="hover:text-infinity-mint transition-colors">
                    Produtos
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab("sobre")} className="hover:text-infinity-mint transition-colors">
                    Sobre Nós
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab("contato")} className="hover:text-infinity-mint transition-colors">
                    Contato
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-infinity-mint">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-infinity-mint">
                    Política de Troca
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-infinity-mint">
                    Frete e Entrega
                  </a>
                </li>
                <li>
                  <button onClick={() => setActiveTab("contato")} className="hover:text-infinity-mint transition-colors">
                    Fale Conosco
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 contato@infinitypen.com.br</p>
                <p>📱 (11) 99999-9999</p>
                <p>📍 São Paulo, SP</p>
                <div className="flex items-center gap-8 mt-4">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span className="text-xs">Frete Grátis R$ 150+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs">Compra Segura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 InfinityPen. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false)
          setShowRegister(true)
        }}
      />

      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false)
          setShowLogin(true)
        }}
      />

      <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}
