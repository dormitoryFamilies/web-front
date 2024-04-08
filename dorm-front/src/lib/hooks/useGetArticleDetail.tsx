import { AxiosResponse } from "axios";

import { swrGetFetcher } from "@/lib/axios";
import { ArticleType, ResponseArticleDetailType, ResponseArticleType } from "@/types/board/type";
import useSWR from "swr";

const useGetArticleDetail = (parameter: number) => {
  const { data, error } = useSWR<AxiosResponse<ResponseArticleDetailType>>(`/api/articles/${parameter}`, swrGetFetcher);

  return {
    articleDetail: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetArticleDetail;
