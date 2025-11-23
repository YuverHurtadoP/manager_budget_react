
import { useAuth } from "../../shared/hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">
        Bienvenido{user?.name ? `, ${user.name}` : ""} 👋
      </h1>

      <p className="text-gray-600 mt-2">
        Aquí puedes gestionar tus presupuestos y gastos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

        <a
          href="/budgets"
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-medium">Presupuestos</h2>
          <p className="text-gray-500 text-sm mt-1">
            Crear, editar y listar tus presupuestos.
          </p>
        </a>

        <a
          href="/expenses"
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-medium">Gastos</h2>
          <p className="text-gray-500 text-sm mt-1">
            Registrar y consultar gastos asociados.
          </p>
        </a>

        <a
          href="/profile"
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-medium">Mi Perfil</h2>
          <p className="text-gray-500 text-sm mt-1">
            Editar información de tu cuenta.
          </p>
        </a>

      </div>
    </div>
  );
}
