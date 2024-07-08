import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { FollowResponseType } from "@/types/mypage/type";

const useMyFollowings = (pageNumber: number) => {
  const { data, error, mutate } = useSWR<FollowResponseType>(
    `/members/followings?page=${pageNumber}&size=5`,
    swrGetFetcher,
  );

  return {
    followings: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useMyFollowings;
