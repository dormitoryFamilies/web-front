import { BoardStatusType } from "@/types/board/type";

interface Props {
  statusFilterContents: BoardStatusType[];
  setSelectedStatusType: React.Dispatch<React.SetStateAction<BoardStatusType>>;
  setIsStatusFilterClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticleStatusFilter = (props: Props) => {
  const { statusFilterContents, setSelectedStatusType, setIsStatusFilterClick } = props;
  return (
    <div
      className={
        "flex flex-col gap-y-2 absolute w-[80px] top-[100%] left-[25%] bg-white border-[1px] border-gray1 rounded-[16px] py-2"
      }>
      {statusFilterContents.map((statusFilterContent, index) => {
        return (
          <div
            onClick={() => {
              setSelectedStatusType(statusFilterContent);
              setIsStatusFilterClick(false);
            }}
            key={index}
            className={"py-[6px] px-[12px] text-gray4 text-h5"}>
            {statusFilterContent}
          </div>
        );
      })}
    </div>
  );
};
export default ArticleStatusFilter;
