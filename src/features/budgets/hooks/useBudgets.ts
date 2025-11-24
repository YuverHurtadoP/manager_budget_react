import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    getBudgetsRequest,
    createBudgetRequest,
    updateBudgetRequest,
    deleteBudgetRequest,
} from "../services/budget.api";
import type { Budget } from "../../../shared/types";

export const useBudgets = () => {
    const queryClient = useQueryClient();

    const budgetsQuery = useQuery({
        queryKey: ["budgets"],
        queryFn: getBudgetsRequest,
    });

    const createBudgetMutation = useMutation({
        mutationFn: createBudgetRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
    });

    const updateBudgetMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Budget> }) =>
            updateBudgetRequest(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
    });

    const deleteBudgetMutation = useMutation({
        mutationFn: (id: string) => deleteBudgetRequest(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
    });

    return {
        budgets: (budgetsQuery.data?.budgets || []) as Budget[],
        isLoading: budgetsQuery.isLoading,
        isError: budgetsQuery.isError,
        error: budgetsQuery.error,
        createBudget: createBudgetMutation.mutateAsync,
        updateBudget: updateBudgetMutation.mutateAsync,
        deleteBudget: deleteBudgetMutation.mutateAsync,
    };
};
