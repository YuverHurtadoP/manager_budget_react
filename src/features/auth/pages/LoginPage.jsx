import AuthForm from "../components/AuthForm";
import { useLogin } from "../hooks/useLogin";
import { loginSchema } from "../validations/auth.schema";
import { useState } from "react";

export default function LoginPage() {
  const login = useLogin();
  const [errors, setErrors] = useState({});

  const handleSubmit = (data) => {
    const normalizedData = {
      email: data.email ?? "",      // si es undefined, lo convertimos en ""
      password: data.password ?? "",
    };
  
    const parsed = loginSchema.safeParse(normalizedData);
  
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
  
    setErrors({});
    login.mutate(parsed.data);
  };


  return (
<div
  style={{
    width: "100% !important",
    minHeight: "100vh !important",
    backgroundColor: "#F54927 !important",
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
  }}
>
  <AuthForm
     fields={["email", "password"]}
    buttonText="Iniciar sesión"
    loading={login.isLoading}
    onSubmit={handleSubmit}
    errors={errors}
  />
   
</div>
  );
}
