import React, { useState } from "react";
import Header from "@/components/room-mate/Header";
import Image from "next/image";
import Item from "@/components/room-mate/Item";
interface Props {
  onNext: React.Dispatch<React.SetStateAction<string>>;
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const MBTI = (props: Props) => {
  const {onNext, onBefore} = props;
  const [clickedMbti, setClickedMbti] = useState<>("");
  const mbti = ["E", "I", "S", "N", "F", "T", "P", "J"];

  return (
    <div className={"flex flex-col p-5"}>
      <Header />
      <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
        <div className={"flex flex-col gap-y-2"}>
          <div className={"flex justify-center"}>
            <div className={"text-gray5"}>5 / 10</div>
          </div>

          <div className={"flex items-center justify-center"}>
            <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
              <div className={"absolute w-[74px] h-1 rounded-full bg-primaryMid"}></div>
            </div>
          </div>
        </div>

        <div className={"flex flex-col items-center justify-center"}>
          <div className={"relative w-[200px] h-[140px]"}>
            <Image
              src={"/room-mate/MBTI.png"}
              alt={"/room-mate/MBTI.png"}
              className={"absolute object-cover"}
              fill
            />
          </div>
        </div>
        <div className={"text-h3 font-semibold"}>나의 MBTI는?</div>
      </div>

      <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
        <Item
          title={"MBTI"}
          contents={mbti}
          className={"grid-cols-4"}
          secondClassName={"rounded-full p-2 w-[72px] h-[72px]"}
          setIsClickedItem={setClickedMbti}
          selectedContent={clickedMbti}
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
export default MBTI;
