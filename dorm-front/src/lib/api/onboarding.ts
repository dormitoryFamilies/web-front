import axios from "axios";

import { client, sendRequest } from "@/lib/axios";
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

export const getSearchDuplicateNickName = async (searchValue: string) => {
  try {
    const response = await client.get(`/members/check?nickname=${searchValue}`, {
      headers: {
        "Content-type": "application/json",
        AccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("nickname 검색 에러 발생", error);
  }
};

export const putProfileData = async (data: ProfileSettingType) => {
  try {
    const response = await client.put(`/api/members/initial-profiles`, data, {
      headers: {
        "Content-type": "application/json",
        AccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("put 설정 에러", error);
  }
};
