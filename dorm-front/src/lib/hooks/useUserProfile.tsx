import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { ProfileAxiosResponseType } from "@/types/global";

const useUserProfile = (memberId: number | string | string[] | undefined) => {
  const { data, error } = useSWR<ProfileAxiosResponseType>(`/api/members/${memberId}/profiles`, swrGetFetcher);

  return {
    userProfileData: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useUserProfile;
