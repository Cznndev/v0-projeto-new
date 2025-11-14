// Simulação de API brasileira de pagamentos
export class BrazilianPayments {
  private static generatePixKey(): string {
    // Simula uma chave PIX aleatória
    const keys = ["pix@nam-skincare.com.br", "11999887766", "12345678000199", "a1b2c3d4-e5f6-7890-abcd-ef1234567890"]
    return keys[Math.floor(Math.random() * keys.length)]
  }

  private static generateQRCode(amount: number, pixKey: string): string {
    // Simula geração de QR Code PIX
    const payload = `00020126580014BR.GOV.BCB.PIX0136${pixKey}52040000530398654${amount.toFixed(2).padStart(10, "0")}5802BR5925NAM New Age Men Skincare6009SAO PAULO62070503***6304`
    return payload
  }

  static async createPixPayment(amount: number, orderId: string): Promise<any> {
    // Simula delay da API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const pixKey = this.generatePixKey()
    const qrCode = this.generateQRCode(amount, pixKey)

    return {
      id: `pix_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      qrCode,
      qrCodeBase64: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`,
      pixKey,
      amount,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos
      status: "pending",
    }
  }

  static async createBoletoPayment(amount: number, orderId: string, customerData: any): Promise<any> {
    // Simula delay da API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const barcodeNumber = `23793.39001 60000.000001 00000.000000 1 ${Math.floor(Date.now() / 1000)}`
    const digitableLine = barcodeNumber.replace(/\s/g, "")

    return {
      id: `boleto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      barcodeNumber,
      digitableLine,
      amount,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias
      status: "pending",
      pdfUrl: `/api/boleto/${orderId}/pdf`,
    }
  }

  static async checkPixPayment(pixId: string): Promise<"pending" | "paid" | "expired"> {
    // Simula verificação de pagamento PIX
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 30% chance de estar pago (para demo)
    const random = Math.random()
    if (random < 0.3) return "paid"
    if (random < 0.95) return "pending"
    return "expired"
  }

  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  static formatPixKey(key: string): string {
    // Formatar chave PIX para exibição
    if (key.includes("@")) return key // Email
    if (key.length === 11) return key.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3") // Telefone
    if (key.length === 14) return key.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") // CNPJ
    return key // UUID ou outros
  }
}
