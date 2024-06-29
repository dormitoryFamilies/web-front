"use client";

import * as React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { postDataState } from "@/recoil/board/atom";
interface Props {
  numberOfCharacters?: number; //문자 갯수
  label: string; // title
  placeholder: string; // 설명글
  essential: boolean; //필수로 받는 데이터인지
  pastTitle?: string;
}

const TitleInput = (props: Props) => {
  const { numberOfCharacters, label, placeholder, essential, pastTitle } = props;
  const [count, setCount] = useState(0);
  const [postData, setPostData] = useRecoilState(postDataState);

  /**
   * title 내용을 변경하는 함수
   * @param e input 태그 이벤트
   */
  const updatePostData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostData((prevData) => ({ ...prevData, title: e.target.value }));
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
        <input
          maxLength={20}
          value={pastTitle ? pastTitle : null}
          placeholder={placeholder}
          className={"focus:outline-0 w-full"}
          onChange={(e) => {
            setCount(e.target.value.length);
            updatePostData(e);
          }}></input>
        <div className={"text-gray4 text-h5"}>
          <span className="font-semibold">{count}</span>/{numberOfCharacters}
        </div>
      </div>
    </div>
  );
};
export default TitleInput;
