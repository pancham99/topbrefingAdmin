import axiosInstance from "./axiosInstance";

export const getNewsApi = async (query = "") => {
  const q = typeof query === "string" ? query : new URLSearchParams(query).toString();
  const endpoint = q ? `/api/news?${q}` : "/api/news";
  const { data } = await axiosInstance.get(endpoint);
  return data;
};

export const getNewsDetailsApi = async (newsId) => {
  const { data } = await axiosInstance.get(`/api/news/${newsId}`);
  return data;
};

export const createNewsApi = async (formData) => {
  const { data } = await axiosInstance.post("/api/news/add", formData);
  return data;
};

export const updateNewsApi = async ({ newsId, formData }) => {
  const { data } = await axiosInstance.post(`/api/news/update/${newsId}`, formData);
  return data;
};

export const deleteNewsApi = async (id) => {
  const { data } = await axiosInstance.delete(`/api/news/delete/${id}`);
  return data;
};

export const updateNewsStatusApi = async ({ id, status }) => {
  const { data } = await axiosInstance.put(`/api/news/status-update/${id}`, { status });
  return data;
};

export const updateNewsTypeApi = async ({ id, payload }) => {
  const { data } = await axiosInstance.put(`/api/news/types-update/${id}`, payload);
  return data;
};

export const sendNewsNotificationApi = async (newsId) => {
  const { data } = await axiosInstance.post(`/api/news/send-notification/${newsId}`, {});
  return data;
};
