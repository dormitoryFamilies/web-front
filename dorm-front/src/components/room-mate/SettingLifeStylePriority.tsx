import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import { preferenceOrderListAtom } from "@/recoil/room-mate/atom";
import { priorityContents } from "@/utils/room-mate/priority";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<"SettingLifeStylePriority" | "SettingLifeStyleType" | "Done">>;
}

const SettingLifeStylePriority = (props: Props) => {
  const { setStep } = props;
  const router = useRouter();
  const [preferenceOrderList, setPreferenceOrderList] = useRecoilState(preferenceOrderListAtom);

  const onBack = () => {
    router.push("/room-mate/lifestyle-setting");
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
