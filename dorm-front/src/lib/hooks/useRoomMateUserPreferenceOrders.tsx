import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { PreferenceOrdersAxiosResponseType } from "@/types/room-mate/type";

const useRoomMateUserPreferenceOrders = (memberId: string | string[] | number | undefined) => {
  const { data, error } = useSWR<PreferenceOrdersAxiosResponseType>(
    `/api/members/${memberId}/preference-orders`,
    swrGetFetcher,
  );

  return {
    preferenceOrders: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useRoomMateUserPreferenceOrders;
