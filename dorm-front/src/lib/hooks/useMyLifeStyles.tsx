import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { LifeStyleResponseType } from "@/types/room-mate/type";

const useMyLifeStyles = () => {
  const { data, error, mutate } = useSWR<LifeStyleResponseType>(`/my/lifestyles`, swrGetFetcher);

  return {
    myLifeStyles: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useMyLifeStyles;
