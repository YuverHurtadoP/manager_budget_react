
import { z } from "zod";

export const budgetSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  valor: z.number().min(1, "El monto es requerido"),
});
