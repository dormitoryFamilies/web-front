import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { BoardSortType, BoardStatusType, ResponseAxiosArticleType } from "@/types/board/type";
import { DormitoryType } from "@/types/mypage/type";

const getKey = (
  size: number,
  previousPageData: ResponseAxiosArticleType | null,
  dormitoryType: DormitoryType,
  sortType: BoardSortType,
  statusType: BoardStatusType,
) => {
  if (size === 0) {
    return `/api/my/dormitories/${dormitoryType}/wishes?page=${size}&size=6&sort=${sortType}${statusType === "전체" ? "" : `&status=${statusType}`}`;
  }
  if (previousPageData && !previousPageData.data.data.isLast) {
    return `/api/my/dormitories/${dormitoryType}/wishes?page=${size}&size=6&sort=${sortType}${statusType === "전체" ? "" : `&status=${statusType}`}`;
  }
  if (previousPageData && previousPageData.data.data.isLast) {
    return null;
  }
};

const useMyPageBoardWishes = (dormitoryType: DormitoryType, sortType: BoardSortType, statusType: BoardStatusType) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<ResponseAxiosArticleType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, dormitoryType, sortType, statusType),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((article) => article).flat() : null;

  return {
    wishPosts: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    wishPostSize: size,
    setWishPostSize: setSize,
  };
};
export default useMyPageBoardWishes;
