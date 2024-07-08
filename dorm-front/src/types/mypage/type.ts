export type FollowType = "팔로워" | "팔로잉";
export interface FollowSearchResponseType {
  code: number;
  data: {
    MemberProfiles: MemberProfile[];
  };
}
export interface FollowResponseType {
  code: number;
  data: FollowDataType;
}
export interface FollowDataType {
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
