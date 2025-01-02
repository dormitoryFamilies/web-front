import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { FollowingAxiosResponseType, FollowingResponseType } from "@/types/mypage/type";

const useMyFollowers = (pageNumber: number) => {
  const { data, error } = useSWR<FollowingAxiosResponseType>(
    `/api/members/followers?page=${pageNumber}&size=4`,
    swrGetFetcher,
  );

  return {
    followers: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useMyFollowers;
