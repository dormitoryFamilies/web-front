import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { ResponseProfileType } from "@/types/global";

const useUserProfile = (memberId: number | string | string[]) => {
  const { data, error } = useSWR<ResponseProfileType>(`/members/${memberId}`, swrGetFetcher);

  return {
    userProfileData: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useUserProfile;
