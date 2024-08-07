import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import Item from "@/components/room-mate/Item";
import RequirementBanner from "@/components/room-mate/RequirementBanner";
import { lifeStylePostAtom } from "@/recoil/room-mate/atom";
import { DrinkingFrequencyType, RoomMateLifeStyleStepType, SmokingType } from "@/types/room-mate/type";
import { drinkingFrequencyContents, smokingStatusContents } from "@/utils/room-mate/lifestyles";

interface Props {
  setLifeStyleStep: Dispatch<SetStateAction<RoomMateLifeStyleStepType>>;
}
const SmokingAndDrinking = (props: Props) => {
  const { setLifeStyleStep } = props;
  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);
  const [smoking, setSmoking] = useState<SmokingType>("");
  const [drinkingFrequency, setDrinkingFrequency] = useState<DrinkingFrequencyType>("");
  const [drunkHabit, setDrunkHabit] = useState<string | undefined>("");

  const handleNextClick = () => {
    setLifeStylePostData((prevState) => {
      const updatedState = {
        ...prevState,
        smoking: smoking,
        drinkingFrequency: drinkingFrequency,
      };

      if (drunkHabit !== undefined) {
        updatedState.drunkHabit = drunkHabit;
      } else {
        delete updatedState.drunkHabit;
      }

      return updatedState;
    });

    setLifeStyleStep("LifeStyle");
  };

  useEffect(() => {
    if (
      lifeStylePostData.smoking !== "" ||
      lifeStylePostData.drinkingFrequency !== "" ||
      lifeStylePostData.drunkHabit !== ""
    ) {
      setSmoking(lifeStylePostData.smoking);
      setDrinkingFrequency(lifeStylePostData.drinkingFrequency);
      setDrunkHabit(lifeStylePostData.drunkHabit);
    }
  }, [lifeStylePostData]);

  return (
    <>
      <Header headerType={"dynamic"} title={"긱사생활 설정"} onBack={() => setLifeStyleStep("SleepPattern")} />
      <div className={"h-[60px]"}></div>
      <RequirementBanner />
      <div className={"flex flex-col p-5"}>
        <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"flex justify-center"}>
              <div className={"text-gray5"}>2 / 10</div>
            </div>

            <div className={"flex items-center justify-center"}>
              <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
                <div className={"absolute w-[30px] h-1 rounded-full bg-primaryMid"}></div>
              </div>
            </div>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <div className={"relative w-[200px] h-[140px]"}>
              <Image
                src={"/room-mate/흡연,_음주.png"}
                alt={"/room-mate/흡연,_음주.png"}
                className={"absolute object-cover"}
                fill
              />
            </div>
          </div>
          <div className={"text-h3 font-semibold"}>나의 흡연・음주는?</div>
        </div>

        <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
          <Item
            title={"흡연여부"}
            isRequired={true}
            contents={smokingStatusContents}
            className={"grid-cols-2"}
            setSelectedContent={setSmoking}
            selectedContent={smoking}
          />
          <Item
            title={"음주빈도"}
            isRequired={true}
            contents={drinkingFrequencyContents}
            className={"grid-cols-4"}
            secondClassName={"rounded-full p-2 w-[72px] h-[72px]"}
            selectedContent={drinkingFrequency}
            setSelectedContent={setDrinkingFrequency}
          />
          <div className={"flex flex-col gap-y-2"}>
            <label className={"text-gray5 text-h4"}>주사</label>
            <input
              value={drunkHabit}
              onChange={(e) => {
                if (drunkHabit === undefined || null) {
                  setDrunkHabit("");
                } else {
                  setDrunkHabit(e.target.value);
                }
              }}
              placeholder={"나의 주사를 적어주세요."}
              className={"p-3 outline-none rounded-[12px] border-[1px] border-gray1 placeholder:text-h4"}></input>
          </div>
          <button
            disabled={smoking === "" || drinkingFrequency === ""}
            onClick={handleNextClick}
            className={
              smoking === "" || drinkingFrequency === ""
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
export default SmokingAndDrinking;
