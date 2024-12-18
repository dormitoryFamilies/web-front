import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { AllDoomzListAxiosResponseType } from "@/types/room-mate/type";

const getKey = (pageIndex: number, previousPageData: AllDoomzListAxiosResponseType | null, pageNumber: number) => {
  if (pageIndex === 0) {
    return `/api/matchings/members?page=${pageNumber}&size=5`;
  }
  if (previousPageData && !previousPageData.data.data.isLast) {
    return `/api/matchings/members?page=${pageNumber}&size=10`;
  }
  if (previousPageData && previousPageData.data.data.isLast) {
    return null;
  }
};

const useRoomMateAllDoomzList = (pageNumber: number) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<AllDoomzListAxiosResponseType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, pageNumber),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((article) => article).flat() : null;

  return {
    allDoomzList: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    allDoomzListSize: size,
    setAllDoomzListSize: setSize,
    mutate: mutate,
  };
};
export default useRoomMateAllDoomzList;
