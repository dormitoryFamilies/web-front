import React from "react";
import { SetterOrUpdater } from "recoil";
import { twMerge } from "tailwind-merge";

import { LifeStylePostType, SleepTimeType } from "@/types/room-mate/type";

interface Props {
  title: string;
  className?: string;
  sleepTimeContents: SleepTimeType[];
  secondClassName?: string;
  selectedSleepTime: SleepTimeType;
  setSelectedSleepTime: SetterOrUpdater<LifeStylePostType>;
}
const SleepTimeSelectComponent = (props: Props) => {
  const { title, className, sleepTimeContents, secondClassName, selectedSleepTime, setSelectedSleepTime } = props;

  const updateSelectedSleepTime = (sleepTimeContent: SleepTimeType) => {
    setSelectedSleepTime((prevState) => ({ ...prevState, sleepTime: sleepTimeContent }));
  };

  const resetSelectedSleepTime = (sleepTimeContent: SleepTimeType) => {
    if (selectedSleepTime === sleepTimeContent) {
      setSelectedSleepTime((prevState) => ({ ...prevState, sleepTime: "" }));
    } else {
      updateSelectedSleepTime(sleepTimeContent);
    }
  };

  return (
    <div className={"flex flex-col gap-y-2"}>
      <div className={"text-gray5 text-h4"}>{title}</div>
      <div className={twMerge("grid gap-2", className)}>
        {sleepTimeContents.map((sleepTimeContent: SleepTimeType, index: number) => {
          return (
            <button
              key={index}
              onClick={() => {
                resetSelectedSleepTime(sleepTimeContent);
              }}
              className={
                selectedSleepTime === sleepTimeContent
                  ? twMerge(
                      "py-[9px] px-[10px] rounded-[12px] border-[1px] border-primaryMid bg-secondary text-primary",
                      secondClassName,
                    )
                  : twMerge("py-[9px] px-[10px] rounded-[12px] border-[1px] border-gray1", secondClassName)
              }>
              <span className={selectedSleepTime === sleepTimeContent ? "text-h5 text-primary" : "text-h5 text-gray4 "}>
                {sleepTimeContent}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default SleepTimeSelectComponent;
