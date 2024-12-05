import { string } from "prop-types";

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
