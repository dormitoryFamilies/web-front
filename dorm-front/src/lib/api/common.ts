import Cookies from "js-cookie";

import { sendRequest } from "@/lib/axios";

export const postFollow = async (memberId: number | undefined) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "POST",
      url: `/api/members/${memberId}/follows`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("팔로우 post 에러 발생:", error);
  }
};

export const deleteFollowing = async (memberId: number | undefined) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "DELETE",
      url: `/api/members/${memberId}/followings`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("팔로우 delete 에러 발생:", error);
  }
};

export const logout = async () => {
  try {
    const response = await sendRequest({
      headers: {
        RefreshToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "POST",
      url: `/api/logout`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("로그아웃시 에러 발생:", error);
  }
};
