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
