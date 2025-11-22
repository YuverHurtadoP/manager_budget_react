import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../services/auth.api";
import { useAuth } from "../../../shared/hooks/useAuth";

export const useLogin = () => {
  const { setUser, setToken } = useAuth();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token); 
    },
    onError: (error) => {
      console.error("Error al iniciar sesión", error);
    }
  });
};
