 import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

 import {
    getExpensesByBudgetRequest,
    createExpenseRequest,
    updateExpenseRequest,
    deleteExpenseRequest,
    getExpenseSummaryByBudgetRequest,
 } from "../services/expense.api";
import { useParams } from "react-router-dom";
import { showToast } from "../../../shared/utils/toast";

export const useExpenses = (budgetId?: string) => {
    const queryClient = useQueryClient();
  
    const expensesQuery = useQuery({
      queryKey: ["expenses", budgetId],
      queryFn: () => getExpensesByBudgetRequest(budgetId!),
      enabled: !!budgetId,
    });

    const expenseSummaryQuery = useQuery({
        queryKey: ["expenses-summary", budgetId],
        queryFn: () => getExpenseSummaryByBudgetRequest(budgetId!),
        enabled: !!budgetId,
      });
    
  
    const createExpense = useMutation({
      mutationFn: createExpenseRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["expenses", budgetId] });
      },
      onError: () => showToast("Error al crear el gasto", "error"),
    });
  
    const updateExpense = useMutation({
      mutationFn: updateExpenseRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["expenses", budgetId] });
      },
    });
  
    const deleteExpense = useMutation({
      mutationFn: deleteExpenseRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["expenses", budgetId] });
      },
    });
  
    return {
      expenses: expensesQuery.data?.expenses ?? [],
      summary: expenseSummaryQuery.data,
      isLoadingSummary: expenseSummaryQuery.isLoading,
      isErrorSummary: expenseSummaryQuery.isError,
      errorSummary: expenseSummaryQuery.error,
      isLoading: expensesQuery.isLoading,
      isError: expensesQuery.isError,
      createExpense: createExpense.mutateAsync,
      updateExpense: updateExpense.mutateAsync,
      deleteExpense: deleteExpense.mutateAsync,
    };
  };
  