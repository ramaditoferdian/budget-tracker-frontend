// src/modules/auth/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { login, AuthPayload, AuthResponse } from "../services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  return useMutation<AuthResponse, any, AuthPayload>({
    mutationFn: (payload: AuthPayload) => login(payload),
    onSuccess: (response: AuthResponse) => {
      // Pastikan errors == false sebelum melanjutkan
      if (response.errors) {
        toast.error("Login failed. Please try again.");
        return;
      }

      const token = response.data?.token;

      if (token) {
        localStorage.setItem("bt:token", token);
        toast.success("Login berhasil!");
        // router.push("/dashboard");
      } else {
        toast.error("Token tidak ditemukan");
      }
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message || "Gagal login";
      toast.error(message);
    },
  });
};
