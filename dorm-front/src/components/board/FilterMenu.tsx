import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { boardTypeState } from '@/recoil/board/atom';

const FilterMenu = () => {
  const [isClick, setIsClick] = useRecoilState(boardTypeState);
  const boardTypes = useMemo(
    () => [
      {
        label: "전체",
        boardType: 0,
        active: isClick == 0,
      },
      {
        label: "도와주세요",
        boardType: 1,
        active: isClick == 1,
      },
      {
        label: "함께해요",
        boardType: 2,
        active: isClick == 2,
      },
      {
        label: "나눔해요",
        boardType: 3,
        active: isClick == 3,
      },
      {
        label: "궁금해요",
        boardType: 4,
        active: isClick == 4,
      },
      {
        label: "분실신고",
        boardType: 5,
        active: isClick == 5,
      },
    ],
    [isClick],
  );

  return (
    <div className="flex gap-x-6 overflow-y-scroll border-b border-gray1 px-5">
      {boardTypes.map((item, index) => {
        return (
          <button key={index}>
            <div
              className={item.active ? "text-primary border-b-[2px] border-primary font-semibold" : "text-gray3"}
              onClick={() => {
                setIsClick(item.boardType);
              }}>
              {item.label}
            </div>
          </button>
        );
      })}
    </div>
  );
};
export default FilterMenu;
