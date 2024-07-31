import { SleepingHabitType, SleepingSensitivityType, SleepTimeType, WakeUpTimeType } from "@/types/room-mate/type";

export const bedTimeContents: SleepTimeType[] = [
  "오후 9시 이전",
  "오후 9시",
  "오후 10시",
  "오후 11시",
  "오전 12시",
  "오전 1시",
  "오전 2시",
  "오전 3시",
  "오전 3시 이후",
];

export const wakeUpTimeContents: WakeUpTimeType[] = [
  "오전 6시 이전",
  "오전 6시",
  "오전 7시",
  "오전 8시",
  "오전 9시",
  "오전 10시",
  "오전 11시",
  "오후 12시",
  "오후 12시 이후",
];

export const sleepHabitsContents: SleepingHabitType[] = ["이갈이", "코골이", "잠꼬대", "없음"];

export const sleepSensitivityContents: SleepingSensitivityType[] = ["어두움", "밝음"];
