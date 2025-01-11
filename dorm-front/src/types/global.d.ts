//Navbar 리스트 타입
import { AxiosHeaders } from "axios";
import React from "react";

import { CollegeType } from "@/types/onboarding/type";

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

export interface MyMemberIdAxiosResponseType {
  data: MyMemberIdResponseType;
  headers: AxiosHeaders;
}

export interface MyMemberIdResponseType {
  code: number;
  data: {
    memberId: number;
  };
}

/**
 * profile
 */

export interface ProfileAxiosResponseType {
  data: ResponseProfileType;
  headers: AxiosHeaders;
}

export interface ResponseProfileType {
  code: number;
  data: ProfileType;
}

export interface ProfileType {
  memberId: number;
  dormitoryType: string;
  nickname: string;
  profileUrl: string;
  isFollowing: boolean;
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

///////////////////////////////////////////////////////////

export interface LoginUserIdAxiosResponseType {
  data: LoginUserIdResponseType;
  headers: AxiosHeaders;
}

export interface LoginUserIdResponseType {
  code: number;
  data: {
    memberId: number;
  };
}
