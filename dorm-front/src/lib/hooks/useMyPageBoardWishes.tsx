import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { ArticleType, BoardSortType, BoardStatusType, BoardType, ResponseArticleType } from "@/types/board/type";
import { DormitoryType } from "@/types/mypage/type";

const getKey = (
  size: number,
  previousPageData: ResponseArticleType,
  dormitoryType: DormitoryType,
  sortType: BoardSortType,
  statusType: BoardStatusType,
) => {
  if (size === 0) {
    return `/my/dormitories/${dormitoryType}/wishes?page=${size}&size=6&sort=${sortType}${statusType === "전체" ? "" : `&status=${statusType}`}`;
  }
  if (previousPageData && !previousPageData.data.isLast) {
    return `/my/dormitories/${dormitoryType}/wishes?page=${size}&size=6&sort=${sortType}${statusType === "전체" ? "" : `&status=${statusType}`}`;
  }
  if (previousPageData.data.isLast) {
    return null;
  }
};

const useMyPageBoardWishes = (dormitoryType: DormitoryType, sortType: BoardSortType, statusType: BoardStatusType) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<ResponseArticleType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, dormitoryType, sortType, statusType),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((article: ArticleType) => article).flat() : null;

  return {
    wishPosts: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    wishPostSize: size,
    setWishPostSize: setSize,
  };
};
export default useMyPageBoardWishes;
