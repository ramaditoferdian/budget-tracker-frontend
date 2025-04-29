// src/modules/auth/services/authService.ts

import { post } from '@/lib/fetcher';

// Payload untuk login dan register
export interface AuthPayload {
  email: string;
  password: string;
}

// Struktur response dari API
export interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      isFirstTimeLogin: boolean;
    };
  };
  errors: boolean;
}

export interface OnboardingCompleteResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      isFirstTimeLogin: boolean;
    };
  };
  errors: boolean;
}

export interface RegisterResponse {
  data: {
    id: string;
    email: string;
  };
  errors: boolean;
}

// Fungsi login
export const login = (payload: AuthPayload) => post<LoginResponse>('/auth/login', payload);

export const onboardingComplete = () =>
  post<OnboardingCompleteResponse>('/auth/onboarding-complete');

// Fungsi register
export const register = (payload: AuthPayload) => post<RegisterResponse>('/auth/register', payload);
