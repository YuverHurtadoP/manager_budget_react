import axiosInstance from "../../../shared/utils/axiosInstance";

export const getExpensesByBudgetRequest = async (budgetId) => {
  const res = await axiosInstance.get(`/expenses/${budgetId}`);
  return res.data;
};

export const createExpenseRequest = async (expense) => {
  const res = await axiosInstance.post("/expenses", expense);
  return res.data;
};

export const updateExpenseRequest = async (id, expense) => {
  const res = await axiosInstance.put(`/expenses/${id}`, expense);
  return res.data;
};

export const deleteExpenseRequest = async (id) => {
  const res = await axiosInstance.delete(`/expenses/${id}`);
  return res.data;
};

export const getExpenseByIdRequest = async (id) => {
  const res = await axiosInstance.get(`/expenses/${id}`);
  return res.data;
};

export const getExpenseSummaryByBudgetRequest = async (budgetId) => {
  const res = await axiosInstance.get(`/expenses/${budgetId}/summary`);
  return res.data;
};

 