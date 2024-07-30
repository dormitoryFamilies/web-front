"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SVGProps, useState } from "react";
import RoommateMatchEditor from "@/components/room-mate/RoommateMatchEditor";

const RoommateMatching = () => {
  const router = useRouter();

  return (
    <>
      <RoommateMatchEditor />
      {/*<div className={"h-[43px]"} />*/}
      {/*<div className={"px-5 flex flex-col gap-y-4"}>*/}
      {/*  /!*추천 룸메*!/*/}
      {/*  <div className={"relative flex flex-col rounded-[24px] w-full p-5 bg-primaryMid"}>*/}
      {/*    <MoveWhiteIcon*/}
      {/*      className={"absolute right-5"}*/}
      {/*      onClick={() => {*/}
      {/*        router.push("/room-mate/recommended-roommate");*/}
      {/*      }}*/}
      {/*    />*/}
      {/*    <Image*/}
      {/*      src={"/room-mate/룸메매칭_추천룸메.png"}*/}
      {/*      alt={"/room-mate/룸메매칭_추천룸메.png"}*/}
      {/*      height={160}*/}
      {/*      width={290}></Image>*/}
      {/*    <div className={"flex flex-col text-white text-h3 font-semibold"}>*/}
      {/*      <div>닉네임닉네임닉네임의 </div>*/}
      {/*      <div>추천룸메</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={"flex gap-x-4"}>*/}
      {/*    /!*룸메 신청 목록*!/*/}
      {/*    <div className={"rounded-[24px] w-full p-5 bg-secondary "}>*/}
      {/*      <div className={"flex justify-between items-center"}>*/}
      {/*        <div className={"px-[12px] py-[5px] text-white text-h5 bg-primaryMid rounded-[24px]"}>신청 7건</div>*/}
      {/*        <MoveBlackIcon*/}
      {/*          onClick={() => {*/}
      {/*            router.push("/room-mate/application-list");*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      <div className={"flex justify-end"}>*/}
      {/*        <Image*/}
      {/*          src={"/room-mate/룸메매칭_신청목록.png"}*/}
      {/*          alt={"/room-mate/룸메매칭_신청목록.png"}*/}
      {/*          width={107}*/}
      {/*          height={140}></Image>*/}
      {/*      </div>*/}
      {/*      <div className={"pt-3 flex flex-col text-h3 font-semibold"}>*/}
      {/*        <div>룸메</div>*/}
      {/*        <div>신청 목록</div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    /!*전체 둠즈 목록*!/*/}
      {/*    <div className={"rounded-[24px] w-full p-5 bg-primaryLight "}>*/}
      {/*      <div className={"flex justify-end"}>*/}
      {/*        <MoveBlackIcon*/}
      {/*          onClick={() => {*/}
      {/*            router.push("/room-mate/all-doomz-list");*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      <div className={"flex justify-end"}>*/}
      {/*        <Image*/}
      {/*          src={"/room-mate/룸메매칭_전체둠즈.png"}*/}
      {/*          alt={"/room-mate/룸메매칭_전체둠즈.png"}*/}
      {/*          width={104}*/}
      {/*          height={139}></Image>*/}
      {/*      </div>*/}
      {/*      <div className={"pt-3 flex flex-col text-h3 font-semibold"}>*/}
      {/*        <div>룸메</div>*/}
      {/*        <div>둠즈 목록</div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*</div>*/}
    </>
  );
};
export default RoommateMatching;

const MoveWhiteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.156 10.586H2.972M18.972 10.586l-6.16-6.667M14.205 15.47l4.767-4.884"
    />
    <path
      fill="#fff"
      d="M12.025 17.013c0 .369.345.667.77.667s.77-.298.77-.667c0-.368-.344-.666-.77-.666-.425 0-.77.298-.77.666"
    />
  </svg>
);
const MoveBlackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke="#191919"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.656 10.586H2.472M18.472 10.586l-6.16-6.667M13.705 15.47l4.767-4.884"
    />
    <path
      fill="#191919"
      d="M11.525 17.013c0 .369.345.667.77.667s.77-.298.77-.667c0-.368-.344-.666-.77-.666-.425 0-.77.298-.77.666"
    />
  </svg>
);
