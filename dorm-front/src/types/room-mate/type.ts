export type SleepTimeType =
  | ""
  | "오후 9시 이전"
  | "오후 9시"
  | "오후 10시"
  | "오후 11시"
  | "오전 12시"
  | "오전 1시"
  | "오전 2시"
  | "오전 3시"
  | "오전 3시 이후";
export type WakeUpTimeType =
  | ""
  | "오전 6시 이전"
  | "오전 6시"
  | "오전 7시"
  | "오전 8시"
  | "오전 9시"
  | "오전 10시"
  | "오전 11시"
  | "오후 12시"
  | "오후 12시 이후";
export type SleepingHabitType = "" | "이갈이" | "코골이" | "잠꼬대" | "없음";
export type SleepingSensitivityType = "" | "어두움" | "밝음";
export type SmokingType = "" | "비흡연" | "흡연";
export type DrinkingFrequencyType = "" | "없음" | "가끔" | "종종" | "자주";
export type ShowerTimeType = "" | "아침" | "저녁";
export type ShowerDurationType = "" | "5분" | "10분" | "15분" | "20분" | "25분";
export type CleaningFrequencyType = "" | "바로바로" | "가끔" | "몰아서";
export type HeatToleranceType = "" | "적게 탐" | "조금 탐" | "많이 탐";
export type MBTIType = "" | "E" | "I" | "S" | "N" | "F" | "T" | "P" | "J";
export type VisitHomeFrequencyType = "" | "거의안감" | "2,3달에 한번" | "1달에 한번" | "주에 한번";
export type LateNightSnackType = "" | "안 먹어요" | "가끔" | "자주";
export type SnackInRoomType = "" | "괜찮아요" | "싫어요";
export type PhoneSoundType = "" | "이어폰" | "스피커" | "유동적";
export type PerfumeUsageType = "" | "미사용" | "가끔" | "자주";
export type StudyLocationType = "" | "기숙사" | "기숙사 외" | "유동적";
export type ExamPreparationType = "" | "시험 준비" | "해당 없어요";
export type ExerciseType = "" | "안해요" | "긱사에서" | "헬스장에서";
export type InsectToleranceType = "" | "잘잡아요" | "작은것만" | "못잡아요";

export interface LifeStylePostType {
  sleepTime: SleepTimeType;
  wakeUpTime: WakeUpTimeType;
  sleepingHabit: SleepingHabitType;
  sleepingSensitivity: SleepingSensitivityType;
  smoking: SmokingType;
  drinkingFrequency: DrinkingFrequencyType;
  drunkHabit: string;
  showerTime: ShowerTimeType;
  showerDuration: ShowerDurationType;
  cleaningFrequency: CleaningFrequencyType;
  heatTolerance: HeatToleranceType;
  coldTolerance: HeatToleranceType;
  MBTI: MBTIType;
  visitHomeFrequency: VisitHomeFrequencyType;
  lateNightSnack: LateNightSnackType;
  snackInRoom: SnackInRoomType;
  phoneSound: PhoneSoundType;
  perfumeUsage: PerfumeUsageType;
  studyLocation: StudyLocationType;
  examPreparation: ExamPreparationType;
  exercise: ExerciseType;
  insectTolerance: InsectToleranceType;
}
