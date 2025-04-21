import { create } from 'zustand'
import { PhosphorIconName } from '@/lib/getPhosphorIcon'

interface IconStore {
  selectedIcon: PhosphorIconName | null
  setSelectedIcon: (icon: PhosphorIconName) => void
  iconColor: string
  setColor: (color: string) => void
  reset: () => void
}

export const useIconStore = create<IconStore>((set) => ({
  selectedIcon: null, // tidak ada default icon
  setSelectedIcon: (icon) => set({ selectedIcon: icon }),
  iconColor: '#000000',
  setColor: (color) => set({ iconColor: color }),
  reset: () => set({ selectedIcon: null, iconColor: '#000000' }),
}))
