
import axiosInstance from "../../../shared/utils/axiosInstance";

export const  createBudgetRequest = async (data) => {
  const res = await axiosInstance.post("/budget", data);
  return res.data;
};

export const getBudgetsRequest = async () => {
  const res = await axiosInstance.get("/budget");
  return res.data;
};

export const getBudgetByIdRequest = async (id) => {
  const res = await axiosInstance.get(`/budget/${id}`);
  return res.data;
};

export const updateBudgetRequest = async (id, data) => {
  const res = await axiosInstance.put(`/budget/${id}`, data);
  return res.data;
};

export const deleteBudgetRequest = async (id) => {
  const res = await axiosInstance.delete(`/budget/${id}`);
  return res.data;
};
