import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import usePreferenceOrders from "@/lib/hooks/usePreferenceOrders";
import { preferenceOrderListAtom } from "@/recoil/room-mate/atom";
import { PreferenceOrdersType } from "@/types/room-mate/type";
import { priorityContents } from "@/utils/room-mate/priority";

interface Props {
  usage: "room-mate" | "mypage";
  setStep: React.Dispatch<React.SetStateAction<"SettingLifeStylePriority" | "SettingLifeStyleType" | "Done">>;
}

const SettingLifeStylePriority = (props: Props) => {
  const { usage, setStep } = props;
  const router = useRouter();
  const [preferenceOrderList, setPreferenceOrderList] = useRecoilState(preferenceOrderListAtom);
  const { preferenceOrders } = usePreferenceOrders();

  const preferenceMapping = (content: string) => {
    switch (content) {
      case "SLEEP_TIME":
        return "취침 시간";
      case "WAKE_UP_TIME":
        return "기상 시간";
      case "SLEEPING_HABIT":
        return "잠버릇";
      case "SMOKING":
        return "흡연 여부";
      case "DRINKING_FREQUENCY":
        return "음주 빈도";
      case "SLEEPING_SENSITIVITY":
        return "잠귀";
      case "CLEANING_FREQUENCY":
        return "청소 빈도";
      case "HEAT_TOLERANCE":
        return "더위";
      case "COLD_TOLERANCE":
        return "추위";
      case "PERFUME_USAGE":
        return "향수";
      case "EXAM_PREPARATION":
        return "시험";
      default:
        return null;
    }
  };

  const processPreferences = (data: PreferenceOrdersType) => {
    const transformedList: (string | null)[] = Object.values(data)
      .map((preference: string) => preference.split(":")[0]) // ':'를 기준으로 앞부분 추출
      .map(preferenceMapping) // 추출된 값 변환
      .filter((item) => item !== null); // 변환되지 않은 값은 제외
    setPreferenceOrderList(transformedList); // 상태 업데이트
  };

  useEffect(() => {
    if (preferenceOrders && preferenceOrders.code === 200) {
      processPreferences(preferenceOrders.data);
    }
  }, [preferenceOrders]);

  const onBack = () => {
    if (usage === "room-mate") {
      router.push("/room-mate/lifestyle-setting");
    } else {
      router.push("/mypage");
    }
  };

  const updatePreferredLifestyles = (content: string) => {
    if (preferenceOrderList.length < 4 && !preferenceOrderList.includes(content)) {
      setPreferenceOrderList((prevState) => [...prevState, content]);
    } else if (preferenceOrderList.includes(content)) {
      setPreferenceOrderList((prevState) => prevState.filter((item) => item !== content));
    }
  };

  const handleNextClick = () => {
    setStep("SettingLifeStyleType");
  };

  return (
    <>
      <Header title={"룸메 우선순위설정"} headerType={"dynamic"} onBack={onBack} />
      <div className={"h-[60px]"}></div>
      {/* 안내 문구 */}
      <div className={"px-5 py-2"}>
        <div className={"flex flex-col gap-y-2"}>
          <div className={"text-h3"}>
            <span className={"font-semibold"}>높은 우선순위대로</span> 4개 선택해주세요!
          </div>
          <div className={"text-h5 text-gray4"}>룸메 매칭에 도움이 됩니다.</div>
        </div>
      </div>
      {/* 설정 컴포넌트 */}
      <div className={"grid grid-cols-2 gap-4 px-5 py-3"}>
        {priorityContents.map((priorityContent) => {
          return (
            <button
              onClick={() => {
                updatePreferredLifestyles(priorityContent);
              }}
              key={priorityContent}
              className={
                preferenceOrderList.includes(priorityContent)
                  ? "flex gap-x-3 px-4 py-[14px] rounded-[12px] border-[1px] border-primaryMid bg-primaryLight"
                  : "flex gap-x-3 px-4 py-[14px] rounded-[12px] border-[1px] border-gray1"
              }>
              <div
                className={
                  preferenceOrderList.includes(priorityContent)
                    ? "h-[24px] w-[24px] rounded-full bg-primaryMid text-white"
                    : "h-[24px] w-[24px] rounded-full bg-gray1 text-white"
                }>
                {preferenceOrderList.includes(priorityContent)
                  ? preferenceOrderList.indexOf(priorityContent) + 1
                  : null}
              </div>
              <div className={preferenceOrderList.includes(priorityContent) ? "text-black" : "text-gray5"}>
                {priorityContent}
              </div>
            </button>
          );
        })}
      </div>
      <button
        disabled={preferenceOrderList.length !== 4}
        onClick={handleNextClick}
        className={
          preferenceOrderList.length !== 4
            ? "absolute bottom-5 left-5 w-[90%] rounded-full bg-gray3 text-white text-h5 py-4 hover:text-white transition"
            : "absolute bottom-5 left-5 w-[90%] rounded-full bg-primary text-white text-h5 py-4 hover:text-white transition"
        }>
        다음
      </button>
    </>
  );
};
export default SettingLifeStylePriority;
