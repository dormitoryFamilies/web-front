import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { postFollow } from "@/lib/api/common";
import useProfile from "@/lib/hooks/useProfile";
import { selectedMemberIdAtom } from "@/recoil/atom";

const ProfileModal = () => {
  const [selectedMemberId, setSelectedMemberId] = useRecoilState(selectedMemberIdAtom);
  const { profileData } = useProfile(selectedMemberId);

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  return (
    <div className={"absolute left-0 right-0 z-40 flex flex-col bg-[rgba(0,0,0,0.6)] min-h-screen"}>
      <div className={"flex flex-col gap-y-[32px] w-full fixed bottom-0 px-[28px] py-[32px] rounded-t-[32px] bg-white"}>
        {/* profile */}
        <div className={"flex flex-col gap-y-2 justify-center items-center"}>
          <div className={"relative w-[80px] h-[80px] "}>
            <Image
              src={profileData ? profileData.profileUrl : "/unnimm.jpg"}
              fill
              alt={profileData ? profileData.profileUrl : "/unnimm.jpg"}
              className={"object-cover rounded-full"}></Image>
          </div>
          <div className={"flex flex-col gap-y-1 items-center"}>
            <div className={"text-h3 font-semibold"}>{profileData?.nickname}</div>
            <div className={"text-h5 text-gray5"}>{profileData?.memberDormitory}</div>
          </div>
        </div>
        {/* button */}
        <div className={"flex justify-between gap-x-3"}>
          <button
            onClick={() => {
              postFollow(profileData?.memberId);
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
