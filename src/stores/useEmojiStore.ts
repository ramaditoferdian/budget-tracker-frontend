import { create } from 'zustand'

interface EmojiStore {
  selectedEmoji: string | null
  colorHex: string
  setSelectedEmoji: (emoji: string) => void
  setColorHex: (color: string) => void
}

export const useEmojiStore = create<EmojiStore>((set) => ({
  selectedEmoji: null,
  colorHex: '#000000',
  setSelectedEmoji: (emoji) => set({ selectedEmoji: emoji }),
  setColorHex: (color) => set({ colorHex: color }),
}))
