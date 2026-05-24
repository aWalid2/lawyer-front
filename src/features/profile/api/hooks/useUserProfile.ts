import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/getUserProfile";
import type { UserProfileResponse } from "../../types/profileT";

export const useUserProfile = (userId: number) => {
  return useQuery<UserProfileResponse>({
    queryKey: ["profile-user", userId],
    queryFn: () => getUserProfile(userId),
    enabled: Number.isFinite(userId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};