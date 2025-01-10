import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SVGProps, useState } from "react";
import { useRecoilState } from "recoil";

import { createChatRoom, getRoomId, patchRejoinChatRoom } from "@/lib/api/chat";
import { deleteRoomMateMatchingRequest } from "@/lib/api/room-mate";
import { chatRoomUUIDAtom, memberIdAtom } from "@/recoil/chat/atom";
import { ErrorResponseData } from "@/types/chat/page";

interface Props {
  memberId: number;
  profileUrl: string;
  nickname: string;
  mutate: any;
}
const ApplicationSentProfile = (props: Props) => {
  const { memberId, profileUrl, nickname, mutate } = props;
  const [isPreferredLifestyleReviewerOpen, setIsPreferredLifestyleReviewerOpen] = useState(false);

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

  return (
    <div className={"flex flex-col gap-y-1 py-3 px-4 rounded-[24px] border border-gray1 "}>
      {/* 이미지, 닉네임 */}
      <section className={"flex justify-between items-center"}>
        <div className={"flex items-center gap-x-2"}>
          <img
            src={profileUrl ? profileUrl : "/profile.png"}
            className={"object-cover rounded-full w-[40px] h-[40px]"}
            alt={String(memberId)}></img>
          <div>{nickname}</div>
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
      </section>

      {/* 매칭 신청 취소 */}
      <section className={"flex justify-end gap-x-2"}>
        <button
          onClick={() => {
            deleteRoomMateMatchingRequest(memberId).then(() => {
              mutate();
            });
          }}
          className={"px-5 py-[6px] rounded-full bg-gray1 text-gray5 text-h5"}>
          매칭 신청 취소
        </button>
        <button
          onClick={() => {
            handleSubmit(memberId);
          }}
          className={"border border-gray1 rounded-full p-2"}>
          <FollowChatIcon />
        </button>
      </section>
    </div>
  );
};
export default ApplicationSentProfile;

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
