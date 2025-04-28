'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import DialogDrawer from '@/components/shared/DialogDrawer';

interface ConfirmationDialogProps {
  name: string;
  title: string;
  description?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
}

export default function ConfirmationDialog({
  name,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  open,
  setOpen,
  onConfirm,
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <DialogDrawer name={name} title={title} open={open} setOpen={setOpen}>
      {description && <div className="text-sm text-muted-foreground mb-6">{description}</div>}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setOpen(false)}>
          {cancelText}
        </Button>
        <Button onClick={handleConfirm}>{confirmText}</Button>
      </div>
    </DialogDrawer>
  );
}
