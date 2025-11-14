export interface SimpleOrder {
  id: string
  customerName: string
  customerEmail: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  discount: number
  shipping: number
  finalTotal: number
  createdAt: Date
  status: "confirmed"
}

export class SimplePayment {
  static generateOrderId(): string {
    return `NAM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }

  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  static async processOrder(orderData: any): Promise<SimpleOrder> {
    // Simula processamento do pedido
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const order: SimpleOrder = {
      id: this.generateOrderId(),
      customerName: `${orderData.firstName} ${orderData.lastName}`,
      customerEmail: orderData.email,
      items: orderData.items,
      total: orderData.total,
      discount: orderData.discount,
      shipping: orderData.shipping,
      finalTotal: orderData.finalTotal,
      createdAt: new Date(),
      status: "confirmed",
    }

    return order
  }
}
