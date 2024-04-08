import { client } from "@/lib/axios";
import { ArticlePostType } from "@/types/board/type";

export const postArticle = async (data: ArticlePostType) => {
  try {
    const response = await client.post("/articles", data, {
      headers: {
        "Content-type": "application/json",
        "Authorization":
          "Bearer eyJraWQiOiJrZXkzIiwiYWxnIjoiSFMzODQifQ.eyJzdWIiOiJoc2tlMzYwMkBkYXVtLm5ldCIsImlhdCI6MTcxMTQ2NzY4OSwiZXhwIjoxNzEyMDY3Njg5fQ.PIOQXHT9_DRT0Cb51xsJRqefF553zsGVycQc6E-wgY9MoVotFU575mWIh4Xbonan"
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("에러 발생:", error);
  }
};
