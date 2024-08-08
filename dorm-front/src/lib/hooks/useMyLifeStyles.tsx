import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { LifeStyleResponseType } from "@/types/room-mate/type";

const useMyLifeStyles = (pageNumber: number) => {
  const { data, error, mutate } = useSWR<LifeStyleResponseType>(
    `/my/lifestyle`,
    swrGetFetcher,
  );

  return {
    myLifeStyles: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useMyLifeStyles;
