import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { LifeStyleAxiosResponseType } from "@/types/room-mate/type";

const useMyLifeStyles = () => {
  const { data, error, mutate } = useSWR<LifeStyleAxiosResponseType>(`/api/my/lifestyles`, swrGetFetcher);

  return {
    myLifeStyles: data ? data.data : null,
    isLoading: !error && !data,
    myLifeStylesError: error,
  };
};
export default useMyLifeStyles;
