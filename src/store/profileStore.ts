import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProfileState } from './types'

interface ProfileStore extends ProfileState {
  setUsername: (name: string) => void
  setAvatar: (avatarId: string) => void
  completeOnboarding: () => void
  resetProfile: () => void
}

const DEFAULT_PROFILE: ProfileState = {
  username: '',
  avatarId: 'wizard',
  hasCompletedOnboarding: false,
  joinedAt: 0,
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      ...DEFAULT_PROFILE,
      setUsername: (name) => set({ username: name.trim().slice(0, 20) }),
      setAvatar: (avatarId) => set({ avatarId }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true, joinedAt: Date.now() }),
      resetProfile: () => set({ ...DEFAULT_PROFILE }),
    }),
    { name: 'structura-profile' }
  )
)
