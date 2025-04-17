import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n.config"
import { VerificationForm } from "@/components/admin/verification-form"
import { AdminAuthWrapper } from "@/components/admin/admin-auth-wrapper"

export default async function VerifyPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = (await getDictionary(lang)) || {}

  return (
    <AdminAuthWrapper>
      <VerificationForm lang={lang} />
    </AdminAuthWrapper>
  )
}
