import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { FollowingAxiosResponseType } from "@/types/mypage/type";

const useMyFollowings = (pageNumber: number) => {
  const { data, error, mutate } = useSWR<FollowingAxiosResponseType>(
    `/api/members/followings?page=${pageNumber}&size=4`,
    swrGetFetcher,
  );

  return {
    followings: data ? data.data : null,
    isLoading: !error && !data,
    myFollowingsMutate: mutate,
    isError: error,
  };
};
export default useMyFollowings;
