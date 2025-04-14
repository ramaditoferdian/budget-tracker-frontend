export interface AuthPayload {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
}

export interface AuthErrorResponse {
  message: string
  code?: string
  errors?: { field: string; message: string }[]
}
