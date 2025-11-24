import { Link } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";

const cards = [
  {
    title: "Presupuestos",
    description: "Crear, editar y listar tus presupuestos.",
    path: "/budgets",
  },
  {
    title: "Gastos",
    description: "Registrar y consultar gastos asociados.",
    path: "/expenses",
  },
  {
    title: "Mi Perfil",
    description: "Editar información de tu cuenta.",
    path: "/profile",
  },
];

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
        {cards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition hover:scale-[1.02]"
          >
            <h2 className="text-xl font-medium">{card.title}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
