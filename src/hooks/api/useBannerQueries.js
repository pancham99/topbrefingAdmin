import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBannersApi,
  addBannerApi,
  updateBannerStatusApi,
  deleteBannerApi,
} from "../../api/bannerApi";

export const useGetBanners = (options = {}) => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getBannersApi,
    ...options,
  });
};

export const useAddBannerMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBannerApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateBannerStatusMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBannerStatusApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useDeleteBannerMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBannerApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};
