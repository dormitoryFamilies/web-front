import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { AxiosResponseUnreadChattingTotalCountType } from "@/types/chat/page";

const useUnreadChattingTotalCount = () => {
  const { data, error } = useSWR<AxiosResponseUnreadChattingTotalCountType>(`/api/chats/rooms/unread`, swrGetFetcher);

  return {
    unreadChattingTotalCount: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useUnreadChattingTotalCount;
