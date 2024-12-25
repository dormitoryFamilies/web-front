import * as React from "react";
import { SVGProps, useState } from "react";

interface Props {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  totalPageNumber: number | undefined | null;
}
const Paging = (props: Props) => {
  const { pageNumber, setPageNumber, totalPageNumber } = props;
  const [currentGroup, setCurrentGroup] = useState(0); // 현재 페이지 그룹 (0부터 시작)
  const ITEMS_PER_GROUP = 5; // 한 그룹당 보여줄 페이지 수

  // 현재 보여줄 페이지 번호들을 계산
  const getCurrentPageNumbers = () => {
    if (!totalPageNumber) return [];

    const start = currentGroup * ITEMS_PER_GROUP;
    const end = Math.min(start + ITEMS_PER_GROUP, totalPageNumber);
    return Array.from({ length: end - start }, (_, i) => start + i + 1);
  };

  // Next 버튼 핸들러
  const handleNext = () => {
    if (!totalPageNumber) return;

    const maxGroup = Math.ceil(totalPageNumber / ITEMS_PER_GROUP) - 1;
    if (currentGroup < maxGroup) {
      setCurrentGroup((prev) => prev + 1);
    }
  };

  // Previous 버튼 핸들러
  const handlePrevious = () => {
    if (currentGroup > 0) {
      setCurrentGroup((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className={"flex absolute gap-x-3 bottom-8 w-full py-1 items-center justify-center"}>
        <PreviousIcon
          onClick={handlePrevious}
          className={currentGroup === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        />
        {totalPageNumber
          ? getCurrentPageNumbers().map((num) => {
              return (
                <div key={num}>
                  <button
                    onClick={() => {
                      setPageNumber(num - 1);
                    }}
                    className={
                      pageNumber + 1 === num
                        ? "flex items-center justify-center text-white bg-primaryMid rounded-full w-[28px] h-[28px]"
                        : "flex items-center justify-center text-gray3 w-[28px] h-[28px]"
                    }>
                    {num}
                  </button>
                </div>
              );
            })
          : null}
        <NextIcon
          onClick={handleNext}
          className={
            !totalPageNumber || currentGroup >= Math.ceil(totalPageNumber / ITEMS_PER_GROUP) - 1
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }
        />
      </div>
    </>
  );
};
export default Paging;

const PreviousIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={12} fill="none" {...props}>
    <path stroke="#BEBEBE" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7.472 1-5 5 5 5" />
  </svg>
);

const NextIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={12} fill="none" {...props}>
    <path stroke="#BEBEBE" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m2.472 11 5-5-5-5" />
  </svg>
);
