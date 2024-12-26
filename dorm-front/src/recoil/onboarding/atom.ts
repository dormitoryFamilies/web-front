import { atom } from "recoil";

import { ProfileSettingType } from "@/types/global";

export const profileSettingAtom = atom<ProfileSettingType>({
  key: "profileSettingAtom",
  default: {
    nickname: "",
    studentCardImageUrl: "",
    collegeType: "단과대학교",
    departmentType: "학과선택",
    studentNumber: null,
    dormitoryType: "",
  },
});
