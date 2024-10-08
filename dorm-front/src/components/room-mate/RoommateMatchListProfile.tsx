import Image from "next/image";
import * as React from "react";
import { SVGProps, useState } from "react";

import PreferredLifestyleReviewer from "@/components/room-mate/PreferredLifestyleReviewer";
import { postFollow } from "@/lib/api/common";
import useRoomMateRecommendResultProfile from "@/lib/hooks/useRoomMateRecommendResultProfile";

interface Props {
  memberId: number;
}

const RoommateMatchListProfile = (props: Props) => {
  const { memberId } = props;
  const { recommendRoomMateProfile } = useRoomMateRecommendResultProfile(memberId);
  const [isPreferredLifestyleReviewerOpen, setIsPreferredLifestyleReviewerOpen] = useState(false);

  return (
    <div
      className={
        isPreferredLifestyleReviewerOpen
          ? "flex flex-col gap-y-3 rounded-[24px] border-[1px] border-gray1 px-4 py-3"
          : "flex flex-col gap-y-1 rounded-[24px] border-[1px] border-gray1 px-4 py-3"
      }>
      {/* 이미지, 닉네임 */}
      <div className={"flex justify-between items-center"}>
        <div className={"flex items-center gap-x-2"}>
          <div className={"relative w-[40px] h-[40px]"}>
            <Image
              src={recommendRoomMateProfile ? recommendRoomMateProfile.profileUrl : "/profile.png"}
              fill
              className={"object-cover rounded-full"}
              alt={memberId}></Image>
          </div>
          <div>{recommendRoomMateProfile?.nickname}</div>
        </div>
        {isPreferredLifestyleReviewerOpen ? (
          <DropUpIcon
            onClick={() => {
              setIsPreferredLifestyleReviewerOpen(!isPreferredLifestyleReviewerOpen);
            }}
          />
        ) : (
          <DropDownIcon
            onClick={() => {
              setIsPreferredLifestyleReviewerOpen(!isPreferredLifestyleReviewerOpen);
            }}
          />
        )}
      </div>
      {isPreferredLifestyleReviewerOpen ? <PreferredLifestyleReviewer memberId={memberId} /> : null}

      {/* 찜, 채팅, 팔로우 */}
      <div className={"flex justify-between"}>
        <div className={"flex gap-x-2"}>
          <button
            className={"border-[1px] border-gray1 text-gray4 text-h5 rounded-full py-[6px] px-[20px] items-center"}>
            <HeartIcon />
          </button>
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
        <button
          //TODO: 채팅이동
          className={"p-[10px] rounded-full border-[1px] border-gray1 items-center gap-x-1"}>
          <FollowChatIcon />
        </button>
      </div>
    </div>
  );
};
export default RoommateMatchListProfile;
const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} fill="none" {...props}>
    <g fill="#727375" clipPath="url(#a)">
      <path d="M9.24 12.554a.47.47 0 0 0-.646-.198l-.16.083a1.83 1.83 0 0 1-1.651 0 13 13 0 0 1-2.297-1.485C1.79 8.753 1.222 6.187 1.1 5.176l-.019-.211c-.013-.135-.013-.218-.013-.23 0-1.793 1.415-3.367 3.027-3.367 1.51 0 2.867.717 3.545 1.869a.481.481 0 1 0 .832-.487C7.622 1.304 5.945.408 4.102.408 1.939.408.108 2.392.108 4.734c0 0 0 .115.013.307 0 .09.013.173.026.256.134 1.12.768 3.974 3.73 6.4a13.5 13.5 0 0 0 2.464 1.593c.397.198.832.3 1.261.3s.864-.102 1.26-.3l.173-.09a.47.47 0 0 0 .199-.646zM10.43 12.286a.5.5 0 1 0 0-.998.5.5 0 0 0 0 .998" />
      <path d="M11.774 11.141a.483.483 0 0 1-.34-.826c2.1-2.053 2.567-4.274 2.67-5.138.006-.07.019-.14.019-.211.013-.14.013-.224.013-.23 0-1.799-1.415-3.373-3.027-3.373-1.51 0-2.867.717-3.545 1.869a.481.481 0 1 1-.832-.487C7.582 1.3 9.259.403 11.102.403c2.163 0 3.987 1.984 3.987 4.333 0 0 0 .115-.013.307 0 .083-.012.173-.025.256-.115.953-.634 3.436-2.95 5.702a.5.5 0 0 1-.333.134z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.108.408h15v13.183h-15z" />
      </clipPath>
    </defs>
  </svg>
);
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
const DropDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={29} height={24} fill="none" {...props}>
    <path fill="#666" d="m14.108 15.7-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4z" />
  </svg>
);
const DropUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={24} fill="none" {...props}>
    <path fill="#666" d="m14 8.3 6 6-1.4 1.4-4.6-4.6-4.6 4.6L8 14.3z" />
  </svg>
);
