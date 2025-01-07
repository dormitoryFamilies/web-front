"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { getJWTToken, getKaKaoAccessToken, getUserRole } from "@/lib/api/onboarding";

const OnBoarding = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [isTrigger, setIsTrigger] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const code = params.get("code");
      if (code && Cookies.get("accessToken") === undefined) {
        getKaKaoAccessToken(code).then((r) => {
          Cookies.set("kakaoAccessToken", r?.access_toke, { expires: Date.now() + 604800000 });
          getJWTToken(r?.access_token).then((res) => {
            if (res) {
              Cookies.set("accessToken", res.headers.accesstoken, { expires: Date.now() + 604800000 });
              Cookies.set("refreshToken", res.headers.refreshtoken, { expires: Date.now() + 604800000 });
              getUserRole(res.headers.accessToken).then((response) => {
                console.log("response.data.data.authority", response.data.data[0].authority);
                Cookies.set("role", response.data.data[0].authority, { expires: Date.now() + 604800000 });
                setIsTrigger(true);
              });
            }
          });
        });
      }
    }
  }, [params]);

  useEffect(() => {
    const role = Cookies.get("role");
    if (Cookies.get("role") !== undefined && isTrigger) {
      if (role === "ROLE_MEMBER" || role === "ROLE_ADMIN") {
        console.log("통과되는데");
        setIsTrigger(false);
        router.push("/home");
      } else {
        setIsTrigger(false);
        router.push("/sign-up");
      }
    }
  }, [Cookies.get("role"), isTrigger]);

  return <div></div>;
};
export default OnBoarding;
