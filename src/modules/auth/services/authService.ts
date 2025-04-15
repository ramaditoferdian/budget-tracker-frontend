// src/modules/auth/services/authService.ts

import { post } from "@/lib/fetcher";

// Payload untuk login dan register
export interface AuthPayload {
  email: string;
  password: string;
}

// Struktur response dari API
export interface LoginResponse {
  data: {
    token: string;
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
export const login = (payload: AuthPayload) =>
  post<LoginResponse>("/auth/login", payload);

// Fungsi register
export const register = (payload: AuthPayload) =>
  post<RegisterResponse>("/auth/register", payload);
