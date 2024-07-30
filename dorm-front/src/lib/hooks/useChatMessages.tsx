import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { ResponseChatRoomMessagesType } from "@/types/chat/page";

const useChatMessages = (roomId: string | string[]) => {
  const { data, error, mutate } = useSWR<ResponseChatRoomMessagesType>(`/chats/rooms/${roomId}`, swrGetFetcher);

  return {
    chatMessages: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};
export default useChatMessages;
