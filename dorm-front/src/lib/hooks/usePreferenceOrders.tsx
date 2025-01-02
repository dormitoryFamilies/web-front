import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { LifeStylePreferenceOrdersAxiosResponseType } from "@/types/room-mate/type";

const usePreferenceOrders = () => {
  const { data, error } = useSWR<LifeStylePreferenceOrdersAxiosResponseType>(
    "/api/my/preference-orders",
    swrGetFetcher,
  );

  return {
    preferenceOrders: data ? data.data : null,
    isLoading: !error && !data,
    preferenceOrdersError: error,
  };
};
export default usePreferenceOrders;
