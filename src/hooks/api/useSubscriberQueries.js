import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSubscribersApi, deleteSubscriberApi } from "../../api/subscriberApi";

export const useGetSubscribers = (options = {}) => {
  return useQuery({
    queryKey: ["subscribers"],
    queryFn: getSubscribersApi,
    ...options,
  });
};

export const useDeleteSubscriberMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubscriberApi,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};
