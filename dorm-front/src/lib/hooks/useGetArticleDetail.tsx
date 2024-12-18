import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import {
  ResponseAxiosArticleDetailType,
} from "@/types/board/type";

const useGetArticleDetail = (parameter: string | string[] | number) => {
  const { data, error, mutate } = useSWR<ResponseAxiosArticleDetailType>(`/api/articles/${parameter}`, swrGetFetcher);

  return {
    articleDetail: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
    articleMutate: mutate,
  };
};
export default useGetArticleDetail;
