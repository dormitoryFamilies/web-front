import { twMerge } from "tailwind-merge";

import { BoardStatusType } from "@/types/board/type";

interface Props {
  className?: string;
  statusFilterContents: BoardStatusType[];
  setSelectedStatusType: React.Dispatch<React.SetStateAction<BoardStatusType>>;
  setIsStatusFilterClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticleStatusFilter = (props: Props) => {
  const { className, statusFilterContents, setSelectedStatusType, setIsStatusFilterClick } = props;
  return (
    <div
      className={twMerge(
        "flex flex-col gap-y-2 absolute w-[80px] top-8 bg-white border-[1px] border-gray1 rounded-[16px] py-2",
        className,
      )}>
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
