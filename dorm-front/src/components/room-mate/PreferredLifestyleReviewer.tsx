import CleaningFrequencyIcon from "@/assets/room-mate/CleaningFrequencyIcon";
import ColdToleranceIcon from "@/assets/room-mate/ColdToleranceIcon";
import DrinkingFrequencyIcon from "@/assets/room-mate/DrinkingFrequencyIcon";
import ExamPreparationIcon from "@/assets/room-mate/ExamPreparationIcon";
import HeatToleranceIcon from "@/assets/room-mate/HeatToleranceIcon";
import PerfumeUsageIcon from "@/assets/room-mate/PerfumeUsageIcon";
import SleepingHabitIcon from "@/assets/room-mate/SleepingHabitIcon";
import SleepingSensitivityIcon from "@/assets/room-mate/SleepingSensitivityIcon";
import SleepTimeIcon from "@/assets/room-mate/SleepTimeIcon";
import SmokingIcon from "@/assets/room-mate/SmokingIcon";
import WakeUpTimeIcon from "@/assets/room-mate/WakeUpTimeIcon";
import useRoomMateUserPreferenceOrders from "@/lib/hooks/useRoomMateUserPreferenceOrders";

interface Props {
  memberId: string | string[] | number | undefined;
}

const PreferredLifestyleReviewer = (props: Props) => {
  const { memberId } = props;
  const { preferenceOrders } = useRoomMateUserPreferenceOrders(memberId);

  const renderItem = (content: string) => {
    switch (content.split(":")[0]) {
      case "SLEEP_TIME":
        return (
          <div className={"flex gap-x-1"}>
            <div
              className={
                "flex justify-center items-center h-[44px] w-[44px] rounded-full border-[1px] border-gray1 bg-white "
              }>
              <SleepTimeIcon />
            </div>
            <div className={"flex flex-col"}>
              <div className={"text-h5 text-gray5"}>취침시간</div>
              <div className={"text-h5 text-gray5"}>{content.split(":")[1]}</div>
            </div>
          </div>
        );
      case "WAKE_UP_TIME":
        return (
          <div className={"flex gap-x-1"}>
            <div
              className={
                "flex justify-center items-center h-[44px] w-[44px] rounded-full border-[1px] border-gray1 bg-white "
              }>
              <WakeUpTimeIcon />
            </div>
            <div className={"flex flex-col"}>
              <div className={"text-h5 text-gray5"}>기상시간</div>
              <div className={"text-h5 text-gray5"}>{content.split(":")[1]}</div>
            </div>
          </div>
        );
      case "SLEEPING_HABIT":
        return (
          <div className={"flex gap-x-1"}>
            <div
              className={
                "flex justify-center items-center h-[44px] w-[44px] rounded-full border-[1px] border-gray1 bg-white "
              }>
              <SleepingHabitIcon />
            </div>
            <div className={"flex flex-col"}>
              <div className={"text-h5 text-gray5"}>잠버릇</div>
              <div className={"text-h5 text-gray5"}>{content.split(":")[1]}</div>
            </div>
          </div>
        );
      case "SMOKING":
        return (
          <div className={"flex gap-x-1"}>
            <div
              className={
                "flex justify-center items-center h-[44px] w-[44px] rounded-full border-[1px] border-gray1 bg-white "
              }>
              <SmokingIcon />
            </div>
            <div className={"flex flex-col"}>
              <div className={"text-h5 text-gray5"}>흡연여부</div>
              <div className={"text-h5 text-gray5"}>{content.split(":")[1]}</div>
            </div>
          </div>
        );
      case "DRINKING_FREQUENCY":
        return (
          <div className={"flex gap-x-1"}>
            <div
              className={
                "flex justify-center items-center h-[44px] w-[44px] rounded-full border-[1px] border-gray1 bg-white "
              }>
              <DrinkingFrequencyIcon />
            </div>
            <div className={"flex flex-col"}>
              <div className={"text-h5 text-gray5"}>음주빈도</div>
              <div className={"text-h5 text-gray5"}>{content.split(":")[1]}</div>
            </div>
          </div>
        );
      case "SLEEPING_SENSITIVITY":
        return (
          <div className={"flex gap-x-1"}>
            <div
              className={
                "flex justify-center items-center h-[44px] w-[44px] rounded-full border-[1px] border-gray1 bg-white "
              }>
              <SleepingSensitivityIcon />
            </div>
            <div className={"flex flex-col"}>
              <div className={"text-h5 text-gray5"}>잠귀</div>
              <div className={"text-h5 text-gray5"}>{content.split(":")[1]}</div>
            </div>
          </div>
        );
      case "CLEANING_FREQUENCY":
        return (
          <div className={"flex gap-x-1"}>
            <div
              className={
                "flex justify-center items-center h-[44px] w-[44px] rounded-full border-[1px] border-gray1 bg-white "
              }>
              <CleaningFrequencyIcon />
            </div>
            <div className={"flex flex-col"}>
              <div className={"text-h5 text-gray5"}>청소빈도</div>
              <div className={"text-h5 text-gray5"}>{content.split(":")[1]}</div>
            </div>
          </div>
        );
      case "HEAT_TOLERANCE":
        return (
          <div className={"flex gap-x-1"}>
            <div
              className={
                "flex justify-center items-center h-[44px] w-[44px] rounded-full border-[1px] border-gray1 bg-white "
              }>
              <HeatToleranceIcon />
            </div>
            <div className={"flex flex-col"}>
              <div className={"text-h5 text-gray5"}>더위</div>
              <div className={"text-h5 text-gray5"}>{content.split(":")[1]}</div>
            </div>
          </div>
        );
      case "COLD_TOLERANCE":
        return (
          <div className={"flex gap-x-1"}>
            <div
              className={
                "flex justify-center items-center h-[44px] w-[44px] rounded-full border-[1px] border-gray1 bg-white "
              }>
              <ColdToleranceIcon />
            </div>
            <div className={"flex flex-col"}>
              <div className={"text-h5 text-gray5"}>추위</div>
              <div className={"text-h5 text-gray5"}>{content.split(":")[1]}</div>
            </div>
          </div>
        );
      case "PERFUME_USAGE":
        return (
          <div className={"flex gap-x-1"}>
            <div
              className={
                "flex justify-center items-center h-[44px] w-[44px] rounded-full border-[1px] border-gray1 bg-white "
              }>
              <PerfumeUsageIcon />
            </div>
            <div className={"flex flex-col"}>
              <div className={"text-h5 text-gray5"}>향수</div>
              <div className={"text-h5 text-gray5"}>{content.split(":")[1]}</div>
            </div>
          </div>
        );
      case "EXAM_PREPARATION":
        return (
          <div className={"flex gap-x-1"}>
            <div
              className={
                "flex justify-center items-center h-[44px] w-[44px] rounded-full border-[1px] border-gray1 bg-white "
              }>
              <ExamPreparationIcon />
            </div>
            <div className={"flex flex-col"}>
              <div className={"text-h5 text-gray5"}>시험</div>
              <div className={"text-h5 text-gray5"}>{content.split(":")[1]}</div>
            </div>
          </div>
        );
    }
  };
  return preferenceOrders ? (
    <div>
      <div className={"font-semibold text-primary"}>선호 룸메 라이프 스타일</div>
      <div className={"mt-2 bg-gray0 rounded-[24px] p-3"}>
        <div className={"grid grid-cols-2 justify-between gap-y-3"}>
          {/* 첫번째 선호 라이프 스타일 */}
          {preferenceOrders ? renderItem(preferenceOrders.data.firstPreference) : null}
          {/* 두번째 선호 라이프 스타일 */}
          {preferenceOrders ? renderItem(preferenceOrders.data.secondPreference) : null}
          {/* 세번째 선호 라이프 스타일 */}
          {preferenceOrders ? renderItem(preferenceOrders.data.thirdPreference) : null}
          {/* 네번째 선호 라이프 스타일 */}
          {preferenceOrders ? renderItem(preferenceOrders.data.fourthPreference) : null}
        </div>
      </div>
    </div>
  ) : null;
};
export default PreferredLifestyleReviewer;
