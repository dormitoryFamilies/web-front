import Cookies from "js-cookie";

import { sendRequest } from "@/lib/axios";
import { EditMyProfileType } from "@/types/mypage/type";

export const getSearchFollowers = async (searchValue: string) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "GET",
      url: `/api/members/followers/search?q=${searchValue}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("팔로워 검색 결과 에러:", error);
  }
};

export const getSearchFollowings = async (searchValue: string) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "GET",
      url: `/api/members/followings/search?q=${searchValue}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("팔로잉 검색 결과 에러:", error);
  }
};

export const putProfileData = async (profileData: EditMyProfileType) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "PUT",
      data: profileData,
      url: `/api/my/profiles`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("나의 정보 수정 에러:", error);
  }
};
