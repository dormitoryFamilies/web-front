import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { ArticleType, ResponseArticleWishListType } from "@/types/board/type";

const useArticleWishList = (articleId: string | string[]) => {
  const { data, error } = useSWR<ResponseArticleWishListType>(`/articles/${articleId}/wishes`, swrGetFetcher);

  const parseResultList = data ? data.data.members.map((article) => article).flat() : null;

  return {
    articleWishList: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useArticleWishList;
