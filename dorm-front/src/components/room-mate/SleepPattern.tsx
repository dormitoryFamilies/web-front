"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/room-mate/Header";
import Item from "@/components/room-mate/Item";
import RequirementBanner from "@/components/room-mate/RequirementBanner";
import { lifeStylePostAtom } from "@/recoil/room-mate/atom";
import { SleepingHabitType, SleepingSensitivityType, SleepTimeType, WakeUpTimeType } from "@/types/room-mate/type";
import {
  bedTimeContents,
  sleepHabitsContents,
  sleepSensitivityContents,
  wakeUpTimeContents,
} from "@/utils/room-mate/lifestyles";

interface Props {
  setStep: Dispatch<
    SetStateAction<
      | "SleepPattern"
      | "SmokingDrinking"
      | "LifeStyle"
      | "Constitution"
      | "MBTI"
      | "CycleToReturnHome"
      | "Food"
      | "SoundAndPerfume"
      | "Exam"
      | "OtherLifestyles"
      | "Done"
    >
  >;
}

const SleepPattern = (props: Props) => {
  const { setStep } = props;
  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);
  const [sleepTime, setSleepTime] = useState<SleepTimeType>("");
  const [wakeUpTime, setWakeUpTime] = useState<WakeUpTimeType>("");
  const [sleepingHabit, setSleepingHabit] = useState<SleepingHabitType>("");
  const [sleepingSensitivity, setSleepingSensitivity] = useState<SleepingSensitivityType>("");

  const handleNextClick = () => {
    setLifeStylePostData((prevState) => ({
      ...prevState,
      sleepTime: sleepTime,
      wakeUpTime: wakeUpTime,
      ...(sleepingHabit !== "" && { sleepingHabit: sleepingHabit }),
      ...(sleepingSensitivity !== "" && { sleepingSensitivity: sleepingSensitivity }),
    }));
    setStep("SmokingDrinking");
  };

  return (
    <>
      <Header />
      <RequirementBanner />
      <div className={"flex flex-col p-5"}>
        <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"flex justify-center"}>
              <div className={"text-gray5"}>1 / 10</div>
            </div>

            <div className={"flex items-center justify-center"}>
              <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
                <div className={"absolute w-[20px] h-1 rounded-full bg-primaryMid"}></div>
              </div>
            </div>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <div className={"relative w-[180px] h-[120px]"}>
              <Image
                src={"/room-mate/잠버릇.png"}
                alt={"/room-mate/잠버릇.png"}
                className={"absolute object-cover"}
                fill
              />
            </div>
          </div>
          <div className={"text-h3 font-semibold"}>나의 수면 패턴은?</div>
        </div>

        <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
          <Item
            isRequired={true}
            title={"취침시간"}
            contents={bedTimeContents}
            setSelectedContent={setSleepTime}
            className={"grid-cols-3"}
            selectedContent={sleepTime}
          />
          <Item
            isRequired={true}
            title={"기상시간"}
            contents={wakeUpTimeContents}
            selectedContent={wakeUpTime}
            setSelectedContent={setWakeUpTime}
            className={"grid-cols-3"}
          />
          <Item
            isRequired={false}
            title={"잠버릇"}
            contents={sleepHabitsContents}
            selectedContent={sleepingHabit}
            setSelectedContent={setSleepingHabit}
            className={"grid-cols-4"}></Item>
          <Item
            isRequired={false}
            title={"잠귀"}
            contents={sleepSensitivityContents}
            selectedContent={sleepingSensitivity}
            setSelectedContent={setSleepingSensitivity}
            className={"grid-cols-2"}></Item>
          <button
            onClick={handleNextClick}
            className={
              "w-full rounded-full bg-gray3 text-white text-h5 py-4 hover:bg-primary hover:text-white transition"
            }>
            다음
          </button>
        </div>
      </div>
    </>
  );
};
export default SleepPattern;
