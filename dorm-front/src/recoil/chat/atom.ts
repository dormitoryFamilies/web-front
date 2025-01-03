import { atom } from "recoil";

export const chatRoomIdAtom = atom<number>({
  key: "chatRoomIdAtom",
  default: 0,
});

export const chatRoomUUIDAtom = atom<string>({
  key: "chatRoomUUIDAtom",
  default: "",
});

export const memberIdAtom = atom<string | string[] | number | undefined>({
  key: "memberIdAtom",
  default: 0,
});

export const messageAtom = atom<string>({
  key: "messageAtom",
  default: "",
});

export const messagesAtom = atom<[]>({
  key: "messagesAtom",
  default: [],
});
