"use client";

import React, { useState } from "react";

import SettingLifeStylePriority from "@/components/room-mate/SettingLifeStylePriority";
import SettingLifeStylePriorityDone from "@/components/room-mate/SettingLifeStylePriorityDone";
import SettingLifeStyleType from "@/components/room-mate/SettingLifeStyleType";

const RoommateLifeStylePriority = () => {
  const [step, setStep] = useState<"SettingLifeStylePriority" | "SettingLifeStyleType" | "Done">(
    "SettingLifeStylePriority",
  );

  return (
    <div>
      {step === "SettingLifeStylePriority" && <SettingLifeStylePriority setStep={setStep} usage={"room-mate"} />}
      {step === "SettingLifeStyleType" && <SettingLifeStyleType setStep={setStep} usage={"room-mate"} />}
      {step === "Done" && <SettingLifeStylePriorityDone setStep={setStep} usage={"room-mate"} />}
    </div>
  );
};
export default RoommateLifeStylePriority;
