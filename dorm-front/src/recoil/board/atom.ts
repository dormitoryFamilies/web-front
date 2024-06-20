"use client";

import { atom } from "recoil";

import { ArticlePostType, PostCommentType } from "@/types/board/type";

//드롭다운 메뉴를 보이도록(or 보이지 않도록) 하는 state
export const boardTypeState = atom({
  key: "boardTypeState",
  default: 0,
});

//글쓰기 페이지 - 기숙사 선택 state
export const clickedDormState = atom({
  key: "clickedDormState",
  default: "양진재",
});

//게시글 쓰기 post
export const postDataState = atom<ArticlePostType>({
  key: "postDataState",
  default: {
    dormitoryType: "본관",
    boardType: "도와주세요",
    title: "",
    content: "",
    tags: "",
    imagesUrls: [],
  },
});

//게시글 댓글 쓰기 post
export const articleCommentDataAtom = atom<PostCommentType>({
  key: "articleCommentDataAtom",
  default: {
    content: "",
  },
});

//게시글 대댓글 쓰기 post
export const articleReplyCommentDataAtom = atom<PostCommentType>({
  key: "articleReplyCommentDataAtom",
  default: {
    content: "",
  },
});

//선택된 commentId
export const selectedCommentIdAtom = atom<number>({
  key: "selectedCommentIdAtom",
  default: 0,
});

export const imgUrlListAtom = atom<string[]>({
  key: "imgUrlListAtom",
  default: [],
});

export const fileListAtom = atom<File[]>({
  key: "fileListAtom",
  default: [],
});
