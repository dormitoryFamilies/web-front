"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import NicknameSetting from "@/components/onboarding/NicknameSetting";
import SchoolInfoSetting from "@/components/onboarding/SchoolInfoSetting";
import PhotoStudentIDCard from "@/components/onboarding/PhotoStudentIDCard";
import WaitForCompletion from "@/components/onboarding/WaitForCompletion";
import { getKaKaoAccessToken } from "@/lib/api/onboarding";
import { StepOnboarding } from "@/types/onboarding/type";
import { useRouter } from "next/navigation";

const OnBoarding = () => {
  const params = useSearchParams();
  const [step, setStep] = useState<StepOnboarding>("NicknameSetting");

  useEffect(() => {
    if (params.get("code")) {
      getKaKaoAccessToken(params.get("code")).then((r) => {
        console.log("r", r);
      });
    }
  }, []);

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
