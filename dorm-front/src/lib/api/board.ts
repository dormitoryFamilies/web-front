import { client } from "@/lib/axios";
import { ArticlePostType } from "@/types/board/type";

export const postArticle = async (data: ArticlePostType) => {
  try {
    const response = await client.post("/articles", data, {
      headers: {
        "Content-type": "application/json",
        "Authorization":
          "Bearer eyJraWQiOiJrZXkxIiwiYWxnIjoiSFMzODQifQ.eyJzdWIiOiJoc2tlMzYwMkBkYXVtLm5ldCIsImlhdCI6MTcxODgwMTgyNSwiZXhwIjoxNzE5NDAxODI1fQ.HqPBDzXW9E71urpeMTMGJf5Hu7xej0W8A65v9x0pkLj0-pQ9OoGKrTylQrhHOyHA",
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};

export const postArticleImage = async (formData: FormData) => {
  try {
    const response = await client.post("/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization":
          "Bearer eyJraWQiOiJrZXkxIiwiYWxnIjoiSFMzODQifQ.eyJzdWIiOiJoc2tlMzYwMkBkYXVtLm5ldCIsImlhdCI6MTcxODgwMTgyNSwiZXhwIjoxNzE5NDAxODI1fQ.HqPBDzXW9E71urpeMTMGJf5Hu7xej0W8A65v9x0pkLj0-pQ9OoGKrTylQrhHOyHA",
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};
