import { client } from "@/lib/axios";
import { ArticlePostType, PostCommentType } from "@/types/board/type";

export const postArticle = async (data: ArticlePostType) => {
  try {
    const response = await client.post("/articles", data, {
      headers: {
        "Content-type": "application/json",
        "Authorization":
          "Bearer eyJraWQiOiJrZXkzIiwiYWxnIjoiSFMzODQifQ.eyJzdWIiOiJoc2tlMzYwMkBkYXVtLm5ldCIsImlhdCI6MTcxODgyNjg1NSwiZXhwIjoxNzE5NDI2ODU1fQ.e6t5Jfkf5e_T9-bqp5VIl0KrMe9bYy4flh5nAe8dbcuztXUrr91I0T5w9D_kqGPO",
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
          "Bearer eyJraWQiOiJrZXkzIiwiYWxnIjoiSFMzODQifQ.eyJzdWIiOiJoc2tlMzYwMkBkYXVtLm5ldCIsImlhdCI6MTcxODgyNjg1NSwiZXhwIjoxNzE5NDI2ODU1fQ.e6t5Jfkf5e_T9-bqp5VIl0KrMe9bYy4flh5nAe8dbcuztXUrr91I0T5w9D_kqGPO",
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};

export const postArticleWish = async (articleId: string | string[]) => {
  try {
    const response = await client.post(`/articles/${articleId}/wishes`, {
      headers: {
        "Content-type": "application/json",
        "Authorization":
          "Bearer eyJraWQiOiJrZXkzIiwiYWxnIjoiSFMzODQifQ.eyJzdWIiOiJoc2tlMzYwMkBkYXVtLm5ldCIsImlhdCI6MTcxODgyNjg1NSwiZXhwIjoxNzE5NDI2ODU1fQ.e6t5Jfkf5e_T9-bqp5VIl0KrMe9bYy4flh5nAe8dbcuztXUrr91I0T5w9D_kqGPO",
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};

export const deleteArticleWish = async (articleId: string | string[]) => {
  try {
    const response = await client.delete(`/articles/${articleId}/wishes`, {
      headers: {
        "Content-type": "application/json",
        "Authorization":
          "Bearer eyJraWQiOiJrZXkzIiwiYWxnIjoiSFMzODQifQ.eyJzdWIiOiJoc2tlMzYwMkBkYXVtLm5ldCIsImlhdCI6MTcxODgyNjg1NSwiZXhwIjoxNzE5NDI2ODU1fQ.e6t5Jfkf5e_T9-bqp5VIl0KrMe9bYy4flh5nAe8dbcuztXUrr91I0T5w9D_kqGPO",
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};

