"use client"

import { useCart, type Product } from "@/contexts/cart-context"
import { useToast } from "@/contexts/toast-context"
import { useCallback } from "react"

export function useCartWithToast() {
  const cart = useCart()
  const { addToast } = useToast()

  const addItem = useCallback(
    (product: Product) => {
      const existingItem = cart.items.find((item) => item.id === product.id)

      cart.addItem(product)

      if (existingItem) {
        addToast({
          type: "success",
          title: "Quantidade atualizada!",
          description: `${product.name} - Quantidade: ${existingItem.quantity + 1}`,
          duration: 3000,
        })
      } else {
        addToast({
          type: "success",
          title: "Produto adicionado!",
          description: `${product.name} foi adicionado ao carrinho`,
          duration: 3000,
        })
      }
    },
    [cart, addToast],
  )

  const removeItem = useCallback(
    (id: string) => {
      const item = cart.items.find((item) => item.id === id)

      if (item) {
        cart.removeItem(id)
        addToast({
          type: "info",
          title: "Produto removido",
          description: `${item.name} foi removido do carrinho`,
          duration: 3000,
        })
      }
    },
    [cart, addToast],
  )

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      const item = cart.items.find((item) => item.id === id)

      if (item) {
        if (quantity === 0) {
          removeItem(id)
        } else {
          cart.updateQuantity(id, quantity)

          if (quantity > item.quantity) {
            addToast({
              type: "success",
              title: "Quantidade aumentada",
              description: `${item.name} - Quantidade: ${quantity}`,
              duration: 2000,
            })
          } else {
            addToast({
              type: "info",
              title: "Quantidade reduzida",
              description: `${item.name} - Quantidade: ${quantity}`,
              duration: 2000,
            })
          }
        }
      }
    },
    [cart, addToast, removeItem],
  )

  const clearCart = useCallback(() => {
    const itemCount = cart.itemCount

    if (itemCount > 0) {
      cart.clearCart()
      addToast({
        type: "warning",
        title: "Carrinho limpo",
        description: `${itemCount} ${itemCount === 1 ? "item removido" : "itens removidos"}`,
        duration: 3000,
      })
    }
  }, [cart, addToast])

  return {
    ...cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
}
