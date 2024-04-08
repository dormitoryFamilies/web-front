"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useRecoilState } from "recoil";
import { postDataState } from "@/recoil/board/atom";

interface Props {
  usage?: string; //title, content
  numberOfCharacters?: number;
  title: string;
  inputClassName?: string;
  className?: string;
  placeholder: string;
  essential: boolean; //필수로 받는 데이터인지
}
const Input = (props: Props) => {
  const { usage, numberOfCharacters, title, inputClassName, placeholder, essential, className } = props;
  const [count, setCount] = useState(0);
  const [postData, setPostData] = useRecoilState(postDataState);

  /**
   * title 과 content 내용을 변경해주는 함수
   * @param e input 태그 이벤트
   */
  const updatePostData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if (usage === "title") {
      setPostData((prevData) => ({ ...prevData, title: e.target.value }));
    }
    if (usage === "content") {
      setPostData((prevData) => ({ ...prevData, content: e.target.value }));
    }
  };

  // useEffect(() => {
  //   console.log('title', postData.title);
  //   console.log('content', postData.content);
  // }, [postData]);

  return (
    <div>
      {/*title*/}
      <div className="text-gray5">
        {title}
        {essential ? <span className="text-primary"> *</span> : null}
      </div>

      {/*글쓰기*/}
      <div
        className={twMerge(
          "relative flex justify-between rounded-[12px] border-[1px] border-gray1 py-3 px-4",
          className,
        )}>
        {inputClassName ? (
          <textarea
            placeholder={placeholder}
            className={twMerge("focus:outline-0 w-full", inputClassName)}
            onChange={(e) => {
              setCount(e.target.value.length);
              updatePostData(e);
            }}></textarea>
        ) : (
          <input
            placeholder={placeholder}
            className={"focus:outline-0 w-full"}
            onChange={(e) => {
              setCount(e.target.value.length);
              updatePostData(e);
            }}></input>
        )}
        {usage == "tag" ? null : (
          <div className={inputClassName ? "absolute bottom-2 right-2 text-gray4 text-h5" : "text-gray4 text-h5"}>
            <span className="font-semibold">{count}</span>/{numberOfCharacters}
          </div>
        )}
      </div>
    </div>
  );
};
export default Input;
