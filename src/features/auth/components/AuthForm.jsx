import { useState } from "react";
import { Link } from "react-router-dom";
export default function AuthForm({
  onSubmit,
  loading,
  fields,
  buttonText,
  errors = {},
}) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          {buttonText === "Iniciar sesión" ? "Bienvenido" : "Crear cuenta"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="flex flex-col gap-4"
        >
          {fields.includes("name") && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nombre completo</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Ej: Juan Pérez"
                className="input input-bordered"
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
              )}
            </div>
          )}
          {fields.includes("email") && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Correo electrónico</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="usuario@correo.com"
                className="input input-bordered"
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>
          )}

          {fields.includes("password") && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered"
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-outline mt-4"
          >
            {loading ? "Cargando..." : buttonText}
          </button>
          {buttonText === "Iniciar sesión" && (
            <Link to="/register" className="btn btn-outline mt-4">
              Crear cuenta nueva
            </Link>
          )}
          {buttonText !== "Iniciar sesión" && (
            <Link to="/login" className="btn btn-outline mt-4">
              Ir al iniciar sesión
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}
