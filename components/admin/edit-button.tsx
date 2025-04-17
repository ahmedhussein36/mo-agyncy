"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditModal } from "@/components/admin/edit-modal"
import { EditDrawer } from "@/components/admin/edit-drawer"

interface EditButtonProps {
  sectionId: string
  sectionType: "title" | "content" | "image" | "mixed"
  initialData: {
    title?: string
    content?: string
    imageUrl?: string
  }
  onSave: (data: any) => void
}

export function EditButton({ sectionId, sectionType, initialData, onSave }: EditButtonProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    if (sectionType === "image") {
      setIsModalOpen(true)
    } else {
      setIsDrawerOpen(true)
    }
  }

  const handleSave = (data: any) => {
    onSave(data)
    setIsDrawerOpen(false)
    setIsModalOpen(false)
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 z-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-blue-100 border-blue-400"
        onClick={handleClick}
        aria-label={`Edit ${sectionType}`}
      >
        <Pencil className="h-4 w-4 text-blue-500" />
      </Button>

      {/* Use drawer for title, content, or mixed sections */}
      {(sectionType === "title" || sectionType === "content" || sectionType === "mixed") && (
        <EditDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sectionId={sectionId}
          sectionType={sectionType}
          initialData={initialData}
          onSave={handleSave}
        />
      )}

      {/* Use modal for image sections */}
      {(sectionType === "image" || (sectionType === "mixed" && initialData.imageUrl)) && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sectionId={sectionId}
          initialData={{ imageUrl: initialData.imageUrl }}
          onSave={handleSave}
        />
      )}
    </>
  )
}
