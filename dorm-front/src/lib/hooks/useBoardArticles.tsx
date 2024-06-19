import { AxiosResponse } from "axios";
import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { ArticleType, BoardSortType, BoardStatusType, BoardType, ResponseArticleType } from "@/types/board/type";

const getKey = (
  size: number,
  previousPageData: ResponseArticleType,
  boardType: BoardType,
  sortType: BoardSortType,
  statusType: BoardStatusType,
) => {
  if (size === 0) {
    return `/dormitories/본관/board-type/${boardType}/articles?page=${size}&size=6&sort=${sortType}&status=${statusType}`;
  }
  if (previousPageData && !previousPageData.data.isLast) {
    return `/dormitories/본관/board-type/${boardType}/articles?page=${size}&size=6&sort=${sortType}&status=${statusType}`;
  }
  if (previousPageData.data.isLast) {
    return null;
  }
};

const useBoardArticles = (boardType: BoardType, sortType: BoardSortType, statusType: BoardStatusType) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<AxiosResponse<ResponseArticleType>>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, boardType, sortType, statusType),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((article: ArticleType) => article).flat() : null;

  return {
    boardArticles: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    boardArticlesSize: size,
    setBoardArticlesSize: setSize,
  };
};
export default useBoardArticles;
