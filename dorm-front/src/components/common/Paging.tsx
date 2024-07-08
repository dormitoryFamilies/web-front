import * as React from "react";
import { SVGProps } from "react";

interface Props {
  handlerBeforeButton: () => void;
  handlerNextButton: () => void;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  totalPageNumber: number | undefined;
}
const Paging = (props: Props) => {
  const { handlerBeforeButton, handlerNextButton, pageNumber, setPageNumber, totalPageNumber } = props;

  return (
    <>
      <div className={"flex absolute gap-x-3 bottom-8 w-full py-1 items-center justify-center"}>
        <BeforeIcon onClick={handlerBeforeButton} />
        {totalPageNumber
          ? Array.from({ length: totalPageNumber }, (_, i) => i + 1).map((num) => {
              return (
                <button
                  key={totalPageNumber}
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
              ); // 원하는 로직을 이곳에 추가하세요
            })
          : null}
        <NextIcon onClick={handlerNextButton} />
      </div>
    </>
  );
};
export default Paging;

const BeforeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={12} fill="none" {...props}>
    <path stroke="#BEBEBE" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7.472 1-5 5 5 5" />
  </svg>
);

const NextIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={12} fill="none" {...props}>
    <path stroke="#BEBEBE" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m2.472 11 5-5-5-5" />
  </svg>
);
