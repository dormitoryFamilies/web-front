import { router } from "next/client";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

import Header from "@/components/common/Header";
import { RoomMateLifeStyleStepType } from "@/types/room-mate/type";

interface Props {
  setLifeStyleStep: Dispatch<SetStateAction<RoomMateLifeStyleStepType>>;
}

const Done = (props: Props) => {
  const { setLifeStyleStep } = props;
  const handleNextClick = () => {
    router.push("/room-mate/lifestyle-priority");
  };

  return (
    <>
      <Header headerType={"dynamic"} title={"긱사생활 설정"} onBack={() => setLifeStyleStep("OtherLifestyles")} />
      <div className={"h-[60px]"} />
      <div className={"flex flex-col justify-center items-center min-h-screen"}>
        <div className={"flex flex-col justify-center items-center"}>
          <div className={"text-h3 flex flex-col justify-center items-center"}>
            <div>나의 긱사생활 입력이 완료되었어요</div>
            <div className={"font-semibold"}>원하는 룸메정보를 설정해봐요!</div>
          </div>
          <div className={"text-h5 mt-3"}>나의 긱사생활 변경은 ‘마이페이지’에서 가능해요.</div>
          <Image alt={"/room-mate/룸메이트.png"} src={"/room-mate/룸메이트.png"} width={300} height={50}></Image>
        </div>
      </div>
      <button
        onClick={handleNextClick}
        className={
          "absolute bottom-5 left-5 w-[90%] rounded-full bg-primary text-white text-h5 py-4 hover:text-white transition"
        }>
        선호 룸메 우선순위 설정
      </button>
    </>
  );
};
export default Done;
