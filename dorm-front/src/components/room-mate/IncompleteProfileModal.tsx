import Image from "next/image";
import { useRouter } from "next/navigation";
import type { SVGProps } from "react";
import * as React from "react";

const IncompleteProfileModal = () => {
  const router = useRouter();

  return (
    <div
      className={
        "absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.2)] px-8 min-h-screen"
      }>
      <section className={"flex flex-col gap-y-8 justify-center items-center bg-white py-8 px-7 rounded-[32px]"}>
        <div className={"flex flex-col gap-y-3"}>
          <div className={"relative w-[300px] h-[160px]"}>
            <Image src={"/room-mate/룸메이트.png"} alt={"/room-mate/룸메이트.png"} fill className={"object-cover"} />
          </div>
          <div className={"flex flex-col items-center justify-center"}>
            <div className={"flex justify-center items-center text-h2 font-semibold"}>아직 룸메 정보 설정을</div>
            <div className={"flex justify-center items-center text-h2 font-semibold"}>입력하지 않았어요!</div>
          </div>
          <div>
            <div className={"flex justify-center items-center text-h5 text-gray5"}>룸메 매칭을 설정하면 둠즈가</div>
            <div className={"flex justify-center items-center text-h5 text-gray5"}>원하는 룸메를 추천해드려요!</div>
          </div>
        </div>
        <button
          onClick={() => {
            router.push("/room-mate/lifestyle-setting");
          }}
          className={
            "flex gap-x-2 items-center justify-center bg-primary rounded-full text-white text-h5 py-[13px] w-full "
          }>
          선호 룸메 정보 입력하기
          <ArrowIcon />
        </button>
      </section>
    </div>
  );
};
export default IncompleteProfileModal;

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={5} height={10} fill="none" {...props}>
    <path stroke="#fff" strokeLinecap="round" strokeWidth={1.2} d="m.786 1 2.87 3.35a1 1 0 0 1 0 1.3L.786 9" />
  </svg>
);