import Header from "@/components/room-mate/Header";
import Image from "next/image";
import Item from "@/components/room-mate/Item";
import React, { useState } from "react";
interface Props {
  onNext: React.Dispatch<React.SetStateAction<string>>;
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const SoundAndPerfume = (props: Props) => {
  const { onNext, onBefore} = props;
  const [clickedPhoneSound, setClickedPhoneSound] = useState<"" | "비흡연" | "흡연">("");
  const [clickedPerfume, setClickedPerfume] = useState<"" | "비흡연" | "흡연">("");

  const phoneSound = ["이어폰", "스피커", "유동적"];
  const perfume = ["미사용", "가끔", "자주"];
  return (
    <div className={"flex flex-col p-5"}>
      <Header />
      <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
        <div className={"flex flex-col gap-y-2"}>
          <div className={"flex justify-center"}>
            <div className={"text-gray5"}>8 / 10</div>
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
        <div className={"text-h3 font-semibold"}>나는 주로 어떤 편인가요?</div>
      </div>

      <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
        <Item
          title={"휴대폰 소리"}
          data={phoneSound}
          className={"grid-cols-3"}
          setIsClickedItem={setClickedPhoneSound}
          isClickedItem={clickedPhoneSound}
        />
        <Item
          title={"향수"}
          data={perfume}
          className={"grid-cols-3"}
          setIsClickedItem={setClickedPerfume}
          isClickedItem={clickedPerfume}
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
export default SoundAndPerfume;
