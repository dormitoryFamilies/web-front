import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { MyProfileAxiosResponseType } from "@/types/mypage/type";

const useMyProfile = () => {
  const { data, error } = useSWR<MyProfileAxiosResponseType>("/api/my/profiles", swrGetFetcher);

  return {
    myProfileData: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useMyProfile;
