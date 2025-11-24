import { useEffect, useState } from "react";
import type { Budget } from "../../../shared/types";

interface BudgetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Budget | null;
  onSubmit: (data: Omit<Budget, "id">) => Promise<void>;
}

const BudgetFormModal = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: BudgetFormModalProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    valor: 0,
    descripcion: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre,
        valor: initialData.valor,
        descripcion: initialData.descripcion,
        startDate: initialData.startDate.split("T")[0], // Format for input date
        endDate: initialData.endDate.split("T")[0],
      });
    } else {
      setFormData({
        nombre: "",
        valor: 0,
        descripcion: "",
        startDate: "",
        endDate: "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData as any); // Type casting for simplicity, ideally strict types
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative bg-base-100 shadow-xl border border-base-300">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold mb-4">
          {initialData ? "Editar Presupuesto" : "Nuevo Presupuesto"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Nombre</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Gastos Mensuales"
              className="input input-bordered w-full focus:input-primary"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Monto Total</span>
            </label>
            <input
              type="number"
              placeholder="0.00"
              className="input input-bordered w-full focus:input-primary"
              value={formData.valor}
              onChange={(e) =>
                setFormData({ ...formData, valor: parseFloat(e.target.value) })
              }
              required
              min="0"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Descripción</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Gastos de comida, transporte, etc."
              className="input input-bordered w-full focus:input-primary"
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              required
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Guardar"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default BudgetFormModal;
