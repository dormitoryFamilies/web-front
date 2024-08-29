import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { RecommendResultResponseType } from "@/types/room-mate/type";

const useRoomMateRecommendResult = () => {
  const { data, error } = useSWR<RecommendResultResponseType>(`/matchings/recommendations`, swrGetFetcher);

  return {
    recommendations: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useRoomMateRecommendResult;
