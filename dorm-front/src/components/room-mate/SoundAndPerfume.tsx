import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import Item from "@/components/room-mate/Item";
import RequirementBanner from "@/components/room-mate/RequirementBanner";
import { lifeStylePostAtom } from "@/recoil/room-mate/atom";
import { PerfumeUsageType, PhoneSoundType, RoomMateLifeStyleStepType } from "@/types/room-mate/type";
import { perfumeUsageContents, phoneSoundContents } from "@/utils/room-mate/lifestyles";
interface Props {
  setLifeStyleStep: Dispatch<SetStateAction<RoomMateLifeStyleStepType>>;
}
const SoundAndPerfume = (props: Props) => {
  const { setLifeStyleStep } = props;
  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);
  const [phoneSound, setPhoneSound] = useState<PhoneSoundType | undefined>("");
  const [perfumeUsage, setPerfumeUsage] = useState<PerfumeUsageType>("");

  const handleNextClick = () => {
    setLifeStylePostData((prevState) => {
      const updatedState = {
        ...prevState,
        perfumeUsage: perfumeUsage,
      };

      if (phoneSound !== "") {
        updatedState.phoneSound = phoneSound;
      } else {
        delete updatedState.phoneSound;
      }

      return updatedState;
    });

    setLifeStyleStep("Exam");
  };

  useEffect(() => {
    if (lifeStylePostData.phoneSound !== "" || lifeStylePostData.perfumeUsage !== "") {
      setPhoneSound(lifeStylePostData.phoneSound);
      setPerfumeUsage(lifeStylePostData.perfumeUsage);
    }
  }, [lifeStylePostData]);

  return (
    <>
      <Header headerType={"dynamic"} title={"긱사생활 설정"} onBack={() => setLifeStyleStep("Food")} />
      <div className={"h-[60px]"} />
      <RequirementBanner />
      <div className={"flex flex-col p-5"}>
        <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"flex justify-center"}>
              <div className={"text-gray5"}>8 / 10</div>
            </div>

            <div className={"flex items-center justify-center"}>
              <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
                <div className={"absolute w-[120px] h-1 rounded-full bg-primaryMid"}></div>
              </div>
            </div>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <div className={"relative w-[200px] h-[140px]"}>
              <Image
                src={"/room-mate/휴대폰_소리.png"}
                alt={"/room-mate/휴대폰_소리.png"}
                className={"absolute object-cover"}
                fill
              />
            </div>
          </div>
          <div className={"text-h3 font-semibold"}>나는 주로 어떤 편인가요?</div>
        </div>

        <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
          <Item
            title={"휴대폰 소리"}
            isRequired={false}
            contents={phoneSoundContents}
            className={"grid-cols-3"}
            setSelectedContent={setPhoneSound}
            selectedContent={phoneSound}
          />
          <Item
            title={"향수"}
            isRequired={true}
            contents={perfumeUsageContents}
            className={"grid-cols-3"}
            setSelectedContent={setPerfumeUsage}
            selectedContent={perfumeUsage}
          />
          <button
            disabled={perfumeUsage === ""}
            onClick={handleNextClick}
            className={
              perfumeUsage === ""
                ? "absolute bottom-5 left-5 w-[90%] rounded-full bg-gray3 text-white text-h5 py-4 hover:text-white transition"
                : "absolute bottom-5 left-5 w-[90%] rounded-full bg-primary text-white text-h5 py-4 hover:text-white transition"
            }>
            다음
          </button>
        </div>
      </div>
    </>
  );
};
export default SoundAndPerfume;
