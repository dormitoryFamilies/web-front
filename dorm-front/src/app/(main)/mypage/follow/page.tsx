"use client";

import { useState } from "react";

import Header from "@/components/common/Header";
import MyPageFollowMenu from "@/components/mypage/MyPageFollowMenu";
import { FollowType } from "@/types/mypage/type";

const MyPageFollow = () => {
  const [followType, setFollowType] = useState<FollowType>("팔로워");
  return (
    <>
      <Header headerType={"dynamic"} title={followType === "팔로워" ? "팔로워 목록" : "팔로잉 목록"}></Header>
      <div className={"h-[60px]"} />
      <MyPageFollowMenu followType={followType} setFollowType={setFollowType}></MyPageFollowMenu>
      <div></div>
    </>
  );
};
export default MyPageFollow;
