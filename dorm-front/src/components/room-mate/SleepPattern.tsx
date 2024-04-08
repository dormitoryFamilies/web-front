import React from "react";
import Header from "@/components/room-mate/Header";
import Image from "next/image";

interface Props {
  onNext?: React.Dispatch<React.SetStateAction<string>>;
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const SleepPattern = (props: Props) => {
  return (
    <div className={"p-5"}>
      <Header />
      <div className={"flex flex-col items-center justify-center"}>
        <div className={"relative flex flex-col gap-y-2"}>
          <div className={"text-gray5"}>1 / 10</div>
          <div className={" "}>
            <div className={"absolute w-[148px] h-1 rounded-full bg-gray1"}></div>
            <div className={"absolute w-[20px] h-1 rounded-full bg-primaryMid"}></div>
          </div>
        </div>
        <div className={"relative w-[180px] h-[120px]"}>
          <Image src={"/room-mate/잠버릇.png"} alt={"/room-mate/잠버릇.png"} className={"absolute object-cover"} fill />
        </div>
        <div className={"text-h3 font-semibold"}>나의 수면 패턴은?</div>
      </div>
    </div>
  );
};
export default SleepPattern;
