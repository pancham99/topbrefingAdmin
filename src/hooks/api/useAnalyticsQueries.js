import { useQuery } from "@tanstack/react-query";
import { getAnalyticsApi } from "../../api/analyticsApi";

export const useGetAnalytics = (options = {}) => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalyticsApi,
    refetchInterval: 30000, // refresh every 30 seconds
    ...options,
  });
};
