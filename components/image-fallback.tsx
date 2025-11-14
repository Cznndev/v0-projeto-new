"use client"

import { useState } from "react"
import { ImageIcon } from "lucide-react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  fallbackText?: string
  onError?: () => void
  onLoad?: () => void
}

export function ImageWithFallback({
  src,
  alt,
  className = "",
  fallbackText,
  onError,
  onLoad,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  if (hasError) {
    return (
      <div className={`bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${className}`} {...props}>
        <div className="text-center p-4">
          <ImageIcon className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
          <p className="text-xs text-slate-500 dark:text-slate-400">{fallbackText || "Imagem não disponível"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse ${className}`} {...props} />
      )}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  )
}
