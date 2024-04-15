"use client";

import React from "react";
import { useRecoilState } from "recoil";

import { postDataState } from "@/recoil/board/atom";
import { DormTypeList } from "@/types/global";
interface Props {
  content: DormTypeList[];
  setCloseModalState: React.Dispatch<React.SetStateAction<boolean>>;
}
const DormTypeFilterContent = (props: Props) => {
  const { content, setCloseModalState } = props;
  const [postData, setPostData] = useRecoilState(postDataState);

  /**
   * dormitoryType 타입을 변경하는 함수
   * @param dormitoryType
   */
  const updatePostData = (dormitoryType: string) => {
    setPostData((prevData) => ({ ...prevData, dormitoryType: dormitoryType }));
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
export default DormTypeFilterContent;
