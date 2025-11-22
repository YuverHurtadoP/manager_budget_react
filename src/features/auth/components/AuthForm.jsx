import { useState } from "react";

export default function AuthForm({ onSubmit, loading, fields, buttonText }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      {fields.includes("name") && (
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          onChange={handleChange}
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Cargando..." : buttonText}
      </button>
    </form>
  );
}
