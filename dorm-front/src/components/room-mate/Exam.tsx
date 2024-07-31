import Image from "next/image";

import Header from "@/components/room-mate/Header";
import React, { useState } from "react";
import Item from "@/components/room-mate/Item";
import { ExamPreparationType, StudyLocationType } from "@/types/room-mate/type";
interface Props {
  onNext: React.Dispatch<React.SetStateAction<string>>;
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const Exam = (props: Props) => {
  const {onNext, onBefore} = props;
  const [clickedStudySpace, setClickedStudySpace] = useState<StudyLocationType>("");
  const [clickedExam, setClickedExam] = useState<ExamPreparationType>("");

  const studySpace = ["기숙사", "기숙사외", "유동적"];
  const exam = ["시험 준비", "해당없어요"];
  return (
    <div className={"flex flex-col p-5"}>
      <Header />
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
          contents={studySpace}
          className={"grid-cols-3"}
          setIsClickedItem={setClickedStudySpace}
          selectedContent={clickedStudySpace}
        />
        <Item
          title={"음주빈도"}
          contents={exam}
          className={"grid-cols-2"}
          setIsClickedItem={setClickedExam}
          selectedContent={clickedExam}
        />
        <button
          onClick={onNext}
          className={
            "w-full rounded-full bg-gray3 text-white text-h5 py-4 hover:bg-primary hover:text-white transition"
          }>
          다음
        </button>
      </div>
    </div>
  );
};
export default Exam;
