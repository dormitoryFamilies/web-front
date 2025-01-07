"use client";

import { useState } from "react";

import NicknameSetting from "@/components/onboarding/NicknameSetting";
import PhotoStudentIDCard from "@/components/onboarding/PhotoStudentIDCard";
import SchoolInfoSetting from "@/components/onboarding/SchoolInfoSetting";
import ServiceAccessRights from "@/components/onboarding/ServiceAccessRights";
import WaitForCompletion from "@/components/onboarding/WaitForCompletion";
import { StepOnboarding } from "@/types/onboarding/type";

const SignUp = () => {
  const [step, setStep] = useState<StepOnboarding>("ServiceAccessRights");

  return (
    <main>
      {step === "ServiceAccessRights" && <ServiceAccessRights onNext={setStep} />}
      {step === "NicknameSetting" && <NicknameSetting onNext={setStep} />}
      {step === "SchoolInfoSetting" && <SchoolInfoSetting onNext={setStep} onBefore={setStep} />}
      {step === "PhotoStudentIDCard" && <PhotoStudentIDCard onNext={setStep} onBefore={setStep} />}
      {step === "WaitForCompletion" && <WaitForCompletion onBefore={setStep} />}
    </main>
  );
};
export default SignUp;
