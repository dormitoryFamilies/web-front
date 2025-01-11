import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { LoginUserIdAxiosResponseType } from "@/types/global";

const useLoginUserId = () => {
  const { data, error } = useSWR<LoginUserIdAxiosResponseType>(`/api/members/me`, swrGetFetcher);

  return {
    loginUserId: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useLoginUserId;
