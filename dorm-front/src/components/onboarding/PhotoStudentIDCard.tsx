import Image from "next/image";
import * as React from "react";

import Header from "@/components/common/Header";
import { Dispatch, SetStateAction } from "react";
import { StepOnboarding } from "@/types/onboarding/type";
interface Props {
  onNext: Dispatch<SetStateAction<StepOnboarding>>;
  onBefore: Dispatch<SetStateAction<StepOnboarding>>;
}
const PhotoStudentIDCard = (props: Props) => {
  const { onNext, onBefore } = props;

  const onBack = () => {
    onBefore("SchoolInfoSetting");
  };

  return (
    <>
      <Header headerType={"dynamic"} title={"프로필 설정"} onBack={onBack}></Header>
      <div className={"h-[60px]"}></div>
      <div className={"mx-5"}>
        {/* process bar*/}
        <div className={"flex items-center justify-center"}>
          <div className={"absolute w-[90%] top-15 h-1 bg-gray1 rounded-full "}>
            <div className={"absolute w-[70%] h-1 rounded-full bg-primaryMid"}></div>
          </div>
        </div>

        <div className={"mt-[32px] text-h2 font-semibold"}>학생증 인증을 해주세요.</div>

        <div>
          <div className={"mt-[24px]"}>충북대 학생을 인증하면</div>
          <div className={"flex flex-col gap-y-3 mt-[12px]"}>
            <div className={"flex justify-between items-center gap-x-3 bg-gray0 rounded-[20px] px-5 py-3"}>
              <Image src={"/onboarding/종이비행기.png"} width={100} height={100} alt={"/onboarding/종이비행기.png"} />
              <div className={"flex flex-col"}>
                <div className={"font-semibold"}>기숙사에 대한 다양한 정보와</div>
                <div className={"font-semibold"}>소식을 빠르게 전해요!</div>
              </div>
            </div>
            <div className={"flex justify-between items-center gap-x-3 bg-gray0 rounded-[20px] px-5 py-3"}>
              <Image src={"/onboarding/손뼉.png"} width={100} height={100} alt={"/onboarding/종이비행기.png"} />
              <div className={"flex flex-col"}>
                <div className={"font-semibold"}>룸메 매칭으로</div>
                <div className={"font-semibold"}>원하는 룸메를 추천해요!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          onNext("WaitForCompletion");
        }}
        className={"left-5 py-[15px] absolute bottom-5 text-white bg-primary rounded-full w-[90%] text-h5"}>
        학생증 촬영하기
      </button>
    </>
  );
}
export default PhotoStudentIDCard;


