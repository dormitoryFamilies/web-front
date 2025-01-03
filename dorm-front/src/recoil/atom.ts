"use client";

import { atom } from "recoil";

//드롭다운 메뉴를 보이도록(or 보이지 않도록) 하는 state
export const DropDownClick = atom({
  key: "DropDownClick",
  default: false,
});

//드롭다운 메뉴로 기숙사 선택시
export const selectedDormitory = atom({
  key: "selectedDormitory",
  default: "본관",
});

// 프로필 선택
export const selectedMemberIdAtom = atom<number>({
  key: "selectedMemberIdAtom",
  default: 0,
});
