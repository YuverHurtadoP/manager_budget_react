// src/features/auth/services/auth.api.js
import axiosInstance from "../../../shared/utils/axiosInstance";

export const loginRequest = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const registerRequest = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};
/*
export const getProfileRequest = async () => {
  const res = await axiosInstance.get("/auth/profile");
  return res.data;
};*/
