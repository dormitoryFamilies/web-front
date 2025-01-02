"use client";

import { useRouter } from "next/navigation";
import { SVGProps, useState } from "react";
import * as React from "react";

import Header from "@/components/common/Header";
import LogoutModal from "@/components/common/LogoutModal";
import NavBar from "@/components/common/NavBar";
import Item from "@/components/mypage/Item";
import MyLifeStyle from "@/components/mypage/MyLifeStyle";
import Profile from "@/components/mypage/Profile";
import useMyRoomMateProfile from "@/lib/hooks/useMyRoomMateProfile";

const MyPage = () => {
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const { myRoomMateProfile } = useMyRoomMateProfile();
  const router = useRouter();

  return (
    <>
      {isOpenLogoutModal ? <LogoutModal setIsOpenLogoutModal={setIsOpenLogoutModal} /> : null}
      <Header headerType={"dynamic"} title={"프로필"} />
      <div className={"h-[30px]"} />
      <div className={"flex flex-col gap-y-5 p-5"}>
        <div>
          <Profile
            profileUrl={myRoomMateProfile?.data.profileUrl}
            name={myRoomMateProfile?.data.name}
            followingCount={myRoomMateProfile?.data.followingCount}
            followerCount={myRoomMateProfile?.data.followerCount}
          />
          <MyLifeStyle memberId={myRoomMateProfile?.data.memberId} />
        </div>

        {/* 룸메 매칭 */}
        <div className={"border-[1px] border-gray1 rounded-[24px] py-4 px-5"}>
          <div className={"text-h5 text-gray4"}>{"룸메 매칭"}</div>
          <div
            onClick={() => {
              router.push("/mypage/interest-list");
            }}
            className={"flex justify-between items-center py-4 border-gray1 border-b-[1px]"}>
            <div className={"text-h4"}>{"관심 목록"}</div>
            <MoveIcon />
          </div>
          <div
            onClick={() => {
              router.push("/room-mate/application-list");
            }}
            className={"flex justify-between items-center py-4 border-gray1 border-b-[1px]"}>
            <div className={"text-h4"}>{"신청 목록"}</div>
            <MoveIcon />
          </div>
          <div
            onClick={() => {
              router.push("/mypage/room-mate");
            }}
            className={"flex justify-between items-center pt-4"}>
            <div className={"text-h4"}>{"룸메매칭 정보 수정"}</div>
            <MoveIcon />
          </div>
        </div>

        {/* 긱사 생활 */}
        <div className={"border-[1px] border-gray1 rounded-[24px] py-4 px-5"}>
          <div className={"text-h5 text-gray4"}>{"긱사생활"}</div>
          <div
            onClick={() => {
              router.push("/mypage/interest-list");
            }}
            className={"flex justify-between items-center py-4 border-gray1 border-b-[1px]"}>
            <div className={"text-h4"}>{"관심 목록"}</div>
            <MoveIcon />
          </div>
          <div
            onClick={() => {
              router.push("/mypage/my-article");
            }}
            className={"flex justify-between items-center py-4 border-gray1 border-b-[1px]"}>
            <div className={"text-h4"}>{"내가 작성한 글"}</div>
            <MoveIcon />
          </div>
          <div
            onClick={() => {
              router.push("/mypage/my-comment");
            }}
            className={"flex justify-between items-center pt-4"}>
            <div className={"text-h4"}>{"내가 작성한 댓글"}</div>
            <MoveIcon />
          </div>
        </div>

        {/* 계정 관리 */}
        <div className={"border-[1px] border-gray1 rounded-[24px] py-4 px-5"}>
          <div className={"text-h5 text-gray4"}>{"긱사생활"}</div>
          <div
            onClick={() => {
              setIsOpenLogoutModal(true);
            }}
            className={"flex justify-between items-center pt-4"}>
            <div className={"text-h4"}>{"로그아웃"}</div>
            <MoveIcon />
          </div>
        </div>
      </div>
      <div className={"h-[60px]"} />
      <NavBar />
    </>
  );
};
export default MyPage;

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path stroke="#9E9FA1" strokeLinecap="round" strokeLinejoin="round" d="m7.5 5 5 5-5 5" />
  </svg>
);
