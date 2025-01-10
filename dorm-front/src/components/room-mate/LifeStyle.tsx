import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import Item from "@/components/room-mate/Item";
import ProgressBar from "@/components/room-mate/ProgressBar";
import RequirementBanner from "@/components/room-mate/RequirementBanner";
import useMyLifeStyles from "@/lib/hooks/useMyLifeStyles";
import { lifeStyleEditAtom, lifeStylePostAtom } from "@/recoil/room-mate/atom";
import {
  CleaningFrequencyType,
  LifeStyleResponseType,
  RoomMateLifeStyleStepType,
  ShowerTimeType,
} from "@/types/room-mate/type";
import { cleaningFrequencyContents, showerTimeContents } from "@/utils/room-mate/lifestyles";
interface Props {
  setLifeStyleStep: Dispatch<SetStateAction<RoomMateLifeStyleStepType>>;
}
const LifeStyle = (props: Props) => {
  const { setLifeStyleStep } = props;
  const { myLifeStyles } = useMyLifeStyles();
  const [lifeStyleEditData, setLifeStyleEditData] = useRecoilState(lifeStyleEditAtom);

  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);
  const [showerTime, setShowerTime] = useState<ShowerTimeType | undefined>("");
  const [showerDuration, setShowerDuration] = useState<string | undefined>("0");
  const [cleaningFrequency, setCleaningFrequency] = useState<CleaningFrequencyType>("");

  const handleNextClick = () => {
    if (myLifeStyles && myLifeStyles.data.sleepTime) {
      //sleepTime 이 있으면 데이터 정보가 있다고 판단
      if (myLifeStyles.data.showerTime !== showerTime) {
        setLifeStyleEditData((prevState) => ({ ...prevState, showerTime: showerTime }));
      }
      if (myLifeStyles.data.showerDuration !== showerDuration) {
        if (showerDuration === "0") {
          setLifeStyleEditData((prevState) => ({ ...prevState, showerDuration: "" }));
        } else {
          setLifeStyleEditData((prevState) => ({ ...prevState, showerDuration: showerDuration + "분" }));
        }
      }
      if (myLifeStyles.data.cleaningFrequency !== cleaningFrequency) {
        setLifeStyleEditData((prevState) => ({ ...prevState, cleaningFrequency: cleaningFrequency }));
      }
    } else {
      setLifeStylePostData((prevState) => {
        const updatedState = {
          ...prevState,
          cleaningFrequency: cleaningFrequency,
        };

        if (showerTime !== "") {
          updatedState.showerTime = showerTime;
        } else {
          delete updatedState.showerTime;
        }

        if (showerDuration !== "0") {
          updatedState.showerDuration = showerDuration + "분";
        } else {
          delete updatedState.showerDuration;
        }

        return updatedState;
      });
    }
    setLifeStyleStep("Constitution");
  };

  /**
   * Recoil 초기화 함수
   */
  const initializeEditPostData = (apiResponse: LifeStyleResponseType) => {
    return {
      showerTime: apiResponse.data.showerTime,
      showerDuration: apiResponse.data.showerDuration,
      cleaningFrequency: apiResponse.data.cleaningFrequency,
    };
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    if (myLifeStyles) {
      const initialState = initializeEditPostData(myLifeStyles);
      setShowerTime(initialState.showerTime);
      setShowerDuration(initialState.showerDuration);
      setCleaningFrequency(initialState.cleaningFrequency);
    }
  }, [myLifeStyles]);

  useEffect(() => {
    if (
      lifeStylePostData.showerTime !== "" ||
      lifeStylePostData.showerDuration !== "0분" ||
      lifeStylePostData.cleaningFrequency !== ""
    ) {
      setShowerTime(lifeStylePostData.showerTime);
      setShowerDuration(lifeStylePostData.showerDuration ? lifeStylePostData.showerDuration.replace("분", "") : "0");
      setCleaningFrequency(lifeStylePostData.cleaningFrequency);
    }
  }, [lifeStylePostData]);

  useEffect(() => {
    console.log("lifeStyleEditData", lifeStyleEditData);
  }, [lifeStyleEditData]);

  return (
    <>
      <Header headerType={"dynamic"} title={"긱사생활 설정"} onBack={() => setLifeStyleStep("SmokingDrinking")} />
      <div className={"h-[60px]"} />
      <RequirementBanner />
      <div className={"flex flex-col p-5"}>
        <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"flex justify-center"}>
              <div className={"text-gray5"}>3 / 10</div>
            </div>

            <div className={"flex items-center justify-center"}>
              <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
                <div className={"absolute w-[44px] h-1 rounded-full bg-primaryMid"}></div>
              </div>
            </div>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <img
              src={"/room-mate/샤워,_청소.png"}
              alt={"/room-mate/샤워,_청소.png"}
              className={"w-[240px] h-[220px]"}
            />
          </div>
          <div className={"text-h3 font-semibold"}>나의 생활방식은?</div>
        </div>

        <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
          <Item
            title={"샤워시간대"}
            isRequired={false}
            contents={showerTimeContents}
            className={"grid-cols-2"}
            selectedContent={showerTime}
            setSelectedContent={setShowerTime}
          />
          <ProgressBar
            title={"샤워시간"}
            isRequired={false}
            setShowerDuration={setShowerDuration}
            showerDuration={showerDuration !== "0" ? showerDuration?.replace("분", "") : showerDuration}></ProgressBar>
          <Item
            title={"청소"}
            isRequired={true}
            contents={cleaningFrequencyContents}
            className={"grid-cols-3"}
            selectedContent={cleaningFrequency}
            setSelectedContent={setCleaningFrequency}
          />
        </div>
      </div>
      <div className={"h-[80px]"} />
      <div className={"fixed bottom-0 w-full py-5 bg-white"}>
        <button
          disabled={cleaningFrequency === ""}
          onClick={handleNextClick}
          className={
            cleaningFrequency === ""
              ? "w-[90%] mx-5 rounded-full bg-gray3 text-white text-h5 py-4 hover:text-white transition"
              : "w-[90%] mx-5 rounded-full bg-primary text-white text-h5 py-4 hover:text-white transition"
          }>
          다음
        </button>
      </div>
    </>
  );
};
export default LifeStyle;
