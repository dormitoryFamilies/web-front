import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import {
  BoardSortType,
  BoardStatusType,
  BoardType,
  ResponseAxiosArticleType,
} from "@/types/board/type";

const getKey = (
  size: number,
  previousPageData: ResponseAxiosArticleType | null,
  boardType: BoardType,
  sortType: BoardSortType,
  statusType: BoardStatusType,
) => {
  if (size === 0) {
    return `/api/dormitories/본관/board-types/${boardType}/articles?page=${size}&size=6&sort=${sortType}${statusType === "전체" ? "" : `&status=${statusType}`}`;
  }
  if (previousPageData && !previousPageData.data.data.isLast) {
    return `/api/dormitories/본관/board-types/${boardType}/articles?page=${size}&size=6&sort=${sortType}${statusType === "전체" ? "" : `&status=${statusType}`}`;
  }
  if (previousPageData && previousPageData.data.data.isLast) {
    return null;
  }
};

const useBoardArticles = (boardType: BoardType, sortType: BoardSortType, statusType: BoardStatusType) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<ResponseAxiosArticleType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, boardType, sortType, statusType),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((article) => article).flat() : null;

  return {
    boardArticles: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    boardArticlesSize: size,
    setBoardArticlesSize: setSize,
  };
};
export default useBoardArticles;
