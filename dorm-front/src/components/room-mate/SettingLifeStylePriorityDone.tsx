import { useRouter } from "next/navigation";
import React from "react";

import Header from "@/components/common/Header";

interface Props {
  usage: "room-mate" | "mypage";
  setStep: React.Dispatch<React.SetStateAction<"SettingLifeStylePriority" | "SettingLifeStyleType" | "Done">>;
}
const SettingLifeStylePriorityDone = (props: Props) => {
  const { setStep, usage } = props;
  const router = useRouter();

  const handleNextClick = () => {
    if (usage === "room-mate") {
      router.push("/room-mate/recommended-roommate");
    } else {
      router.push("/mypage");
    }
  };

  return (
    <>
      <Header headerType={"dynamic"} title={"긱사생활 설정"} onBack={() => setStep("SettingLifeStyleType")} />
      <div className={"flex flex-col justify-center items-center min-h-screen"}>
        <div className={"flex flex-col justify-center items-center"}>
          <div className={"text-h3 flex flex-col justify-center items-center"}>
            <div>설정한 정보를 바탕으로</div>
            <div className={"font-semibold"}>룸메매칭을 해줄께요!</div>
          </div>
          <div className={"text-h5 mt-3"}>룸메 정보 변경은 ‘마이페이지’에서 가능해요.</div>
          <img
            alt={"/room-mate/룸메매칭 설정 완료.png"}
            src={"/room-mate/룸메매칭 설정 완료.png"}
            className={"w-[171px] h-[160px]"}></img>
        </div>
      </div>
      <button
        onClick={handleNextClick}
        className={
          "absolute bottom-5 left-5 w-[90%] rounded-full bg-gray1 text-h5 text-gray5 py-4 hover:text-white transition"
        }>
        닫기
      </button>
    </>
  );
};
export default SettingLifeStylePriorityDone;
