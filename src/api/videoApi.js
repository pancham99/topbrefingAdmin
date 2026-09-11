import axiosInstance from "./axiosInstance";

export const getVideosApi = async () => {
  const { data } = await axiosInstance.get("/api/video/getall");
  return data;
};

export const addVideoApi = async (formData) => {
  const { data } = await axiosInstance.post("/api/video/add", formData);
  return data;
};

export const updateVideoStatusApi = async ({ _id, status }) => {
  const { data } = await axiosInstance.put(`/api/video/update_status/${_id}`, { status });
  return data;
};

export const deleteVideoApi = async (id) => {
  const { data } = await axiosInstance.delete(`/api/video/delete/${id}`);
  return data;
};

export const getYoutubeVideosApi = async ({ page = 1, limit = 9 } = {}) => {
  const { data } = await axiosInstance.get(`/api/youtube/getall?page=${page}&limit=${limit}`);
  return data;
};

export const addYoutubeVideoApi = async (payload) => {
  const { data } = await axiosInstance.post("/api/youtube/add", payload);
  return data;
};
