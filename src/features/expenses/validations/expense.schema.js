import { z } from "zod";

export const expenseSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida"),
  valor: z.number().min(1, "El monto debe ser mayor a 0"),
});