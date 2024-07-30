import Header from "@/components/room-mate/Header";
import Image from "next/image";
import React, { useState } from "react";
import Item from "@/components/room-mate/Item";
import { ExerciseType, InsectToleranceType } from "@/types/room-mate/type";
interface Props {
  onNext: React.Dispatch<React.SetStateAction<string>>;
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const OtherLifestyles = (props: Props) => {
  const { onNext, onBefore} = props;
  const [clickedExercise, setClickedExercise] = useState<ExerciseType>("");
  const [clickedBug, setClickedBug] = useState<InsectToleranceType>("");

  const bug = ["잘잡아요", "작은것만", "못잡아요"];
  const exercise = ["안해요", "긱사에서", "헬스장에서"];
  return (
    <div className={"flex flex-col p-5"}>
      <Header />
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
          data={exercise}
          className={"grid-cols-3"}
          setIsClickedItem={setClickedExercise}
          isClickedItem={clickedExercise}
        />
        <Item
          title={"벌레"}
          data={bug}
          className={"grid-cols-3"}
          setIsClickedItem={setClickedBug}
          isClickedItem={clickedBug}
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
export default OtherLifestyles;
