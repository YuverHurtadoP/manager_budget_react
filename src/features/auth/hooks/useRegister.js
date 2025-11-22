import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../services/auth.api";

export const useRegister = () =>
  useMutation({
    mutationFn: registerRequest,
    onError: (err) => console.error("Error al registrarse", err),
  });