import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { FollowStatusAxiosResponseType } from "@/types/global";

const useFollowStatus = (memberId: number) => {
  const { data, error } = useSWR<FollowStatusAxiosResponseType>(`api/members/${memberId}/follow-status`, swrGetFetcher);

  return {
    followStatus: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useFollowStatus;
