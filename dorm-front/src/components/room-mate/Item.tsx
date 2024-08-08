import type { SVGProps } from "react";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import {
  CleaningFrequencyType,
  DrinkingFrequencyType,
  ExamPreparationType,
  ExerciseType,
  HeatToleranceType,
  InsectToleranceType,
  LateNightSnackType,
  PerfumeUsageType,
  PhoneSoundType,
  RoomMateLifeStyleType,
  ShowerDurationType,
  ShowerTimeType,
  SleepingHabitType,
  SleepingSensitivityType,
  SleepTimeType,
  SmokingType,
  SnackInRoomType,
  StudyLocationType,
  VisitHomeFrequencyType,
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
    | React.Dispatch<React.SetStateAction<ShowerTimeType | undefined>>
    | React.Dispatch<React.SetStateAction<ShowerDurationType>>
    | React.Dispatch<React.SetStateAction<CleaningFrequencyType>>
    | React.Dispatch<React.SetStateAction<HeatToleranceType>>
    | React.Dispatch<React.SetStateAction<VisitHomeFrequencyType>>
    | React.Dispatch<React.SetStateAction<LateNightSnackType>>
    | React.Dispatch<React.SetStateAction<SnackInRoomType>>
    | React.Dispatch<React.SetStateAction<PhoneSoundType>>
    | React.Dispatch<React.SetStateAction<PerfumeUsageType>>
    | React.Dispatch<React.SetStateAction<StudyLocationType>>
    | React.Dispatch<React.SetStateAction<ExamPreparationType>>
    | React.Dispatch<React.SetStateAction<ExerciseType>>
    | React.Dispatch<React.SetStateAction<InsectToleranceType>>;
  isRequired: boolean;
  showGuideMessage?: boolean;
  setIsClickedGuideMessage?: React.Dispatch<React.SetStateAction<boolean>>;
}
const Item = (props: Props) => {
  const {
    title,
    contents,
    className,
    secondClassName,
    selectedContent,
    setSelectedContent,
    isRequired,
    showGuideMessage,
    setIsClickedGuideMessage,
  } = props;
  const updateSelectedContent = (content: RoomMateLifeStyleType) => {
    setSelectedContent(content);
  };

  const resetSelectedContent = (content: RoomMateLifeStyleType) => {
    if (selectedContent === content) {
      setSelectedContent("");
    } else {
      updateSelectedContent(content);
    }
  };

  return (
    <div className={"flex flex-col gap-y-2"}>
      <div className={"flex items-center gap-x-1 text-gray5 text-h4"}>
        {title}
        {isRequired ? <span className={"text-primary"}>*</span> : null}
        {showGuideMessage ? (
          <GuideMessageIcon
            onClick={() => {
              if (setIsClickedGuideMessage) {
                setIsClickedGuideMessage(true);
              }
            }}
          />
        ) : null}
      </div>
      <div className={twMerge("grid gap-2", className)}>
        {contents.map((content: RoomMateLifeStyleType, index: number) => {
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
const GuideMessageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" {...props}>
    <rect width={11} height={11} x={0.5} y={0.5} stroke="#BEBEBE" rx={5.5} />
    <path
      fill="#BEBEBE"
      d="M5.773 7.429c-.28 0-.469-.193-.476-.509l-.023-.685c-.007-.216.121-.416.333-.531.817-.424 1.172-.755 1.172-1.279 0-.485-.333-.8-.786-.8-.34 0-.636.153-.87.454q-.182.23-.431.23a.54.54 0 0 1-.257-.069.47.47 0 0 1-.235-.4.47.47 0 0 1 .076-.254c.333-.555.938-.886 1.717-.886 1.074 0 1.807.74 1.807 1.74 0 .832-.544 1.472-1.535 1.988l-.023.492c-.022.309-.196.509-.469.509m-.627 1.263c0-.34.272-.609.627-.609.356 0 .628.27.628.609a.61.61 0 0 1-.628.608.61.61 0 0 1-.627-.608"
    />
  </svg>
);
