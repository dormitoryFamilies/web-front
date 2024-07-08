import useSWR from "swr";

import { swrGetFetcher } from "@/lib/axios";
import { MyProfileResponseType } from "@/types/mypage/type";

const useMyProfile = () => {
  const { data, error } = useSWR<MyProfileResponseType>("/my/profile", swrGetFetcher);

  return {
    myProfileData: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useMyProfile;
