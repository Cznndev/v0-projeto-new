"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AppointmentCalendar } from "./appointment-calendar"
import { AppointmentForm } from "./appointment-form"
import { CheckCircle, ArrowLeft } from "lucide-react"

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  serviceId: string
  serviceName: string
  servicePrice: number
  serviceDuration: number
}

type Step = "calendar" | "form" | "success"

export function AppointmentModal({
  isOpen,
  onClose,
  serviceId,
  serviceName,
  servicePrice,
  serviceDuration,
}: AppointmentModalProps) {
  const [step, setStep] = useState<Step>("calendar")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")

  const handleTimeSelect = (date: string, time: string) => {
    setSelectedDate(date)
    setSelectedTime(time)
    setStep("form")
  }

  const handleFormSuccess = () => {
    setStep("success")
  }

  const handleClose = () => {
    setStep("calendar")
    setSelectedDate("")
    setSelectedTime("")
    onClose()
  }

  const handleBackToCalendar = () => {
    setStep("calendar")
  }

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-nam-navy dark:text-nam-light">
            {step === "form" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToCalendar}
                className="p-1 h-auto text-nam-teal hover:text-nam-blue"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <span>
              {step === "calendar" && "Agendar Serviço"}
              {step === "form" && "Finalizar Agendamento"}
              {step === "success" && "Agendamento Confirmado"}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {step === "calendar" && (
            <AppointmentCalendar
              serviceId={serviceId}
              serviceName={serviceName}
              servicePrice={servicePrice}
              serviceDuration={serviceDuration}
              onTimeSelect={handleTimeSelect}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          )}

          {step === "form" && (
            <AppointmentForm
              serviceId={serviceId}
              serviceName={serviceName}
              servicePrice={servicePrice}
              serviceDuration={serviceDuration}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSuccess={handleFormSuccess}
              onCancel={handleBackToCalendar}
            />
          )}

          {step === "success" && (
            <div className="text-center py-8 space-y-4">
              <CheckCircle className="w-16 h-16 text-nam-teal mx-auto" />
              <h3 className="text-2xl font-bold text-nam-navy dark:text-nam-light">Agendamento Confirmado!</h3>
              <div className="space-y-2 text-nam-gray-medium">
                <p className="text-lg">Seu agendamento foi confirmado com sucesso.</p>
                <div className="bg-nam-light dark:bg-nam-gray-dark p-4 rounded-lg inline-block">
                  <p className="font-semibold text-nam-navy dark:text-nam-light">{serviceName}</p>
                  <p className="capitalize">
                    {formatDate(selectedDate)} às {selectedTime}
                  </p>
                  <p className="text-nam-teal font-semibold">R$ {servicePrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-nam-gray-medium">Você receberá uma confirmação por email e WhatsApp.</p>
                <Button onClick={handleClose} className="bg-nam-teal hover:bg-nam-blue text-white px-8">
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
