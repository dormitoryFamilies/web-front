import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { RecommendResultProfileResponseType } from "@/types/room-mate/type";

const useRoomMateRecommendResultProfile = (memberId: number) => {
  const { data, error } = useSWR<RecommendResultProfileResponseType>(
    `/matchings/members/${memberId}/profiles`,
    swrGetFetcher,
  );

  return {
    recommendRoomMateProfile: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useRoomMateRecommendResultProfile;
