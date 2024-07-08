import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { FollowResponseType } from "@/types/mypage/type";

const useMyFollowers = (pageNumber: number) => {
  const { data, error, mutate } = useSWR<FollowResponseType>(
    `/members/followers?page=${pageNumber}&size=10`,
    swrGetFetcher,
  );

  return {
    followers: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useMyFollowers;
