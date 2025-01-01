"use client";

import { useRouter } from "next/navigation";
import type { SVGProps } from "react";
import * as React from "react";

import Header from "@/components/common/Header";

const MypageRoommate = () => {
  const router = useRouter();
  return (
    <>
      <Header headerType={"dynamic"} title={"룸메매칭 정보수정"}></Header>
      <div className={"h-[60px]"} />
      <section className={"px-5 mt-[10px]"}>
        <div className={"border border-gray1 rounded-[24px]"}>
          <div
            onClick={() => {
              router.push("/mypage/room-mate/lifestyle-edit");
            }}
            className={"py-4 mx-5 flex justify-between border-b border-gray1"}>
            긱사생활 설정
            <ArrowIcon />
          </div>
          <div
            onClick={() => {
              router.push("/mypage/room-mate/priority-edit");
            }}
            className={"py-4 mx-5 flex justify-between"}>
            선호 룸메 우선순위 설정
            <ArrowIcon />
          </div>
        </div>
      </section>
    </>
  );
};
export default MypageRoommate;

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#9E9FA1" strokeLinecap="round" strokeLinejoin="round" d="m7.5 5.5 5 5-5 5" />
  </svg>
);
