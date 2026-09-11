import { useQuery } from "@tanstack/react-query";
import { getDashboardStatsApi } from "../../api/dashboardApi";

export const useGetDashboardStats = (options = {}) => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardStatsApi,
    ...options,
  });
};
