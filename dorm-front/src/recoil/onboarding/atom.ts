import { atom } from "recoil";

import { ProfileSettingType } from "@/types/global";

export const profileSettingAtom = atom<ProfileSettingType>({
  key: "profileSettingAtom",
  default: {
    nickname: "유림",
    studentCardImageUrl: "https://k.kakaocdn.net/dn/G4MPH/btrfw4guzVh/iXmuhGiV1QRMsZkMsKRrc1/img_640x640.jpg",
    collegeType: "단과대학교",
    departmentType: "학과선택",
    studentNumber: 0,
    dormitoryType: "본관",
  },
});
