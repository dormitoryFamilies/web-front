"use client";

import { useParams } from "next/navigation";
import * as React from "react";
import { useState } from "react";

import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import RoomMateDoomzBasicProfile from "@/components/room-mate/RoomMateDoomzBasicProfile";
import RoomMateDoomzMatchingProfile from "@/components/room-mate/RoomMateDoomzMatchingProfile";
import RoomMateDoomzProfileMenu from "@/components/room-mate/RoomMateDoomzProfileMenu";

const RoomMateDoomzProfile = () => {
  const params = useParams();
  const [profileMenu, setProfileMenu] = useState<"프로필" | "생활 습관" | "기타 습관">("프로필");

  return (
    <main>
      <Header headerType={"dynamic"} title={"프로필"} />
      <div className={"h-[60px]"} />
      <RoomMateDoomzBasicProfile memberId={params.memberId} />
      <RoomMateDoomzProfileMenu setProfileMenu={setProfileMenu} profileMenu={profileMenu} />
      <RoomMateDoomzMatchingProfile profileMenu={profileMenu} memberId={params.memberId} />
      <NavBar />
    </main>
  );
};
export default RoomMateDoomzProfile;
