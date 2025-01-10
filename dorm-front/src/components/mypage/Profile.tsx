import { useRouter } from "next/navigation";
import type { SVGProps } from "react";
import * as React from "react";

interface Props {
  name: string | undefined;
  followerCount: number | undefined;
  followingCount: number | undefined;
  profileUrl: string | undefined;
}
const Profile = (props: Props) => {
  const { name, followerCount, followingCount, profileUrl } = props;
  const router = useRouter();

  return (
    <div className={"flex p-4 rounded-[32px] gap-x-3 items-center"}>
      <img
        onClick={() => {
          router.push("/mypage/profile-setting");
        }}
        alt={profileUrl ? profileUrl : "/unnimm.jpg"}
        src={profileUrl ? profileUrl : "/unnimm.jpg"}
        className={"rounded-full w-[72px] h-[72px]"}></img>
      <div className={"flex flex-col gap-y-1"}>
        <div
          onClick={() => {
            router.push("/mypage/profile-setting");
          }}
          className={"flex items-center gap-x-[6px]"}>
          <span className={"text-h3 font-semibold"}>{name}</span> <span className={"text-h4"}>님</span>
          <MoveIcon />
        </div>
        <div
          onClick={() => {
            router.push("/mypage/follow");
          }}
          className={"flex gap-x-5"}>
          <div className={"text-h6 text-gray4"}>
            <span className={"text-h5 text-primaryMid"}>{followingCount} </span>팔로잉
          </div>
          <div className={"text-h6 text-gray4"}>
            <span className={"text-h5 text-primaryMid"}>{followerCount} </span>팔로워
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={15} fill="none" {...props}>
    <path stroke="#9E9FA1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m3 13.5 6-6-6-6" />
  </svg>
);
