// src/modules/auth/services/authService.ts

import { post } from "@/lib/fetcher";

// Payload untuk login dan register
export interface AuthPayload {
  email: string;
  password: string;
}

// Struktur response dari API
export interface AuthResponse {
  data: {
    token: string;
  };
  errors: boolean;
}

// Fungsi login
export const login = (payload: AuthPayload) =>
  post<AuthResponse>("/auth/login", payload);

// Fungsi register
export const register = (payload: AuthPayload) =>
  post<AuthResponse>("/auth/register", payload);
