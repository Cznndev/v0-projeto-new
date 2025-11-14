"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/contexts/toast-context"
import { useCart } from "@/contexts/cart-context"

interface Coupon {
  code: string
  discount: number
  type: "percentage" | "fixed"
  minValue?: number
  description: string
  expiresAt?: Date
  active: boolean
}

interface Promotion {
  id: string
  title: string
  description: string
  type: "welcome" | "cart_value" | "first_purchase" | "limited_time"
  trigger?: {
    cartValue?: number
    timeOnSite?: number
  }
  coupon?: Coupon
  shown: boolean
}

interface PromotionContextType {
  promotions: Promotion[]
  appliedCoupon: Coupon | null
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
  calculateDiscount: (total: number) => number
  availableCoupons: Coupon[]
}

const coupons: Coupon[] = [
  {
    code: "WELCOME15",
    discount: 15,
    type: "percentage",
    description: "15% de desconto para novos clientes",
    active: true,
  },
  {
    code: "FRETE10",
    discount: 10,
    type: "percentage",
    minValue: 150,
    description: "10% de desconto + frete grátis",
    active: true,
  },
  {
    code: "PREMIUM20",
    discount: 20,
    type: "percentage",
    minValue: 300,
    description: "20% de desconto para compras premium",
    active: true,
  },
  {
    code: "FLASH25",
    discount: 25,
    type: "percentage",
    description: "25% de desconto - oferta por tempo limitado",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    active: true,
  },
  {
    code: "SKINCARE10",
    discount: 10,
    type: "percentage",
    description: "10% de desconto geral",
    active: true,
  },
  {
    code: "SAVE50",
    discount: 50,
    type: "fixed",
    minValue: 200,
    description: "R$ 50 de desconto em compras acima de R$ 200",
    active: true,
  },
  {
    code: "PRIMEIRA10",
    discount: 10,
    type: "percentage",
    description: "10% de desconto na primeira compra",
    active: true,
  },
  {
    code: "SKINCARE15",
    discount: 15,
    type: "percentage",
    description: "15% de desconto em produtos de skincare",
    active: true,
  },
  {
    code: "MASCULINO20",
    discount: 20,
    type: "percentage",
    minValue: 100,
    description: "20% de desconto em produtos masculinos",
    active: true,
  },
]

const promotions: Promotion[] = [
  {
    id: "welcome",
    title: "🎉 Bem-vindo à N.A.M!",
    description: "Ganhe 15% OFF na sua primeira compra com o cupom WELCOME15",
    type: "welcome",
    trigger: { timeOnSite: 10000 }, // 10 seconds
    coupon: coupons.find((c) => c.code === "WELCOME15"),
    shown: false,
  },
  {
    id: "cart_150",
    title: "🚚 Frete Grátis + Desconto!",
    description: "Você desbloqueou frete grátis! Use FRETE10 e ganhe mais 10% OFF",
    type: "cart_value",
    trigger: { cartValue: 150 },
    coupon: coupons.find((c) => c.code === "FRETE10"),
    shown: false,
  },
  {
    id: "cart_300",
    title: "💎 Compra Premium!",
    description: "Carrinho acima de R$ 300! Use PREMIUM20 e ganhe 20% OFF",
    type: "cart_value",
    trigger: { cartValue: 300 },
    coupon: coupons.find((c) => c.code === "PREMIUM20"),
    shown: false,
  },
  {
    id: "limited_time",
    title: "⏰ Oferta Relâmpago!",
    description: "Apenas hoje: 25% OFF em toda loja com FLASH25",
    type: "limited_time",
    coupon: coupons.find((c) => c.code === "FLASH25"),
    shown: false,
  },
]

const PromotionContext = createContext<PromotionContextType | undefined>(undefined)

export function PromotionProvider({ children }: { children: React.ReactNode }) {
  const [promotionState, setPromotionState] = useState(promotions)
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const { addToast } = useToast()
  const { total } = useCart()

  // Check for time-based promotions
  useEffect(() => {
    const timer = setTimeout(() => {
      const welcomePromo = promotionState.find((p) => p.id === "welcome" && !p.shown)
      if (welcomePromo) {
        addToast({
          type: "info",
          title: welcomePromo.title,
          description: welcomePromo.description,
          duration: 8000,
        })
        setPromotionState((prev) => prev.map((p) => (p.id === "welcome" ? { ...p, shown: true } : p)))
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [addToast, promotionState])

  // Check for cart value promotions
  useEffect(() => {
    const cartPromos = promotionState.filter(
      (p) => p.type === "cart_value" && !p.shown && p.trigger?.cartValue && total >= p.trigger.cartValue,
    )

    cartPromos.forEach((promo) => {
      addToast({
        type: "success",
        title: promo.title,
        description: promo.description,
        duration: 10000,
      })
      setPromotionState((prev) => prev.map((p) => (p.id === promo.id ? { ...p, shown: true } : p)))
    })
  }, [total, addToast, promotionState])

  // Show limited time promotion randomly
  useEffect(() => {
    const showLimitedPromo = () => {
      const limitedPromo = promotionState.find((p) => p.id === "limited_time" && !p.shown)
      if (limitedPromo && Math.random() > 0.7) {
        // 30% chance
        addToast({
          type: "warning",
          title: limitedPromo.title,
          description: limitedPromo.description,
          duration: 12000,
        })
        setPromotionState((prev) => prev.map((p) => (p.id === "limited_time" ? { ...p, shown: true } : p)))
      }
    }

    const timer = setTimeout(showLimitedPromo, 30000) // After 30 seconds
    return () => clearTimeout(timer)
  }, [addToast, promotionState])

  const applyCoupon = (code: string): boolean => {
    const normalizedCode = code.trim().toUpperCase()
    const coupon = coupons.find((c) => c.code.toUpperCase() === normalizedCode && c.active)

    console.log("Trying to apply coupon:", normalizedCode)
    console.log(
      "Available coupons:",
      coupons.map((c) => c.code),
    )
    console.log("Found coupon:", coupon)

    if (!coupon) {
      addToast({
        type: "error",
        title: "Cupom inválido",
        description: "O código inserido não é válido ou não está ativo",
        duration: 4000,
      })
      return false
    }

    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      addToast({
        type: "error",
        title: "Cupom expirado",
        description: "Este cupom não está mais válido",
        duration: 4000,
      })
      return false
    }

    if (coupon.minValue && total < coupon.minValue) {
      addToast({
        type: "warning",
        title: "Valor mínimo não atingido",
        description: `Este cupom é válido para compras acima de R$ ${coupon.minValue.toFixed(2).replace(".", ",")}`,
        duration: 5000,
      })
      return false
    }

    // Check if coupon is already applied
    if (appliedCoupon && appliedCoupon.code === coupon.code) {
      addToast({
        type: "warning",
        title: "Cupom já aplicado",
        description: "Este cupom já está sendo usado no seu pedido",
        duration: 4000,
      })
      return false
    }

    setAppliedCoupon(coupon)
    const discount = calculateDiscount(total, coupon)
    addToast({
      type: "success",
      title: "🎉 Cupom aplicado!",
      description: `${coupon.description} - Economia de R$ ${discount.toFixed(2).replace(".", ",")}`,
      duration: 6000,
    })
    return true
  }

  const removeCoupon = () => {
    if (appliedCoupon) {
      setAppliedCoupon(null)
      addToast({
        type: "info",
        title: "Cupom removido",
        description: "O desconto foi removido do seu pedido",
        duration: 3000,
      })
    }
  }

  const calculateDiscount = (total: number, coupon?: Coupon): number => {
    const activeCoupon = coupon || appliedCoupon
    if (!activeCoupon) return 0

    if (activeCoupon.type === "percentage") {
      return (total * activeCoupon.discount) / 100
    } else {
      return Math.min(activeCoupon.discount, total)
    }
  }

  return (
    <PromotionContext.Provider
      value={{
        promotions: promotionState,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        calculateDiscount,
        availableCoupons: coupons.filter((c) => c.active),
      }}
    >
      {children}
    </PromotionContext.Provider>
  )
}

export function usePromotion() {
  const context = useContext(PromotionContext)
  if (context === undefined) {
    throw new Error("usePromotion must be used within a PromotionProvider")
  }
  return context
}
