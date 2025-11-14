"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MessageSquare, Calendar, Clock, DollarSign } from "lucide-react"
import { useAppointments } from "@/contexts/appointment-context"
import { useAuth } from "@/contexts/auth-context"

interface AppointmentFormProps {
  serviceId: string
  serviceName: string
  servicePrice: number
  serviceDuration: number
  selectedDate: string
  selectedTime: string
  onSuccess: () => void
  onCancel: () => void
}

export function AppointmentForm({
  serviceId,
  serviceName,
  servicePrice,
  serviceDuration,
  selectedDate,
  selectedTime,
  onSuccess,
  onCancel,
}: AppointmentFormProps) {
  const { user } = useAuth()
  const { createAppointment, isLoading } = useAppointments()

  const [formData, setFormData] = useState({
    customerName: user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "",
    customerEmail: user?.email || "",
    customerPhone: user?.phone || "",
    notes: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

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

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Nome é obrigatório"
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Email inválido"
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Telefone é obrigatório"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handlePhoneChange = (value: string) => {
    // Auto-format phone number
    const cleaned = value.replace(/\D/g, "")
    let formatted = cleaned

    if (cleaned.length >= 2) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
    }
    if (cleaned.length >= 7) {
      const middle = cleaned.length === 10 ? cleaned.slice(2, 6) : cleaned.slice(2, 7)
      const end = cleaned.length === 10 ? cleaned.slice(6, 10) : cleaned.slice(7, 11)
      formatted = `(${cleaned.slice(0, 2)}) ${middle}-${end}`
    }

    handleInputChange("customerPhone", formatted)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const appointmentData = {
      userId: user?.id || "guest",
      serviceId,
      serviceName,
      servicePrice,
      serviceDuration,
      date: selectedDate,
      time: selectedTime,
      status: "pending" as const,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      notes: formData.notes,
    }

    const success = await createAppointment(appointmentData)
    if (success) {
      onSuccess()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-nam-navy dark:text-nam-light">Confirmar Agendamento</CardTitle>
        <CardDescription>Preencha seus dados para finalizar o agendamento</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Service Summary */}
        <div className="bg-nam-light dark:bg-nam-gray-dark p-4 rounded-lg space-y-3">
          <h3 className="font-semibold text-nam-navy dark:text-nam-light">{serviceName}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-nam-teal" />
              <span className="capitalize">{formatDate(selectedDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-nam-teal" />
              <span>
                {selectedTime} ({formatDuration(serviceDuration)})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-nam-teal" />
              <span className="font-semibold">R$ {servicePrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-nam-teal text-white">Agendamento</Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Customer Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-nam-teal" />
                Nome Completo *
              </Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                placeholder="Seu nome completo"
                className={`${errors.customerName ? "border-red-500" : "border-nam-gray-light focus:border-nam-teal"}`}
              />
              {errors.customerName && <p className="text-sm text-red-500">{errors.customerName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerEmail" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-nam-teal" />
                Email *
              </Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                placeholder="seu@email.com"
                className={`${errors.customerEmail ? "border-red-500" : "border-nam-gray-light focus:border-nam-teal"}`}
              />
              {errors.customerEmail && <p className="text-sm text-red-500">{errors.customerEmail}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerPhone" className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-nam-teal" />
              Telefone *
            </Label>
            <Input
              id="customerPhone"
              value={formData.customerPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(11) 99999-9999"
              maxLength={15}
              className={`${errors.customerPhone ? "border-red-500" : "border-nam-gray-light focus:border-nam-teal"}`}
            />
            {errors.customerPhone && <p className="text-sm text-red-500">{errors.customerPhone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-nam-teal" />
              Observações (opcional)
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Alguma observação especial sobre o agendamento..."
              rows={3}
              className="border-nam-gray-light focus:border-nam-teal resize-none"
            />
          </div>

          <Separator />

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-nam-gray-medium text-nam-gray-dark hover:bg-nam-gray-light"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-nam-teal hover:bg-nam-blue text-white">
              {isLoading ? "Confirmando..." : "Confirmar Agendamento"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
