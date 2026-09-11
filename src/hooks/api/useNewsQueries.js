import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNewsApi,
  getNewsDetailsApi,
  createNewsApi,
  updateNewsApi,
  deleteNewsApi,
  updateNewsStatusApi,
  updateNewsTypeApi,
  sendNewsNotificationApi,
} from "../../api/newsApi";

export const useGetNews = (query = "", options = {}) => {
  return useQuery({
    queryKey: ["news", query],
    queryFn: () => getNewsApi(query),
    ...options,
  });
};

export const useGetNewsDetails = (newsId, options = {}) => {
  return useQuery({
    queryKey: ["news", "details", newsId],
    queryFn: () => getNewsDetailsApi(newsId),
    enabled: Boolean(newsId),
    ...options,
  });
};

export const useCreateNewsMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewsApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateNewsMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNewsApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (variables?.newsId) {
        queryClient.invalidateQueries({ queryKey: ["news", "details", variables.newsId] });
      }
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useDeleteNewsMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNewsApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateNewsStatusMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNewsStatusApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateNewsTypeMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNewsTypeApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useSendNewsNotificationMutation = (options = {}) => {
  return useMutation({
    mutationFn: sendNewsNotificationApi,
    ...options,
  });
};
