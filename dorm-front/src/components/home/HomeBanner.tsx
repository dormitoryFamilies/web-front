'use client'

import Image from "next/image";
import {useRouter} from "next/navigation";

import Button from "@/components/common/Button";


const HomeBanner = () => {
    const router = useRouter();
    const onButtonClick = () => {
        router.push('/room-mate')
    }
    return (
        <div className="flex justify-between p-4 bg-secondary rounded-[24px]">
            <div className="flex flex-col gap-y-3">
                <div className="text-h3 font-semibold">룸메 매칭을 통해 <br/>원하는 룸메를 구해보세요!</div>
                <Button Icon={ArrowIcon} className={"bg-primaryMid text-white w-fit"} onClick={onButtonClick}>룸메 찾기</Button>
            </div>
            <Image src={"/룸메매칭 그래픽.png"} width={100} height={95} alt={"룸메 매칭 그래픽"}></Image>
        </div>
    )
}
export default HomeBanner;

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={13}
            height={11}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M11.164 5.64H1.306M11.694 5.64l-4-5M8.6 9.303l3.094-3.663"
                stroke="#FFFDFD"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M7.184 10.46a.5.5 0 101 0 .5.5 0 00-1 0z" fill="#FFFDFD" />
        </svg>
    );
}
