import { AxiosResponse } from "axios";
import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { ArticleType, BoardSortType, BoardStatusType, ResponseArticleType } from "@/types/board/type";

const getKey = (size: number, previousPageData: ResponseArticleType,  sortType: BoardSortType, statusType: BoardStatusType) => {
  if (size === 0) {
    return `/dormitories/본관/articles?page=${size}&size=6&sort=${sortType}&status=${statusType}`;
  }
  if (previousPageData && !previousPageData.data.isLast) {
    return `/dormitories/본관/articles?page=${size}&size=6&sort=${sortType}&status=${statusType}`;
  }
  if (previousPageData.data.isLast) {
    return null;
  }
};

const useAllArticles = (sortType: BoardSortType, statusType: BoardStatusType) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<AxiosResponse<ResponseArticleType>>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, sortType, statusType),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((article: ArticleType) => article).flat() : null;

  return {
    allArticles: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    allArticlesSize: size,
    setAllArticlesSize: setSize,
  };
};
export default useAllArticles;
