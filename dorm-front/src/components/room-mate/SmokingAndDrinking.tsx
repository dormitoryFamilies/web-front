import React, { useState } from "react";
import Header from "@/components/room-mate/Header";
import Image from "next/image";
import Item from "@/components/room-mate/Item";
import { DrinkingFrequencyType, SmokingType } from "@/types/room-mate/type";

interface Props {
  onNext: React.Dispatch<React.SetStateAction<string>>;
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const SmokingAndDrinking = (props: Props) => {
  const [clickedSmokingStatus, setClickedSmokingStatus] = useState<SmokingType>("");
  const [clickedDrinkingFrequency, setClickedDrinkingFrequency] = useState<DrinkingFrequencyType>("");
  const [afterAlcoholBehavior, setAfterAlcoholBehavior] = useState<string>("");
  const smokingStatus = ["비흡연", "흡연"];
  const drinkingFrequency = ["없음", "가끔", "종종", "자주"];
  return (
    <div className={"flex flex-col p-5"}>
      <Header />
      <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
        <div className={"flex flex-col gap-y-2"}>
          <div className={"flex justify-center"}>
            <div className={"text-gray5"}>2 / 10</div>
          </div>

          <div className={"flex items-center justify-center"}>
            <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
              <div className={"absolute w-[30px] h-1 rounded-full bg-primaryMid"}></div>
            </div>
          </div>
        </div>

        <div className={"flex flex-col items-center justify-center"}>
          <div className={"relative w-[200px] h-[140px]"}>
            <Image
              src={"/room-mate/흡연,_음주.png"}
              alt={"/room-mate/흡연,_음주.png"}
              className={"absolute object-cover"}
              fill
            />
          </div>
        </div>
        <div className={"text-h3 font-semibold"}>나의 흡연・음주는?</div>
      </div>

      <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
        <Item
          title={"흡연여부"}
          data={smokingStatus}
          className={"grid-cols-2"}
          setIsClickedItem={setClickedSmokingStatus}
          isClickedItem={clickedSmokingStatus}
        />
        <Item
          title={"음주빈도"}
          data={drinkingFrequency}
          className={"grid-cols-4"}
          secondClassName={"rounded-full p-2 w-[72px] h-[72px]"}
          setIsClickedItem={setClickedDrinkingFrequency}
          isClickedItem={clickedDrinkingFrequency}
        />
        <div className={"flex flex-col gap-y-2"}>
          <label className={"text-gray5 text-h4"}>주사</label>
          <input
            onChange={(e) => {
              setAfterAlcoholBehavior(e.target.value);
            }}
            placeholder={"나의 주사를 적어주세요."}
            className={"p-3 outline-none rounded-[12px] border-[1px] border-gray1 placeholder:text-h4"}></input>
        </div>
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
export default SmokingAndDrinking;

