import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import GuideMessageModal from "@/components/room-mate/GuideMessageModal";
import Item from "@/components/room-mate/Item";
import RequirementBanner from "@/components/room-mate/RequirementBanner";
import useMyLifeStyles from "@/lib/hooks/useMyLifeStyles";
import { lifeStyleEditAtom, lifeStylePostAtom } from "@/recoil/room-mate/atom";
import {
  ExamPreparationType,
  LifeStyleResponseType,
  RoomMateLifeStyleStepType,
  StudyLocationType,
} from "@/types/room-mate/type";
import { examPreparationContents, studyLocationContents } from "@/utils/room-mate/lifestyles";
interface Props {
  setLifeStyleStep: Dispatch<SetStateAction<RoomMateLifeStyleStepType>>;
}
const Exam = (props: Props) => {
  const { setLifeStyleStep } = props;
  const { myLifeStyles } = useMyLifeStyles();
  const [lifeStyleEditData, setLifeStyleEditData] = useRecoilState(lifeStyleEditAtom);
  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);
  const [studyLocation, setStudyLocation] = useState<StudyLocationType | undefined>("");
  const [examPreparation, setExamPreparation] = useState<ExamPreparationType>("");
  const [isClickedGuideMessage, setIsClickedGuideMessage] = useState<boolean>(false);

  const handleNextClick = () => {
    if (myLifeStyles && myLifeStyles.data.sleepTime) {
      //sleepTime 이 있으면 데이터 정보가 있다고 판단
      if (myLifeStyles.data.studyLocation !== studyLocation) {
        setLifeStyleEditData((prevState) => ({ ...prevState, studyLocation: studyLocation }));
      }
      if (myLifeStyles.data.examPreparation !== examPreparation) {
        setLifeStyleEditData((prevState) => ({ ...prevState, examPreparation: examPreparation }));
      }
    } else {
      setLifeStylePostData((prevState) => {
        const updatedState = {
          ...prevState,
          examPreparation: examPreparation,
        };

        if (studyLocation !== "") {
          updatedState.studyLocation = studyLocation;
        } else {
          delete updatedState.studyLocation;
        }

        return updatedState;
      });
    }

    setLifeStyleStep("OtherLifestyles");
  };

  useEffect(() => {
    if (lifeStylePostData.studyLocation !== "" || lifeStylePostData.examPreparation !== "") {
      setStudyLocation(lifeStylePostData.studyLocation);
      setExamPreparation(lifeStylePostData.examPreparation);
    }
  }, [lifeStylePostData]);

  /**
   * Recoil 초기화 함수
   */
  const initializeEditPostData = (apiResponse: LifeStyleResponseType) => {
    return {
      studyLocation: apiResponse.data.studyLocation,
      examPreparation: apiResponse.data.examPreparation,
    };
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    if (myLifeStyles) {
      const initialState = initializeEditPostData(myLifeStyles);
      setStudyLocation(initialState.studyLocation);
      setExamPreparation(initialState.examPreparation);
    }
  }, [myLifeStyles]);

  useEffect(() => {
    console.log("lifeStyleEditData", lifeStyleEditData);
  }, [lifeStyleEditData]);

  return (
    <>
      {isClickedGuideMessage ? <GuideMessageModal setIsClickedGuideMessage={setIsClickedGuideMessage} /> : null}
      <Header headerType={"dynamic"} title={"긱사생활 설정"} onBack={() => setLifeStyleStep("SoundAndPerfume")} />
      <div className={"h-[60px]"} />
      <RequirementBanner />
      <div className={"flex flex-col p-5"}>
        <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"flex justify-center"}>
              <div className={"text-gray5"}>9 / 10</div>
            </div>

            <div className={"flex items-center justify-center"}>
              <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
                <div className={"absolute w-[133px] h-1 rounded-full bg-primaryMid"}></div>
              </div>
            </div>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <img src={"/room-mate/공부.png"} alt={"/room-mate/공부.png"} className={"w-[300px] h-[160px]"} />
          </div>
          <div className={"text-h3 font-semibold"}>시험기간에 나는?</div>
        </div>

        <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
          <Item
            title={"공부장소"}
            isRequired={false}
            contents={studyLocationContents}
            className={"grid-cols-3"}
            setSelectedContent={setStudyLocation}
            selectedContent={studyLocation}
          />
          <Item
            title={"시험"}
            isRequired={true}
            showGuideMessage={true}
            setIsClickedGuideMessage={setIsClickedGuideMessage}
            contents={examPreparationContents}
            className={"grid-cols-2"}
            setSelectedContent={setExamPreparation}
            selectedContent={examPreparation}
          />
        </div>
      </div>
      <button
        disabled={examPreparation === ""}
        onClick={handleNextClick}
        className={
          examPreparation === ""
            ? "absolute bottom-5 left-5 w-[90%] rounded-full bg-gray3 text-white text-h5 py-4 hover:text-white transition"
            : "absolute bottom-5 left-5 w-[90%] rounded-full bg-primary text-white text-h5 py-4 hover:text-white transition"
        }>
        다음
      </button>
    </>
  );
};
export default Exam;
