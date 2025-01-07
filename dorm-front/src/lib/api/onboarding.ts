import axios from "axios";
import Cookies from "js-cookie";

import { sendRequest } from "@/lib/axios";
import { ProfileSettingType } from "@/types/global";

export const getKaKaoAccessToken = async (code: string | null) => {
  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_REST_API_KEY,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        code: code,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      },
    );
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("카카오 엑세스토큰 가져오는데 에러 발생:", error);
  }
};

export const getJWTToken = async (accessToken: string) => {
  try {
    const response = await sendRequest({
      method: "POST",
      data: { accessToken: accessToken },
      url: "/api/login",
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("JWT 에러 발생:", error);
  }
};

export const getUserRole = async () => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "GET",
      url: "/api/members/me/authorities",
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("User Role 에러:", error);
  }
};

export const getSearchDuplicateNickName = async (searchValue: string) => {
  const response = await sendRequest({
    headers: {
      AccessToken: `Bearer ${Cookies.get("accessToken")}`,
    },
    method: "GET",
    url: `/api/members/check?nickname=${searchValue}`,
  });
  console.log(response.data);
  return response.data;
};

export const putProfileInitialData = async (data: ProfileSettingType) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "PUT",
      data: data,
      url: `/api/members/initial-profiles`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("프로필 처음 설정시 에러:", error);
  }
};

/**
 * 회원가입 관리자 멤버 승인
 */
export const putMemberApproval = async (memberId: number) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "PUT",
      url: `/api/verify/members/${memberId}/approvals`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("프로필 처음 설정시 에러:", error);
  }
};

/**
 * 회원가입 관리자 멤버 거절
 */
export const putMemberRejection = async (memberId: number) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "PUT",
      url: `/api/verify/members/${memberId}/rejections`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("프로필 처음 설정시 에러:", error);
  }
};
