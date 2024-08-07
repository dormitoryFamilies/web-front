import { FollowType, MemberProfile } from "@/types/mypage/type";

interface Props {
  followType: FollowType;
  setFollowType: React.Dispatch<React.SetStateAction<FollowType>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchResults: React.Dispatch<React.SetStateAction<MemberProfile[] | undefined>>;
}

const MyPageFollowMenu = (props: Props) => {
  const { followType, setFollowType, setSearchValue, setSearchResults } = props;

  const changeBoardType = (type: FollowType) => {
    setFollowType(type);
  };

  return (
    <>
      <div className={"bg-white px-5 border-b-[1px] border-gray1 flex gap-x-2 w-full overflow-x-scroll scroll-hidden"}>
        <button
          onClick={() => {
            changeBoardType("팔로워");
            setSearchValue("");
            setSearchResults(undefined);
          }}
          className={
            followType === "팔로워"
              ? "w-full text-primary border-b-[2px] font-semibold px-[12px] py-[5px]"
              : "w-full text-gray3 px-[12px] py-[5px]"
          }>
          팔로워
        </button>
        <button
          onClick={() => {
            changeBoardType("팔로잉");
            setSearchValue("");
            setSearchResults(undefined);
          }}
          className={
            followType === "팔로잉"
              ? "w-full text-primary border-b-[2px] font-semibold px-[12px] py-[5px]"
              : "w-full text-gray3 px-[12px] py-[5px]"
          }>
          팔로잉
        </button>
      </div>
    </>
  );
};
export default MyPageFollowMenu;
