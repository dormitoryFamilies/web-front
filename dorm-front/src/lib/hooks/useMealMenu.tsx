import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { DormType, MealMenuAxiosResponseType } from "@/types/home/type";

const useMealMenu = (dormType: string) => {
  const { data, error } = useSWR<MealMenuAxiosResponseType>(`/api/menus?dormType=${dormType}`, swrGetFetcher);

  return {
    mealMenu: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useMealMenu;
