import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { ResponseAxiosArticleDetailAllCommentsType } from "@/types/board/type";

const useGetArticleDetail = (parameter: string | string[]) => {
  const { data, error, mutate } = useSWR<ResponseAxiosArticleDetailAllCommentsType>(
    `/api/articles/${parameter}/comments`,
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
