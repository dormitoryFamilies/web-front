"use client";

import { useState } from "react";

import Constitution from "@/components/room-mate/Constitution";
import CycleToReturnHome from "@/components/room-mate/CycleToReturnHome";
import Done from "@/components/room-mate/Done";
import Exam from "@/components/room-mate/Exam";
import Food from "@/components/room-mate/Food";
import LifeStyle from "@/components/room-mate/LifeStyle";
import MBTI from "@/components/room-mate/MBTI";
import OtherLifestyles from "@/components/room-mate/OtherLifestyles";
import SleepPattern from "@/components/room-mate/SleepPattern";
import SmokingAndDrinking from "@/components/room-mate/SmokingAndDrinking";
import SoundAndPerfume from "@/components/room-mate/SoundAndPerfume";
import { RoomMateLifeStyleStepType } from "@/types/room-mate/type";
const LifeStyleSetter = () => {
  const [lifeStyleStep, setLifeStyleStep] = useState<RoomMateLifeStyleStepType>("SleepPattern");

  return (
    <div>
      {lifeStyleStep === "SleepPattern" && <SleepPattern setLifeStyleStep={setLifeStyleStep} />}
      {lifeStyleStep === "SmokingDrinking" && <SmokingAndDrinking setLifeStyleStep={setLifeStyleStep} />}
      {lifeStyleStep === "LifeStyle" && <LifeStyle setLifeStyleStep={setLifeStyleStep} />}
      {lifeStyleStep === "Constitution" && <Constitution setLifeStyleStep={setLifeStyleStep} />}
      {lifeStyleStep === "MBTI" && <MBTI setLifeStyleStep={setLifeStyleStep} />}
      {lifeStyleStep === "CycleToReturnHome" && <CycleToReturnHome setLifeStyleStep={setLifeStyleStep} />}
      {lifeStyleStep === "Food" && <Food setLifeStyleStep={setLifeStyleStep} />}
      {lifeStyleStep === "SoundAndPerfume" && <SoundAndPerfume setLifeStyleStep={setLifeStyleStep} />}
      {lifeStyleStep === "Exam" && <Exam setLifeStyleStep={setLifeStyleStep} />}
      {lifeStyleStep === "OtherLifestyles" && (
        <OtherLifestyles setLifeStyleStep={setLifeStyleStep} usage={"room-mate"} />
      )}
      {lifeStyleStep === "Done" && <Done setLifeStyleStep={setLifeStyleStep} usage={"room-mate"} />}
    </div>
  );
};
export default LifeStyleSetter;
