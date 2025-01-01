import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { RecommendResultProfileAxiosResponseType, RecommendResultProfileResponseType } from "@/types/room-mate/type";

const useMyRoomMateProfile = () => {
  const { data, error } = useSWR<RecommendResultProfileAxiosResponseType>(`/api/my/matchings/profiles`, swrGetFetcher);

  return {
    myRoomMateProfile: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useMyRoomMateProfile;
