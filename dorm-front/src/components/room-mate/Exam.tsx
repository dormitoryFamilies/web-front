import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import GuideMessageModal from "@/components/room-mate/GuideMessageModal";
import Item from "@/components/room-mate/Item";
import RequirementBanner from "@/components/room-mate/RequirementBanner";
import { lifeStylePostAtom } from "@/recoil/room-mate/atom";
import { ExamPreparationType, RoomMateLifeStyleStepType, StudyLocationType } from "@/types/room-mate/type";
import { examPreparationContents, studyLocationContents } from "@/utils/room-mate/lifestyles";
interface Props {
  setLifeStyleStep: Dispatch<SetStateAction<RoomMateLifeStyleStepType>>;
}
const Exam = (props: Props) => {
  const { setLifeStyleStep } = props;
  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);
  const [studyLocation, setStudyLocation] = useState<StudyLocationType>("");
  const [examPreparation, setExamPreparation] = useState<ExamPreparationType>("");
  const [isClickedGuideMessage, setIsClickedGuideMessage] = useState<boolean>(false);

  const handleNextClick = () => {
    setLifeStylePostData((prevState) => ({
      ...prevState,
      ...(studyLocation !== "" && { studyLocation: studyLocation }),
      examPreparation: examPreparation,
    }));
    setLifeStyleStep("OtherLifestyles");
  };

  useEffect(() => {
    if (lifeStylePostData.studyLocation !== "" || lifeStylePostData.examPreparation !== "") {
      setStudyLocation(lifeStylePostData.studyLocation);
      setExamPreparation(lifeStylePostData.examPreparation);
    }
  }, [lifeStylePostData]);

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
            <div className={"relative w-[200px] h-[140px]"}>
              <Image src={"/room-mate/공부.png"} alt={"/room-mate/공부.png"} className={"absolute object-cover"} fill />
            </div>
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
