import type { SVGProps } from "react";
import * as React from "react";

import CleanIcon from "@/assets/mypage/CleanIcon";
import GoToHomeIcon from "@/assets/mypage/GoToHome";
import SoundIcon from "@/assets/mypage/SoundIcon";
import StudyIcon from "@/assets/mypage/Study";
interface Props {
  name: string;
}
const Profile = (props: Props) => {
  const { name } = props;
  const renderUIBasedOnName = () => {
    if (name.length > 6) {
      return (
        <div className={"flex flex-col gap-y-1"}>
          <div className={"flex items-center gap-x-[6px]"}>
            <span className={"text-h3 font-semibold"}>{name}</span> <span className={"text-h4"}>님</span>
            <MoveIcon />
          </div>
          <div className={"flex gap-x-5"}>
            <div className={"text-h6 text-gray4"}>
              <span className={"text-h5 text-primaryMid"}>20 </span>팔로잉
            </div>
            <div className={"text-h6 text-gray4"}>
              <span className={"text-h5 text-primaryMid"}>10 </span>팔로워
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={"flex justify-between"}>
          <div className={"flex items-center gap-x-[6px]"}>
            <span className={"text-h3 font-semibold"}>{name}</span> <span className={"text-h4"}>님</span>
            <MoveIcon />
          </div>
          <div className={"flex gap-x-5"}>
            <div className={"text-h6 text-gray4"}>
              <span className={"text-h5 text-primaryMid"}>20 </span>팔로잉
            </div>
            <div className={"text-h6 text-gray4"}>
              <span className={"text-h5 text-primaryMid"}>10 </span>팔로워
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={"flex flex-col p-4 rounded-[32px] border-[1px] border-gray1 gap-y-3"}>
      {renderUIBasedOnName()}
      {/*lifestyle*/}
      <div className={"flex flex-col gap-y-2 bg-gray0 px-5 py-3 rounded-[24px]"}>
        <div className={"flex justify-between"}>
          <div className={"text-h4 font-semibold text-primary"}>선호 라이프 스타일</div>
          <div className={"flex items-center gap-x-1"}>
            <div className={"text-gray3 text-h5"}>변경</div>
            <MoveLifestyleSettingsIcon />
          </div>
        </div>

        {/*나의 라이프 스타일*/}
        <div className={"flex justify-between"}>
          <div className={"flex flex-col gap-y-1 justify-center items-center"}>
            <div
              className={
                "flex justify-center items-center w-[50px] h-[50px] rounded-full border-gray1 border-[1px] bg-white"
              }>
              <CleanIcon />
            </div>
            <div className={"text-h5 text-gray5"}>청소</div>
          </div>
          <div className={"flex flex-col gap-y-1 justify-center items-center"}>
            <div
              className={
                "flex justify-center items-center w-[50px] h-[50px] rounded-full border-gray1 border-[1px] bg-white"
              }>
              <SoundIcon />
            </div>
            <div className={"text-h5 text-gray5"}>소리</div>
          </div>
          <div className={"flex flex-col gap-y-1 justify-center items-center"}>
            <div
              className={
                "flex justify-center items-center w-[50px] h-[50px] rounded-full border-gray1 border-[1px] bg-white"
              }>
              <GoToHomeIcon />
            </div>
            <div className={"text-h5 text-gray5"}>본가 주기</div>
          </div>
          <div className={"flex flex-col gap-y-1 justify-center items-center"}>
            <div
              className={
                "flex justify-center items-center w-[50px] h-[50px] rounded-full border-gray1 border-[1px] bg-white"
              }>
              <StudyIcon />
            </div>
            <div className={"text-h5 text-gray5"}>공부</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;

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
const MoveLifestyleSettingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#9E9FA1"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4 17 5-5-5-5"
    />
  </svg>
);
