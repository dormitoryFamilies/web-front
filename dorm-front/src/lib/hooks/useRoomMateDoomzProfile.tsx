import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { RecommendResultProfileResponseType, RoomMateDoomzProfileAxiosResponseType } from "@/types/room-mate/type";

const useRoomMateDoomzProfile = (memberId: number) => {
  const { data, error } = useSWR<RoomMateDoomzProfileAxiosResponseType>(
    `/api/members/${memberId}/lifestyles`,
    swrGetFetcher,
  );

  return {
    doomzProfile: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useRoomMateDoomzProfile;
