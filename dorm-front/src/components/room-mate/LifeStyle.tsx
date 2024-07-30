import React, { useState } from "react";
import Header from "@/components/room-mate/Header";
import Image from "next/image";
import Item from "@/components/room-mate/Item";
import { CleaningFrequencyType, ShowerTimeType } from "@/types/room-mate/type";
interface Props {
  onNext: React.Dispatch<React.SetStateAction<string>>;
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const LifeStyle = (props: Props) => {
  const { onNext, onBefore } = props;
  const [clickedShowerTime, setClickedShowerTime] = useState<ShowerTimeType>("");
  const [clickedCleaningFrequency, setClickedCleaningFrequency] = useState<CleaningFrequencyType>("");

  const showerTime = ["아침", "저녁"];
  const cleaningFrequency = ["바로바로", "가끔", "몰아서"];

  return (
    <div className={"flex flex-col p-5"}>
      <Header />
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
          <div className={"relative w-[200px] h-[140px]"}>
            <Image
              src={"/room-mate/샤워,_청소.png"}
              alt={"/room-mate/샤워,_청소.png"}
              className={"absolute object-cover"}
              fill
            />
          </div>
        </div>
        <div className={"text-h3 font-semibold"}>나의 생활방식은?</div>
      </div>

      <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
        <Item
          title={"샤워시간대"}
          data={showerTime}
          className={"grid-cols-4"}
          setIsClickedItem={setClickedShowerTime}
          isClickedItem={clickedShowerTime}
        />
        <Item
          title={"청소"}
          data={cleaningFrequency}
          className={"grid-cols-4"}
          setIsClickedItem={setClickedCleaningFrequency}
          isClickedItem={clickedCleaningFrequency}
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
export default LifeStyle;

