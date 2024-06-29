"use client";

import * as React from "react";
import { SVGProps, useEffect, useRef } from "react";

interface Props {
  tags: string[];
  label: string; // title
  placeholder: string; // 설명글
  essential: boolean; //필수로 받는 데이터인지
  handleChangeTags: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  addTags: () => void;
  deleteTags: (index: number) => void;
}

const TagInput = (props: Props) => {
  const { tags, label, placeholder, essential, handleChangeTags, addTags, deleteTags } = props;

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    tags.forEach((tag, index) => {
      if (inputRefs.current[index]) {
        const inputElement = inputRefs.current[index];
        inputElement.style.width = `${inputElement.value.length + 1}ch`;
        inputElement.style.maxWidth = 'calc(100% - 32px)'; // DeleteButton의 너비를 고려한 maxWidth 설정
      }
    });
  }, [tags]);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeTags(index, event);
    if (inputRefs.current[index]) {
      const inputElement = inputRefs.current[index];
      inputElement.style.width = `${inputElement.value.length + 1}ch`;
      inputElement.style.maxWidth = "calc(100% - 32px)"; // DeleteButton의 너비를 고려한 maxWidth 설정
    }
  };

  return (
    <div>
      <div className={"flex flex-col gap-y-2 mt-[16px]"}>
        {/*label*/}
        <div className="text-gray5">
          {label}
          {essential ? <span className="text-primary"> *</span> : null}
        </div>
        <div className={"flex flex-col gap-y-2"}>
          <button
            onClick={() => addTags()}
            type={"button"}
            className={"border-[1px] border-gray1 rounded-[12px] p-3 text-gray4 text-h5 w-fit"}>
            + 태그추가
          </button>
          <div className={"flex flex-wrap gap-2"}>
            {tags.map((input: string, index: number) => (
              <div
                key={index}
                className={"relative flex items-center border-gray1 border-[1px] rounded-[16px] p-3 w-fit"}>
                <input
                  type="text"
                  value={input}
                  maxLength={10}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={"placeholder:text-gray4 focus:outline-0"}
                  onChange={(event) => handleInputChange(index, event)}
                  style={{ maxWidth: "calc(100% - 32px)" }} // DeleteButton의 너비를 고려한 maxWidth 설정
                />
                <button
                  type={"button"}
                  onClick={() => deleteTags(index)}
                  className={"bg-gray4 rounded-full p-[6px] ml-2"}>
                  <DeleteIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TagInput;

const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none" {...props}>
    <path fill="#9E9FA1" d="M.507 0h8v8h-8z" />
    <path
      fill="#fff"
      d="M.87 7.394a.52.52 0 0 1 0-.727L7.175.364a.52.52 0 0 1 .727 0 .52.52 0 0 1 0 .727L1.598 7.394a.52.52 0 0 1-.727 0"
    />
    <path
      fill="#fff"
      d="M5.72 5.94.87 1.09a.52.52 0 0 1 0-.726.52.52 0 0 1 .728 0l4.849 4.848a.52.52 0 0 1 0 .727.52.52 0 0 1-.728 0M7.053 7.515a.686.686 0 1 0 .97-.97.686.686 0 0 0-.97.97"
    />
  </svg>
);
