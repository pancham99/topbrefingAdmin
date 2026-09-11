import axiosInstance from "./axiosInstance";

export const getBannersApi = async () => {
  const { data } = await axiosInstance.get("/api/banner/getall");
  return data;
};

export const addBannerApi = async (formData) => {
  const { data } = await axiosInstance.post("/api/banner/add", formData);
  return data;
};

export const updateBannerStatusApi = async ({ _id, status }) => {
  const { data } = await axiosInstance.put(`/api/banner/status/${_id}`, { status });
  return data;
};

export const deleteBannerApi = async (id) => {
  const { data } = await axiosInstance.delete(`/api/banner/delete/${id}`);
  return data;
};
