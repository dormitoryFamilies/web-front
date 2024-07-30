import { atom } from "recoil";

import { LifeStylePostType } from "@/types/room-mate/type";

export const lifeStylePostAtom = atom<LifeStylePostType>({
  key: "lifeStylePostAtom",
  default: {},
});
