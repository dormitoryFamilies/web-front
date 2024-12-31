import { atom } from "recoil";

import { LifeStylePostType, PreferenceOrdersType } from "@/types/room-mate/type";

export const lifeStylePostAtom = atom<LifeStylePostType>({
  key: "lifeStylePostAtom",
  default: {
    sleepTime: "",
    wakeUpTime: "",
    sleepingHabit: "",
    sleepingSensitivity: "",
    smoking: "",
    drinkingFrequency: "",
    cleaningFrequency: "",
    heatTolerance: "",
    coldTolerance: "",
    perfumeUsage: "",
    examPreparation: "",
    insectTolerance: "",
  },
});

export const preferenceOrdersAtom = atom<PreferenceOrdersType>({
  key: "preferenceOrdersAtom",
  default: {
    firstPreference: "",
    secondPreference: "",
    thirdPreference: "",
    fourthPreference: "",
  },
});

export const preferenceOrderListAtom = atom<(string | null)[]>({
  key: "preferenceOrderListAtom",
  default: [],
});

export const candidateIdsAtom = atom<number[]>({
  key: "candidateIdsAtom",
  default: [],
});
export const selectedRoomMateMemberIdAtom = atom<number>({
  key: "selectedRoomMateMemberIdAtom",
  default: 0,
});
