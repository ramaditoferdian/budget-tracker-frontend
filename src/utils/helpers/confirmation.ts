// src/utils/helpers/confirmation.ts

import { confirmationTemplates } from '../constants/confirmationTemplates';

type ActionType = keyof typeof confirmationTemplates;
type SubjectType = string;

export const getConfirmationMessage = (action: ActionType, subject?: SubjectType) => {
  const template = confirmationTemplates[action];

  return {
    title: template.title(subject ?? ''),
    description: template.description(subject ?? ''),
    confirmText: template.confirmText,
    cancelText: template.cancelText,
  };
};
