import AuthForm from "../components/AuthForm";
import { useLogin } from "../hooks/useLogin";
import { loginSchema } from "../validations/auth.schema";

export default function LoginPage() {
  const login = useLogin();

  const handleSubmit = (data) => {
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      console.log(parsed.error.flatten().fieldErrors);
      return;
    }

    login.mutate(parsed.data);
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>

      <AuthForm
        fields={[]}               
        buttonText="Ingresar"
        loading={login.isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
