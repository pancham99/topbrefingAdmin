import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getVideosApi,
  addVideoApi,
  updateVideoStatusApi,
  deleteVideoApi,
  getYoutubeVideosApi,
  addYoutubeVideoApi,
} from "../../api/videoApi";

export const useGetVideos = (options = {}) => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: getVideosApi,
    ...options,
  });
};

export const useAddVideoMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addVideoApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateVideoStatusMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVideoStatusApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useDeleteVideoMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVideoApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useGetYoutubeVideos = (page = 1, limit = 9, options = {}) => {
  return useQuery({
    queryKey: ["youtubeVideos", page, limit],
    queryFn: () => getYoutubeVideosApi({ page, limit }),
    ...options,
  });
};

export const useAddYoutubeVideoMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addYoutubeVideoApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["youtubeVideos"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};
