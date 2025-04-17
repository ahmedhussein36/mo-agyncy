"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"

export function Header({ dict = {} }: { dict: any }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { lang } = useLanguage()
  const isRtl = lang === "ar"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Add mouse position tracking for button hover effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const buttons = document.querySelectorAll(".button-hover")
      buttons.forEach((button) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        ;(button as HTMLElement).style.setProperty("--x", `${x}px`)
        ;(button as HTMLElement).style.setProperty("--y", `${y}px`)
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const otherLang = lang === "en" ? "ar" : "en"
  const newPathname = pathname.replace(`/${lang}`, `/${otherLang}`)

  return (
    <header className="fixed top-0 z-40 max-w-[100vw] w-full flex justify-center px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative flex items-center justify-between rounded-full px-6 py-2 transition-all duration-300 ${
          isScrolled
            ? "bg-muted/50 backdrop-blur-md shadow-lg border border-gray-800/50"
            : "bg-muted/30 backdrop-blur-sm"
        } max-w-6xl w-full`}
      >
        <Link href={`/${lang}`} className="flex items-center space-x-2 rtl:space-x-reverse">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-brand"
          >
            MO AGENCY
          </motion.div>
        </Link>
        <nav className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
          <NavLink href={`/${lang}`} label={dict.home || "Home"} pathname={pathname} />
          <NavLink href={`/${lang}/about`} label={dict.about || "About"} pathname={pathname} />
          <NavLink href={`/${lang}/services`} label={dict.services || "Services"} pathname={pathname} />
          <NavLink href={`/${lang}/creators`} label={dict.creators || "Creators"} pathname={pathname} />
          <NavLink href={`/${lang}/contact`} label={dict.contact || "Contact"} pathname={pathname} />

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full transition-all duration-300 hover:border-brand button-hover"
            >
              <Link href={`/${lang}/register/influencer`}>{dict.register?.influencer || "Join as Influencer"}</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-brand hover:bg-brand-dark rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(var(--brand),0.3)] hover:shadow-[0_0_15px_rgba(var(--brand),0.5)] button-hover"
            >
              <Link href={`/${lang}/register/brand`}>{dict.register?.brand || "Partner with Us"}</Link>
            </Button>
          </div>
          <Link href={newPathname} className="text-sm font-medium transition-colors hover:text-brand">
            {dict.language || (lang === "en" ? "العربية" : "English")}
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden button-hover">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={isRtl ? "right" : "left"} className="backdrop-blur-md bg-background/80">
            <div className="flex flex-col space-y-4 mt-8">
              <Link href={`/${lang}`} className="text-lg font-medium transition-colors hover:text-brand">
                {dict.home || "Home"}
              </Link>
              <Link href={`/${lang}/about`} className="text-lg font-medium transition-colors hover:text-brand">
                {dict.about || "About"}
              </Link>
              <Link href={`/${lang}/services`} className="text-lg font-medium transition-colors hover:text-brand">
                {dict.services || "Services"}
              </Link>
              <Link href={`/${lang}/creators`} className="text-lg font-medium transition-colors hover:text-brand">
                {dict.creators || "Creators"}
              </Link>
              <Link href={`/${lang}/contact`} className="text-lg font-medium transition-colors hover:text-brand">
                {dict.contact || "Contact"}
              </Link>
              <Link
                href={`/${lang}/register/influencer`}
                className="text-lg font-medium transition-colors hover:text-brand"
              >
                {dict.register?.influencer || "Join as Influencer"}
              </Link>
              <Link href={`/${lang}/register/brand`} className="text-lg font-medium transition-colors hover:text-brand">
                {dict.register?.brand || "Partner with Us"}
              </Link>
              <Link href={newPathname} className="text-lg font-medium transition-colors hover:text-brand">
                {dict.language || (lang === "en" ? "العربية" : "English")}
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>
    </header>
  )
}

// NavLink component with interactive animations
function NavLink({
  href,
  label,
  pathname,
  className = "",
}: {
  href: string
  label: string
  pathname: string
  className?: string
}) {
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`relative text-sm font-medium transition-all duration-300 ${className} ${
        isActive ? "text-brand":"hover:text-brand hover:scale-105"
      }`}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute -bottom-1 left-0 h-[2px] bg-brand w-full rounded-full"
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  )
}

