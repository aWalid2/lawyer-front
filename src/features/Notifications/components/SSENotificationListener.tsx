import { useAuth } from "@/shared/context/AuthContext";
import { useNotificationSSE } from "../hooks/useNotificationSSE";
import Cookies from "js-cookie";

export const SSENotificationListener = () => {
  const { user, isAuthenticated } = useAuth();
  const token = Cookies.get("access_token");

  useNotificationSSE({
    token: token ?? undefined,
    userId: user?.id,
    enabled: isAuthenticated,
  });

  return null;
};
