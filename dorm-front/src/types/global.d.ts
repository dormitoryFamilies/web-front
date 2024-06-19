//Navbar 리스트 타입
import React from "react";

export type HeaderType = "static" | "dynamic";

export interface MenuList {
  id: number;
  ClickedIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  UnClickedIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  path: string;
}

// 기숙사 리스트 타입
export interface DormTypeList {
  id: number;
  name: string;
}

// 게시판 종류 리스트 타입
export interface BoardTypeList {
  id: number;
  name: string;
}

// 게시글 타입
export interface PostList {
  tag: string;
  title: string;
  date: string;
}

//식단 메뉴
export interface FoodMenuList {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}
