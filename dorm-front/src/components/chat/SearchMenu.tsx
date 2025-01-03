import { Dispatch, SetStateAction } from "react";

interface Props {
  type: "전체" | "팔로잉" | "채팅방" | "메시지";
  setType: Dispatch<SetStateAction<"전체" | "팔로잉" | "채팅방" | "메시지">>;
}
const SearchMenu = (props: Props) => {
  const { type, setType } = props;
  return (
    <div className={"fixed top-[46px] mt-[8px] px-5 border-b-[1px] border-gray1 w-full bg-white"}>
      <button
        onClick={() => {
          setType("전체");
        }}
        className={
          type === "전체"
            ? "px-3 py-2 text-primary font-semibold border-b-[2px] border-primary"
            : "px-3 py-2 text-gray3"
        }>
        전체
      </button>
      <button
        onClick={() => {
          setType("팔로잉");
        }}
        className={
          type === "팔로잉"
            ? "px-3 py-2 text-primary font-semibold border-b-[2px] border-primary"
            : "px-3 py-2 text-gray3"
        }>
        팔로잉
      </button>
      <button
        onClick={() => {
          setType("채팅방");
        }}
        className={
          type === "채팅방"
            ? "px-3 py-2 text-primary font-semibold border-b-[2px] border-primary"
            : "px-3 py-2 text-gray3"
        }>
        채팅방
      </button>
      <button
        onClick={() => {
          setType("메시지");
        }}
        className={
          type === "메시지"
            ? "px-3 py-2 text-primary font-semibold border-b-[2px] border-primary"
            : "px-3 py-2 text-gray3"
        }>
        메시지
      </button>
    </div>
  );
};
export default SearchMenu;
