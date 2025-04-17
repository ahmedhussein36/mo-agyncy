"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isOverNav, setIsOverNav] = useState(false)
  const [isOverCard, setIsOverCard] = useState(false)
  const [isOverForm, setIsOverForm] = useState(false)
  const [isOverButton, setIsOverButton] = useState(false)

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "hsla(var(--brand), 0.3)",
      //mixBlendMode: isOverNav ? "difference" : "normal",
      opacity: isOverForm ? 0 : 1,
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: isOverNav
        ? "rgba(255, 255, 255, 0.9)"
        : isOverCard
          ? "hsla(var(--brand), 0.3)"
          : isOverButton
            ? "rgba(255, 255, 255, 0.9)"
            : "hsla(var(--brand), 0.5)",
      mixBlendMode: isOverNav ? "difference" : "normal",
      opacity: isOverForm ? 0 : 1,
    },
  }

  useEffect(() => {
    const handleMouseOver = () => setCursorVariant("hover")
    const handleMouseOut = () => setCursorVariant("default")

    // Track when mouse is over navbar
    const handleNavMouseOver = () => {
      setIsOverNav(true)
      setCursorVariant("hover")
    }
    const handleNavMouseOut = () => {
      setIsOverNav(false)
      setCursorVariant("default")
    }

    // Track when mouse is over service cards
    const handleCardMouseOver = () => {
      setIsOverCard(true)
      setCursorVariant("hover")
    }
    const handleCardMouseOut = () => {
      setIsOverCard(false)
      setCursorVariant("default")
    }

    // Track when mouse is over form elements
    const handleFormMouseOver = () => {
      setIsOverForm(true)
    }
    const handleFormMouseOut = () => {
      setIsOverForm(false)
    }

    // Track when mouse is over buttons
    const handleButtonMouseOver = () => {
      setIsOverButton(true)
      setCursorVariant("hover")
    }
    const handleButtonMouseOut = () => {
      setIsOverButton(false)
      setCursorVariant("default")
    }

    const interactiveElements = document.querySelectorAll("a, .interactive")
    const navbarElements = document.querySelectorAll("header a, header button")
    const serviceCards = document.querySelectorAll(".service-card-container")
    const formElements = document.querySelectorAll("input, textarea, select, .form-element")
    const buttonElements = document.querySelectorAll("button, .button")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver)
      el.addEventListener("mouseout", handleMouseOut)
    })

    navbarElements.forEach((el) => {
      el.addEventListener("mouseover", handleNavMouseOver)
      el.addEventListener("mouseout", handleNavMouseOut)
    })

    serviceCards.forEach((card) => {
      card.addEventListener("mouseover", handleCardMouseOver)
      card.addEventListener("mouseout", handleCardMouseOut)
    })

    formElements.forEach((el) => {
      el.addEventListener("mouseover", handleFormMouseOver)
      el.addEventListener("mouseout", handleFormMouseOut)
    })

    buttonElements.forEach((el) => {
      el.addEventListener("mouseover", handleButtonMouseOver)
      el.addEventListener("mouseout", handleButtonMouseOut)

      // Add the button-hover class for the ripple effect
      el.classList.add("button-hover")
    })

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver)
        el.removeEventListener("mouseout", handleMouseOut)
      })

      navbarElements.forEach((el) => {
        el.removeEventListener("mouseover", handleNavMouseOver)
        el.removeEventListener("mouseout", handleNavMouseOut)
      })

      serviceCards.forEach((card) => {
        card.removeEventListener("mouseover", handleCardMouseOver)
        card.removeEventListener("mouseout", handleCardMouseOut)
      })

      formElements.forEach((el) => {
        el.removeEventListener("mouseover", handleFormMouseOver)
        el.removeEventListener("mouseout", handleFormMouseOut)
      })

      buttonElements.forEach((el) => {
        el.removeEventListener("mouseover", handleButtonMouseOver)
        el.removeEventListener("mouseout", handleButtonMouseOut)
      })
    }
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 rounded-full"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  )
}
