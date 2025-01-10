import type { SVGProps } from "react";
import * as React from "react";

import { postFollow } from "@/lib/api/common";
import { MemberProfile } from "@/types/mypage/type";
const FollowProfile = (props: MemberProfile) => {
  const { memberId, profileUrl, nickname } = props;
  return (
    <>
      <div className={"flex flex-col gap-y-1 rounded-[24px] border-[1px] border-gray1 py-3 px-4"}>
        {/* 이미지, 닉네임 */}
        <div className={"flex items-center gap-x-2"}>
          <img src={profileUrl} className={"object-cover rounded-full w-[40px] h-[40px]"} alt={profileUrl}></img>
          <div>{nickname}</div>
        </div>

        {/* 신고, 채팅, 팔로우 */}
        <div className={"flex justify-between"}>
          <div className={"flex gap-x-2"}>
            <button
              className={"border-[1px] border-gray1 text-gray4 text-h5 rounded-full py-[6px] px-[20px] items-center"}>
              신고
            </button>
            <button
              //TODO: 채팅이동
              onClick={() => {}}
              className={"p-[10px] rounded-full border-[1px] border-gray1 items-center gap-x-1"}>
              <FollowChatIcon />
            </button>
          </div>
          <button
            onClick={() => {
              postFollow(memberId).then((r) => {
                console.log("팔로우 성공", r);
              });
            }}
            className={"border-[1px] border-gray1 text-gray4 text-h5 rounded-full py-[6px] px-[20px] items-center"}>
            팔로우
          </button>
        </div>
      </div>
    </>
  );
};
export default FollowProfile;

const FollowChatIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none" {...props}>
    <path
      fill="#727375"
      d="M8.475 1c3.862 0 7.003 2.54 7.003 5.667s-3.141 5.666-7.003 5.666c-.06 0-.113 0-.173-.006h-.154s-.026-.007-.04-.007a.99.99 0 0 0-.893.553L6.148 15l-1.794-3.587a1.05 1.05 0 0 0-.34-.386C2.392 9.94 1.465 8.353 1.465 6.667 1.472 3.54 4.614 1 8.476 1m0-1C4.053 0 .472 2.987.472 6.667c0 2.1 1.167 3.973 2.988 5.193l1.794 3.587c.187.366.54.553.894.553a.99.99 0 0 0 .893-.553l1.067-2.127c.12 0 .24.013.36.013 4.422 0 8.004-2.986 8.004-6.666S12.897 0 8.475 0"
    />
    <path
      fill="#727375"
      d="M11.401 7.333a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333M8.604 7.42a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333M5.808 7.42a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333"
    />
  </svg>
);
