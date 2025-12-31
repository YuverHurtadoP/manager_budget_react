import React, { useState } from "react";
import { useExpenses } from "../hooks/useExpenses";

interface ExpenseListProps {
  budgetId?: string;
}
const ExpenseList = ({ budgetId }: ExpenseListProps) => {
  const {
    expenses,
    isLoading,
    isError,
    error,
    createExpense,
    updateExpense,
    deleteExpense,
    summary,
    isLoadingSummary,
    isErrorSummary,
    errorSummary,
  } = useExpenses(budgetId);
  console.log("Summary:", summary);
  const expensesList = Array.isArray(expenses) ? expenses : [];
  console.log("expensesList",expensesList);
  return (
    <div>
      <h1>En proceso de desarrollo</h1>
    </div>
  );
};

export default ExpenseList;
