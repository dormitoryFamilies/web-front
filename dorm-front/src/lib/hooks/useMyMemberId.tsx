import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { MyMemberIdAxiosResponseType } from "@/types/global";

const useUserProfile = () => {
  const { data, error } = useSWR<MyMemberIdAxiosResponseType>(`/api/members/me`, swrGetFetcher);

  return {
    myMemberId: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useUserProfile;
