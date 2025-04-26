// src/hooks/useDialog.ts

import { useDialogStore } from '@/stores/useDialogStore';

export function useDialog(name: string) {
  const openDialog = useDialogStore((state) => state.openDialog);
  const setDialog = useDialogStore((state) => state.setDialog);
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const open = openDialog === name;
  const setOpen = (isOpen: boolean) => {
    if (isOpen) setDialog(name);
    else closeDialog();
  };

  return { open, setOpen };
}
