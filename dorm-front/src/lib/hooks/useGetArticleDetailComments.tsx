import { AxiosResponse } from "axios";
import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { ResponseArticleDetailAllCommentsType } from "@/types/board/type";

const useGetArticleDetail = (parameter: string | string[]) => {
  const { data, error, mutate } = useSWR<AxiosResponse<ResponseArticleDetailAllCommentsType>>(
    `/articles/${parameter}/comments`,
    swrGetFetcher,
  );

  return {
    articleDetailComments: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
    commentMutate: mutate,
  };
};
export default useGetArticleDetail;
