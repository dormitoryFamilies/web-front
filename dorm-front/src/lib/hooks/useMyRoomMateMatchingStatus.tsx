import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { MyRoomMateMatchingStatusAxiosResponseType, RecommendResultProfileResponseType } from "@/types/room-mate/type";

const useMyRoomMateMatchingStatus = () => {
  const { data, error } = useSWR<MyRoomMateMatchingStatusAxiosResponseType>(`/api/my/matching-status`, swrGetFetcher);

  return {
    myRoomMateProfile: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useMyRoomMateMatchingStatus;
