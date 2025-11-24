import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../services/auth.api";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../shared/utils/toast";
export const useLogin = () => {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginRequest,

    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);

      showToast("Inicio de sesión exitoso", "success");

      navigate("/home");
    },

    onError: () => {
      showToast("Error al iniciar sesión", "error");
    },
  });
};
