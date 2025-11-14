"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { useAppointments } from "@/contexts/appointment-context"
import type { TimeSlot } from "@/types/appointment"

interface AppointmentCalendarProps {
  serviceId: string
  serviceName: string
  servicePrice: number
  serviceDuration: number
  onTimeSelect: (date: string, time: string) => void
  selectedDate?: string
  selectedTime?: string
}

export function AppointmentCalendar({
  serviceId,
  serviceName,
  servicePrice,
  serviceDuration,
  onTimeSelect,
  selectedDate,
  selectedTime,
}: AppointmentCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [viewingDate, setViewingDate] = useState<Date>(new Date())
  const { getAvailableSlots } = useAppointments()

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  const formatDateDisplay = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const selectedDateStr = date ? formatDate(date) : ""
  const availableSlots = selectedDateStr ? getAvailableSlots(selectedDateStr, serviceDuration) : []

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
  }

  const handleTimeSelect = (time: string) => {
    if (selectedDateStr) {
      onTimeSelect(selectedDateStr, time)
    }
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Disable past dates
    if (date < today) return true

    // Disable Sundays (day 0)
    if (date.getDay() === 0) return true

    // Disable dates more than 60 days in advance
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 60)
    if (date > maxDate) return true

    return false
  }

  const getTimeSlotStatus = (slot: TimeSlot) => {
    if (!slot.available) return "occupied"
    if (selectedDate === selectedDateStr && selectedTime === slot.time) return "selected"
    return "available"
  }

  const getTimeSlotVariant = (status: string) => {
    switch (status) {
      case "selected":
        return "default"
      case "occupied":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-nam-navy dark:text-nam-light">
            <CalendarDays className="w-5 h-5 text-nam-teal" />
            Escolha a Data
          </CardTitle>
          <CardDescription>Selecione o dia para seu agendamento</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            className="rounded-md border border-nam-gray-light"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium text-nam-navy dark:text-nam-light",
              nav: "space-x-1 flex items-center",
              nav_button:
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-nam-teal hover:text-white rounded-md transition-colors",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-nam-gray-medium rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-nam-teal [&:has([aria-selected])]:text-white rounded-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-nam-teal hover:text-white rounded-md transition-colors",
              day_selected:
                "bg-nam-teal text-white hover:bg-nam-blue hover:text-white focus:bg-nam-blue focus:text-white",
              day_today: "bg-nam-gray-light text-nam-navy",
              day_outside: "text-nam-gray-medium opacity-50",
              day_disabled: "text-nam-gray-medium opacity-50 cursor-not-allowed",
              day_range_middle: "aria-selected:bg-nam-teal aria-selected:text-white",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
              IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
            }}
          />

          {selectedDateStr && (
            <div className="mt-4 p-3 bg-nam-light dark:bg-nam-gray-dark rounded-lg">
              <p className="text-sm font-medium text-nam-navy dark:text-nam-light">Data selecionada:</p>
              <p className="text-nam-teal font-semibold capitalize">{formatDateDisplay(selectedDateStr)}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-nam-navy dark:text-nam-light">
            <Clock className="w-5 h-5 text-nam-teal" />
            Horários Disponíveis
          </CardTitle>
          <CardDescription>
            {selectedDateStr
              ? `Horários para ${formatDateDisplay(selectedDateStr)}`
              : "Selecione uma data para ver os horários"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedDateStr ? (
            <div className="text-center py-8 text-nam-gray-medium">
              <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Selecione uma data no calendário</p>
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="text-center py-8 text-nam-gray-medium">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum horário disponível para esta data</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-nam-teal rounded-full"></div>
                  <span>Selecionado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-nam-gray-medium rounded-full"></div>
                  <span>Disponível</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-nam-gray-medium rounded-full"></div>
                  <span>Ocupado</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                {availableSlots.map((slot) => {
                  const status = getTimeSlotStatus(slot)
                  return (
                    <Button
                      key={slot.time}
                      variant={getTimeSlotVariant(status)}
                      size="sm"
                      disabled={!slot.available}
                      onClick={() => handleTimeSelect(slot.time)}
                      className={`${
                        status === "selected"
                          ? "bg-nam-teal hover:bg-nam-blue text-white"
                          : status === "occupied"
                            ? "bg-nam-gray-medium text-nam-gray-light cursor-not-allowed"
                            : "border-nam-gray-medium text-nam-gray-dark hover:bg-nam-teal hover:text-white hover:border-nam-teal"
                      } transition-all duration-200`}
                    >
                      {slot.time}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
