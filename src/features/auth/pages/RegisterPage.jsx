import AuthForm from "../components/AuthForm";
import { useRegister } from "../hooks/useRegister";
import { registerSchema } from "../validations/auth.schema";
import { useState } from "react";

export default function RegisterPage() {
  const register = useRegister();
  const [errors, setErrors] = useState({});
  const handleSubmit = (data) => {
    const normalizedData = {
      name: data.name ?? "",
      email: data.email ?? "",
      password: data.password ?? "",
    };
    const parsed = registerSchema.safeParse(normalizedData);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    register.mutate(parsed.data);
  };

  return (
    <div>
      <AuthForm
        fields={["name", "email", "password"]}
        buttonText="Registrarme"
        loading={register.isLoading}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
}
