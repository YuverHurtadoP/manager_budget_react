import { useState } from "react";
import { useBudgets } from "../hooks/useBudgets";
import BudgetFormModal from "./BudgetFormModal";
import type { Budget } from "../../../shared/types";

const BudgetList = () => {
    const { budgets, isLoading, isError, createBudget, updateBudget, deleteBudget } =
        useBudgets();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

    // Ensure budgets is always an array
    const budgetsList = Array.isArray(budgets) ? budgets : [];

    const handleCreate = () => {
        setEditingBudget(null);
        setIsModalOpen(true);
    };

    const handleEdit = (budget: Budget) => {
        setEditingBudget(budget);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de eliminar este presupuesto?")) {
            await deleteBudget(id);
        }
    };

    const handleSubmit = async (data: any) => {
        if (editingBudget) {
            await updateBudget({ id: editingBudget.id, data });
        } else {
            await createBudget(data);
        }
    };

    if (isLoading)
        return (
            <div className="flex justify-center p-10">
                <span className="loading loading-dots loading-lg text-primary"></span>
            </div>
        );

    if (isError)
        return (
            <div className="alert alert-error">
                <span>Error al cargar los presupuestos.</span>
            </div>
        );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-base-content">Presupuestos</h1>
                    <p className="text-base-content/60 mt-1">
                        Gestiona tus metas financieras
                    </p>
                </div>
                <button onClick={handleCreate} className="btn btn-primary shadow-lg">
                    + Nuevo Presupuesto
                </button>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-xl border border-base-200">
                <table className="table w-full">
                    <thead className="bg-base-200/50 text-base-content/70 uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="py-4 pl-6">Nombre</th>
                            <th>Monto</th>
                            <th>Progreso</th>
                            <th className="text-right pr-6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgetsList.map((budget) => {
                            // Calculate actual progress (0% if no spending data)
                            const progress =
                                budget.currentSpending && budget.valor
                                    ? (budget.currentSpending / budget.valor) * 100
                                    : 0;

                            return (
                                <tr
                                    key={budget.id}
                                    className="hover:bg-base-200/30 transition-colors duration-200"
                                >
                                    <td className="pl-6 font-semibold text-lg">{budget.nombre}</td>
                                    <td className="font-medium">
                                        ${budget.valor.toLocaleString()}
                                    </td>
                                    <td className="w-1/4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between text-xs opacity-70">
                                                <span>Gastado</span>
                                                <span>{Math.round(progress)}%</span>
                                            </div>
                                            <progress
                                                className={`progress w-full ${progress > 90
                                                        ? "progress-error"
                                                        : progress > 70
                                                            ? "progress-warning"
                                                            : "progress-success"
                                                    }`}
                                                value={progress}
                                                max="100"
                                            ></progress>
                                        </div>
                                    </td>
                                    <td className="text-right pr-6">
                                        <div className="join">
                                            <button
                                                onClick={() => handleEdit(budget)}
                                                className="btn btn-sm btn-ghost join-item tooltip"
                                                data-tip="Editar"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(budget.id)}
                                                className="btn btn-sm btn-ghost text-error join-item tooltip"
                                                data-tip="Eliminar"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {budgetsList.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-10 opacity-50">
                                    No hay presupuestos registrados aún.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <BudgetFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={editingBudget}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default BudgetList;
