import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n.config"
import { BannedScreen } from "@/components/admin/banned-screen"
import { AdminAuthWrapper } from "@/components/admin/admin-auth-wrapper"

export default async function BannedPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = (await getDictionary(lang)) || {}

  return (
    <AdminAuthWrapper>
      <BannedScreen lang={lang} />
    </AdminAuthWrapper>
  )
}
