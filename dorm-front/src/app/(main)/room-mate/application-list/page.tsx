"use client";

import { useState } from "react";

import Header from "@/components/common/Header";
import ApplicationSentList from "@/components/room-mate/ ApplicationSentList";
import AllDoomzList from "@/components/room-mate/AllDoomzList";
import ApplicationReceivedList from "@/components/room-mate/ApplicationReceivedList";
import RoomMateApplicationMenu from "@/components/room-mate/RoomMateApplicationMenu";

const ApplicationList = () => {
  const [type, setType] = useState<"모든 둠즈" | "받은 신청" | "보낸 신청">("모든 둠즈");

  const renderComponent = (type: "모든 둠즈" | "받은 신청" | "보낸 신청") => {
    switch (type) {
      case "모든 둠즈":
        return <AllDoomzList />;
      case "받은 신청":
        return <ApplicationReceivedList />;
      case "보낸 신청":
        return <ApplicationSentList />;
    }
  };

  return (
    <div>
      <Header headerType={"dynamic"} title={"둠즈 목록"} />
      <div className={"h-[50px]"} />
      <RoomMateApplicationMenu type={type} changeType={setType} />
      {renderComponent(type)}
    </div>
  );
};
export default ApplicationList;
