import { client } from "@/lib/axios";
export const getSearchFollowers = async (searchValue: string) => {
  try {
    const response = await client.get(`/members/followers/search?q=${searchValue}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
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
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("팔로잉 검색 결과:", error);
  }
};
