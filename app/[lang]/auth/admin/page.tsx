import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n.config"
import { LoginForm } from "@/components/admin/login-form"
import { AdminAuthWrapper } from "@/components/admin/admin-auth-wrapper"

export default async function AdminLoginPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = (await getDictionary(lang)) || {}

  return (
    <AdminAuthWrapper>
      <LoginForm lang={lang} />
    </AdminAuthWrapper>
  )
}
