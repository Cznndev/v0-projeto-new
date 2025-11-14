"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useToast } from "@/contexts/toast-context"
import type { Appointment, AppointmentContextType, TimeSlot } from "@/types/appointment"

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined)

// Mock appointments database
const mockAppointments: Appointment[] = [
  {
    id: "apt-001",
    userId: "1",
    serviceId: "1",
    serviceName: "Limpeza de Pele",
    servicePrice: 120,
    serviceDuration: 60,
    date: "2024-12-20",
    time: "14:00",
    status: "confirmed",
    customerName: "João Silva",
    customerEmail: "joao@email.com",
    customerPhone: "(11) 99999-9999",
    createdAt: new Date("2024-12-19"),
    updatedAt: new Date("2024-12-19"),
  },
]

// Business hours configuration
const BUSINESS_HOURS = {
  start: 9, // 9:00 AM
  end: 18, // 6:00 PM
  interval: 30, // 30 minutes slots
  lunchBreak: { start: 12, end: 13 }, // 12:00 PM - 1:00 PM
}

const CLOSED_DAYS = [0] // Sunday (0 = Sunday, 1 = Monday, etc.)

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [availableSlots, setAvailableSlots] = useState<{ [date: string]: TimeSlot[] }>({})
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  // Generate time slots for a given date
  const generateTimeSlots = (date: string, serviceDuration: number): TimeSlot[] => {
    const slots: TimeSlot[] = []
    const dateObj = new Date(date)
    const dayOfWeek = dateObj.getDay()

    // Check if it's a closed day
    if (CLOSED_DAYS.includes(dayOfWeek)) {
      return slots
    }

    // Generate slots from business hours
    for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
      for (let minute = 0; minute < 60; minute += BUSINESS_HOURS.interval) {
        // Skip lunch break
        if (hour >= BUSINESS_HOURS.lunchBreak.start && hour < BUSINESS_HOURS.lunchBreak.end) {
          continue
        }

        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

        // Check if slot would extend beyond business hours
        const slotEndTime = new Date(`${date}T${time}`)
        slotEndTime.setMinutes(slotEndTime.getMinutes() + serviceDuration)
        const endHour = slotEndTime.getHours()
        const endMinute = slotEndTime.getMinutes()

        if (endHour > BUSINESS_HOURS.end || (endHour === BUSINESS_HOURS.end && endMinute > 0)) {
          continue
        }

        // Check if slot conflicts with existing appointments
        const existingAppointment = appointments.find(
          (apt) => apt.date === date && apt.time === time && apt.status !== "cancelled",
        )

        slots.push({
          time,
          available: !existingAppointment,
          appointmentId: existingAppointment?.id,
        })
      }
    }

    return slots
  }

  const getAvailableSlots = (date: string, serviceDuration: number): TimeSlot[] => {
    return generateTimeSlots(date, serviceDuration)
  }

  const createAppointment = async (
    appointmentData: Omit<Appointment, "id" | "createdAt" | "updatedAt">,
  ): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if slot is still available
      const existingAppointment = appointments.find(
        (apt) => apt.date === appointmentData.date && apt.time === appointmentData.time && apt.status !== "cancelled",
      )

      if (existingAppointment) {
        addToast({
          type: "error",
          title: "Horário não disponível",
          description: "Este horário já foi reservado. Por favor, escolha outro.",
          duration: 4000,
        })
        setIsLoading(false)
        return false
      }

      // Create new appointment
      const newAppointment: Appointment = {
        ...appointmentData,
        id: `apt-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setAppointments((prev) => [...prev, newAppointment])

      addToast({
        type: "success",
        title: "Agendamento confirmado!",
        description: `Seu agendamento para ${appointmentData.serviceName} foi confirmado para ${appointmentData.date} às ${appointmentData.time}.`,
        duration: 6000,
      })

      setIsLoading(false)
      return true
    } catch (error) {
      addToast({
        type: "error",
        title: "Erro no agendamento",
        description: "Não foi possível confirmar seu agendamento. Tente novamente.",
        duration: 4000,
      })
      setIsLoading(false)
      return false
    }
  }

  const cancelAppointment = async (appointmentId: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: "cancelled" as const, updatedAt: new Date() } : apt,
        ),
      )

      addToast({
        type: "info",
        title: "Agendamento cancelado",
        description: "Seu agendamento foi cancelado com sucesso.",
        duration: 4000,
      })

      setIsLoading(false)
      return true
    } catch (error) {
      addToast({
        type: "error",
        title: "Erro no cancelamento",
        description: "Não foi possível cancelar o agendamento. Tente novamente.",
        duration: 4000,
      })
      setIsLoading(false)
      return false
    }
  }

  const getUserAppointments = (userId: string): Appointment[] => {
    return appointments
      .filter((apt) => apt.userId === userId)
      .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
  }

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        availableSlots,
        isLoading,
        createAppointment,
        cancelAppointment,
        getAvailableSlots,
        getUserAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentContext)
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentProvider")
  }
  return context
}
