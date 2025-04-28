// src/stores/useDialogStore.ts

import { create } from 'zustand';

interface DialogStore {
  openDialog: string | null;
  setDialog: (name: string) => void;
  isDialogOpen: (name: string) => boolean;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogStore>((set, get) => ({
  openDialog: null,
  setDialog: (name) => set({ openDialog: name }),
  isDialogOpen: (name) => get().openDialog === name,
  closeDialog: () => set({ openDialog: null }),
}));
