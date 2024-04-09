import ProfileIcon from "@/assets/common/ProfileIcon";
import ChatIcon from "@/assets/mypage/ChatIcon";
interface Props {
  name: string;
}
const RoommateWishlistUserProfile = (props: Props) => {
  const { name } = props;
  return (
    <div className={"flex flex-col gap-y-3 rounded-[24px] border-[1px] border-gray1 px-4 py-3 w-fit"}>
      <div className={"flex gap-x-3 "}>
        <ProfileIcon />
        <div className={"flex flex-col"}>
          <div className={"text-h4 font-semibold"}>{name}</div>
          <div className={"text-h5 text-gray5"}>양진재</div>
        </div>
      </div>
      <div className={"flex gap-x-2"}>
        <button className={"px-6 py-2 rounded-full text-gray4 text-h5 border-[1px] border-gray1"}>팔로우</button>
        <button className={"flex justify-center items-center bg-primary rounded-full w-[36px] h-[36px]"}>
          <ChatIcon />
        </button>
      </div>
    </div>
  );
};
export default RoommateWishlistUserProfile;
