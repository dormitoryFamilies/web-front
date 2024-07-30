"use client";

import Image from "next/image";
import React, { useState } from "react";

import Header from "@/components/room-mate/Header";
import Item from "@/components/room-mate/Item";
import { SleepingHabitType, SleepingSensitivityType, SleepTimeType, WakeUpTimeType } from "@/types/room-mate/type";
import { bedTime, sleepHabits, sleepSensitivity, wakeUpTime } from "@/utils/room-mate/lifestyles";
import { useRecoilState } from "recoil";
import { lifeStylePostAtom } from "@/recoil/room-mate/atom";

interface Props {
  onNext?: React.Dispatch<React.SetStateAction<string>>;
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const SleepPattern = (props: Props) => {
  const { onNext, onBefore } = props;
  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);

  const updateLifeStylePostData = (lifeStyleData) => {
    setLifeStylePostData((prevState) => ({
      ...prevState,
      ...lifeStyleData,
    }));
  };

  return (
    <div className={"flex flex-col p-5"}>
      <Header />
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
          title={"취침시간"}
          data={bedTime}
          onClick={updateLifeStylePostData}
          className={"grid-cols-3"}
          isClickedItem={lifeStylePostData.sleepTime}
        />
        <Item
          title={"기상시간"}
          data={wakeUpTime}
          onClick={updateLifeStylePostData}
          className={"grid-cols-3"}
          isClickedItem={lifeStylePostData.wakeUpTime}
        />
        <Item
          title={"잠버릇"}
          data={sleepHabits}
          onClick={updateLifeStylePostData}
          className={"grid-cols-4"}
          isClickedItem={lifeStylePostData.sleepingHabit}
          secondClassName={"rounded-full p-2 w-[72px] h-[72px]"}
        />
        <Item
          title={"잠귀"}
          data={sleepSensitivity}
          onClick={updateLifeStylePostData}
          className={"grid-cols-3"}
          isClickedItem={lifeStylePostData.sleepingSensitivity}
        />
        <button
          onClick={onNext}
          className={
            "w-full rounded-full bg-gray3 text-white text-h5 py-4 hover:bg-primary hover:text-white transition"
          }>
          다음
        </button>
      </div>
    </div>
  );
};
export default SleepPattern;
