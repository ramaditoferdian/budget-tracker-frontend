// src/modules/auth/hooks/useSession.ts
'use client';

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export const useSession = () => {
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("bt:token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      
      // optional: check if token expired
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("bt:token");
        setIsLoading(false);
        return;
      }

      setUser(decoded);
    } catch (err) {
      console.error("Invalid token");
      localStorage.removeItem("bt:token");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { user, isLoading };
};
