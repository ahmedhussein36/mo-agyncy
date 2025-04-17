import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const error = searchParams.error || "An authentication error occurred"

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-full">
            <AlertTriangle className="h-16 w-16 text-yellow-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Authentication Error</h1>
        <p className="text-muted-foreground">{error}</p>
        <div className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/login">Try Again</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
