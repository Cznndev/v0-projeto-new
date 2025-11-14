"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/image-fallback"
import { ChevronLeft, ChevronRight, ZoomIn, Maximize2, X } from "lucide-react"

interface ProductImage {
  url: string
  alt: string
  type?: "main" | "detail" | "usage" | "ingredients"
}

interface ProductImageGalleryProps {
  images: ProductImage[]
  productName: string
  className?: string
}

export function ProductImageGallery({ images, productName, className = "" }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })

  const currentImage = images[currentImageIndex]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsZoomed(false)
  }

  return (
    <>
      <div className={`space-y-4 ${className}`}>
        {/* Main Image */}
        <div className="relative group">
          <div
            className="relative overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 aspect-square cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsZoomed(false)}
            onClick={toggleZoom}
          >
            <ImageWithFallback
              src={currentImage.url || "/placeholder.svg"}
              alt={currentImage.alt}
              className={`
                w-full h-full object-cover transition-transform duration-300
                ${isZoomed ? "scale-150" : "scale-100 hover:scale-105"}
              `}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : {}
              }
              fallbackText={productName}
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/80 hover:bg-white text-slate-900"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleZoom()
                }}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/80 hover:bg-white text-slate-900"
                onClick={(e) => {
                  e.stopPropagation()
                  openModal()
                }}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Zoom Indicator */}
            {isZoomed && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                Zoom ativo - Mova o mouse
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={`
                  flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200
                  ${
                    index === currentImageIndex
                      ? "border-slate-900 dark:border-white"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500"
                  }
                `}
                onClick={() => {
                  setCurrentImageIndex(index)
                  setIsZoomed(false)
                }}
              >
                <ImageWithFallback
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  fallbackText=""
                />
              </button>
            ))}
          </div>
        )}

        {/* Image Type Indicator */}
        {currentImage.type && (
          <div className="text-center">
            <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm">
              {currentImage.type === "main" && "Imagem Principal"}
              {currentImage.type === "detail" && "Detalhes do Produto"}
              {currentImage.type === "usage" && "Modo de Uso"}
              {currentImage.type === "ingredients" && "Ingredientes"}
            </span>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white z-10"
              onClick={closeModal}
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="relative">
              <ImageWithFallback
                src={currentImage.url || "/placeholder.svg"}
                alt={currentImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                fallbackText={productName}
              />

              {/* Modal Navigation */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </>
              )}

              {/* Modal Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded">
                {currentImageIndex + 1} de {images.length} - {currentImage.alt}
              </div>
            </div>

            {/* Modal Thumbnails */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`
                      flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all duration-200
                      ${index === currentImageIndex ? "border-white" : "border-white/30 hover:border-white/60"}
                    `}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <ImageWithFallback
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      fallbackText=""
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
