import useMyRoomMateProfile from "@/lib/hooks/useMyRoomMateProfile";
import { useEffect } from "react";
import RoommateMatchCard from "@/components/room-mate/RoommateMatchCard";
import * as React from "react";

interface Props {
  setIsConfirmRoommateMatchCancelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoommateMatchComplete = (props: Props) => {
  const { setIsConfirmRoommateMatchCancelOpen } = props;

  const topElement = () => {
    return <div className={"px-[12px] py-[5px] text-white text-h5 bg-primaryMid rounded-[24px] w-fit"}>나의 룸메</div>;
  };


  return (
    <div>
      <RoommateMatchCard
        memberId={1}
        topElement={topElement}
        preferredLifestyleReviewer={false}
        setIsConfirmRoommateMatchCancelOpen={setIsConfirmRoommateMatchCancelOpen}
      />
    </div>
  );
}
export default RoommateMatchComplete;
