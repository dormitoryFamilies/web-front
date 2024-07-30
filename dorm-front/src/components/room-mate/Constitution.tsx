import React, { useState } from "react";
import Header from "@/components/room-mate/Header";
import Image from "next/image";
import Item from "@/components/room-mate/Item";
import { HeatToleranceType } from "@/types/room-mate/type";
interface Props {
  onNext: React.Dispatch<React.SetStateAction<string>>;
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const Constitution = (props: Props) => {
  const { onNext, onBefore } = props;
  const [clickedHeatIndex, setClickedHeatIndex] = useState<HeatToleranceType>("");
  const [clickedColdIndex, setClickedColdIndex] = useState<HeatToleranceType>("");

  const heatIndex = ["적게 탐", "조금 탐", "많이 탐"];
  const coldIndex = ["적게 탐", "조금 탐", "많이 탐"];

  return (
    <div className={"flex flex-col p-5"}>
      <Header />
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
          data={heatIndex}
          className={"grid-cols-4"}
          setIsClickedItem={setClickedHeatIndex}
          isClickedItem={clickedHeatIndex}
        />
        <Item
          title={"추위"}
          data={coldIndex}
          className={"grid-cols-4"}
          setIsClickedItem={setClickedColdIndex}
          isClickedItem={clickedColdIndex}
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
export default Constitution;
