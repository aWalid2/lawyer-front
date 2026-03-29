import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "../services/login";



export const useLogin = () => {
  const navigate = useNavigate();
  const { saveUser } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data: any) => {
      const token = data?.token;
      if (!token) return console.error("Token not found");

      Cookies.set("auth_token", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      saveUser(token); // decode + store in context

      const { role }: any = jwtDecode(token);
      navigate(role === "ADMIN" ? "/dashboard" : "/profile");
    },
    onError: (error: any) => {
      console.log("Response data:", error.response?.data);
    },
  });
};