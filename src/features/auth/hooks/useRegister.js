import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../services/auth.api";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../shared/utils/toast";
export const useRegister = () => {

  const navigate = useNavigate();
 
  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      showToast("Registro exitoso", "success");
      navigate("/login");
    },
    onError: (err) => {
      showToast(err.response.data.message, "error");
    }
  });

  return registerMutation;
};
