import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    services: {
      stripe: process.env.STRIPE_SECRET_KEY ? "configured" : "demo_mode",
      database: "memory", // Since we're using in-memory storage
    },
  })
}
