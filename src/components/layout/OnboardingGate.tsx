'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useProfileStore } from '@/store/profileStore'

export default function OnboardingGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const hasCompletedOnboarding = useProfileStore(s => s.hasCompletedOnboarding)
  const [hydrated, setHydrated] = useState(false)

  // Wait for Zustand to rehydrate from localStorage before making redirect decisions
  useEffect(() => { setHydrated(true) }, [])

  useEffect(() => {
    if (!hydrated) return
    if (!hasCompletedOnboarding && pathname !== '/onboarding') {
      router.replace('/onboarding')
    }
  }, [hydrated, hasCompletedOnboarding, pathname, router])

  if (!hydrated) return null
  if (!hasCompletedOnboarding && pathname !== '/onboarding') return null
  return <>{children}</>
}
