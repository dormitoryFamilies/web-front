import Image from "next/image";
import React, { useState } from "react";

import Header from "@/components/room-mate/Header";
import Item from "@/components/room-mate/Item";
import { LateNightSnackType } from "@/types/room-mate/type";
interface Props {
  onNext: React.Dispatch<React.SetStateAction<string>>;
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const Food = (props: Props) => {
  const {onNext, onBefore} = props;
  const [clickedMidNightMeal, setClickedMidNightMeal] = useState<LateNightSnackType>("");
  const [clickedInRoomMidnightMeal, setClickedInRoomMidnightMeal] = useState<>("");

  const midNightMeal = ["안먹어요", "가끔", "자주"];
  const inRoomMidnightMeal = ["괜찮아요", "싫어요"];
  return (
    <div className={"flex flex-col p-5"}>
      <Header />
      <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
        <div className={"flex flex-col gap-y-2"}>
          <div className={"flex justify-center"}>
            <div className={"text-gray5"}>7 / 10</div>
          </div>

          <div className={"flex items-center justify-center"}>
            <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
              <div className={"absolute w-[120px] h-1 rounded-full bg-primaryMid"}></div>
            </div>
          </div>
        </div>

        <div className={"flex flex-col items-center justify-center"}>
          <div className={"relative w-[200px] h-[140px]"}>
            <Image
              src={"/room-mate/휴대폰_소리.png"}
              alt={"/room-mate/휴대폰_소리.png"}
              className={"absolute object-cover"}
              fill
            />
          </div>
        </div>
        <div className={"text-h3 font-semibold"}>음식은 어떤가요?</div>
      </div>

      <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
        <Item
          title={"야식"}
          contents={midNightMeal}
          className={"grid-cols-3"}
          setIsClickedItem={setClickedMidNightMeal}
          selectedContent={clickedMidNightMeal}
        />
        <Item
          title={"방 안에서"}
          contents={inRoomMidnightMeal}
          className={"grid-cols-2"}
          setIsClickedItem={setClickedInRoomMidnightMeal}
          selectedContent={clickedInRoomMidnightMeal}
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
export default Food;
