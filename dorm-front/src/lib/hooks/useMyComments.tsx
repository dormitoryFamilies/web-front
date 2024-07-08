import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { ArticleType, BoardSortType, BoardStatusType, BoardType, ResponseArticleType } from "@/types/board/type";
import { DormitoryType } from "@/types/mypage/type";

const getKey = (
  size: number,
  previousPageData: ResponseArticleType,
  dormitoryType: DormitoryType,
  boardType: BoardType,
  sortType: BoardSortType,
  statusType: BoardStatusType,
) => {
  if (size === 0) {
    return `/my/dormitories/${dormitoryType}/board-types/${boardType === "전체" ? "all" : boardType}/comments?page=${size}&size=6&sort=${sortType}${statusType === "전체" ? "" : `&status=${statusType}`}`;
  }
  if (previousPageData && !previousPageData.data.isLast) {
    return `/my/dormitories/${dormitoryType}/board-types/${boardType === "전체" ? "all" : boardType}/comments?page=${size}&size=6&sort=${sortType}${statusType === "전체" ? "" : `&status=${statusType}`}`;
  }
  if (previousPageData.data.isLast) {
    return null;
  }
};

const useMyComments = (
  dormitoryType: DormitoryType,
  boardType: BoardType,
  sortType: BoardSortType,
  statusType: BoardStatusType,
) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<ResponseArticleType>(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, dormitoryType, boardType, sortType, statusType),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((article: ArticleType) => article).flat() : null;

  return {
    myCommentPosts: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    myCommentPostSize: size,
    setMyCommentPostSize: setSize,
  };
};
export default useMyComments;
