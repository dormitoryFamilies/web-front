import { BoardSortType } from "@/types/board/type";

interface Props {
  sortFilterContents: BoardSortType[];
  setSelectedSortType: React.Dispatch<React.SetStateAction<BoardSortType>>;
  setIsSortingFilterClick: React.Dispatch<React.SetStateAction<boolean>>;
}
const ArticleSortFilter = (props: Props) => {
  const { sortFilterContents, setSelectedSortType, setIsSortingFilterClick } = props;
  const formatSortContent = (sortFilterContent: BoardSortType) => {
    if (sortFilterContent === "createdAt") {
      return "최신순";
    } else {
      return "인기순";
    }
  };

  return (
    <div
      className={
        "absolute flex flex-col gap-y-2 top-[100%] w-[80px] bg-white border-[1px] border-gray1 rounded-[16px] py-2"
      }>
      {sortFilterContents.map((sortFilterContent, index) => {
        return (
          <div
            onClick={() => {
              setSelectedSortType(sortFilterContent);
              setIsSortingFilterClick(false);
            }}
            key={index}
            className={"py-[6px] px-[12px] text-gray4 text-h5"}>
            {formatSortContent(sortFilterContent)}
          </div>
        );
      })}
    </div>
  );
};
export default ArticleSortFilter;
