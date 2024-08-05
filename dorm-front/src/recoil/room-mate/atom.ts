import { atom } from "recoil";

import { LifeStylePostType } from "@/types/room-mate/type";

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
