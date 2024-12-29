import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as React from "react";
import { useRecoilState } from "recoil";

import { createChatRoom, getRoomId } from "@/lib/api/chat";
import { postFollow } from "@/lib/api/common";
import useUserProfile from "@/lib/hooks/useUserProfile";
import { chatRoomIdAtom, chatRoomUUIDAtom, memberIdAtom } from "@/recoil/chat/atom";

interface Props {
  memberId: number | undefined;
}

const ProfileModal = (props: Props) => {
  const router = useRouter();
  const { memberId } = props;
  const { userProfileData } = useUserProfile(memberId);

  useEffect(() => {
    console.log(userProfileData);
  }, [userProfileData]);

  const handleSubmit = async (memberId: number | undefined) => {
    try {
      const response = await createChatRoom(memberId);
      if (response && response.data && response.data.code === 201) {
        router.push(`/chat/${response.data.data.chatRoomId}`);
      }
    } catch (error: any) {
      const axiosError = error as AxiosError; // AxiosError로 캐스팅
      console.log("axiosError", axiosError.response?.status);
      if (axiosError.response?.status === 409) {
        getRoomId(memberId).then((response) => {
          router.push(`/chat/${response.data.data.roomId}`);
        });
      }
    }
  };

  return (
    <div className={"fixed left-0 right-0 top-0 z-40 flex flex-col bg-[rgba(0,0,0,0.6)] min-h-screen"}>
      <div className={"flex flex-col gap-y-[32px] w-full fixed bottom-0 px-[28px] py-[32px] rounded-t-[32px] bg-white"}>
        {/* profile */}
        <div className={"flex flex-col gap-y-2 justify-center items-center"}>
          <div className={"relative w-[80px] h-[80px] "}>
            <Image
              src={userProfileData ? userProfileData.data.profileUrl : "/unnimm.jpg"}
              fill
              alt={userProfileData ? userProfileData.data.profileUrl : "/unnimm.jpg"}
              className={"object-cover rounded-full"}></Image>
          </div>
          <div className={"flex flex-col gap-y-1 items-center"}>
            <div className={"text-h3 font-semibold"}>{userProfileData?.data.nickname}</div>
            <div className={"text-h5 text-gray5"}>{userProfileData?.data.dormitoryType}</div>
          </div>
        </div>

        {/* button */}
        <div className={"flex justify-between gap-x-3"}>
          {userProfileData?.data.isFollowing ? null : (
            <button
              onClick={() => {
                postFollow(userProfileData?.data.memberId);
              }}
              className={"bg-gray1 w-full text-gray5 text-h5 rounded-[20px] py-[14px]"}>
              팔로우
            </button>
          )}
          <button
            onClick={() => {
              handleSubmit(userProfileData?.data.memberId).then((res) => {
                console.log("res", res);
              });
            }}
            className={"bg-primary w-full text-white text-h5 rounded-[20px] py-[14px]"}>
            채팅하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileModal;
