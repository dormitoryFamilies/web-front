interface Props {
  profileMenu: "프로필" | "생활 습관" | "기타 습관";
  setProfileMenu: React.Dispatch<React.SetStateAction<"프로필" | "생활 습관" | "기타 습관">>;
}

const RoomMateDoomzProfileMenu = (props: Props) => {
  const { profileMenu, setProfileMenu } = props;

  return (
    <div className={"mt-[16px] px-5 border-b border-gray1"}>
      <button
        onClick={() => {
          setProfileMenu("프로필");
        }}
        className={
          profileMenu === "프로필"
            ? "px-4 py-2 text-primary border-b-[2px] border-primary font-semibold"
            : "px-4 py-2 text-gray3"
        }>
        프로필
      </button>
      <button
        onClick={() => {
          setProfileMenu("생활 습관");
        }}
        className={
          profileMenu === "생활 습관"
            ? "px-4 py-2 text-primary border-b-[2px] border-primary font-semibold"
            : "px-4 py-2 text-gray3"
        }>
        생활 습관
      </button>
      <button
        onClick={() => {
          setProfileMenu("기타 습관");
        }}
        className={
          profileMenu === "기타 습관"
            ? "px-4 py-2 text-primary border-b-[2px] border-primary font-semibold"
            : "px-4 py-2 text-gray3"
        }>
        기타 습관
      </button>
    </div>
  );
};
export default RoomMateDoomzProfileMenu;