import { SVGProps, useEffect } from "react";

import useUserProfile from "@/lib/hooks/useUserProfile";
interface Props {
  message: string;
  memberId: number;
  sentTime: string;
}
const OtherUserChatContent = (props: Props) => {
  const { message, memberId, sentTime } = props;
  const { userProfileData } = useUserProfile(memberId);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const period = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시를 12시로 변환

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${period} ${hours}:${formattedMinutes}`;
  };

  useEffect(() => {
    console.log("내 채팅", message);
  }, [message]);

  return (
    <div className={"flex items-end px-5 w-full gap-x-2"}>
      <div className={"flex justify-start gap-x-1"}>
        {userProfileData ? (
          <img
            src={userProfileData.data.profileUrl}
            alt={userProfileData.data.profileUrl}
            className={"object-cover rounded-full  w-[36px] h-[36px]"}></img>
        ) : (
          <ProfileIcon />
        )}
        <div className={"flex flex-col gap-y-1"}>
          <div className={"text-h5"}>{userProfileData?.data.nickname}</div>
          <div>
          <div className={"bg-gray1 w-[8px] h-[8px] rounded-full"} />
            <div className={"py-2 px-4 rounded-full bg-gray1"}>{message}</div>
          </div>
        </div>
      </div>
      <div className={"text-gray4 text-h6"}>{formatTime(sentTime)}</div>
    </div>
  );
};
export default OtherUserChatContent;

const ProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={37} height={36} fill="none" {...props}>
    <path fill="#E4E5E7" d="M18.507 36c9.941 0 18-8.059 18-18s-8.059-18-18-18-18 8.059-18 18 8.059 18 18 18" />
  </svg>
);
