import React from "react";
import { twMerge } from "tailwind-merge";

import {
  ExtrovertOrIntrovertType,
  HeterosexualOrEmotionalType,
  IntuitiveOrThinkingType,
  MBTIContentType,
  PlannedOrSpontaneousType,
} from "@/types/room-mate/type";

interface Props {
  contents: MBTIContentType[];
  selectedContent: MBTIContentType | string;
  setSelectedContent: React.Dispatch<React.SetStateAction<MBTIContentType | string>>;
}

const MBTIItem = (props: Props) => {
  const { contents, selectedContent, setSelectedContent } = props;

  const updateSelectedContent = (
    content:
      | string
      | ExtrovertOrIntrovertType
      | IntuitiveOrThinkingType
      | HeterosexualOrEmotionalType
      | PlannedOrSpontaneousType,
  ) => {
    setSelectedContent(content);
  };

  const resetSelectedContent = (
    content:
      | ExtrovertOrIntrovertType
      | IntuitiveOrThinkingType
      | HeterosexualOrEmotionalType
      | PlannedOrSpontaneousType,
  ) => {
    if (selectedContent === content) {
      setSelectedContent("");
    } else {
      updateSelectedContent(content);
    }
  };

  return (
    <>
      <div className={"grid gap-1 gap-y-3"}>
        {contents.map((content, index: number) => {
          return (
            <button
              key={index}
              onClick={() => {
                resetSelectedContent(content);
              }}
              className={
                selectedContent === content
                  ? twMerge(
                      "py-[9px] px-[10px] rounded-[12px] border-[1px] border-primaryMid bg-secondary text-primary",
                      "rounded-full p-2 w-[72px] h-[72px]",
                    )
                  : twMerge(
                      "py-[9px] px-[10px] rounded-[12px] border-[1px] border-gray1",
                      "rounded-full p-2 w-[72px] h-[72px]",
                    )
              }>
              <span className={selectedContent === content ? "text-h5 text-primary" : "text-h5 text-gray4 "}>
                {content}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};
export default MBTIItem;
