import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

/**
 * useAuth Hook
 * Provides authentication context throughout the application.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
