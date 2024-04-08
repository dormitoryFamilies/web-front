import { AxiosResponse } from "axios";

import { swrGetFetcher } from "@/lib/axios";
import { ResponseArticleDetailAllCommentsType } from "@/types/board/type";
import useSWR from "swr";

const useGetArticleDetail = (parameter: number) => {
  const { data, error } = useSWR<AxiosResponse<ResponseArticleDetailAllCommentsType>>(
    `/api/articles/${parameter}/comments`,
    swrGetFetcher,
  );

  return {
    articleDetailComments: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetArticleDetail;
