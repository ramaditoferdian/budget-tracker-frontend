// src/utils/constants/confirmationTemplates.ts

type ActionType = 'delete' | 'reset' | 'archive' | 'signOut';
type SubjectType = string;

type ConfirmationTemplate = {
  title: (subject: SubjectType) => string;
  description: (subject: SubjectType) => string;
  confirmText: string;
  cancelText: string;
};

export const confirmationTemplates: Record<ActionType, ConfirmationTemplate> = {
  delete: {
    title: (subject) => `Delete ${subject}`,
    description: (subject) =>
      `Are you sure you want to delete this ${subject.toLowerCase()}? This action cannot be undone.`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
  },
  reset: {
    title: (subject) => `Reset ${subject}`,
    description: (subject) =>
      `Are you sure you want to reset this ${subject.toLowerCase()}? This action cannot be undone.`,
    confirmText: 'Reset',
    cancelText: 'Cancel',
  },
  archive: {
    title: (subject) => `Archive ${subject}`,
    description: (subject) =>
      `Are you sure you want to archive this ${subject.toLowerCase()}? You can restore it later from the archive.`,
    confirmText: 'Archive',
    cancelText: 'Cancel',
  },
  signOut: {
    title: () => 'Sign Out',
    description: () =>
      'Are you sure you want to sign out? You will need to log in again to continue.',
    confirmText: 'Sign Out',
    cancelText: 'Cancel',
  },
};
