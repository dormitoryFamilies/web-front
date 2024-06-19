import { AxiosResponse } from "axios";
import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { ArticleType, ResponseArticleDetailType, ResponseArticleType } from "@/types/board/type";

const useGetArticleDetail = (parameter: string | string[]) => {
  const { data, error, mutate } = useSWR<AxiosResponse<ResponseArticleDetailType>>(`/articles/${parameter}`, swrGetFetcher);

  return {
    articleDetail: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
    articleMutate: mutate,
  };
};
export default useGetArticleDetail;
