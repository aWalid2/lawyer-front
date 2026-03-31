import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useAuth } from "@/shared/context/AuthContext";
import { loginUser } from "../services/login";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const { saveUser } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data: any) => {
      const token = data?.access_token;
      if (!token) return toast.error("Token not found");

      Cookies.set("access_token", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      saveUser(token);

      const { role }: any = jwtDecode(token);
      navigate(role === "admin" ? "/dashboard" : "/dashboard");
      toast.success(`مرحبا  لقد تم تسجيل الدخول بنجاح`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "حدث خطأ");
    },
  });
};