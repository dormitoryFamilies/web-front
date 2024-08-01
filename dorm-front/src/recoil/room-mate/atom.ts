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
    showerTime: "",
    showerDuration: "",
    cleaningFrequency: "",
    heatTolerance: "",
    coldTolerance: "",
    visitHomeFrequency: "",
    lateNightSnack: "",
    snackInRoom: "",
    phoneSound: "",
    examPreparation: "",
    exercise: "",
    insectTolerance: "",
  },
});
