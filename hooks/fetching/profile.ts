import { Product } from "@/types/main-page";
import useSWR from "swr";

export const useActivitiesApi = () => {
  const result = useSWR<{ recentVisits: Product[] }>("/api/v1/users/recent-visits");
  return result;
};
