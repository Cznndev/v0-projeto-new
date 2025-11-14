import { type NextRequest, NextResponse } from "next/server"
import { SimplePayment } from "@/lib/simple-payment"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Processa o pedido
    const order = await SimplePayment.processOrder(orderData)

    return NextResponse.json({
      success: true,
      order,
      message: "Pedido confirmado com sucesso!",
    })
  } catch (error) {
    console.error("Erro ao processar pedido:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
