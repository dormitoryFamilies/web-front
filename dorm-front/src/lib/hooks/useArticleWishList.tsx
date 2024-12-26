import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { ResponseAxiosArticleWishType } from "@/types/board/type";

const useArticleWishList = (articleId: string | string[]) => {
  const { data, error, mutate } = useSWR<ResponseAxiosArticleWishType>(
    `/api/articles/${articleId}/wish-members`,
    swrGetFetcher,
  );

  return {
    articleWishList: data ? data : null,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};
export default useArticleWishList;
