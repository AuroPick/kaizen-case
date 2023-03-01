import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useTagStore = create((set) => ({
  tagId: 0,
  tagDetail: null,
  selectTag: (tagId, tagDetail) => set({ tagId, tagDetail }),
  clearTag: () => set({ tagId: 0, tagDetail: null })
}))

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      add: (data) => set({ user: data }),
      clear: () => set({ user: null })
    }),
    {
      name: '@KAIZEN_ONBOARDING:user',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
