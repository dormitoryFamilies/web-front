import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import Item from "@/components/room-mate/Item";
import RequirementBanner from "@/components/room-mate/RequirementBanner";
import useMyLifeStyles from "@/lib/hooks/useMyLifeStyles";
import { lifeStyleEditAtom, lifeStylePostAtom } from "@/recoil/room-mate/atom";
import { HeatToleranceType, LifeStyleResponseType, RoomMateLifeStyleStepType } from "@/types/room-mate/type";
import { coldToleranceContents, heatToleranceContents } from "@/utils/room-mate/lifestyles";
interface Props {
  setLifeStyleStep: Dispatch<SetStateAction<RoomMateLifeStyleStepType>>;
}
const Constitution = (props: Props) => {
  const { setLifeStyleStep } = props;
  const { myLifeStyles } = useMyLifeStyles();
  const [lifeStyleEditData, setLifeStyleEditData] = useRecoilState(lifeStyleEditAtom);
  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);
  const [heatTolerance, setHeatTolerance] = useState<HeatToleranceType>("");
  const [coldTolerance, setColdTolerance] = useState<HeatToleranceType>("");

  const handleNextClick = () => {
    if (myLifeStyles && myLifeStyles.data.sleepTime) {
      //sleepTime 이 있으면 데이터 정보가 있다고 판단
      if (myLifeStyles.data.heatTolerance !== heatTolerance) {
        setLifeStyleEditData((prevState) => ({ ...prevState, heatTolerance: heatTolerance }));
      }
      if (myLifeStyles.data.coldTolerance !== coldTolerance) {
        setLifeStyleEditData((prevState) => ({ ...prevState, coldTolerance: coldTolerance }));
      }
    } else {
      setLifeStylePostData((prevState) => ({
        ...prevState,
        heatTolerance: heatTolerance,
        coldTolerance: coldTolerance,
      }));
    }
    setLifeStyleStep("MBTI");
  };

  /**
   * Recoil 초기화 함수
   */
  const initializeEditPostData = (apiResponse: LifeStyleResponseType) => {
    return {
      heatTolerance: apiResponse.data.heatTolerance,
      coldTolerance: apiResponse.data.coldTolerance,
    };
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    if (myLifeStyles) {
      const initialState = initializeEditPostData(myLifeStyles);
      setHeatTolerance(initialState.heatTolerance);
      setColdTolerance(initialState.coldTolerance);
    }
  }, [myLifeStyles]);

  useEffect(() => {
    if (lifeStylePostData.heatTolerance !== "" || lifeStylePostData.coldTolerance !== "") {
      setHeatTolerance(lifeStylePostData.heatTolerance);
      setColdTolerance(lifeStylePostData.coldTolerance);
    }
  }, [lifeStylePostData]);

  useEffect(() => {
    console.log("lifeStyleEditData", lifeStyleEditData);
  }, [lifeStyleEditData]);

  return (
    <>
      <Header headerType={"dynamic"} title={"긱사생활 설정"} onBack={() => setLifeStyleStep("LifeStyle")} />
      <div className={"h-[60px]"} />
      <RequirementBanner />
      <div className={"flex flex-col p-5"}>
        <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"flex justify-center"}>
              <div className={"text-gray5"}>4 / 10</div>
            </div>

            <div className={"flex items-center justify-center"}>
              <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
                <div className={"absolute w-[60px] h-1 rounded-full bg-primaryMid"}></div>
              </div>
            </div>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <div className={"relative w-[200px] h-[140px]"}>
              <Image
                src={"/room-mate/추위,_더위.png"}
                alt={"/room-mate/추위,_더위.png"}
                className={"absolute object-cover"}
                fill
              />
            </div>
          </div>
          <div className={"text-h3 font-semibold"}>나의 체질은?</div>
        </div>

        <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
          <Item
            title={"더위"}
            isRequired={true}
            contents={heatToleranceContents}
            className={"grid-cols-3"}
            selectedContent={heatTolerance}
            setSelectedContent={setHeatTolerance}
          />
          <Item
            title={"추위"}
            isRequired={true}
            contents={coldToleranceContents}
            className={"grid-cols-3"}
            selectedContent={coldTolerance}
            setSelectedContent={setColdTolerance}
          />
          <button
            disabled={coldTolerance === "" || heatTolerance === ""}
            onClick={handleNextClick}
            className={
              coldTolerance === "" || heatTolerance === ""
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
export default Constitution;
