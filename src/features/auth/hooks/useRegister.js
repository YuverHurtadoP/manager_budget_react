import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../services/auth.api";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {

  const navigate = useNavigate();

  const getToastContainer = () => {
    let container = document.querySelector(".toast");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast toast-top toast-end z-50";
      document.body.appendChild(container);
    }
    return container;
  };

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      getToastContainer().innerHTML = `
        <div class="alert alert-success">
          <span>Registro exitoso</span>
        </div>
      `;
      navigate("/login");
      setTimeout(() => {
        getToastContainer().innerHTML = "";
      }, 2000);
    },
    onError: (err) => {
      
      getToastContainer().innerHTML = `
        <div class="alert alert-error">
          <span>${err.response.data.message}</span>
        </div>
      `;
      setTimeout(() => {
        getToastContainer().innerHTML = "";
      }, 3000);
    }
  });

  return registerMutation;
};
