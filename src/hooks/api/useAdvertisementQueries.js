import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdvertisementsApi,
  getAdvertisementByIdApi,
  addAdvertisementApi,
  updateAdvertisementApi,
  updateAdvertisementStatusApi,
  deleteAdvertisementApi,
} from "../../api/advertisementApi";

export const useGetAdvertisements = (options = {}) => {
  return useQuery({
    queryKey: ["advertisements"],
    queryFn: getAdvertisementsApi,
    ...options,
  });
};

export const useGetAdvertisementById = (id, options = {}) => {
  return useQuery({
    queryKey: ["advertisements", id],
    queryFn: () => getAdvertisementByIdApi(id),
    enabled: Boolean(id),
    ...options,
  });
};

export const useAddAdvertisementMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAdvertisementApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["advertisements"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateAdvertisementMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdvertisementApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["advertisements"] });
      if (variables?._id) {
        queryClient.invalidateQueries({ queryKey: ["advertisements", variables._id] });
      }
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateAdvertisementStatusMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdvertisementStatusApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["advertisements"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useDeleteAdvertisementMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdvertisementApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["advertisements"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};
