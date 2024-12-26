import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { MatchingRequestsAxiosResponseType } from "@/types/room-mate/type";

const getKey = (
  status: string,
  pageIndex: number,
  previousPageData: MatchingRequestsAxiosResponseType | null,
  pageNumber: number,
) => {
  if (pageIndex === 0) {
    return `/api/my/matching-requests?status=${status}&page=${pageNumber}&size=4`;
  }
  if (previousPageData && !previousPageData.data.data.isLast) {
    return `/api/my/matching-requests?status=${status}&page=${pageNumber}&size=4`;
  }
  if (previousPageData && previousPageData.data.data.isLast) {
    return null;
  }
};

const useMatchingRequests = (status: string, pageNumber: number) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<MatchingRequestsAxiosResponseType>(
    (pageIndex, previousPageData) => getKey(status, pageIndex, previousPageData, pageNumber),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((matchingRequest) => matchingRequest).flat() : null;

  return {
    matchingRequests: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    matchingRequestSize: size,
    setMatchingRequestSize: setSize,
    mutate: mutate,
  };
};
export default useMatchingRequests;
