"use client";

import { useState } from "react";
import * as React from "react";
import { useRecoilState } from "recoil";

import { postDataState } from "@/recoil/board/atom";

interface Props {
  numberOfCharacters?: number;
  label: string;
  placeholder: string;
  essential: boolean; //필수로 받는 데이터인지
  pastContent?: string;
}
const ContentInput = (props: Props) => {
  const { numberOfCharacters, label, placeholder, essential, pastContent } = props;
  const [count, setCount] = useState(0);
  const [postData, setPostData] = useRecoilState(postDataState);

  /**
   * title 과 content 내용을 변경해주는 함수
   * @param e input 태그 이벤트
   */
  const updatePostData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostData((prevData) => ({ ...prevData, content: e.target.value }));
  };

  return (
    <div>
      {/*label*/}
      <div className="text-gray5">
        {label}
        {essential ? <span className="text-primary"> *</span> : null}
      </div>

      {/*글쓰기*/}
      <div className={"relative flex justify-between rounded-[12px] border-[1px] border-gray1 py-3 px-4"}>
        <textarea
          maxLength={300}
          placeholder={placeholder}
          value={pastContent ? pastContent : ""}
          className={"focus:outline-0 w-full h-[200px] placeholder focus:placeholder-top"}
          onChange={(e) => {
            setCount(e.target.value.length);
            updatePostData(e);
          }}></textarea>
        <div className={"absolute bottom-2 right-2 text-gray4 text-h5"}>
          <span className="font-semibold">{count}</span>/{numberOfCharacters}
        </div>
      </div>
    </div>
  );
};
export default ContentInput;
