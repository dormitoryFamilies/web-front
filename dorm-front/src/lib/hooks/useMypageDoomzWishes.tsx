import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { DoomzWishAxiosResponseType } from "@/types/mypage/type";

const getKey = (size: number, previousPageData: DoomzWishAxiosResponseType | null) => {
  if (size === 0) {
    return `/api/my/roommate-wishes?page=${size}&size=10`;
  }
  if (previousPageData && !previousPageData.data.data.isLast) {
    return `/api/my/roommate-wishes?page=${size}&size=10`;
  }
  if (previousPageData && previousPageData.data.data.isLast) {
    return null;
  }
};

const useMypageDoomzWishes = () => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<DoomzWishAxiosResponseType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((article) => article).flat() : null;

  return {
    wishDoomz: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    wishDoomzSize: size,
    setwishDoomzSize: setSize,
  };
};
export default useMypageDoomzWishes;
