import axiosInstance from "./axiosInstance";

export const getSubscribersApi = async () => {
  const { data } = await axiosInstance.get("/get/subscribers");
  return data;
};

export const deleteSubscriberApi = async (id) => {
  const { data } = await axiosInstance.delete(`/api/subscribers/${id}`);
  return data;
};
