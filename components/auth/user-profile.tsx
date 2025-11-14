"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useAppointments } from "@/contexts/appointment-context"
import { User, Mail, Phone, Calendar, Edit, Package, LogOut, Settings, Clock } from "lucide-react"
import { OrderDetailsModal } from "./order-details-modal"

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

type ActiveView = "profile" | "orders" | "appointments"

export function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const { user, orders, logout, updateProfile, isLoading } = useAuth()
  const { appointments } = useAppointments()
  const [activeView, setActiveView] = useState<ActiveView>("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [editData, setEditData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    skinType: user?.skinType || "",
  })

  const handleSave = async () => {
    const success = await updateProfile(editData)
    if (success) {
      setIsEditing(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20"
      case "shipped":
        return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
      case "confirmed":
        return "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20"
      case "pending":
        return "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20"
      case "cancelled":
        return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20"
      default:
        return "text-slate-600 bg-slate-50 dark:text-slate-400 dark:bg-slate-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Entregue"
      case "shipped":
        return "Enviado"
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50"
      case "pending":
        return "text-yellow-600 bg-yellow-50"
      case "cancelled":
        return "text-red-600 bg-red-50"
      case "completed":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-slate-600 bg-slate-50"
    }
  }

  const getAppointmentStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendente"
      case "cancelled":
        return "Cancelado"
      case "completed":
        return "Concluído"
      default:
        return status
    }
  }

  if (!isOpen || !user) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-slate-50 dark:bg-slate-900 p-6 border-r border-slate-200 dark:border-slate-700">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-10 h-10 text-slate-600 dark:text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveView("profile")}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
                    activeView === "profile"
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Perfil
                </button>
                <button
                  onClick={() => setActiveView("orders")}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
                    activeView === "orders"
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  <Package className="w-4 h-4" />
                  Pedidos ({orders.length})
                </button>
                <button
                  onClick={() => setActiveView("appointments")}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
                    activeView === "appointments"
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Agendamentos ({appointments.length})
                </button>
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {activeView === "profile" && "Meu Perfil"}
                  {activeView === "orders" && "Meus Pedidos"}
                  {activeView === "appointments" && "Meus Agendamentos"}
                </h2>
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  ✕
                </Button>
              </div>

              {/* Profile View */}
              {activeView === "profile" && (
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-slate-900 dark:text-white">Informações Pessoais</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      disabled={isLoading}
                      className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? "Cancelar" : "Editar"}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                              Nome
                            </label>
                            <input
                              type="text"
                              value={editData.firstName}
                              onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                              Sobrenome
                            </label>
                            <input
                              type="text"
                              value={editData.lastName}
                              onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Telefone
                          </label>
                          <input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            placeholder="(11) 99999-9999"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Tipo de Pele
                          </label>
                          <select
                            value={editData.skinType}
                            onChange={(e) => setEditData({ ...editData, skinType: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                          >
                            <option value="">Selecione seu tipo de pele</option>
                            <option value="oleosa">Oleosa</option>
                            <option value="seca">Seca</option>
                            <option value="mista">Mista</option>
                            <option value="sensivel">Sensível</option>
                            <option value="normal">Normal</option>
                          </select>
                        </div>

                        <Button
                          onClick={handleSave}
                          disabled={isLoading}
                          className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                        >
                          {isLoading ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                      </>
                    ) : (
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Nome Completo</p>
                              <p className="font-medium text-slate-900 dark:text-white">
                                {user.firstName} {user.lastName}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                              <p className="font-medium text-slate-900 dark:text-white">{user.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Telefone</p>
                              <p className="font-medium text-slate-900 dark:text-white">
                                {user.phone || "Não informado"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Tipo de Pele</p>
                              <p className="font-medium capitalize text-slate-900 dark:text-white">
                                {user.skinType || "Não informado"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Orders View */}
              {activeView === "orders" && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-600 dark:text-slate-400">Você ainda não fez nenhum pedido</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <Card
                        key={order.id}
                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-white">Pedido #{order.id}</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                            >
                              {getStatusText(order.status)}
                            </span>
                          </div>

                          <div className="space-y-2 mb-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-3">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-sm text-slate-900 dark:text-white">{item.name}</p>
                                  <p className="text-xs text-slate-600 dark:text-slate-400">Qtd: {item.quantity}</p>
                                </div>
                                <p className="font-semibold text-sm text-slate-900 dark:text-white">
                                  R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              Total: R$ {order.total.toFixed(2).replace(".", ",")}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                              className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                              Ver Detalhes
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              )}

              {/* Appointments View */}
              {activeView === "appointments" && (
                <div className="space-y-4">
                  {appointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-600 dark:text-slate-400">Você ainda não tem agendamentos</p>
                    </div>
                  ) : (
                    appointments.map((appointment) => (
                      <Card
                        key={appointment.id}
                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-white">{appointment.service}</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {new Date(appointment.date).toLocaleDateString("pt-BR")} às {appointment.time}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getAppointmentStatusColor(appointment.status)}`}
                            >
                              {getAppointmentStatusText(appointment.status)}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                Cliente: {appointment.clientName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                Telefone: {appointment.phone}
                              </span>
                            </div>
                            {appointment.notes && (
                              <div className="flex items-start gap-2">
                                <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                  Observações: {appointment.notes}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700 mt-3">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              Agendamento #{appointment.id}
                            </span>
                            <div className="flex gap-2">
                              {appointment.status === "pending" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-300 text-red-600 hover:bg-red-50"
                                >
                                  Cancelar
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                              >
                                Reagendar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </>
  )
}
