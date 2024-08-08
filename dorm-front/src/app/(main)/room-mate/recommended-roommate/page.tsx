"use client";

import type { SVGProps } from "react";
import * as React from "react";

import RoommateMatchCard from "@/components/room-mate/RoommateMatchCard";
const RecommendedRoommate = () => {
  return (
    <>
      <div className={"pt-[24px] px-5 flex flex-col gap-y-[20px]"}>
        {/*안내 문구*/}
        <div className={"px-[3px] flex justify-between items-end"}>
          <div className={"flex flex-col"}>
            <div className={"text-h2 font-semibold"}>
              닉네임<span className={"text-h4 font-normal"}>님의</span>
            </div>
            <div className={"text-h2 font-semibold"}>추천 룸메 입니다!</div>
          </div>

          <div className={"flex items-center text-gray4"}>
            <div>전체 둠즈 목록</div>
            <MoveIcon></MoveIcon>
          </div>
        </div>

        <div className={"flex justify-center items-center"}>
          <RoommateMatchCard />
        </div>
      </div>
      <button className={"fixed bottom-0 w-full rounded-full py-4 px-[10px] bg-primary text-white text-h5"}>
        룸메 신청하기
      </button>
    </>
  );
};

export default RecommendedRoommate;

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={15} fill="none" {...props}>
    <path stroke="#9E9FA1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m3.729 13.5 6-6-6-6" />
  </svg>
);
