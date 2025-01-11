import { DormitoryType } from "@/types/mypage/type";

interface Props {
  dormitoryFilterContents: DormitoryType[];
  setSelectedDormitoryType: React.Dispatch<React.SetStateAction<DormitoryType>>;
  setIsDormitoryFilterClick: React.Dispatch<React.SetStateAction<boolean>>;
}
const InterestListDormitoryFilter = (props: Props) => {
  const { dormitoryFilterContents, setIsDormitoryFilterClick, setSelectedDormitoryType } = props;
  return (
    <div
      className={
        "flex flex-col gap-y-2 absolute top-8 w-[80px] bg-white border-[1px] border-gray1 rounded-[16px] py-2"
      }>
      {dormitoryFilterContents.map((dormitoryFilterContent, index) => {
        return (
          <div
            onClick={() => {
              setSelectedDormitoryType(dormitoryFilterContent);
              setIsDormitoryFilterClick(false);
            }}
            key={index}
            className={"py-[6px] px-[12px] text-gray4 text-h5"}>
            {dormitoryFilterContent}
          </div>
        );
      })}
    </div>
  );
};
export default InterestListDormitoryFilter;
