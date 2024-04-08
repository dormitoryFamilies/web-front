"use client";
import * as React from "react";
import { useEffect, useState } from "react";

import FilterContent from "@/components/common/FilterContent";
import { DormList } from "@/types/global";
import { useRecoilState } from "recoil";
import { postDataState } from "@/recoil/board/atom";

interface Props {
  usage: string; // dormList, boardTypeList
  content: DormList[] | string[];
  title: string;
}
const Filter = (props: Props) => {
  const { usage, content, title } = props;
  const [isClick, setIsClick] = useState(false);
  const [postData, setPostData] = useRecoilState(postDataState);

  return (
    <div className="relative flex flex-col gap-y-2 w-full">
      {/*title*/}
      <div className="text-gray5">
        {title}
        <span className="text-primary"> *</span>
      </div>
      {/*filter*/}
      <div>
        <div
          onClick={() => setIsClick(!isClick)}
          className={
            isClick
              ? "flex justify-between px-4 py-3 rounded-[12px] border-[1px] border-primaryMid"
              : "flex justify-between px-4 py-3 rounded-[12px] border-[1px] border-gray1"
          }>
          <div>{usage == "dormList" ? postData.dormitoryType : postData.boardType}</div>
          {isClick ? <UpIcon /> : <DownIcon />}
        </div>
        {isClick ? <FilterContent content={content} setCloseModalState={setIsClick} usage={usage} /> : null}
      </div>
    </div>
  );
};
export default Filter;

function DownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={21} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M14 8.5l-2.85 2.442a1 1 0 01-1.3 0L7 8.5" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}

function UpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={21} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7 11.5l2.85-2.442a1 1 0 011.3 0L14 11.5" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}
