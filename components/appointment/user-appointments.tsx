"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, DollarSign, Phone, MessageSquare, X } from "lucide-react"
import { useAppointments } from "@/contexts/appointment-context"
import { useAuth } from "@/contexts/auth-context"
import type { Appointment } from "@/types/appointment"

export function UserAppointments() {
  const { user } = useAuth()
  const { getUserAppointments, cancelAppointment, isLoading } = useAppointments()
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-nam-gray-medium">Faça login para ver seus agendamentos</p>
        </CardContent>
      </Card>
    )
  }

  const appointments = getUserAppointments(user.id)

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-nam-teal text-white"
      case "pending":
        return "bg-yellow-500 text-white"
      case "completed":
        return "bg-green-500 text-white"
      case "cancelled":
        return "bg-nam-gray-medium text-white"
      default:
        return "bg-nam-gray-light text-nam-gray-dark"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendente"
      case "completed":
        return "Concluído"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const canCancel = (appointment: Appointment) => {
    if (appointment.status === "cancelled" || appointment.status === "completed") {
      return false
    }

    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`)
    const now = new Date()
    const hoursDiff = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

    return hoursDiff > 24 // Can cancel if more than 24 hours in advance
  }

  const handleCancel = async (appointmentId: string) => {
    setCancellingId(appointmentId)
    await cancelAppointment(appointmentId)
    setCancellingId(null)
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-nam-navy dark:text-nam-light">Meus Agendamentos</CardTitle>
          <CardDescription>Você ainda não possui agendamentos</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-nam-gray-medium opacity-50" />
          <p className="text-nam-gray-medium">Agende seu primeiro serviço!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-nam-navy dark:text-nam-light">Meus Agendamentos</CardTitle>
        <CardDescription>Gerencie seus agendamentos de serviços</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment, index) => (
          <div key={appointment.id}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-nam-navy dark:text-nam-light">{appointment.serviceName}</h3>
                    <Badge className={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-nam-gray-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-nam-teal" />
                      <span className="capitalize">{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-nam-teal" />
                      <span>
                        {appointment.time} ({formatDuration(appointment.serviceDuration)})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-nam-teal" />
                      <span className="font-semibold">R$ {appointment.servicePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-nam-teal" />
                      <span>{appointment.customerPhone}</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="flex items-start gap-2 text-sm">
                      <MessageSquare className="w-4 h-4 text-nam-teal mt-0.5" />
                      <span className="text-nam-gray-medium">{appointment.notes}</span>
                    </div>
                  )}
                </div>

                {canCancel(appointment) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCancel(appointment.id)}
                    disabled={cancellingId === appointment.id}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <X className="w-4 h-4 mr-1" />
                    {cancellingId === appointment.id ? "Cancelando..." : "Cancelar"}
                  </Button>
                )}
              </div>
            </div>

            {index < appointments.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
