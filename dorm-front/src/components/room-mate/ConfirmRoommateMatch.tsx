import * as React from "react";

import Header from "@/components/common/Header";
import RoommateMatchCard from "@/components/room-mate/RoommateMatchCard";
import { postRoomMateMatchingRequest } from "@/lib/api/room-mate";

interface Props {
  memberId: number;
  setIsConfirmRoommateMatchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRoommateMatchSuccessOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmRoommateMatch = (props: Props) => {
  const { memberId, setIsConfirmRoommateMatchOpen, setIsRoommateMatchSuccessOpen } = props;
  const onBack = () => {
    setIsConfirmRoommateMatchOpen(false);
  };

  const handleNextClick = () => {
    postRoomMateMatchingRequest(memberId).then((r) => {
      console.log(r);
    });
    setIsConfirmRoommateMatchOpen(false);
    setIsRoommateMatchSuccessOpen(true);
  };

  const topElement = () => {
    return <div className={"px-3 py-1 text-h5 bg-gray0 rounded-full w-fit"}>받는 분의 프로필</div>;
  };

  return (
    <>
      <Header headerType={"dynamic"} onBack={onBack} title={"룸메 매칭 신청"} />
      <div className={"h-[60px]"} />
      <div>
        <div className={"px-5 mt-6"}>
          {/* 안내문구 */}
          <div className={"mb-6"}>
            <div className={"text-h2 font-semibold"}>
              닉네임<span className={"text-h4 font-normal"}>님에게</span> <br />
              룸메 매칭을 신청할까요?{" "}
            </div>
            <div className={""}>
              <div className={"text-h5 text-gray4 mt-1"}>
                현재 룸메가 되기위한 신청 과정이에요. <br />
                상대에 대한 정보를 확인 후 매칭을 신청해주세요!
              </div>
              <div className={"text-h6 text-point mt-2"}>
                *추천된 룸메와 관련된 모든 상황은 둠즈앱에서 책임지지 않아요
              </div>
            </div>
          </div>
          {/* 카드 */}
          <RoommateMatchCard memberId={memberId} topElement={topElement} bottomButton={false} />
        </div>
        <button
          onClick={() => {
            handleNextClick();
          }}
          className={
            "absolute bottom-5 left-5 w-[90%] rounded-full bg-primary text-h5 text-white py-4 hover:text-white transition"
          }>
          신청하기
        </button>
      </div>
    </>
  );
};
export default ConfirmRoommateMatch;
