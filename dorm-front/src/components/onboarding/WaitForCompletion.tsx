import * as React from "react";

import Header from "@/components/common/Header";
import { Dispatch, SetStateAction } from "react";
import { StepOnboarding } from "@/types/onboarding/type";

interface Props {
  onBefore: Dispatch<SetStateAction<StepOnboarding>>;
}
const WaitForCompletion = (props: Props) => {
  const { onBefore } = props;
  const onBack = () => {
    onBefore("SchoolInfoSetting");
  };
  return (
    <div className={"min-h-screen"}>
      <Header headerType={"dynamic"} title={"프로필 설정"} onBack={onBack}></Header>
      <div className={"h-[60px]"}></div>
      <div className={"mx-5 flex-grow"}>
        {/* process bar*/}
        <div className={"flex items-center justify-center"}>
          <div className={"absolute w-[90%] top-15 h-1 bg-gray1 rounded-full "}>
            <div className={"absolute w-[95%] h-1 rounded-full bg-primaryMid"}></div>
          </div>
        </div>

        <div className={"mt-[32px] text-h2 font-semibold"}>학생증 등록이 완료되었습니다.</div>

        <div className={"flex-grow flex justify-center items-center"}>
          <div className={"flex flex-col items-center justify-center bg-gray0 rounded-[20px] p-5"}>
            <div>인증까지 최대 2일 정도 소요됩니다.</div>
            <div>조금만 기다려 주세요!</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WaitForCompletion;
