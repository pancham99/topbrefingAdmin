import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginApi,
  getUserProfileApi,
  updateAvatarApi,
  resetPasswordApi,
  getWritersApi,
  addWriterApi,
  updateWriterStatusApi,
  deleteWriterApi,
} from "../../api/authApi";

export const useGetProfile = (options = {}) => {
  return useQuery({
    queryKey: ["auth", "profile"],
    queryFn: getUserProfileApi,
    ...options,
  });
};

export const useGetWriters = (options = {}) => {
  return useQuery({
    queryKey: ["auth", "writers"],
    queryFn: getWritersApi,
    ...options,
  });
};

export const useLoginMutation = (options = {}) => {
  return useMutation({
    mutationFn: loginApi,
    ...options,
  });
};

export const useUpdateAvatarMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAvatarApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useResetPasswordMutation = (options = {}) => {
  return useMutation({
    mutationFn: resetPasswordApi,
    ...options,
  });
};

export const useAddWriterMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addWriterApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "writers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateWriterStatusMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWriterStatusApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "writers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export const useDeleteWriterMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWriterApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "writers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};
