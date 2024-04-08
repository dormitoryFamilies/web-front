import { AxiosResponse } from "axios";
import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { ArticleType, ResponseArticleType } from "@/types/board/type";

const getKey = (size: number, previousPageData: ResponseArticleType) => {
  if (size === 0) {
    return `/dormitories/본관/articles?page=${size}&size=6&sort=createdAt&status=모집중`;
  }
  if (previousPageData && !previousPageData.data.isLast) {
    return `/dormitories/본관/articles?page=${size}&size=6&sort=createdAt&status=모집중`;
  }
  if (previousPageData.data.isLast) {
    return null;
  }
};

const useAllArticles = () => {
  const { data, error, size, setSize } = useSWRInfinite<AxiosResponse<ResponseArticleType>>(getKey, swrGetFetcher, {
    revalidateAll: true,
  });

  const parseResultList = data ? data.map((article: ArticleType) => article).flat() : null;

  return {
    articles: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
  };
};
export default useAllArticles;
