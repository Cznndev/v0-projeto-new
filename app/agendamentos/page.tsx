"use client"

import { UserAppointments } from "@/components/appointment/user-appointments"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AgendamentosPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-nam-light dark:bg-nam-navy py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="text-nam-teal hover:text-nam-blue">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <UserAppointments />
      </div>
    </div>
  )
}
