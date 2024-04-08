import React from "react";

import { DormList } from "@/types/global";
import { useRecoilState } from "recoil";
import { postDataState } from "@/recoil/board/atom";

interface Props {
  usage: string; // dormList, boardTypeList
  content: DormList[] | [];
  setCloseModalState: React.Dispatch<React.SetStateAction<boolean>>;
}
const FilterContent = (props: Props) => {
  const { usage, content, setCloseModalState } = props;
  const [postData, setPostData] = useRecoilState(postDataState);

  /**
   * title 과 content 내용을 변경해주는 함수
   * @param e input 태그 이벤트
   */
  const updatePostData = (item: string) => {
    if (usage === "dormList") {
      setPostData((prevData) => ({ ...prevData, dormitoryType: item }));
    }
    if (usage === "boardTypeList") {
      setPostData((prevData) => ({ ...prevData, boardType: item }));
    }
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

export default FilterContent;
