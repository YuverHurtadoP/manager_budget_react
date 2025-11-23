import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Contenedor global para notificaciones */}
      <div className="toast toast-top toast-end z-50"></div>

      {/* Aquí se renderizan tus rutas */}
      <Outlet />
    </div>
  );
}

export default App;
