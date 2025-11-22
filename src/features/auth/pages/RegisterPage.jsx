 
import AuthForm from "../components/AuthForm";
import { useRegister } from "../hooks/useRegister";
import { registerSchema } from "../validations/auth.schema";

export default function RegisterPage() {
  const register = useRegister();

  const handleSubmit = (data) => {
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      console.log(parsed.error.flatten().fieldErrors);
      return;
    }
    register.mutate(parsed.data);
  };

  return (
    <div>
      <h1>Crear cuenta</h1>

      <AuthForm
        fields={["name"]}
        buttonText="Registrarme"
        loading={register.isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
