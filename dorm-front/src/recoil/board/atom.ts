"use client";

import { atom } from "recoil";

import { ArticlePostType, PostType } from "@/types/board/type";

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
    title: "바퀴벌레 잡아주실 분",
    content: "ㅠㅠㅠ 무서워용. 어서 저를 도와주세요!!",
    tags: "#바퀴벌래#무서워#갓생",
    imagesUrls: [],
  },
});

