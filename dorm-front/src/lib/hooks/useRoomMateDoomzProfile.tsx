import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { RoomMateDoomzProfileAxiosResponseType } from "@/types/room-mate/type";

const useRoomMateDoomzProfile = (memberId: string | string[] | number) => {
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
