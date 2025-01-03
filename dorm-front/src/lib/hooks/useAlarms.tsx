import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { AlarmResponseAxiosType } from "@/types/alarm/type";

const getKey = (size: number, previousPageData: AlarmResponseAxiosType | null) => {
  if (size === 0) {
    return `/api/notifications?page=${size}&size=10`;
  }
  if (previousPageData && !previousPageData.data.data.isLast) {
    return `/api/notifications?page=${size}&size=10`;
  }
  if (previousPageData && previousPageData.data.data.isLast) {
    return null;
  }
};

const useAlarms = () => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<AlarmResponseAxiosType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((article) => article).flat() : null;

  return {
    alarms: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    alarmSize: size,
    setAlarmSize: setSize,
  };
};
export default useAlarms;
