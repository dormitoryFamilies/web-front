import { client } from "@/lib/axios";
import { ProfileSettingType } from "@/types/global";

export const getSearchDuplicateNickName = async (searchValue: string) => {
  try {
    const response = await client.get(`/members/check?nickname=${searchValue}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
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
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("put 설정 에러", error);
  }
};
