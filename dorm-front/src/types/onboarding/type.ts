import { AxiosHeaders } from "axios";
import { number, string } from "prop-types";

export type CollegeType =
  | "단과대학교"
  | "인문대학"
  | "사회과학대학"
  | "자연과학대학"
  | "경영대학"
  | "공과대학"
  | "전자정보대학"
  | "농업생명환경대학"
  | "사범대학"
  | "생활과학대학"
  | "수의과대학"
  | "약학대학"
  | "의과대학"
  | "바이오헬스공유대학"
  | "자율전공학부"
  | "융합학과군"
  | "바이오헬스학부";

export interface DepartmentType {
  단과대학교: string;
  인문대학: string[];
  사회과학대학: string[];
  자연과학대학: string[];
  경영대학: string[];
  공과대학: string[];
  전자정보대학: string[];
  농업생명환경대학: string[];
  사범대학: string[];
  생활과학대학: string[];
  수의과대학: string[];
  약학대학: string[];
  의과대학: string[];
  바이오헬스공유대학: string[];
  자율전공학부: string[];
  융합학과군: string[];
  바이오헬스학부: string[];
}

export type StepOnboarding =
  | "ServiceAccessRights"
  | "NicknameSetting"
  | "SchoolInfoSetting"
  | "PhotoStudentIDCard"
  | "WaitForCompletion";

export interface SearchDuplicateNickNameResponseType {
  data: SearchDuplicateNickNameType;
  headers: AxiosHeaders;
}

export interface SearchDuplicateNickNameType {
  code: number;
  data: {
    isDuplicated: boolean;
  };
}

/**
 * 관리자페이지 승인 멤버 데이터
 */
export interface VerifyMembersResponseType {
  data: VerifyMembersType;
  headers: AxiosHeaders;
}

export interface VerifyMembersType {
  code: number;
  data: {
    totalElements: number;
    totalPages: number;
    currentPage: number;
    nonVerifiedStudentCards: NonVerifiedStudentCardsType[];
  };
}

export interface NonVerifiedStudentCardsType {
  memberId: number;
  name: string;
  studentNumber: string;
  Department: string;
  studentCardUrl: string;
}
