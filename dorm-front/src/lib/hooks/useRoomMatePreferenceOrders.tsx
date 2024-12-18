import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { PreferenceOrdersResponseType, RecommendResultResponseType } from "@/types/room-mate/type";

const useRoomMatePreferenceOrders = (memberId: number) => {
  const { data, error } = useSWR<PreferenceOrdersResponseType>(
    `/api/members/${memberId}/preference-orders`,
    swrGetFetcher,
  );

  return {
    preferenceOrders: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useRoomMatePreferenceOrders;
