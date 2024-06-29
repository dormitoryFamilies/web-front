import { client } from "@/lib/axios";
import { ArticlePostType, PostCommentType } from "@/types/board/type";

export const postArticle = async (data: ArticlePostType) => {
  try {
    const response = await client.post("/articles", data, {
      headers: {
        "Content-type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};

export const putArticle = async (data: ArticlePostType, articleId: string | string[]) => {
  try {
    const response = await client.put(`/articles/${articleId}`, data, {
      headers: {
        "Content-type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 put 에러 발생:", error);
  }
};

export const deleteArticle = async (articleId: string | string[]) => {
  try {
    const response = await client.delete(`/articles/${articleId}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
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
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};

export const deleteArticleImage = async (formData: FormData) => {
  try {
    const response = await client.delete("/images", {
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was a problem with your axios operation:", error);
  }
};

//모집중 모집완료
export const putArticleStatus = async (articleId: string | string[], formData: FormData) => {
  try {
    const response = await client.put(`/articles/${articleId}/status`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
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
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
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
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};

export const postArticleComment = async (articleId: string | string[], data: PostCommentType) => {
  try {
    const response = await client.post(`/articles/${articleId}/comments`, data, {
      headers: {
        "Content-type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};

export const deleteArticleComment = async (commentId: number) => {
  try {
    const response = await client.delete(`/comments/${commentId}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};

export const postArticleReplyComments = async (commentId: number, data: PostCommentType) => {
  try {
    const response = await client.post(`/comments/${commentId}/reply-comments`, data, {
      headers: {
        "Content-type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};

export const deleteArticleReplyComment = async (replyCommentId: number) => {
  try {
    const response = await client.delete(`/reply-comments/${replyCommentId}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 post 에러 발생:", error);
  }
};
