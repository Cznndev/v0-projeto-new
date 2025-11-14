"use client"

import { Badge } from "@/components/ui/badge"
import { Flame, Package, Info, MessageSquare, Phone, Gift } from 'lucide-react'

interface NavigationTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  productCount: number
}

export function NavigationTabs({ activeTab, onTabChange, productCount }: NavigationTabsProps) {
  const tabs = [
    {
      id: "ofertas",
      label: "Ofertas",
      icon: Flame,
      badge: "HOT",
      color: "text-red-500",
    },
    {
      id: "produtos",
      label: "Produtos",
      icon: Package,
      badge: productCount.toString(),
      color: "text-infinity-mint",
    },
    {
      id: "combos",
      label: "Combos Especiais",
      icon: Gift,
      badge: "5",
      color: "text-infinity-copper",
    },
    {
      id: "sobre",
      label: "Sobre",
      icon: Info,
      color: "text-infinity-charcoal",
    },
    {
      id: "depoimentos",
      label: "Depoimentos",
      icon: MessageSquare,
      color: "text-infinity-charcoal",
    },
    {
      id: "contato",
      label: "Contato",
      icon: Phone,
      color: "text-infinity-mint",
    },
  ]

  return (
    <nav className="bg-infinity-white shadow-sm border-b border-infinity-mint/20 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center overflow-x-auto py-4">
          <div className="flex space-x-1 min-w-max">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`nav-item flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-infinity-copper text-white shadow-lg"
                      : "text-infinity-charcoal hover:bg-infinity-mint/10 hover:text-infinity-copper"
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? "text-white" : tab.color}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <Badge
                      className={`ml-1 ${
                        isActive
                          ? "bg-white text-infinity-copper"
                          : tab.id === "ofertas"
                            ? "bg-red-500 text-white animate-pulse"
                            : "bg-infinity-mint text-infinity-charcoal"
                      }`}
                    >
                      {tab.badge}
                    </Badge>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
