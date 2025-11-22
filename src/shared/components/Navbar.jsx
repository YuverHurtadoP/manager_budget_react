import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <h2>Mi App</h2>

      <div style={{ display: "flex", gap: "1rem" }}>
        {user && <p>Hola, {user.name}</p>}
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}