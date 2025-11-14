"use client"

import { useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/contexts/toast-context"

export function FreeShippingNotifier() {
  const { total } = useCart()
  const { addToast } = useToast()

  useEffect(() => {
    const freeShippingThreshold = 150
    const previousTotal = Number.parseFloat(localStorage.getItem("previous-cart-total") || "0")

    // Check if we just crossed the free shipping threshold
    if (previousTotal < freeShippingThreshold && total >= freeShippingThreshold) {
      addToast({
        type: "success",
        title: "🎉 Frete Grátis Desbloqueado!",
        description: "Sua compra agora tem frete grátis para todo o Brasil!",
        duration: 5000,
      })
    }

    // Save current total for next comparison
    localStorage.setItem("previous-cart-total", total.toString())
  }, [total, addToast])

  return null
}
