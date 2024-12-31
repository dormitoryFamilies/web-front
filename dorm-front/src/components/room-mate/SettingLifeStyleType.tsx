import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import LifeStylePriorityTypeSettingItem from "@/components/room-mate/LifeStylePriorityTypeSettingItem";
import { postPreferenceOrders, putPreferenceOrders } from "@/lib/api/room-mate";
import { preferenceOrderListAtom, preferenceOrdersAtom } from "@/recoil/room-mate/atom";
import {
  cleaningFrequencyPriorityContents,
  coldTolerancePriorityContents,
  drinkingFrequencyPriorityContents,
  examPreparation,
  heatTolerancePriorityContents,
  perfumeUsagePriorityContents,
  sleepingHabitPriorityContents,
  sleepingSensitivityPriorityContents,
  sleepTimePriorityContents,
  smokingPriorityContents,
  wakeUpTimePriorityContents,
} from "@/utils/room-mate/priority";

interface Props {
  usage: "room-mate" | "mypage";
  setStep: React.Dispatch<React.SetStateAction<"SettingLifeStylePriority" | "SettingLifeStyleType" | "Done">>;
}
const SettingLifeStyleType = (props: Props) => {
  const { usage, setStep } = props;
  const [preferenceOrderList, setPreferenceOrderList] = useRecoilState(preferenceOrderListAtom);
  const [preferenceOrders, setPreferenceOrders] = useRecoilState(preferenceOrdersAtom);
  const [firstPreference, setFirstPreference] = useState<string>("");
  const [secondPreference, setSecondPreference] = useState<string>("");
  const [thirdPreference, setThirdPreference] = useState<string>("");
  const [fourthPreference, setFourthPreference] = useState<string>("");

  const onBack = () => {
    setStep("SettingLifeStylePriority");
  };

  const resetPreferenceOrderList = () => {
    setPreferenceOrderList([]);
    onBack();
  };

  const renderItem = (content: string | null) => {
    switch (content) {
      case "취침 시간":
        return sleepTimePriorityContents;
      case "기상 시간":
        return wakeUpTimePriorityContents;
      case "잠버릇":
        return sleepingHabitPriorityContents;
      case "흡연 여부":
        return smokingPriorityContents;
      case "음주 빈도":
        return drinkingFrequencyPriorityContents;
      case "잠귀":
        return sleepingSensitivityPriorityContents;
      case "청소 빈도":
        return cleaningFrequencyPriorityContents;
      case "더위":
        return heatTolerancePriorityContents;
      case "추위":
        return coldTolerancePriorityContents;
      case "향수":
        return perfumeUsagePriorityContents;
      case "시험":
        return examPreparation;
    }
  };

  const renderStyleGrid = (content: string | null) => {
    switch (content) {
      case "취침 시간":
        return "grid-cols-3";
      case "기상 시간":
        return "grid-cols-3";
      case "잠버릇":
        return "grid-cols-4";
      case "흡연 여부":
        return "grid-cols-2";
      case "음주 빈도":
        return "grid-cols-4";
      case "잠귀":
        return "grid-cols-2";
      case "청소 빈도":
        return "grid-cols-3";
      case "더위":
        return "grid-cols-3";
      case "추위":
        return "grid-cols-3";
      case "향수":
        return "grid-cols-3";
      case "시험":
        return "grid-cols-2";
    }
  };

  const updateLifeStyleType = (content: string | null) => {
    switch (content) {
      case "취침 시간":
        return "SLEEP_TIME";
      case "기상 시간":
        return "WAKE_UP_TIME";
      case "잠버릇":
        return "SLEEPING_HABIT";
      case "흡연 여부":
        return "SMOKING";
      case "음주 빈도":
        return "DRINKING_FREQUENCY";
      case "잠귀":
        return "SLEEPING_SENSITIVITY";
      case "청소 빈도":
        return "CLEANING_FREQUENCY";
      case "더위":
        return "HEAT_TOLERANCE";
      case "추위":
        return "COLD_TOLERANCE";
      case "향수":
        return "PERFUME_USAGE";
      case "시험":
        return "EXAM_PREPARATION";
    }
  };

  const handleNextClick = () => {
    setPreferenceOrders((prevState) => ({
      ...prevState,
      firstPreference: updateLifeStyleType(preferenceOrderList[0]) + ":" + firstPreference,
      secondPreference: updateLifeStyleType(preferenceOrderList[1]) + ":" + secondPreference,
      thirdPreference: updateLifeStyleType(preferenceOrderList[2]) + ":" + thirdPreference,
      fourthPreference: updateLifeStyleType(preferenceOrderList[3]) + ":" + fourthPreference,
    }));
  };

  useEffect(() => {
    if (
      preferenceOrders.firstPreference !== "" &&
      preferenceOrders.secondPreference !== "" &&
      preferenceOrders.thirdPreference !== "" &&
      preferenceOrders.fourthPreference !== ""
    ) {
      if (usage === "room-mate") {
        postPreferenceOrders(preferenceOrders).then(() => {
          setPreferenceOrders((prevState) => ({
            ...prevState,
            firstPreference: "",
            secondPreference: "",
            thirdPreference: "",
            fourthPreference: "",
          }));
          setStep("Done");
        });
      } else {
        putPreferenceOrders(preferenceOrders).then(() => {
          setPreferenceOrders((prevState) => ({
            ...prevState,
            firstPreference: "",
            secondPreference: "",
            thirdPreference: "",
            fourthPreference: "",
          }));
          setStep("Done");
        });
      }
    }
  }, [preferenceOrders]);

  return (
    <>
      <Header title={"룸메 우선순위설정"} headerType={"dynamic"} onBack={onBack} />
      <div className={"h-[60px]"}></div>
      <div className={"px-5 py-2"}>
        <span className={"text-h3"}>
          <span className={"font-semibold"}>원하는 룸메의 정보를</span> 선택해주세요!
        </span>
      </div>

      {/* 전페이지에서 선택한 우선순위 */}
      <div className={"px-5 mt-2"}>
        <div className={"flex justify-between mb-2"}>
          <div className={"text-primary"}>4/4개 선택되었습니다</div>
          <button
            onClick={() => {
              resetPreferenceOrderList();
            }}
            className={"text-gray4"}>
            초기화
          </button>
        </div>
        <div className={"flex overflow-x-scroll gap-x-3"}>
          {preferenceOrderList.map((preferenceContent, index) => {
            return (
              <div
                key={preferenceContent}
                className={
                  "flex shrink-0 px-5 py-[9px] rounded-[12px]  gap-x-1 border-[1px] border-primary text-primary items-center"
                }>
                <div className={"px-[6px] py-[1px] w-[20px] h-[20px] bg-primary text-white rounded-full text-h6"}>
                  {index + 1}
                </div>
                {preferenceContent}
              </div>
            );
          })}
        </div>
      </div>

      {/* 각 우선순위의 Type*/}
      <div className={"flex flex-col gap-y-5 px-5 mt-7"}>
        <LifeStylePriorityTypeSettingItem
          selectedContent={firstPreference}
          setSelectedContent={setFirstPreference}
          className={renderStyleGrid(preferenceOrderList[0])}
          title={preferenceOrderList[0]}
          contents={renderItem(preferenceOrderList[0])}
        />
        <LifeStylePriorityTypeSettingItem
          selectedContent={secondPreference}
          setSelectedContent={setSecondPreference}
          className={renderStyleGrid(preferenceOrderList[1])}
          title={preferenceOrderList[1]}
          contents={renderItem(preferenceOrderList[1])}
        />
        <LifeStylePriorityTypeSettingItem
          selectedContent={thirdPreference}
          setSelectedContent={setThirdPreference}
          className={renderStyleGrid(preferenceOrderList[2])}
          title={preferenceOrderList[2]}
          contents={renderItem(preferenceOrderList[2])}
        />
        <LifeStylePriorityTypeSettingItem
          selectedContent={fourthPreference}
          setSelectedContent={setFourthPreference}
          className={renderStyleGrid(preferenceOrderList[3])}
          title={preferenceOrderList[3]}
          contents={renderItem(preferenceOrderList[3])}
        />
      </div>
      <button
        disabled={
          firstPreference === "" || secondPreference === "" || thirdPreference === "" || fourthPreference === ""
        }
        onClick={handleNextClick}
        className={
          firstPreference === "" || secondPreference === "" || thirdPreference === "" || fourthPreference === ""
            ? "mt-5 mx-5 w-[90%] rounded-full bg-gray3 text-white text-h5 py-4 hover:text-white transition"
            : "mt-5 mx-5 w-[90%] rounded-full bg-primary text-white text-h5 py-4 hover:text-white transition"
        }>
        다음
      </button>
    </>
  );
};
export default SettingLifeStyleType;
