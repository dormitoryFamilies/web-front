import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import Item from "@/components/room-mate/Item";
import { patchLifestyles, postLifestyles } from "@/lib/api/room-mate";
import useMyLifeStyles from "@/lib/hooks/useMyLifeStyles";
import { lifeStyleEditAtom, lifeStylePostAtom } from "@/recoil/room-mate/atom";
import {
  ExerciseType,
  InsectToleranceType,
  LifeStyleResponseType,
  RoomMateLifeStyleStepType,
} from "@/types/room-mate/type";
import { exerciseContents, insectToleranceContents } from "@/utils/room-mate/lifestyles";
interface Props {
  usage: "room-mate" | "mypage";
  setLifeStyleStep: Dispatch<SetStateAction<RoomMateLifeStyleStepType>>;
}
const OtherLifestyles = (props: Props) => {
  const { usage, setLifeStyleStep } = props;
  const { myLifeStyles } = useMyLifeStyles();
  const [lifeStyleEditData, setLifeStyleEditData] = useRecoilState(lifeStyleEditAtom);
  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);
  const [exercise, setExercise] = useState<ExerciseType | undefined>("");
  const [insectTolerance, setInsectTolerance] = useState<InsectToleranceType | undefined>("");
  const [isLifestyleComplete, setIsLifestyleComplete] = useState(false);

  const handleNextClick = () => {
    if (myLifeStyles && myLifeStyles.data.sleepTime) {
      //sleepTime 이 있으면 데이터 정보가 있다고 판단
      if (myLifeStyles.data.exercise !== exercise) {
        setLifeStyleEditData((prevState) => ({ ...prevState, exercise: exercise }));
      }
      if (myLifeStyles.data.insectTolerance !== insectTolerance) {
        setLifeStyleEditData((prevState) => ({ ...prevState, insectTolerance: insectTolerance }));
      }
    } else {
      setLifeStylePostData((prevState) => {
        const updatedState = {
          ...prevState,
        };

        if (exercise !== "") {
          updatedState.exercise = exercise;
        } else {
          delete updatedState.exercise;
        }

        if (insectTolerance !== "") {
          updatedState.insectTolerance = insectTolerance;
        } else {
          delete updatedState.insectTolerance;
        }
        return updatedState;
      });
    }

    setIsLifestyleComplete(true);
  };

  useEffect(() => {
    if (isLifestyleComplete && usage === "room-mate") {
      postLifestyles(lifeStylePostData).then((res) => {
        console.log("res", res);
        setIsLifestyleComplete(false);
        setLifeStylePostData((prevState) => ({
          ...prevState,
          sleepTime: "",
          wakeUpTime: "",
          sleepingHabit: "",
          sleepingSensitivity: "",
          smoking: "",
          drinkingFrequency: "",
          cleaningFrequency: "",
          heatTolerance: "",
          coldTolerance: "",
          perfumeUsage: "",
          examPreparation: "",
          insectTolerance: "",
        }));
        setLifeStyleStep("Done");
      });
    } else if (isLifestyleComplete && usage === "mypage") {
      patchLifestyles(lifeStyleEditData).then((r) => {
        console.log("patch response", r);
        setIsLifestyleComplete(false);
        setLifeStyleEditData(() => ({}));
        setLifeStyleStep("Done");
      });
    }
  }, [isLifestyleComplete]);

  useEffect(() => {
    if (lifeStylePostData.exercise !== "" || lifeStylePostData.insectTolerance !== "") {
      setExercise(lifeStylePostData.exercise);
      setInsectTolerance(lifeStylePostData.insectTolerance);
    }
  }, [lifeStylePostData]);

  /**
   * Recoil 초기화 함수
   */
  const initializeEditPostData = (apiResponse: LifeStyleResponseType) => {
    return {
      exercise: apiResponse.data.exercise,
      insectTolerance: apiResponse.data.insectTolerance,
    };
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    if (myLifeStyles) {
      const initialState = initializeEditPostData(myLifeStyles);
      setExercise(initialState.exercise);
      setInsectTolerance(initialState.insectTolerance);
    }
  }, [myLifeStyles]);

  useEffect(() => {
    console.log("lifeStyleEditData", lifeStyleEditData);
  }, [lifeStyleEditData]);

  return (
    <>
      <Header headerType={"dynamic"} title={"긱사생활 설정"} onBack={() => setLifeStyleStep("Exam")} />
      <div className={"h-[60px]"} />
      <div className={"flex flex-col p-5"}>
        <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"flex justify-center"}>
              <div className={"text-gray5"}>10 / 10</div>
            </div>

            <div className={"flex items-center justify-center"}>
              <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
                <div className={"absolute w-[148px] h-1 rounded-full bg-primaryMid"}></div>
              </div>
            </div>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <img src={"/room-mate/운동.png"} alt={"/room-mate/운동.png"} className={"w-[300px] h-[240px]"} />
          </div>
          <div className={"text-h3 font-semibold"}>기타 생활방식을 알려주세요</div>
        </div>

        <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
          <Item
            title={"운동"}
            isRequired={false}
            contents={exerciseContents}
            className={"grid-cols-3"}
            setSelectedContent={setExercise}
            selectedContent={exercise}
          />
          <Item
            title={"벌레"}
            isRequired={false}
            contents={insectToleranceContents}
            className={"grid-cols-3"}
            setSelectedContent={setInsectTolerance}
            selectedContent={insectTolerance}
          />
        </div>
      </div>
      <div className={"h-[80px]"} />
      <div className={"fixed bottom-0 w-full py-5 bg-white"}>
        <button
          onClick={handleNextClick}
          className={
            "mx-5 w-[90%] rounded-full bg-primary text-white text-h5 py-4 hover:text-white transition"
          }>
          다음
        </button>
      </div>
    </>
  );
};
export default OtherLifestyles;
