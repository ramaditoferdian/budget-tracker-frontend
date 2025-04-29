// src/modules/auth/hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query';
import {
  login,
  AuthPayload,
  LoginResponse,
  RegisterResponse,
  register,
  OnboardingCompleteResponse,
  onboardingComplete,
} from '../services/authService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, any, AuthPayload>({
    mutationFn: (payload: AuthPayload) => login(payload),
    onSuccess: (response: LoginResponse) => {
      // Pastikan errors == false sebelum melanjutkan
      if (response.errors) {
        toast.error('Login failed. Please try again.');
        return;
      }

      const token = response.data?.token;
      const user = response.data?.user;

      if (token) {
        localStorage.setItem('bt:token', token);
        toast.success('Login berhasil!');

        if (user?.isFirstTimeLogin) {
          router.push('/getting-started');
        } else {
          router.push('/dashboard');
        }
      } else {
        toast.error('Token tidak ditemukan');
      }
    },
    onError: (err: any) => {
      const message = err?.response?.data?.errors?.message || 'Gagal login';
      // toast.error(message);
      console.log(message);
    },
  });
};

export const useCompleteOnboarding = () => {
  const router = useRouter();

  return useMutation<OnboardingCompleteResponse>({
    mutationFn: () => onboardingComplete(),
    onSuccess: (response: OnboardingCompleteResponse) => {
      if (response.errors) {
        toast.error('Onboarding failed. Please try again.');
        return;
      }

      const token = response.data?.token;

      if (token) {
        localStorage.setItem('bt:token', token);
      }

      router.push('/dashboard');
    },
    onError: (err: any) => {
      const message = err?.response?.data?.errors?.message || 'Gagal onboarding';
      console.log(message);
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation<RegisterResponse, any, AuthPayload>({
    mutationFn: (payload: AuthPayload) => register(payload),
    onSuccess: (response: RegisterResponse) => {
      // Pastikan errors == false sebelum melanjutkan
      if (response.errors) {
        toast.error('Register failed. Please try again.');
        return;
      }

      const user = response.data;

      if (user) {
        toast.success('Register berhasil!');
        router.push('/login');
      } else {
        toast.error('User tidak ditemukan');
      }
    },
    onError: (err: any) => {
      const message = err?.response?.data?.errors?.message || 'Gagal Register';
      // toast.error(message);
      console.log(message);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('bt:token');
    router.push('/login');

    toast.success('Logout berhasil!');
  };

  return { logout };
};
