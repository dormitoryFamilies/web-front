import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { BoardSortType, BoardStatusType, ResponseAxiosArticleType } from "@/types/board/type";

const getKey = (
  size: number,
  previousPageData: ResponseAxiosArticleType | null,
  sortType: BoardSortType,
  statusType: BoardStatusType,
) => {
  if (size === 0) {
    return `/api/dormitories/본관/articles?page=${size}&size=6&sort=${sortType}${statusType === "전체" ? "" : `&status=${statusType}`}`;
  }
  if (previousPageData && !previousPageData.data.data.isLast) {
    return `/api/dormitories/본관/articles?page=${size}&size=6&sort=${sortType}${statusType === "전체" ? "" : `&status=${statusType}`}`;
  }
  if (previousPageData && previousPageData.data.data.isLast) {
    return null;
  }
};

const useAllArticles = (sortType: BoardSortType, statusType: BoardStatusType) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<ResponseAxiosArticleType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, sortType, statusType),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((article) => article).flat() : null;

  return {
    allArticles: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    allArticlesSize: size,
    setAllArticlesSize: setSize,
  };
};
export default useAllArticles;
