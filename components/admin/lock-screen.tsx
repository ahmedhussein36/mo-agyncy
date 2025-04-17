"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import type { Locale } from "@/i18n.config"

export function LockScreen({ lang, duration = "3h" }: { lang: Locale; duration?: string }) {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(getDurationInSeconds(duration))

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  const handleReturnHome = () => {
    router.push(`/${lang}`)
  }

  function getDurationInSeconds(duration: string): number {
    const match = duration.match(/(\d+)([hmd])/)
    if (!match) return 3 * 60 * 60 // Default to 3 hours

    const value = Number.parseInt(match[1])
    const unit = match[2]

    switch (unit) {
      case "m":
        return value * 60
      case "h":
        return value * 60 * 60
      case "d":
        return value * 24 * 60 * 60
      default:
        return 3 * 60 * 60
    }
  }

  return (
    <Card className="w-full shadow-lg border-gray-800/50 bg-black/50 backdrop-blur-md">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-yellow-500/20">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Account Temporarily Locked</CardTitle>
        <CardDescription className="text-center">
          Too many failed login attempts. Please try again later.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground mb-2">Time remaining until unlock:</p>
          <div className="text-3xl font-mono bg-black/30 px-4 py-2 rounded-md border border-gray-800">
            {formatTime(timeLeft)}
          </div>
        </div>

        {timeLeft === 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
            <Button onClick={() => router.push(`/${lang}/auth/admin`)} className="bg-brand hover:bg-brand-dark">
              Try Again
            </Button>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="ghost" onClick={handleReturnHome}>
          Return to Homepage
        </Button>
      </CardFooter>
    </Card>
  )
}
