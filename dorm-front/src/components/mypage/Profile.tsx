import type { SVGProps } from "react";
import * as React from "react";
import MyLifeStyle from "@/components/mypage/MyLifeStyle";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  name: string;
}
const Profile = (props: Props) => {
  const { name } = props;
  const router = useRouter();

  return (
    <div className={"flex p-4 rounded-[32px] gap-x-3 items-center"}>
      <Image alt={"/unnimm.jpg"} src={"/unnimm.jpg"} width={72} height={72} className={"rounded-full"}></Image>
      <div className={"flex flex-col gap-y-1"}>
        <div className={"flex items-center gap-x-[6px]"}>
          <span className={"text-h3 font-semibold"}>{name}</span> <span className={"text-h4"}>님</span>
          <MoveIcon />
        </div>
        <div
          onClick={() => {
            router.push("/mypage/follow");
          }}
          className={"flex gap-x-5"}>
          <div className={"text-h6 text-gray4"}>
            <span className={"text-h5 text-primaryMid"}>20 </span>팔로잉
          </div>
          <div className={"text-h6 text-gray4"}>
            <span className={"text-h5 text-primaryMid"}>10 </span>팔로워
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={15} fill="none" {...props}>
    <path stroke="#9E9FA1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m3 13.5 6-6-6-6" />
  </svg>
);
