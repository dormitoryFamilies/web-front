import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/room-mate/Header";
import Item from "@/components/room-mate/Item";
import RequirementBanner from "@/components/room-mate/RequirementBanner";
import { postLifestyles } from "@/lib/api/room-mate";
import { lifeStylePostAtom } from "@/recoil/room-mate/atom";
import { ExerciseType, InsectToleranceType, RoomMateLifeStyleStepType } from "@/types/room-mate/type";
import { exerciseContents, insectToleranceContents } from "@/utils/room-mate/lifestyles";
interface Props {
  setLifeStyleStep: Dispatch<SetStateAction<RoomMateLifeStyleStepType>>;
}
const OtherLifestyles = (props: Props) => {
  const { setLifeStyleStep } = props;
  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);
  const [exercise, setExercise] = useState<ExerciseType>("");
  const [insectTolerance, setInsectTolerance] = useState<InsectToleranceType>("");
  const [isLifestyleComplete, setIsLifestyleComplete] = useState(false);

  const handleNextClick = () => {
    setLifeStylePostData((prevState) => ({
      ...prevState,
      ...(exercise !== "" && { exercise: exercise }),
      ...(insectTolerance !== "" && { insectTolerance: insectTolerance }),
    }));
    setIsLifestyleComplete(true);
  };

  useEffect(() => {
    if (isLifestyleComplete) {
      postLifestyles(lifeStylePostData).then((r) => {
        console.log(r);
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
    }
  }, [isLifestyleComplete]);

  return (
    <>
      <Header />
      <RequirementBanner />
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
            <div className={"relative w-[200px] h-[140px]"}>
              <Image src={"/room-mate/운동.png"} alt={"/room-mate/운동.png"} className={"absolute object-cover"} fill />
            </div>
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
export default OtherLifestyles;
