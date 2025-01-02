import {
  CleaningFrequencyType,
  DrinkingFrequencyType,
  ExamPreparationType,
  ExerciseType,
  ExtrovertOrIntrovertType,
  HeatToleranceType,
  HeterosexualOrEmotionalType,
  InsectToleranceType,
  IntuitiveOrThinkingType,
  LateNightSnackType,
  PerfumeUsageType,
  PhoneSoundType,
  PlannedOrSpontaneousType,
  ShowerTimeType,
  SleepingHabitType,
  SleepingSensitivityType,
  SleepTimeType,
  SmokingType,
  SnackInRoomType,
  StudyLocationType,
  VisitHomeFrequencyType,
  WakeUpTimeType,
} from "@/types/room-mate/type";

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
export const smokingStatusContents: SmokingType[] = ["비흡연", "흡연"];
export const drinkingFrequencyContents: DrinkingFrequencyType[] = ["없음", "가끔", "종종", "자주"];

export const showerTimeContents: ShowerTimeType[] = ["아침", "저녁"];
export const cleaningFrequencyContents: CleaningFrequencyType[] = ["바로바로", "가끔", "몰아서"];

export const heatToleranceContents: HeatToleranceType[] = ["적게 탐", "조금 탐", "많이 탐"];
export const coldToleranceContents: HeatToleranceType[] = ["적게 탐", "조금 탐", "많이 탐"];

export const extrovertOrIntrovertContents: ExtrovertOrIntrovertType[] = ["E", "I"];
export const intuitiveOrThinkingContents: IntuitiveOrThinkingType[] = ["S", "N"];
export const heterosexualOrEmotionalContents: HeterosexualOrEmotionalType[] = ["T", "F"];
export const plannedOrSpontaneousContents: PlannedOrSpontaneousType[] = ["J", "P"];
export const visitHomeFrequencyContents: VisitHomeFrequencyType[] = [
  "거의 안감",
  "2,3달에 한 번",
  "1달에 한 번",
  "주에 한 번",
];
export const lateNightSnackContents: LateNightSnackType[] = ["안 먹어요", "가끔", "자주"];
export const snackInRoomContents: SnackInRoomType[] = ["괜찮아요", "싫어요"];
export const phoneSoundContents: PhoneSoundType[] = ["이어폰", "스피커", "유동적"];
export const perfumeUsageContents: PerfumeUsageType[] = ["미사용", "가끔", "자주"];
export const studyLocationContents: StudyLocationType[] = ["기숙사", "기숙사 외", "유동적"];
export const examPreparationContents: ExamPreparationType[] = ["시험 준비", "해당 없어요"];

export const insectToleranceContents: InsectToleranceType[] = ["잘잡아요", "작은것만", "못잡아요"];
export const exerciseContents: ExerciseType[] = ["안해요", "긱사에서", "헬스장에서"];
