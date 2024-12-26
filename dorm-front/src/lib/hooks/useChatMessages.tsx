import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { ChatRoomMessagesAxiosResponseType } from "@/types/chat/page";

const useChatMessages = (roomId: string | string[]) => {
  const { data, error, mutate } = useSWR<ChatRoomMessagesAxiosResponseType>(
    `/api/chats/rooms/${roomId}?size=8&page=0`,
    swrGetFetcher,
  );

  return {
    chatMessages: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};
export default useChatMessages;
