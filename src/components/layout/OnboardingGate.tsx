'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useProfileStore } from '@/store/profileStore'

export default function OnboardingGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const hasCompletedOnboarding = useProfileStore(s => s.hasCompletedOnboarding)

  useEffect(() => {
    if (!hasCompletedOnboarding && pathname !== '/onboarding') {
      router.replace('/onboarding')
    }
  }, [hasCompletedOnboarding, pathname, router])

  // Don't flash content while redirecting
  if (!hasCompletedOnboarding && pathname !== '/onboarding') {
    return null
  }

  return <>{children}</>
}
