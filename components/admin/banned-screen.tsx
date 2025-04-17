"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"
import type { Locale } from "@/i18n.config"

export function BannedScreen({ lang }: { lang: Locale }) {
  const router = useRouter()

  const handleReturnHome = () => {
    router.push(`/${lang}`)
  }

  return (
    <Card className="w-full shadow-lg border-gray-800/50 bg-black/50 backdrop-blur-md">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-red-500/20">
            <ShieldAlert className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Access Permanently Blocked</CardTitle>
        <CardDescription className="text-center">
          Your IP address has been blocked due to repeated failed login attempts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-md p-4 text-center">
          <p className="text-red-400">
            For security reasons, access to the admin panel has been permanently restricted from your current location.
          </p>
        </div>
        <div className="text-center text-muted-foreground">
          <p>If you believe this is an error, please contact the system administrator.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="ghost" onClick={handleReturnHome}>
          Return to Homepage
        </Button>
      </CardFooter>
    </Card>
  )
}
