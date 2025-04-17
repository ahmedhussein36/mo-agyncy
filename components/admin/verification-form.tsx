"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import type { Locale } from "@/i18n.config"

export function VerificationForm({ lang }: { lang: Locale }) {
  const router = useRouter()
  const { toast } = useToast()
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const hasShownToast = useRef(false)

  // Simulate SMS code sent to user - only show once
  useEffect(() => {
    if (!hasShownToast.current) {
      toast({
        title: "Verification Code Sent",
        description: "A 6-digit code has been sent to your phone number.",
        duration: 5000,
      })
      hasShownToast.current = true
    }
  }, [toast])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0)
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const verificationCode = code.join("")

    // Simulate verification delay
    setTimeout(() => {
      // This is where you would implement actual verification logic
      if (verificationCode === "123456") {
        toast({
          title: "Authentication Successful",
          description: "You have been successfully logged in.",
          variant: "default",
        })
        router.push(`/${lang}`)
      } else {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)

        toast({
          title: "Invalid Code",
          description: `Verification failed. ${3 - newAttempts} attempts remaining.`,
          variant: "destructive",
        })

        // Check if max attempts reached
        if (newAttempts >= 3) {
          router.push(`/${lang}/auth/locked?duration=3h`)
        }

        setIsLoading(false)
      }
    }, 1000)
  }

  const handleResendCode = () => {
    toast({
      title: "Code Resent",
      description: "A new verification code has been sent to your phone.",
      duration: 3000,
    })
  }

  return (
    <Card className="w-full shadow-lg border-gray-800/50 bg-black/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
        <CardDescription>Enter the 6-digit code sent to your phone</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className="w-12 h-12 text-center text-lg"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                required
              />
            ))}
          </div>
          <Button type="submit" className="w-full bg-brand hover:bg-brand-dark" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={handleResendCode}>
          Didn't receive a code? Resend
        </Button>
      </CardFooter>
    </Card>
  )
}
