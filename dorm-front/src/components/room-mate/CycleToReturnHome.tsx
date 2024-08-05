import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/room-mate/Header";
import Item from "@/components/room-mate/Item";
import RequirementBanner from "@/components/room-mate/RequirementBanner";
import { lifeStylePostAtom } from "@/recoil/room-mate/atom";
import { RoomMateLifeStyleStepType, VisitHomeFrequencyType } from "@/types/room-mate/type";
import { visitHomeFrequencyContents } from "@/utils/room-mate/lifestyles";
interface Props {
  setLifeStyleStep: Dispatch<SetStateAction<RoomMateLifeStyleStepType>>;
}
const CycleToReturnHome = (props: Props) => {
  const { setLifeStyleStep } = props;
  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);
  const [visitHomeFrequency, setVisitHomeFrequency] = useState<VisitHomeFrequencyType>("");

  useEffect(() => {
    console.log(lifeStylePostData);
  }, [lifeStylePostData]);

  const handleNextClick = () => {
    setLifeStylePostData((prevState) => ({
      ...prevState,
      ...(visitHomeFrequency !== "" && { visitHomeFrequency: visitHomeFrequency }),
    }));
    setLifeStyleStep("Food");
  };

  return (
    <>
      <Header />
      <RequirementBanner />
      <div className={"flex flex-col p-5"}>
        <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"flex justify-center"}>
              <div className={"text-gray5"}>6 / 10</div>
            </div>

            <div className={"flex items-center justify-center"}>
              <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
                <div className={"absolute w-[88px] h-1 rounded-full bg-primaryMid"}></div>
              </div>
            </div>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <div className={"relative w-[200px] h-[140px]"}>
              <Image
                src={"/room-mate/본가주기.png"}
                alt={"/room-mate/본가주기.png"}
                className={"absolute object-cover"}
                fill
              />
            </div>
          </div>
          <div className={"text-h3 font-semibold"}>나의 본가 주기는?</div>
        </div>

        <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
          <Item
            title={"본가가는 빈도"}
            isRequired={false}
            contents={visitHomeFrequencyContents}
            className={"grid-cols-4"}
            secondClassName={"rounded-full p-2 w-[72px] h-[72px]"}
            setSelectedContent={setVisitHomeFrequency}
            selectedContent={visitHomeFrequency}
          />
        </div>
      </div>
      <button
        onClick={handleNextClick}
        className={
          "absolute bottom-5 left-5 w-[90%] rounded-full bg-primary text-white text-h5 py-4 hover:text-white transition"
        }>
        다음
      </button>
    </>
  );
};
export default CycleToReturnHome;
