import { useEffect, useState } from "react";
import { budgetSchema } from "../validations/budget.schema";
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
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre,
        valor: initialData.valor,
        descripcion: initialData.descripcion || "",
      });
    } else {
      setFormData({
        nombre: "",
        valor: 0,
        descripcion: "",
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validated = budgetSchema.parse(formData);
      await onSubmit(validated as any);
      onClose();
    } catch (error: any) {
      if (error.issues) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue: any) => {
          if (issue.path[0]) {
            newErrors[issue.path[0]] = issue.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error("Error submitting form:", error);
      }
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
              className={`input input-bordered w-full focus:input-primary ${errors.nombre ? "input-error" : ""
                }`}
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
            />
            {errors.nombre && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.nombre}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Monto Total</span>
            </label>
            <input
              type="number"
              placeholder="0.00"
              className={`input input-bordered w-full focus:input-primary ${errors.valor ? "input-error" : ""
                }`}
              value={formData.valor}
              onChange={(e) =>
                setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })
              }
              min="0"
            />
            {errors.valor && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.valor}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Descripción</span>
            </label>
            <textarea
              placeholder="Ej: Gastos de comida, transporte, etc."
              className={`textarea textarea-bordered w-full focus:textarea-primary ${errors.descripcion ? "textarea-error" : ""
                }`}
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              rows={3}
            />
            {errors.descripcion && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.descripcion}</span>
              </label>
            )}
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
