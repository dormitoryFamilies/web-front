import { InterestListType } from "@/types/mypage/type";
interface Props {
  interestListType: InterestListType;
  setInterestListType: React.Dispatch<React.SetStateAction<InterestListType>>;
  numberOfDoomz: number | null;
  numberOfBoards: number | null;
}

const InterestListMenu = (props: Props) => {
  const { interestListType, setInterestListType, numberOfDoomz, numberOfBoards } = props;
  const changeBoardType = (type: InterestListType) => {
    setInterestListType(type);
  };
  return (
    <>
      <div className={"bg-white px-5 border-b-[1px] border-gray1 flex gap-x-2 w-full overflow-x-scroll scroll-hidden"}>
        <button
          onClick={() => {
            changeBoardType("둠즈");
          }}
          className={
            interestListType === "둠즈"
              ? "w-full text-primary border-b-[2px] font-semibold px-[12px] py-[5px]"
              : "w-full text-gray3 px-[12px] py-[5px]"
          }>
          둠즈({numberOfDoomz})
        </button>
        <button
          onClick={() => {
            changeBoardType("게시판");
          }}
          className={
            interestListType === "게시판"
              ? "w-full text-primary border-b-[2px] font-semibold px-[12px] py-[5px]"
              : "w-full text-gray3 px-[12px] py-[5px]"
          }>
          게시판({numberOfBoards})
        </button>
      </div>
    </>
  );
};
export default InterestListMenu;
