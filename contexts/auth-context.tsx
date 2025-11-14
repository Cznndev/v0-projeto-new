"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/contexts/toast-context"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  cpf?: string
  birthDate?: string
  gender?: "male" | "female" | "other"
  skinType?: "oleosa" | "seca" | "mista" | "sensivel" | "normal"
  createdAt: Date
  avatar?: string
}

export interface Order {
  id: string
  userId: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  createdAt: Date
  shippingAddress: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  paymentMethod: string
}

interface AuthContextType {
  user: User | null
  orders: Order[]
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<boolean>
  getOrders: () => Promise<Order[]>
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  birthDate?: string
  gender?: "male" | "female" | "other"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database (in real app, this would be in a backend)
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    firstName: "João",
    lastName: "Silva",
    email: "joao@email.com",
    password: "123456",
    phone: "(11) 99999-9999",
    skinType: "oleosa",
    createdAt: new Date("2024-01-15"),
  },
]

// Mock orders database
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "1",
    items: [
      {
        id: "gel-limpeza",
        name: "Gel de Limpeza Facial",
        price: 89.9,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300&text=Gel+Limpeza",
      },
      {
        id: "hidratante-anti-idade",
        name: "Hidratante Anti-Idade",
        price: 149.9,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300&text=Hidratante+Anti-Idade",
      },
    ],
    total: 239.8,
    status: "delivered",
    createdAt: new Date("2024-01-20"),
    shippingAddress: {
      street: "Rua das Flores",
      number: "123",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
    },
    paymentMethod: "Cartão de Crédito",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToast } = useToast()

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("nam-user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        loadUserOrders(parsedUser.id)
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const loadUserOrders = (userId: string) => {
    const userOrders = mockOrders.filter((order) => order.userId === userId)
    setOrders(userOrders)
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("nam-user", JSON.stringify(userWithoutPassword))
      loadUserOrders(foundUser.id)

      addToast({
        type: "success",
        title: "Login realizado com sucesso!",
        description: `Bem-vindo de volta, ${foundUser.firstName}!`,
        duration: 4000,
      })

      setIsLoading(false)
      return true
    } else {
      addToast({
        type: "error",
        title: "Erro no login",
        description: "Email ou senha incorretos",
        duration: 4000,
      })

      setIsLoading(false)
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      addToast({
        type: "error",
        title: "Email já cadastrado",
        description: "Este email já está sendo usado por outra conta",
        duration: 4000,
      })

      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      birthDate: userData.birthDate,
      gender: userData.gender,
      createdAt: new Date(),
    }

    mockUsers.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("nam-user", JSON.stringify(userWithoutPassword))

    addToast({
      type: "success",
      title: "Conta criada com sucesso!",
      description: `Bem-vindo à N.A.M, ${userData.firstName}!`,
      duration: 5000,
    })

    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    setOrders([])
    localStorage.removeItem("nam-user")

    addToast({
      type: "info",
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
      duration: 3000,
    })
  }

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem("nam-user", JSON.stringify(updatedUser))

    // Update in mock database
    const userIndex = mockUsers.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData }
    }

    addToast({
      type: "success",
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso",
      duration: 4000,
    })

    setIsLoading(false)
    return true
  }

  const getOrders = async (): Promise<Order[]> => {
    if (!user) return []

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const userOrders = mockOrders.filter((order) => order.userId === user.id)
    setOrders(userOrders)
    return userOrders
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        getOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
