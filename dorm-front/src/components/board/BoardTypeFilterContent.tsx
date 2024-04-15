"use client";

import React from "react";
import { useRecoilState } from "recoil";

import { postDataState } from "@/recoil/board/atom";
import { BoardTypeList } from "@/types/global";
interface Props {
  content: BoardTypeList[];
  setCloseModalState: React.Dispatch<React.SetStateAction<boolean>>;
}
const BoardTypeFilterContent = (props: Props) => {
  const { content, setCloseModalState } = props;
  const [postData, setPostData] = useRecoilState(postDataState);

  /**
   * boardType 타입을 변경하는 함수
   * @param boardType
   */
  const updatePostData = (boardType: string) => {
    setPostData((prevData) => ({ ...prevData, boardType: boardType }));
  };

  return (
    <div className="absolute top-20 bg-white z-10 w-full rounded-[20px] border-[1px] border-gray1">
      {content.map((item, index) => {
        return (
          <div
            key={index}
            className="py-3 px-4 hover:bg-gray0"
            onClick={() => {
              updatePostData(item.name);
              setCloseModalState(false);
            }}>
            {item.name}
          </div>
        );
      })}
    </div>
  );
};
export default BoardTypeFilterContent;
