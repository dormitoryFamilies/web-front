"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import NicknameSetting from "@/components/onboarding/NicknameSetting";
import PhotoStudentIDCard from "@/components/onboarding/PhotoStudentIDCard";
import SchoolInfoSetting from "@/components/onboarding/SchoolInfoSetting";
import ServiceAccessRights from "@/components/onboarding/ServiceAccessRights";
import WaitForCompletion from "@/components/onboarding/WaitForCompletion";
import { getJWTToken, getKaKaoAccessToken } from "@/lib/api/onboarding";
import { StepOnboarding } from "@/types/onboarding/type";

const OnBoarding = () => {
  const [step, setStep] = useState<StepOnboarding>("ServiceAccessRights");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      if (code && localStorage.getItem("kakaoAccessToken") === null) {
        getKaKaoAccessToken(code).then((r) => {
          localStorage.setItem("kakaoAccessToken", r?.access_token);
          getJWTToken(r?.access_token).then((res) => {
            if (res) {
              localStorage.setItem("accessToken", res.headers.accesstoken);
              localStorage.setItem("refreshToken", res.headers.refreshtoken);
            }
          });
        });
      }
    }
  }, []);

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
export default OnBoarding;
