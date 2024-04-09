import React from "react";
import Header from "@/components/room-mate/Header";
import Image from "next/image";
import Item from "@/components/room-mate/Item";

interface Props {
  onNext?: React.Dispatch<React.SetStateAction<string>>;
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const SleepPattern = (props: Props) => {
  const bedTime = [
    "오후 9시 이전",
    "오후 9시",
    "오후 10시",
    "오후 11시",
    "오전 12시",
    "오전 1시",
    "오전 2시",
    "오전 3시",
    "오전 3시 이후",
  ];
  const wakeUpTime = [
    "오전 4시 이전",
    "오전 4시",
    "오전 5시",
    "오전 6시",
    "오전 7시",
    "오전 8시",
    "오전 9시",
    "오전 10시",
    "오전 10시 이후",
  ];
  const sleepHabits = ["이갈이", "코골이", "잠꼬대", "없음"];
  const sleepSensitivity = ["어두움", "밝음","없음"];
  return (
    <div className={"flex flex-col p-5"}>
      <Header />
      <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
        <div className={"flex flex-col gap-y-2"}>
          <div className={"flex justify-center"}>
            <div className={"text-gray5"}>1 / 10</div>
          </div>

          <div className={"flex items-center justify-center"}>
            <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
              <div className={"absolute w-[20px] h-1 rounded-full bg-primaryMid"}></div>
            </div>
          </div>
        </div>

        <div className={"flex flex-col items-center justify-center"}>
          <div className={"relative w-[180px] h-[120px]"}>
            <Image
              src={"/room-mate/잠버릇.png"}
              alt={"/room-mate/잠버릇.png"}
              className={"absolute object-cover"}
              fill
            />
          </div>
        </div>
        <div className={"text-h3 font-semibold"}>나의 수면 패턴은?</div>
      </div>

      <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
        <Item title={"취침시간"} data={bedTime} className={"grid-cols-3"} />
        <Item title={"기상시간"} data={wakeUpTime} className={"grid-cols-3"} />
        <Item
          title={"잠버릇"}
          data={sleepHabits}
          className={"grid-cols-4"}
          secondClassName={"rounded-full p-2 w-[72px] h-[72px]"}
        />
        <Item title={"기상시간"} data={sleepSensitivity} className={"grid-cols-3"} />
        <button className={"w-full rounded-full bg-gray3 text-white text-h5 py-4"}>다음</button>
      </div>
    </div>
  );
};
export default SleepPattern;
