import { client } from "@/lib/axios";

//팔로우 post
export const postFollow = async (memberId: number | undefined) => {
  try {
    const response = await client.post(`/members/${memberId}/follows`, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};
