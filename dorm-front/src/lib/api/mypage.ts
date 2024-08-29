import { client } from "@/lib/axios";
import { EditMyProfileType } from "@/types/mypage/type";
import { LifeStylePostType } from "@/types/room-mate/type";
export const getSearchFollowers = async (searchValue: string) => {
  try {
    const response = await client.get(`/members/followers/search?q=${searchValue}`, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("팔로워 검색 결과:", error);
  }
};
export const getSearchFollowings = async (searchValue: string) => {
  try {
    const response = await client.get(`/members/followings/search?q=${searchValue}`, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("팔로잉 검색 결과:", error);
  }
};
export const putProfileData = async (profileData: EditMyProfileType) => {
  try {
    const response = await client.put(`/my/profile`, profileData, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("나의 정보 수정 에러", error);
  }
};

export const patchLifestyles = async (data: LifeStylePostType) => {
  try {
    const response = await client.patch("/my/lifestyles", data, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("lifestyle patch 에러 발생:", error);
  }
};
