"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function StartTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]) // Include pathname as a dependency

  return null
}
