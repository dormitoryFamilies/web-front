import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SVGProps, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Button from "@/components/common/Button";
import PreferredLifestyleReviewer from "@/components/room-mate/PreferredLifestyleReviewer";
import { createChatRoom, getRoomId, patchRejoinChatRoom } from "@/lib/api/chat";
import { deleteFollowing, postFollow } from "@/lib/api/common";
import { deleteRoomMateWish, postRoomMateWish } from "@/lib/api/room-mate";
import useFollowStatus from "@/lib/hooks/useFollowStatus";
import useRoomMateRecommendResultProfile from "@/lib/hooks/useRoomMateRecommendResultProfile";
import useRoomMateWishStatus from "@/lib/hooks/useRoomMateWishStatus";
import { chatRoomUUIDAtom, memberIdAtom } from "@/recoil/chat/atom";
import { ErrorResponseData } from "@/types/chat/page";

interface Props {
  memberId: number;
  allDoomzListMutate?: any;
}

const RoommateMatchListProfile = (props: Props) => {
  const { memberId, allDoomzListMutate } = props;
  const { recommendRoomMateProfile } = useRoomMateRecommendResultProfile(memberId);
  const { wishStatus, wishStatusMutate } = useRoomMateWishStatus(memberId);
  const [isPreferredLifestyleReviewerOpen, setIsPreferredLifestyleReviewerOpen] = useState(false);
  const { followStatus } = useFollowStatus(memberId);
  const [chatRoomUUID, setChatRoomUUID] = useRecoilState(chatRoomUUIDAtom);
  const [memberIdState, setMemberIdState] = useRecoilState(memberIdAtom);
  const router = useRouter();

  const handleSubmit = async (memberId: string | string[] | number | undefined) => {
    try {
      const response = await createChatRoom(memberId);
      console.log("response", response);
      if (response && response.data && response.data.code === 201) {
        setChatRoomUUID(response.data.data.roomUUID);
        setMemberIdState(memberId);
        router.push(`/chat/${response.data.data.chatRoomId}`);
      }
    } catch (error: any) {
      const axiosError = error as AxiosError<ErrorResponseData>; // AxiosError로 캐스팅
      console.log("axiosError", axiosError.response?.status);
      if (axiosError.response?.status === 409) {
        if (axiosError.response?.data?.data?.errorMessage === "채팅방이 존재합니다. 재입장해주세요.") {
          patchRejoinChatRoom(memberId).then((res) => {
            setChatRoomUUID(res.data.data.roomUUID);
            setMemberIdState(memberId);
            console.log("res", res);
          });
        } else if (axiosError.response?.data?.data?.errorMessage === "이미 채팅방에 입장한 상태입니다") {
          getRoomId(memberId).then((response) => {
            console.log("response", response);
            setChatRoomUUID(response.data.data.roomUUID);
            setMemberIdState(memberId);
            router.push(`/chat/${response.data.data.chatRoomId}`);
          });
        }
      }
    }
  };

  useEffect(() => {
    console.log("recommendRoomMateProfile", recommendRoomMateProfile);
  }, [recommendRoomMateProfile]);

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
          <img
            src={recommendRoomMateProfile ? recommendRoomMateProfile.data.profileUrl : "/profile.png"}
            className={"rounded-full  w-[40px] h-[40px]"}
            alt={String(memberId)}></img>
          <div>{recommendRoomMateProfile?.data.nickname}</div>
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
          <Button
            LeftIcon={wishStatus?.data.isRoommateWished ? WhiteHeartIcon : HeartIcon}
            onClick={() => {
              if (wishStatus?.data.isRoommateWished) {
                deleteRoomMateWish(memberId).then(() => {
                  wishStatusMutate();
                });
              } else {
                postRoomMateWish(memberId).then(() => {
                  wishStatusMutate();
                });
              }
            }}
            className={wishStatus?.data.isRoommateWished ? "bg-primaryMid-button" : "border-gray1-button"}
            secondClassName={"py-[9px] px-4"}
          />
          <Button
            onClick={() => {
              if (followStatus?.data.isFollowing) {
                deleteFollowing(memberId).then(() => {
                  console.log("팔로우 취소 성공");
                  allDoomzListMutate();
                });
              } else {
                postFollow(memberId).then((r) => {
                  console.log("팔로우 성공", r);
                  allDoomzListMutate();
                });
              }
            }}
            secondClassName={"px-5 py-[6px]"}
            className={followStatus?.data.isFollowing ? "bg-gray1-button" : "border-gray1-button"}>
            {followStatus?.data.isFollowing ? "팔로우 취소" : "팔로우"}
          </Button>
        </div>
        <Button
          onClick={() => {
            handleSubmit(memberId);
          }}
          RightIcon={FollowChatIcon}
          secondClassName={"p-2"}
          className={"border-gray1-button"}
        />
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

const WhiteHeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={15} height={14} fill="none" {...props}>
    <g fill="#fff" clipPath="url(#a)">
      <path d="M9.132 12.554a.47.47 0 0 0-.647-.199l-.16.084a1.83 1.83 0 0 1-1.65 0 13 13 0 0 1-2.298-1.485C1.683 8.753 1.113 6.187.992 5.175l-.02-.21C.96 4.83.96 4.746.96 4.733c0-1.792 1.414-3.366 3.027-3.366 1.51 0 2.867.717 3.545 1.868a.481.481 0 1 0 .832-.486C7.513 1.304 5.836.408 3.994.408 1.83.408 0 2.392 0 4.734c0 0 0 .115.013.307 0 .09.013.173.025.256.135 1.12.768 3.974 3.731 6.4a13.5 13.5 0 0 0 2.464 1.593c.397.198.832.3 1.26.3.43 0 .865-.102 1.261-.3l.173-.09a.47.47 0 0 0 .198-.646zM10.322 12.286a.5.5 0 1 0 0-.999.5.5 0 0 0 0 .999" />
      <path d="M11.666 11.141a.483.483 0 0 1-.34-.825c2.1-2.055 2.567-4.275 2.67-5.139.005-.07.018-.14.018-.211.013-.141.013-.224.013-.23 0-1.799-1.414-3.373-3.027-3.373-1.51 0-2.867.717-3.545 1.869a.481.481 0 1 1-.832-.487C7.474 1.3 9.151.403 10.993.403c2.164 0 3.988 1.984 3.988 4.332 0 0 0 .116-.013.308 0 .083-.013.172-.026.256-.115.953-.633 3.436-2.95 5.701a.5.5 0 0 1-.333.135z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .408h15v13.183H0z" />
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
