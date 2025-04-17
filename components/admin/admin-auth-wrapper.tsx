"use client"

import type React from "react"

import { motion } from "framer-motion"

export function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black/80 to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <div className="text-3xl font-bold text-brand">INFLUENCE ADMIN</div>
        </div>
        {children}
      </motion.div>
    </div>
  )
}
