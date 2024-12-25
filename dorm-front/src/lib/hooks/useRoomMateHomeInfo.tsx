import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { RoomMateHomeInfoAxiosResponseType, RoomMateWishStatusAxiosResponseType } from "@/types/room-mate/type";

const useRoomMateHomeInfo = () => {
  const { data, error, mutate } = useSWR<RoomMateHomeInfoAxiosResponseType>(
    `/api/my/matching-requests/count`,
    swrGetFetcher,
  );

  return {
    homeInfo: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};
export default useRoomMateHomeInfo;
