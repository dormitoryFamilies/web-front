import { client } from "@/lib/axios";
import { LifeStylePostType } from "@/types/room-mate/type";

export const postLifestyles = async (data: LifeStylePostType) => {
  try {
    const response = await client.post("/my/lifestyles", data, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("lifestyle 설정 post 에러 발생:", error);
  }
};
