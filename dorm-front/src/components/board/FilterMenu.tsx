import { BoardType } from "@/types/board/type";

interface Props {
  boardType: BoardType;
  setBoardType: React.Dispatch<React.SetStateAction<BoardType>>;
  setActiveFilter: React.Dispatch<React.SetStateAction<"sort" | "status" | null>>;
}

const FilterMenu = (props: Props) => {
  const { boardType, setBoardType, setActiveFilter } = props;

  const changeBoardType = (type: BoardType) => {
    setBoardType(type);
  };

  //TODO: 언젠가 리팩토링 하기
  return (
    <div
      className={"bg-white px-5 py-1 border-b-[1px] border-gray1 flex gap-x-2 w-full overflow-x-scroll scroll-hidden"}>
      <button
        onClick={() => {
          changeBoardType("전체");
          setActiveFilter(null);
        }}
        className={"flex-shrink-0"}>
        <span
          className={
            boardType === "전체"
              ? "text-primary border-b-[2px] font-semibold px-[12px] py-[5px]"
              : "text-gray3 px-[12px] py-[5px]"
          }>
          전체
        </span>
      </button>
      <button
        onClick={() => {
          changeBoardType("도와주세요");
          setActiveFilter(null);
        }}
        className={"flex-shrink-0"}>
        <span
          className={
            boardType === "도와주세요"
              ? "text-primary border-b-[2px] font-semibold px-[12px] py-[5px]"
              : "text-gray3 px-[12px] py-[5px]"
          }>
          도와주세요
        </span>
      </button>
      <button
        onClick={() => {
          changeBoardType("함께해요");
          setActiveFilter(null);
        }}
        className={"flex-shrink-0"}>
        <span
          className={
            boardType === "함께해요"
              ? "text-primary border-b-[2px] font-semibold px-[12px] py-[5px]"
              : "text-gray3 px-[12px] py-[5px]"
          }>
          함께해요
        </span>
      </button>
      <button
        onClick={() => {
          changeBoardType("나눔해요");
          setActiveFilter(null);
        }}
        className={"flex-shrink-0"}>
        <span
          className={
            boardType === "나눔해요"
              ? "text-primary border-b-[2px] font-semibold px-[12px] py-[5px]"
              : "text-gray3 px-[12px] py-[5px]"
          }>
          나눔해요
        </span>
      </button>
      <button
        onClick={() => {
          changeBoardType("궁금해요");
          setActiveFilter(null);
        }}
        className={"flex-shrink-0"}>
        <span
          className={
            boardType === "궁금해요"
              ? "text-primary border-b-[2px] font-semibold px-[12px] py-[5px]"
              : "text-gray3 px-[12px] py-[5px]"
          }>
          궁금해요
        </span>
      </button>
      <button
        onClick={() => {
          changeBoardType("분실신고");
          setActiveFilter(null);
        }}
        className={"flex-shrink-0"}>
        <span
          className={
            boardType === "분실신고"
              ? "text-primary border-b-[2px] font-semibold px-[12px] py-[5px]"
              : "text-gray3 px-[12px] py-[5px]"
          }>
          분실신고
        </span>
      </button>
    </div>
  );
};
export default FilterMenu;
