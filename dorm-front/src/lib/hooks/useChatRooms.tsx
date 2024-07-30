import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { ResponseChatRoomsType } from "@/types/chat/page";

const useChatRooms = () => {
  const { data, error } = useSWR<ResponseChatRoomsType>(`/chats/rooms?page=0&size=10`, swrGetFetcher);

  return {
    chatRooms: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useChatRooms;
