// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


export interface AuthUser {
  id: string;
  role: string;
  email?: string;
  exp?: number;
  [key: string]: unknown;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  saveUser: (token: string) => void;
  logout: () => void;
}


const TOKEN_KEY = "auth_token";

function decodeToken(token: string): AuthUser | null {
  try {
    const decoded = jwtDecode<AuthUser>(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}


const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const token = Cookies.get(TOKEN_KEY);
    return token ? decodeToken(token) : null;
  });

  useEffect(() => {
    const token = Cookies.get(TOKEN_KEY);
    if (token && !user) {
      Cookies.remove(TOKEN_KEY);
    }
  }, []);

  const saveUser = useCallback((token: string) => {
    const decoded = decodeToken(token);
    if (!decoded) {
      console.warn("AuthProvider.saveUser: invalid or expired token");
      return;
    }
    const expires = decoded.exp
      ? new Date(decoded.exp * 1000)
      : undefined;
    Cookies.set(TOKEN_KEY, token, { expires, sameSite: "strict" });
    setUser(decoded);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove(TOKEN_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, saveUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}

export function useUser(): AuthUser | null {
  return useAuth().user;
}

export function useIsAuthenticated(): boolean {
  return useAuth().isAuthenticated;
}