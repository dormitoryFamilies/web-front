import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { RecommendResultProfileAxiosResponseType, RecommendResultProfileResponseType } from "@/types/room-mate/type";

const useRoomMateRecommendResultProfile = (memberId: string | string[] | number | undefined) => {
  const { data, error } = useSWR<RecommendResultProfileAxiosResponseType>(
    `/api/matchings/members/${memberId}/profiles`,
    swrGetFetcher,
  );

  return {
    recommendRoomMateProfile: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useRoomMateRecommendResultProfile;
