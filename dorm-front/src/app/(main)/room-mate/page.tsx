"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { SVGProps, useState } from "react";

import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import Tag from "@/components/common/Tag";
import ConfirmRoommateMatchCancel from "@/components/room-mate/ConfirmRoommateMatchCancel";
import MyRoomMateProfile from "@/components/room-mate/MyRoomMateProfile";
import { postRoomMateMatching } from "@/lib/api/room-mate";
import useMyRoomMateMatchingStatus from "@/lib/hooks/useMyRoomMateMatchingStatus";
import useRoomMateHomeInfo from "@/lib/hooks/useRoomMateHomeInfo";

const RoommateMatching = () => {
  const router = useRouter();
  const [isConfirmRoommateMatchCancelOpen, setIsConfirmRoommateMatchCancelOpen] = useState(false);
  const [isRoommateMatchCancelOpen, setIsRoommateMatchCancelOpen] = useState(false);
  const { homeInfo } = useRoomMateHomeInfo();
  const { myRoomMateProfile } = useMyRoomMateMatchingStatus();

  const rightElement = () => {
    return (
      <div className={"flex"}>
        <SearchIcon
          onClick={() => {
            router.push("/room-mate/application-list");
          }}
        />
        <AlarmIcon
          onClick={() => {
            router.push("/alarm");
          }}
        />
      </div>
    );
  };

  return (
    <>
      {isConfirmRoommateMatchCancelOpen ? (
        <ConfirmRoommateMatchCancel
          setIsConfirmRoommateMatchCancelOpen={setIsConfirmRoommateMatchCancelOpen}
          memberId={myRoomMateProfile?.data.matchedId}
          setIsRoommateMatchCancelOpen={setIsRoommateMatchCancelOpen}
        />
      ) : (
        <div>
          <Header headerType={"dynamic"} title={"룸메매칭"} rightElement={rightElement()} />
          <div className={"h-[60px] mb-[43px]"} />
          <div className={"px-5 flex flex-col gap-y-4"}>
            {/*추천 룸메*/}
            {myRoomMateProfile && myRoomMateProfile.data.matchedId === 0 ? (
              <div
                onClick={() => {
                  //룸메 추천 버튼
                  postRoomMateMatching().then((r) => {
                    console.log(r?.data);
                  });
                  router.push("/room-mate/recommended-roommate");
                }}
                className={"relative flex flex-col rounded-[24px] w-full p-5 bg-primaryMid"}>
                <MoveWhiteIcon className={"absolute right-5"} />
                <img
                  src={"/room-mate/룸메매칭_추천룸메.png"}
                  alt={"/room-mate/룸메매칭_추천룸메.png"}
                  className={"w-full h-[230px]"}
                  height={160}
                  width={290}
                />
                <div className={"flex flex-col text-white text-h3 font-semibold"}>
                  <div>{homeInfo?.data.nickname}님의</div>
                  <div>추천룸메</div>
                </div>
              </div>
            ) : (
              <MyRoomMateProfile
                setIsConfirmRoommateMatchCancelOpen={setIsConfirmRoommateMatchCancelOpen}
                memberId={myRoomMateProfile?.data.matchedId}
              />
            )}
            <div
              onClick={() => {
                router.push("/room-mate/application-list");
              }}
              className={"flex gap-x-4"}>
              {/*룸메 신청 목록*/}
              <div className={"rounded-[24px] w-full p-5 bg-secondary "}>
                <div className={"flex justify-between items-center"}>
                  <Tag className={"bg-primaryMid-button"} secondClassName={"py-1 px-3"}>
                    신청 {homeInfo?.data.requestReceivedCount}건
                  </Tag>
                  <MoveBlackIcon />
                </div>
                <div className={"flex justify-end"}>
                  <img
                    src={"/room-mate/룸메매칭_신청목록.png"}
                    alt={"/room-mate/룸메매칭_신청목록.png"}
                    className={"w-[107px] h-[140px]"}
                    width={107}
                    height={140}
                  />
                </div>
                <div className={"pt-3 flex flex-col text-h3 font-semibold"}>
                  <div>룸메</div>
                  <div>신청 목록</div>
                </div>
              </div>

              {/*전체 둠즈 목록*/}
              <div
                onClick={() => {
                  router.push("/room-mate/application-list");
                }}
                className={"rounded-[24px] w-full p-5 bg-primaryLight "}>
                <div className={"flex justify-end"}>
                  <MoveBlackIcon />
                </div>
                <div className={"flex justify-end"}>
                  <img
                    src={"/room-mate/룸메매칭_전체둠즈.png"}
                    alt={"/room-mate/룸메매칭_전체둠즈.png"}
                    className={"w-[104px] h-[140px]"}></img>
                </div>
                <div className={"pt-3 flex flex-col text-h3 font-semibold"}>
                  <div>룸메</div>
                  <div>둠즈 목록</div>
                </div>
              </div>
            </div>
          </div>
          <div className={"h-[80px]"} />
          <NavBar />
        </div>
      )}
    </>
  );
};
export default RoommateMatching;

const MoveWhiteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none" {...props}>
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.156 10.586H2.972M18.972 10.586l-6.16-6.667M14.205 15.47l4.767-4.884"
    />
    <path
      fill="#fff"
      d="M12.025 17.013c0 .369.345.667.77.667s.77-.298.77-.667c0-.368-.344-.666-.77-.666-.425 0-.77.298-.77.666"
    />
  </svg>
);
const MoveBlackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none" {...props}>
    <path
      stroke="#191919"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.656 10.586H2.472M18.472 10.586l-6.16-6.667M13.705 15.47l4.767-4.884"
    />
    <path
      fill="#191919"
      d="M11.525 17.013c0 .369.345.667.77.667s.77-.298.77-.667c0-.368-.344-.666-.77-.666-.425 0-.77.298-.77.666"
    />
  </svg>
);

function AlarmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.532 17.389a7.633 7.633 0 0115.266 0v10.767H12.532V17.389z" stroke="#191919" strokeWidth={1.6} />
      <rect x={9.762} y={27.389} width={20.491} height={1.6} rx={0.8} fill="#191919" />
      <rect x={16.776} y={30.724} width={6.463} height={1.6} rx={0.8} fill="#191919" />
      <rect x={14.403} y={24.724} width={3.861} height={1.537} rx={0.768} fill="#E70050" />
      <rect
        x={20.807}
        y={7.676}
        width={2.56}
        height={1.6}
        rx={0.8}
        transform="rotate(90 20.807 7.676)"
        fill="#191919"
      />
    </svg>
  );
}

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#000"
        d="M17.026 9.504a7.525 7.525 0 0 1 7.522 7.522 7.525 7.525 0 0 1-7.522 7.522 7.525 7.525 0 0 1-7.522-7.522 7.525 7.525 0 0 1 7.522-7.522m0-1.504a9.027 9.027 0 1 0 .002 18.054A9.027 9.027 0 0 0 17.026 8"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m24.739 24.739 6.509 6.509"
      />
      <path fill="#191919" d="M20.396 15.03a1.003 1.003 0 1 0 0-2.005 1.003 1.003 0 0 0 0 2.005" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M8 8h24v24H8z" />
      </clipPath>
    </defs>
  </svg>
);
