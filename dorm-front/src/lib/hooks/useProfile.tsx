import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { ProfileType, ResponseProfileType } from "@/types/global";

const useProfile = (memberId: number) => {
  const { data, error } = useSWR<ResponseProfileType>(`/members/${memberId}`, swrGetFetcher);

  return {
    profileData: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useProfile;
