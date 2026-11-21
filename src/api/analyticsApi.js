import axiosInstance from "./axiosInstance";

export const getAnalyticsApi = async () => {
  const { data } = await axiosInstance.get("/api/analytics");
  return data;
};
