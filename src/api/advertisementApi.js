import axiosInstance from "./axiosInstance";

export const getAdvertisementsApi = async () => {
  const { data } = await axiosInstance.get("/api/advertisement/getall");
  return data;
};

export const getAdvertisementByIdApi = async (id) => {
  const { data } = await axiosInstance.get(`/api/advertisement/get/${id}`);
  return data;
};

export const addAdvertisementApi = async (formData) => {
  const { data } = await axiosInstance.post("/api/advertisement/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateAdvertisementApi = async ({ _id, formData }) => {
  const { data } = await axiosInstance.put(`/api/advertisement/update/${_id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateAdvertisementStatusApi = async ({ _id, status }) => {
  const { data } = await axiosInstance.put(`/api/advertisement/status/${_id}`, { status });
  return data;
};

export const deleteAdvertisementApi = async (id) => {
  const { data } = await axiosInstance.delete(`/api/advertisement/delete/${id}`);
  return data;
};
