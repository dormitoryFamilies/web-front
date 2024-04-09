"use client";
import * as React from "react";
import { SVGProps, useState } from "react";

import RoommateMatchCard from "@/components/room-mate/RoommateMatchCard";
import RoommateMatchEditor from "@/components/room-mate/RoommateMatchEditor";

const RoommateMatching = () => {
  const [isClickRoommateMatchEditor, setIsClickRoommateMatchEditor] = useState(false);
  return isClickRoommateMatchEditor ? (
    <RoommateMatchEditor />
  ) : (
    <div className="p-5 flex flex-col gap-y-[18px]">
      <div className="flex flex-col">
        <div className="flex items-end">
          <span className="text-h2 font-bold">닉네임</span>
          <div className="text-h4 mb-[2px]">님의</div>
        </div>
        <span className="text-h2 font-bold">추천 룸메 입니다!</span>
      </div>

      {/* 룸메 매칭 결과 */}
      <div className="flex justify-center items-center">
        <RoommateMatchCard />
      </div>

      {/* 룸메매칭 정보 변경 */}
      <button
        onClick={() => setIsClickRoommateMatchEditor(!isClickRoommateMatchEditor)}
        className="flex justify-center gap-x-1 items-center text-gray4 text-h5"
      >
        룸메 매칭 정보 변경
        <MoveIcon />
      </button>
    </div>
  );
};
export default RoommateMatching;
const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={15}
    fill="none"
    {...props}
  >
    <path
      stroke="#9E9FA1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m3 13.5 6-6-6-6"
    />
  </svg>
);
