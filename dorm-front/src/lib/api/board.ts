import Cookies from "js-cookie";

import { sendRequest } from "@/lib/axios";
import { ArticlePostType, PostCommentType } from "@/types/board/type";

export const postArticle = async (data: ArticlePostType) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "POST",
      data: data,
      url: `/api/articles`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 post 에러 발생:", error);
  }
};

export const putArticle = async (data: ArticlePostType, articleId: string | string[] | number) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "PUT",
      data: data,
      url: `/api/articles/${articleId}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 put 에러 발생:", error);
  }
};

export const deleteArticle = async (articleId: number | string | string[] | undefined) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "DELETE",
      url: `/api/articles/${articleId}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 delete 에러 발생:", error);
  }
};

export const postArticleImage = async (formData: FormData) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-Type": "multipart/form-data",
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "POST",
      data: formData,
      url: `/api/images`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("사진 업로드 에러:", error);
  }
};

export const deleteArticleImage = async (formData: FormData) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-Type": "multipart/form-data",
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "DELETE",
      data: formData,
      url: `/api/images`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("사진 제거 에러:", error);
  }
};

export const putArticleStatus = async (articleId: string | string[] | number | undefined, formData: FormData) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-Type": "multipart/form-data",
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "PUT",
      data: formData,
      url: `/api/articles/${articleId}/status`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 모집중 상태변경 에러 발생:", error);
  }
};

export const postArticleWish = async (articleId: string | number | string[] | undefined) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "POST",
      url: `/api/articles/${articleId}/wishes`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 put 에러 발생:", error);
  }
};

export const deleteArticleWish = async (articleId: string | number | string[] | undefined) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "DELETE",
      url: `/api/articles/${articleId}/wishes`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 wish 삭제 에러 발생:", error);
  }
};

export const postArticleComment = async (articleId: string | string[], data: PostCommentType) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "POST",
      data: data,
      url: `/api/articles/${articleId}/comments`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 댓글 생성 에러 발생:", error);
  }
};

export const deleteArticleComment = async (commentId: number) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "DELETE",
      url: `/api/comments/${commentId}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 댓글 삭제 에러 발생:", error);
  }
};

export const postArticleReplyComments = async (commentId: number, data: PostCommentType) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "POST",
      data: data,
      url: `/api/comments/${commentId}/reply-comments`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 대댓글 생성 에러 발생:", error);
  }
};

export const deleteArticleReplyComment = async (replyCommentId: number) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "DELETE",
      url: `/api/reply-comments/${replyCommentId}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 대댓글 삭제 에러 발생:", error);
  }
};

//////////////////////////////////////////////////////////////

export const getSearchResult = async (dormitoryType: string, searchValue: string) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: `Bearer ${Cookies.get("accessToken")}`,
      },
      method: "GET",
      url: `/api/dormitories/${dormitoryType}/articles/search?q=${searchValue}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("검색 결과 에러:", error);
  }
};
