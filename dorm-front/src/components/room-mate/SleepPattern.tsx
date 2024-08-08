"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import Item from "@/components/room-mate/Item";
import RequirementBanner from "@/components/room-mate/RequirementBanner";
import { lifeStylePostAtom } from "@/recoil/room-mate/atom";
import {
  RoomMateLifeStyleStepType,
  SleepingHabitType,
  SleepingSensitivityType,
  SleepTimeType,
  WakeUpTimeType,
} from "@/types/room-mate/type";
import {
  bedTimeContents,
  sleepHabitsContents,
  sleepSensitivityContents,
  wakeUpTimeContents,
} from "@/utils/room-mate/lifestyles";

interface Props {
  setLifeStyleStep: Dispatch<SetStateAction<RoomMateLifeStyleStepType>>;
}

const SleepPattern = (props: Props) => {
  const { setLifeStyleStep } = props;
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
      sleepingHabit: sleepingHabit,
      sleepingSensitivity: sleepingSensitivity,
    }));
    setLifeStyleStep("SmokingDrinking");
  };

  return (
    <>
      <Header headerType={"dynamic"} title={"긱사생활 설정"} />
      <div className={"h-[60px]"} />
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
            isRequired={true}
            title={"잠버릇"}
            contents={sleepHabitsContents}
            selectedContent={sleepingHabit}
            setSelectedContent={setSleepingHabit}
            className={"grid-cols-4"}></Item>
          <Item
            isRequired={true}
            title={"잠귀"}
            contents={sleepSensitivityContents}
            selectedContent={sleepingSensitivity}
            setSelectedContent={setSleepingSensitivity}
            className={"grid-cols-2"}></Item>
          <button
            disabled={sleepTime === "" || wakeUpTime === "" || sleepingHabit === "" || sleepingSensitivity === ""}
            onClick={handleNextClick}
            className={
              sleepTime === "" || wakeUpTime === "" || sleepingHabit === "" || sleepingSensitivity === ""
                ? "w-full rounded-full bg-gray3 text-white text-h5 py-4 hover:text-white transition"
                : "w-full rounded-full bg-primary text-white text-h5 py-4 hover:text-white transition"
            }>
            다음
          </button>
        </div>
      </div>
    </>
  );
};
export default SleepPattern;
