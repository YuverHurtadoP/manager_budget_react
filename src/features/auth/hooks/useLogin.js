import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../services/auth.api";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  // Función para asegurar que el contenedor exista SIEMPRE
  const getToastContainer = () => {
    let container = document.querySelector(".toast");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast toast-top toast-end z-50";
      document.body.appendChild(container);
    }
    return container;
  };

  return useMutation({
    mutationFn: loginRequest,

    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);

      // Obtener contenedor asegurado
      const container = getToastContainer();

      const toast = document.createElement("div");
      toast.className = "alert alert-success shadow-lg";
      toast.innerHTML = `<span>Inicio de sesión exitoso 🎉</span>`;

      container.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);

      navigate("/home");
    },

    onError: () => {
      console.log("Error al iniciar sesión");
      const container = getToastContainer();

      const toast = document.createElement("div");
      toast.className = "alert alert-error shadow-lg";
      toast.innerHTML = `<span>Error al iniciar sesión ❌</span>`;

      container.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    },
  });
};
