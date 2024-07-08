"use client";

import type { SVGProps } from "react";
import * as React from "react";

import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import Item from "@/components/mypage/Item";
import MyLifeStyle from "@/components/mypage/MyLifeStyle";
import Profile from "@/components/mypage/Profile";

const MyPage = () => {
  const roomMateContents = ["관심 목록", "룸메매칭 정보 수정"];
  const doomLifeStyleContents = ["내가 작성한 글", "내가 작성한 댓글"];
  const accountManagementContents = ["로그아웃", "탈퇴하기"];
  const EtcContents = ["문의하기", "도움말", "앱버전"];

  return (
    <>
      <Header headerType={"dynamic"} title={"프로필"} />
      <div className={"h-[30px]"} />
      <div className={"flex flex-col gap-y-5 p-5"}>
        <Profile name={"닉네임닉네임닉네임"} />
        <MyLifeStyle />
        <Item title={"룸메매칭"} contents={roomMateContents} Icon={MoveIcon} />
        <Item title={"긱사생활"} contents={doomLifeStyleContents} Icon={MoveIcon} />
        <Item title={"계정관리"} contents={accountManagementContents} Icon={MoveIcon} />
        <Item title={"기타"} contents={EtcContents} Icon={MoveIcon} />
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
