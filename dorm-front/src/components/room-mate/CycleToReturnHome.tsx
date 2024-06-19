import Image from "next/image";
import React, { useState } from "react";

import Header from "@/components/room-mate/Header";
import Item from "@/components/room-mate/Item";
interface Props {
  onNext: React.Dispatch<React.SetStateAction<string>>;
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const CycleToReturnHome = (props: Props) => {
  const {onNext, onBefore} = props;
  const [clickedCycleToReturnHome, setClickedCycleToReturnHome] = useState<"" | "안먹어요" | "가끔" | "자주">("");

  const cycleToReturnHome = ["거의안감", "2,3달에 한번", "1달에 한번", "주에 한번"];
  return (
    <div className={"flex flex-col p-5"}>
      <Header />
      <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
        <div className={"flex flex-col gap-y-2"}>
          <div className={"flex justify-center"}>
            <div className={"text-gray5"}>6 / 10</div>
          </div>

          <div className={"flex items-center justify-center"}>
            <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
              <div className={"absolute w-[88px] h-1 rounded-full bg-primaryMid"}></div>
            </div>
          </div>
        </div>

        <div className={"flex flex-col items-center justify-center"}>
          <div className={"relative w-[200px] h-[140px]"}>
            <Image
              src={"/room-mate/본가주기.png"}
              alt={"/room-mate/본가주기.png"}
              className={"absolute object-cover"}
              fill
            />
          </div>
        </div>
        <div className={"text-h3 font-semibold"}>나의 본가 주기는?</div>
      </div>

      <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
        <Item
          title={"본가가는 빈도"}
          data={cycleToReturnHome}
          className={"grid-cols-4"}
          secondClassName={"rounded-full p-2 w-[72px] h-[72px]"}
          setIsClickedItem={setClickedCycleToReturnHome}
          isClickedItem={clickedCycleToReturnHome}
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
export default CycleToReturnHome;
