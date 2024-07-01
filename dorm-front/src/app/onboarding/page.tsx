"use client";
import ServiceAccessRights from "@/components/onboarding/ServiceAccessRights";
import NicknameSetting from "@/components/onboarding/NicknameSetting";
import SchoolInfoSetting from "@/components/onboarding/SchoolInfoSetting";
import PhotoStudentIDCard from "@/components/onboarding/PhotoStudentIDCard";
import WaitForCompletion from "@/components/onboarding/WaitForCompletion";
import { useState } from "react";
import { StepOnboarding } from "@/types/onboarding/type";
import { useRouter } from "next/navigation";

const OnBoarding = () => {
  const [step, setStep] = useState<StepOnboarding>("NicknameSetting");
  return (
    <main>
      {step === "NicknameSetting" && <NicknameSetting onNext={setStep} />}
      {step === "SchoolInfoSetting" && <SchoolInfoSetting onNext={setStep} onBefore={setStep} />}
      {step === "PhotoStudentIDCard" && <PhotoStudentIDCard onNext={setStep} onBefore={setStep} />}
      {step === "WaitForCompletion" && <WaitForCompletion onBefore={setStep} />}
    </main>
  );
};
export default OnBoarding;
