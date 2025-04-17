"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { X, Upload, ImageIcon } from "lucide-react"

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  sectionId: string
  initialData: {
    imageUrl?: string
  }
  onSave: (data: any) => void
}

export function EditModal({ isOpen, onClose, sectionId, initialData, onSave }: EditModalProps) {
  const { toast } = useToast()
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || "")
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(initialData.imageUrl || null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview the image
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)

    // In a real implementation, you would upload the file to your server or CDN
    // For now, we'll just simulate it
    setImageUrl(`/placeholder.svg?height=400&width=600&text=${file.name}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const data = { imageUrl }

      onSave(data)
      toast({
        title: "Image updated",
        description: "Your image has been successfully updated.",
      })
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-black/80 border border-gray-800 rounded-lg shadow-lg p-6 backdrop-blur-md"
          >
            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose} aria-label="Close">
              <X className="h-4 w-4" />
            </Button>

            <h2 className="text-xl font-bold mb-4">Update Image</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image-upload")?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

                {previewImage && (
                  <div className="mt-4 relative">
                    <div className="aspect-video rounded-md overflow-hidden border border-gray-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewImage || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm hover:bg-red-500/20 border-red-500/50"
                      onClick={() => {
                        setPreviewImage(null)
                        setImageUrl("")
                      }}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                )}

                {!previewImage && (
                  <div className="mt-4 border border-dashed border-gray-800 rounded-md p-8 flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-10 w-10 mb-2" />
                    <p>No image selected</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-brand hover:bg-brand-dark" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
