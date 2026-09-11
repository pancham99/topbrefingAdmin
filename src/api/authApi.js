import axiosInstance from "./axiosInstance";

export const loginApi = async (credentials) => {
  const { data } = await axiosInstance.post("/api/login", credentials);
  return data;
};

export const getUserProfileApi = async () => {
  const { data } = await axiosInstance.get("/api/news/get_user");
  return data;
};

export const updateAvatarApi = async (formData) => {
  const { data } = await axiosInstance.put("/api/news/update_avatar", formData);
  return data;
};

export const resetPasswordApi = async (payload) => {
  const { data } = await axiosInstance.put("/api/news/rest_user_password", payload);
  return data;
};

export const getWritersApi = async () => {
  const { data } = await axiosInstance.get("/api/news/writers");
  return data;
};

export const addWriterApi = async (payload) => {
  const { data } = await axiosInstance.post("/api/news/writer/add", payload);
  return data;
};

export const updateWriterStatusApi = async ({ id, status }) => {
  const { data } = await axiosInstance.put(`/api/news/writer_status-update/${id}`, { status });
  return data;
};

export const deleteWriterApi = async (id) => {
  const { data } = await axiosInstance.delete(`/api/news/writer/delete/${id}`);
  return data;
};
