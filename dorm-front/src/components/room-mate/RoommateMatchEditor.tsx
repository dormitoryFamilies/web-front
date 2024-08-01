import { Dispatch, SetStateAction, useState } from "react";

import Constitution from "@/components/room-mate/Constitution";
import CycleToReturnHome from "@/components/room-mate/CycleToReturnHome";
import Exam from "@/components/room-mate/Exam";
import Food from "@/components/room-mate/Food";
import LifeStyle from "@/components/room-mate/LifeStyle";
import MBTI from "@/components/room-mate/MBTI";
import OtherLifestyles from "@/components/room-mate/OtherLifestyles";
import SleepPattern from "@/components/room-mate/SleepPattern";
import SmokingAndDrinking from "@/components/room-mate/SmokingAndDrinking";
import SoundAndPerfume from "@/components/room-mate/SoundAndPerfume";
import { RoomMateLifeStyleStepType } from "@/types/room-mate/type";
const RoommateMatchEditor = () => {
  const [step, setStep] = useState<RoomMateLifeStyleStepType>("SleepPattern");

  return (
    <div>
      {step === "SleepPattern" && <SleepPattern setStep={setStep} />}
      {step === "SmokingDrinking" && <SmokingAndDrinking setStep={setStep} />}
      {step === "LifeStyle" && <LifeStyle setStep={setStep} />}
      {step === "Constitution" && <Constitution setStep={setStep} />}
      {step === "MBTI" && <MBTI setStep={setStep} />}
      {step === "CycleToReturnHome" && (
        <CycleToReturnHome onNext={() => setStep("Food")} onBefore={() => setStep("MBTI")} />
      )}
      {step === "Food" && (
        <Food onNext={() => setStep("SoundAndPerfume")} onBefore={() => setStep("CycleToReturnHome")} />
      )}
      {step === "SoundAndPerfume" && (
        <SoundAndPerfume onNext={() => setStep("Exam")} onBefore={() => setStep("Food")} />
      )}
      {step === "Exam" && (
        <Exam onNext={() => setStep("OtherLifestyles")} onBefore={() => setStep("SoundAndPerfume")} />
      )}
      {step === "OtherLifestyles" && (
        <OtherLifestyles onNext={() => setStep("Done")} onBefore={() => setStep("Exam")} />
      )}
    </div>
  );
};
export default RoommateMatchEditor;
