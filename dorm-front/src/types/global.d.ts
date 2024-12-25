//Navbar 리스트 타입
import React from "react";

import { CollegeType } from "@/types/onboarding/type";
import { AxiosHeaders } from "axios";

export type HeaderType = "static" | "chattingHome" | "dynamic" | "search";

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

/**
 * profile
 */

export interface ResponseProfileType {
  code: number;
  data: ProfileType;
}

export interface ProfileType {
  memberDormitory: string;
  memberId: number;
  nickname: string;
  profileUrl: string;
}

export interface ProfileSettingType {
  nickname: string;
  studentCardImageUrl: string;
  collegeType: CollegeType;
  departmentType: string;
  studentNumber: number | null;
  dormitoryType: string;
}
///////////////////////////////////////////////////////////

export interface FollowStatusAxiosResponseType {
  data: FollowStatusResponseType;
  headers: AxiosHeaders;
}

export interface FollowStatusResponseType {
  code: number;
  data: {
    isFollowing: false;
  };
}
