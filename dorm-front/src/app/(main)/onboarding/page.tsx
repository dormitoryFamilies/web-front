"use client";

import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

import Cookies from "js-cookie";
import { useEffect } from "react";

import { getJWTToken, getKaKaoAccessToken, getUserRole } from "@/lib/api/onboarding";

const OnBoarding = () => {
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

  return <div></div>;
};
export default OnBoarding;
