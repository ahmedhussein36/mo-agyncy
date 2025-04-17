import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n.config"
import { LockScreen } from "@/components/admin/lock-screen"
import { AdminAuthWrapper } from "@/components/admin/admin-auth-wrapper"

export default async function LockedPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale }
  searchParams: { duration?: string }
}) {
  const dict = (await getDictionary(lang)) || {}
  const duration = searchParams.duration || "3h" // Default to 3 hours

  return (
    <AdminAuthWrapper>
      <LockScreen lang={lang} duration={duration} />
    </AdminAuthWrapper>
  )
}
