"use client";

import React, { useState } from "react";

import SettingLifeStylePriority from "@/components/room-mate/SettingLifeStylePriority";
import SettingLifeStylePriorityDone from "@/components/room-mate/SettingLifeStylePriorityDone";
import SettingLifeStyleType from "@/components/room-mate/SettingLifeStyleType";

const PriorityEditor = () => {
  const [step, setStep] = useState<"SettingLifeStylePriority" | "SettingLifeStyleType" | "Done">(
    "SettingLifeStylePriority",
  );
  return (
    <div>
      {step === "SettingLifeStylePriority" && <SettingLifeStylePriority setStep={setStep} usage={"mypage"} />}
      {step === "SettingLifeStyleType" && <SettingLifeStyleType setStep={setStep} usage={"mypage"} />}
      {step === "Done" && <SettingLifeStylePriorityDone setStep={setStep} usage={"mypage"} />}
    </div>
  );
};
export default PriorityEditor;
