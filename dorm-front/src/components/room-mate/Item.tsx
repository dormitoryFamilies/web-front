import React from "react";
import { twMerge } from "tailwind-merge";

import {
  CleaningFrequencyType,
  DrinkingFrequencyType,
  RoomMateLifeStyleType, ShowerDurationType, ShowerTimeType,
  SleepingHabitType,
  SleepingSensitivityType,
  SleepTimeType, SmokingType,
  WakeUpTimeType,
} from "@/types/room-mate/type";

interface Props {
  title: string;
  contents: RoomMateLifeStyleType[];
  className?: string;
  secondClassName?: string;
  selectedContent: RoomMateLifeStyleType;
  setSelectedContent:
    | React.Dispatch<React.SetStateAction<SleepTimeType>>
    | React.Dispatch<React.SetStateAction<WakeUpTimeType>>
    | React.Dispatch<React.SetStateAction<SleepingHabitType>>
    | React.Dispatch<React.SetStateAction<SleepingSensitivityType>>
    | React.Dispatch<React.SetStateAction<SmokingType>>
    | React.Dispatch<React.SetStateAction<DrinkingFrequencyType>>
    | React.Dispatch<React.SetStateAction<ShowerTimeType>>
    | React.Dispatch<React.SetStateAction<ShowerDurationType>>
    | React.Dispatch<React.SetStateAction<CleaningFrequencyType>>;
  isRequired: boolean;
}
const Item = (props: Props) => {
  const { title, contents, className, secondClassName, selectedContent, setSelectedContent, isRequired } = props;
  const updateSelectedSleepTime = (content: RoomMateLifeStyleType) => {
    setSelectedContent(content);
  };

  const resetSelectedSleepTime = (content: RoomMateLifeStyleType) => {
    if (selectedContent === content) {
      setSelectedContent("");
    } else {
      updateSelectedSleepTime(content);
    }
  };

  return (
    <div className={"flex flex-col gap-y-2"}>
      <div className={"text-gray5 text-h4"}>
        {title}
        {isRequired ? <span className={"text-primary ml-1"}>*</span> : null}
      </div>
      <div className={twMerge("grid gap-2", className)}>
        {contents.map((content: RoomMateLifeStyleType, index: number) => {
          return (
            <button
              key={index}
              onClick={() => {
                resetSelectedSleepTime(content);
              }}
              className={
                selectedContent === content
                  ? twMerge(
                      "py-[9px] px-[10px] rounded-[12px] border-[1px] border-primaryMid bg-secondary text-primary",
                      secondClassName,
                    )
                  : twMerge("py-[9px] px-[10px] rounded-[12px] border-[1px] border-gray1", secondClassName)
              }>
              <span className={selectedContent === content ? "text-h5 text-primary" : "text-h5 text-gray4 "}>
                {content}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Item;
