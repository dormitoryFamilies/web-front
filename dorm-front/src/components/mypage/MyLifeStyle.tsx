import type { SVGProps } from "react";
import * as React from "react";

import CleanIcon from "@/assets/mypage/CleanIcon";
import GoToHomeIcon from "@/assets/mypage/GoToHome";
import SoundIcon from "@/assets/mypage/SoundIcon";
import StudyIcon from "@/assets/mypage/Study";

const MyLifeStyle = () => {
  return (
    <>
      <div className={"flex flex-col gap-y-3 bg-gray0 p-4 rounded-[24px]"}>
        <div className={"flex justify-between"}>
          <div className={"text-h4 font-semibold text-primary"}>선호 라이프 스타일</div>
          <div className={"flex items-center gap-x-1"}>
            <div className={"text-gray3 text-h5"}>변경</div>
            <MoveLifestyleSettingsIcon />
          </div>
        </div>

        {/*나의 라이프 스타일*/}
        <div className={"flex flex-col gap-y-3"}>
          <div className={"flex gap-x-5"}>
            {/*청소*/}
            <div className={"flex gap-x-2 items-center w-[50%] justify-start"}>
              <div
                className={
                  "flex justify-center items-center w-[44px] h-[44px] rounded-full border-gray1 border-[1px] bg-white"
                }>
                <CleanIcon />
              </div>
              <div>
                <div className={"text-h5 text-gray5 font-medium"}>청소</div>
                <div className={"text-h5 text-gray5 "}>매일매일</div>
              </div>
            </div>

            {/* 소리 */}
            <div className={"flex gap-x-2 items-center justify-start"}>
              <div
                className={
                  "flex justify-center items-center w-[44px] h-[44px] rounded-full border-gray1 border-[1px] bg-white"
                }>
                <SoundIcon />
              </div>
              <div>
                <div className={"text-h5 text-gray5 font-medium"}>소리</div>
                <div className={"text-h5 text-gray5 "}>무음</div>
              </div>
            </div>
          </div>

          {/* 본가주기 */}
          <div className={"flex gap-x-5"}>
            <div className={"flex gap-x-2 justify-start w-[50%] items-center"}>
              <div
                className={
                  "flex justify-center items-center w-[44px] h-[44px] rounded-full border-gray1 border-[1px] bg-white"
                }>
                <GoToHomeIcon />
              </div>
              <div>
                <div className={"text-h5 text-gray5 font-medium"}>본가주기</div>
                <div className={"text-h5 text-gray5 "}>2달에 한번</div>
              </div>
            </div>

            {/* 공부 */}
            <div className={"flex gap-x-2 justify-start items-center"}>
              <div
                className={
                  "flex justify-center items-center w-[44px] h-[44px] rounded-full border-gray1 border-[1px] bg-white"
                }>
                <StudyIcon />
              </div>
              <div>
                <div className={"text-h5 text-gray5 font-medium"}>공부</div>
                <div className={"text-h5 text-gray5 "}>기숙사</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyLifeStyle;

const MoveLifestyleSettingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={24} fill="none" {...props}>
    <path stroke="#9E9FA1" strokeLinecap="round" strokeLinejoin="round" d="m4 17 5-5-5-5" />
  </svg>
);
