'use client'

import { useEffect, useState } from 'react'

interface HydrationBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function HydrationBoundary({ children, fallback = null }: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Mark as hydrated after first client render
    setIsHydrated(true)
  }, [])

  // During SSR and initial hydration, show fallback
  if (!isHydrated) {
    return <div suppressHydrationWarning>{fallback}</div>
  }

  // After hydration, show actual content
  return <div suppressHydrationWarning>{children}</div>
}
