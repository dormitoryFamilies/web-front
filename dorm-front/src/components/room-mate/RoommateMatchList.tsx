import * as React from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import RoommateMatchListProfile from "@/components/room-mate/RoommateMatchListProfile";
import { candidateIdsAtom } from "@/recoil/room-mate/atom";

interface Props {
  setIsRoommateMatchListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const RoommateMatchList = (props: Props) => {
  const [candidateIds, setCandidateIds] = useRecoilState(candidateIdsAtom);
  return (
    <>
      <Header headerType={"dynamic"} title={"전체 추천 목록"} />
      <div className={"h-[60px]"}></div>
      <div className={"flex flex-col gap-y-3 px-5 mt-6"}>
        {candidateIds.map((candidateId) => {
          return <RoommateMatchListProfile memberId={candidateId} key={candidateId}></RoommateMatchListProfile>;
        })}
      </div>
    </>
  );
};
export default RoommateMatchList;
