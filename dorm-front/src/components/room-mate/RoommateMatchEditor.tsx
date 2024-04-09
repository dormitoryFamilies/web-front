import { useState } from "react";
import SleepPattern from "@/components/room-mate/SleepPattern";
import SmokingAndDrinking from "@/components/room-mate/SmokingAndDrinking";
import LifeStyle from "@/components/room-mate/LifeStyle";

const RoommateMatchEditor = () => {
  const [step, setStep] = useState<
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
  >("SleepPattern");

  return (
    <div>
      {step === "SleepPattern" && <SleepPattern onNext={() => setStep("SmokingDrinking")} />}
      {step === "SmokingDrinking" && (
        <SmokingAndDrinking onNext={() => setStep("LifeStyle")} onBefore={() => setStep("SleepPattern")} />
      )}
      {step === "LifeStyle" && (
        <LifeStyle onNext={() => setStep("Constitution")} onBefore={() => setStep("SmokingDrinking")} />
      )}
    </div>
  );
};
export default RoommateMatchEditor;
