//TODO: 안읽은 채팅 전체 갯수
import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { ResponseUnreadChattingTotalCountType } from "@/types/chat/page";

const useUnreadChattingTotalCount = () => {
  const { data, error } = useSWR<ResponseUnreadChattingTotalCountType>(`/chats/rooms/unread`, swrGetFetcher);

  return {
    unreadChattingTotalCount: data ? data.data.totalCount : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useUnreadChattingTotalCount;
