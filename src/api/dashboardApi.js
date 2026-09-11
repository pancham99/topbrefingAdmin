import axiosInstance from "./axiosInstance";

export const getDashboardStatsApi = async () => {
  const { data } = await axiosInstance.get("/api/dashboard");
  return data;
};
