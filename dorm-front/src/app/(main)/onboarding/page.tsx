"use client";

import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

import Cookies from "js-cookie";
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
  const params = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const code = params.get("code");
      if (code && Cookies.get("kakaoAccessToken") === null) {
        getKaKaoAccessToken(code).then((r) => {
          Cookies.set("kakaoAccessToken", r?.access_toke, { expires: Date.now() + 604800000 });
          getJWTToken(r?.access_token).then((res) => {
            if (res) {
              Cookies.set("accessToken", res.headers.accessToken, { expires: Date.now() + 604800000 });
              Cookies.set("refreshToken", res.headers.refreshToken, { expires: Date.now() + 604800000 });
              getUserRole().then((r) => {
                console.log("r", r.data.data);
                Cookies.set("role", "ROLE_ADMIN");
              });
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
