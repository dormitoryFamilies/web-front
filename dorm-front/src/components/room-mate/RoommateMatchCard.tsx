import type { SVGProps } from "react";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import ProfileIcon from "@/assets/common/ProfileIcon";
import CleanIcon from "@/assets/mypage/CleanIcon";
import GoToHomeIcon from "@/assets/mypage/GoToHome";
import SoundIcon from "@/assets/mypage/SoundIcon";
import StudyIcon from "@/assets/mypage/Study";

interface Props {
  memberId: number | undefined;
  topElement: () => React.JSX.Elemen;
  bottomButton: boolean;
}

const RoommateMatchCard = (props: Props) => {
  return (
    <div className={"relative flex flex-col gap-y-5 p-5 w-[300px] h-[440px] rounded-[32px] border-gray1 border-[1px]"}>
      {/*유저 프로필*/}
      <section className={"flex items-center gap-x-3"}>
        <UserProfileIcon></UserProfileIcon>
        {/*닉네임*/}
        <div className={"flex flex-col gap-y-1"}>
          <div className={"flex"}>
            <span className={"text-h4 font-semibold"}>
              닉네임닉네임닉네임<span className={"font-normal"}> 님</span>
            </span>
          </div>

          {/*follow*/}
          <div className={"flex gap-x-5"}>
            <div className={"flex gap-x-1"}>
              <span className={"text-primaryMid text-h4"}>20</span>
              <span className={"text-gray4 text-h5"}>팔로잉</span>
            </div>
            <div className={"flex gap-x-1"}>
              <span className={"text-primaryMid text-h4"}>10</span>
              <span className={"text-gray4 text-h5"}>팔로워</span>
            </div>
          </div>
        </div>
      </section>

      {/*기본정보*/}
      <section className={"flex flex-col gap-y-2"}>
        <div className={"text-primary text-h4 font-semibold"}>기본 정보</div>
        <div className={"flex flex-col gap-y-1"}>
          <div className={"flex gap-x-4"}>
            <div className={"flex gap-x-2 text-h5"}>
              <span>이름</span>
              <span className={"text-gray5"}>황유림</span>
            </div>
            <div className={"flex gap-x-2 text-h5"}>
              <span>나이</span>
              <span className={"text-gray5"}>24</span>
            </div>
            <div className={"flex gap-x-2 text-h5"}>
              <span>학번</span>
              <span className={"text-gray5"}>23</span>
            </div>
          </div>
          <div className={"flex gap-x-2 text-h5"}>
            <span>학과</span>
            <span className={"text-gray5"}>의류학과</span>
          </div>
        </div>
      </section>

      {/*선호 라이프 스타일*/}
      <section className={"flex flex-col gap-y-2"}>
        <div className={"text-primary text-h4 font-semibold"}>선호 라이프 스타일</div>
        <div className={"bg-gray0 rounded-[24px] p-3 flex justify-between"}>
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
      </section>

      {/*button*/}
      <section className={"absolute bottom-5 left-5 right-5 flex justify-between"}>
        <div className={"flex gap-x-2"}>
          <button className={"py-1 px-4 h-[32px] rounded-full border-[1px] border-gray1 "}>
            <LikeIcon className={"h-21"} />
          </button>
          <button className={"py-1 px-5 h-[32px] rounded-full border-[1px] border-gray1 "}>
            <ChatIcon className={"h-21"} />
          </button>
        </div>
        <button className={"flex h-[32px] items-center gap-x-1 home-button"}>
          더보기
          <MoveIcon />
        </button>
      </section>
    </div>
  );
};
export default RoommateMatchCard;

const UserProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={61} height={60} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#E4E5E7"
        d="M30.5 60c16.569 0 30-13.431 30-30 0-16.568-13.431-30-30-30C13.932 0 .5 13.432.5 30c0 16.569 13.432 30 30 30"
      />
      <path
        fill="#000"
        d="M30.5 10.95c3.25 0 5.9 2.65 5.9 5.9s-2.65 5.9-5.9 5.9a5.91 5.91 0 0 1-5.9-5.9c0-3.25 2.65-5.9 5.9-5.9m0-3.75c-5.325 0-9.65 4.325-9.65 9.65s4.325 9.65 9.65 9.65 9.65-4.325 9.65-9.65S35.825 7.2 30.5 7.2M49.425 43.925c-.6 0-1.2-.3-1.575-.85A20.74 20.74 0 0 0 30.5 33.75c-7 0-13.475 3.5-17.35 9.325a1.86 1.86 0 0 1-2.6.525 1.86 1.86 0 0 1-.525-2.6C14.6 34.1 22.25 29.975 30.5 29.975S46.425 34.1 50.975 41a1.884 1.884 0 0 1-.525 2.6c-.325.2-.675.3-1.025.3z"
      />
      <path
        fill="#E70050"
        d="M39.4 42.325c-1.075 0-1.95.875-1.95 1.95s.875 1.95 1.95 1.95 1.95-.875 1.95-1.95-.875-1.95-1.95-1.95"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5 0h60v60H.5z" />
      </clipPath>
    </defs>
  </svg>
);
const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={12} fill="none" {...props}>
    <path
      stroke="#FF7E8D"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.164 6.14H1.306M11.694 6.14l-4-5M8.6 9.803l3.094-3.663"
    />
    <path fill="#FF7E8D" d="M7.184 10.96a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0" />
  </svg>
);
const LikeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} fill="none" {...props}>
    <g fill="#727375" clipPath="url(#a)">
      <path d="M9.632 12.554a.47.47 0 0 0-.647-.198l-.16.083a1.83 1.83 0 0 1-1.65 0 13 13 0 0 1-2.298-1.485C2.183 8.753 1.613 6.187 1.492 5.176l-.02-.211c-.012-.135-.012-.218-.012-.23 0-1.793 1.414-3.367 3.027-3.367 1.51 0 2.867.717 3.545 1.869a.481.481 0 1 0 .832-.487C8.013 1.304 6.336.408 4.494.408 2.33.408.5 2.392.5 4.734c0 0 0 .115.013.307 0 .09.013.173.025.256.135 1.12.768 3.974 3.731 6.4a13.5 13.5 0 0 0 2.464 1.593c.397.198.832.3 1.26.3.43 0 .865-.102 1.261-.3l.173-.09a.47.47 0 0 0 .198-.646zM10.822 12.286a.5.5 0 1 0 0-.998.5.5 0 0 0 0 .998" />
      <path d="M12.166 11.141a.483.483 0 0 1-.34-.826c2.1-2.053 2.567-4.274 2.67-5.138.006-.07.018-.14.018-.211.013-.14.013-.224.013-.23 0-1.799-1.414-3.373-3.027-3.373-1.51 0-2.867.717-3.545 1.869a.481.481 0 1 1-.832-.487C7.974 1.3 9.651.403 11.494.403c2.163 0 3.987 1.984 3.987 4.333 0 0 0 .115-.013.307 0 .083-.013.173-.026.256-.115.953-.633 3.436-2.95 5.702a.5.5 0 0 1-.333.134z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5.408h15v13.183H.5z" />
      </clipPath>
    </defs>
  </svg>
);
const ChatIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none" {...props}>
    <g fill="#727375" clipPath="url(#a)">
      <path d="M13.833 1.945c.92 0 1.667.814 1.667 1.817v5.814c0 1.003-.747 1.817-1.667 1.817H11.08a.98.98 0 0 0-.807.444L8.5 13.8l-1.773-1.964a.96.96 0 0 0-.807-.444H3.167c-.92 0-1.667-.814-1.667-1.817V3.762c0-1.003.747-1.817 1.667-1.817zm0-1.09H3.167C1.693.855.5 2.155.5 3.762v5.814c0 1.606 1.193 2.907 2.667 2.907H5.92l2.04 2.364a.65.65 0 0 0 .54.299.65.65 0 0 0 .54-.299l2.04-2.363h2.753c1.474 0 2.667-1.302 2.667-2.908V3.762c0-1.606-1.193-2.907-2.667-2.907" />
      <path d="M5 7a.667.667 0 1 0 0-1.334A.667.667 0 0 0 5 7M8.5 7a.667.667 0 1 0 0-1.334A.667.667 0 0 0 8.5 7M12 7a.667.667 0 1 0 0-1.333A.667.667 0 0 0 12 7" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5 0h16v16H.5z" />
      </clipPath>
    </defs>
  </svg>
);
