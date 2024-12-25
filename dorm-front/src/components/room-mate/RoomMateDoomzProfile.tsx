import * as React from "react";
import { useState } from "react";

import Header from "@/components/common/Header";
import RoomMateDoomzBasicProfile from "@/components/room-mate/RoomMateDoomzBasicProfile";
import RoomMateDoomzMatchingProfile from "@/components/room-mate/RoomMateDoomzMatchingProfile";
import RoomMateDoomzProfileMenu from "@/components/room-mate/RoomMateDoomzProfileMenu";

interface Props {
  memberId: number;
}

const RoomMateDoomzProfile = (props: Props) => {
  const { memberId } = props;
  const [profileMenu, setProfileMenu] = useState<"프로필" | "생활 습관" | "기타 습관">("프로필");

  return (
    <main>
      <Header headerType={"dynamic"} title={"프로필"} />
      <div className={"h-[60px]"} />
      <RoomMateDoomzBasicProfile memberId={memberId} />
      <RoomMateDoomzProfileMenu setProfileMenu={setProfileMenu} profileMenu={profileMenu} />
      <RoomMateDoomzMatchingProfile profileMenu={profileMenu} memberId={memberId} />
    </main>
  );
};
export default RoomMateDoomzProfile;
