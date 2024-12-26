import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { ChatRoomsAxiosResponseType } from "@/types/chat/page";

const getKey = (size: number, previousPageData: ChatRoomsAxiosResponseType | null) => {
  if (size === 0) {
    return `/api/chats/rooms?page=${size}&size=10`;
  }
  if (previousPageData && !previousPageData.data.data.isLast) {
    return `/api/chats/rooms?page=${size}&size=10`;
  }
  if (previousPageData && previousPageData.data.data.isLast) {
    return null;
  }
};

const useChatRooms = () => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<ChatRoomsAxiosResponseType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((article) => article).flat() : null;

  return {
    chatRooms: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    chatRoomsSize: size,
    setChatRoomsSize: setSize,
  };
};
export default useChatRooms;
