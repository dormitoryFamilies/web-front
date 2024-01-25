"use client";

import { atom } from "recoil";

import { PostType } from "@/types/board/type";

//드롭다운 메뉴를 보이도록(or 보이지 않도록) 하는 state
export const boardTypeState = atom({
  key: "boardTypeState",
  default: 0,
});
