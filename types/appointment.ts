export interface TimeSlot {
  time: string
  available: boolean
  appointmentId?: string
}

export interface Appointment {
  id: string
  userId: string
  serviceId: string
  serviceName: string
  servicePrice: number
  serviceDuration: number
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  customerName: string
  customerEmail: string
  customerPhone: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface AppointmentContextType {
  appointments: Appointment[]
  availableSlots: { [date: string]: TimeSlot[] }
  isLoading: boolean
  createAppointment: (appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
  cancelAppointment: (appointmentId: string) => Promise<boolean>
  getAvailableSlots: (date: string, serviceDuration: number) => TimeSlot[]
  getUserAppointments: (userId: string) => Appointment[]
}
