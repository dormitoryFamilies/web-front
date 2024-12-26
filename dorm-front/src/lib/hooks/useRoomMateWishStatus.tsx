import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { RoomMateWishStatusAxiosResponseType } from "@/types/room-mate/type";

const useRoomMateWishStatus = (memberId: string | string[] | number | undefined) => {
  const { data, error, mutate } = useSWR<RoomMateWishStatusAxiosResponseType>(
    `/api/members/${memberId}/roommate-wishes`,
    swrGetFetcher,
  );

  return {
    wishStatus: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
    wishStatusMutate: mutate,
  };
};
export default useRoomMateWishStatus;
