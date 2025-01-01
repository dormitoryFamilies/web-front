import { AxiosHeaders } from "axios";

export type FollowType = "팔로워" | "팔로잉";
export interface FollowSearchResponseType {
  code: number;
  data: {
    MemberProfiles: MemberProfile[];
  };
}
export interface FollowingAxiosResponseType {
  data: FollowingResponseType;
  headers: AxiosHeaders;
}
export interface FollowingResponseType {
  code: number;
  data: FollowingType;
}
export interface FollowingType {
  totalPageNumber: number;
  nowPageNumber: number;
  isLast: boolean;
  memberProfiles: MemberProfile[];
}
export interface MemberProfile {
  memberId: number;
  nickname: string;
  profileUrl: string;
}

////////////////////////////////////////////////////////

export interface MyProfileAxiosResponseType {
  data: MyProfileResponseType;
  headers: AxiosHeaders;
}

export interface MyProfileResponseType {
  code: number;
  data: MyProfileType;
}
export interface MyProfileType {
  memberId: number;
  name: string;
  genderType: string;
  nickname: string;
  birthDate: string;
  memberDormitoryType: string;
  collegeType: string;
  departmentType: string;
  studentNumber: string;
  profileUrl: string;
}
export interface EditMyProfileType {
  nickname: string;
  memberDormitoryType: string;
  profileUrl: string;
}

////////////////////////////////////////////////////////

export type InterestListType = "둠즈" | "게시판";

export type DormitoryType = "기숙사" | "본관" | "양성재" | "양진재";
