import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { postFollow } from "@/lib/api/common";
import useUserProfile from "@/lib/hooks/useUserProfile";
import { selectedMemberIdAtom } from "@/recoil/atom";

const ProfileModal = () => {
  const [selectedMemberId, setSelectedMemberId] = useRecoilState(selectedMemberIdAtom);
  const { userProfileData } = useUserProfile(selectedMemberId);

  useEffect(() => {
    console.log(userProfileData);
  }, [userProfileData]);

  return (
    <div className={"absolute left-0 right-0 z-40 flex flex-col bg-[rgba(0,0,0,0.6)] min-h-screen"}>
      <div className={"flex flex-col gap-y-[32px] w-full fixed bottom-0 px-[28px] py-[32px] rounded-t-[32px] bg-white"}>
        {/* profile */}
        <div className={"flex flex-col gap-y-2 justify-center items-center"}>
          <div className={"relative w-[80px] h-[80px] "}>
            <Image
              src={userProfileData ? userProfileData.profileUrl : "/unnimm.jpg"}
              fill
              alt={userProfileData ? userProfileData.profileUrl : "/unnimm.jpg"}
              className={"object-cover rounded-full"}></Image>
          </div>
          <div className={"flex flex-col gap-y-1 items-center"}>
            <div className={"text-h3 font-semibold"}>{userProfileData?.nickname}</div>
            <div className={"text-h5 text-gray5"}>{userProfileData?.memberDormitory}</div>
          </div>
        </div>
        {/* button */}
        <div className={"flex justify-between gap-x-3"}>
          <button
            onClick={() => {
              postFollow(userProfileData?.memberId);
            }}
            className={"bg-gray1 w-full text-gray5 text-h5 rounded-[20px] py-[14px]"}>
            팔로우
          </button>
          <button className={"bg-primary w-full text-white text-h5 rounded-[20px] py-[14px]"}>채팅하기</button>
        </div>
      </div>
    </div>
  );
};
export default ProfileModal;
