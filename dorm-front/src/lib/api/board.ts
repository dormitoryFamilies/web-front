import { client } from "@/lib/axios";
import { ArticlePostType } from "@/types/board/type";

export const postArticle = async (data: ArticlePostType) => {
  try {
    const response = await client.post("/articles", data, {
      headers: {
        "Content-type": "application/json",
        "Authorization":
          "Bearer eyJraWQiOiJrZXkzIiwiYWxnIjoiSFMzODQifQ.eyJzdWIiOiJoc2tlMzYwMkBkYXVtLm5ldCIsImlhdCI6MTcxODc5NzUxNiwiZXhwIjoxNzE5Mzk3NTE2fQ.QTpxpgBo6RR-jGM7paak8nxaO1vDVlUR7TjpQiHioKaUDi2KVHjoA6g2vGfi7gpc",
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};
