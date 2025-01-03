import * as React from "react";

import Header from "@/components/common/Header";
import RoommateMatchCard from "@/components/room-mate/RoommateMatchCard";
import useRoomMateRecommendResultProfile from "@/lib/hooks/useRoomMateRecommendResultProfile";

interface Props {
  memberId: number;
  setIsRoommateMatchSuccessOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConfirmRoommateMatchCancelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const RoommateMatchSuccess = (props: Props) => {
  const { memberId, setIsRoommateMatchSuccessOpen, setIsConfirmRoommateMatchCancelOpen } = props;
  const { recommendRoomMateProfile } = useRoomMateRecommendResultProfile(memberId);

  const onBack = () => {
    setIsRoommateMatchSuccessOpen(false);
  };

  const handleCancelClick = () => {
    setIsRoommateMatchSuccessOpen(false);
    setIsConfirmRoommateMatchCancelOpen(true);
  };

  const handleCloseClick = () => {
    setIsRoommateMatchSuccessOpen(false);
  };

  const topElement = () => {
    return <div className={"px-3 py-1 text-h5 bg-gray0 rounded-full w-fit"}>받는 분의 프로필</div>;
  };

  return (
    <div className={"flex flex-col min-h-screen"}>
      <Header headerType={"dynamic"} title={"룸메 매칭 신청"} onBack={onBack} />
      <div className={"h-[60px]"} />
      <div>
        <div className={"px-5 mt-6"}>
          {/* 안내문구 */}
          <div className={"mb-6"}>
            <div className={"text-h2 font-semibold"}>
              {recommendRoomMateProfile?.data.nickname}
              <span className={"text-h4 fonts-normal"}>님과의</span> <br />
              매칭 신청 수락을 기다리고 있어요{" "}
            </div>
            <div className={""}>
              <div className={"text-h5 text-gray4 mt-1"}>닫기를 눌러도 매칭 신청이 취소되지 않아요.</div>
            </div>
          </div>
          {/* 카드 */}
          <RoommateMatchCard memberId={memberId} topElement={topElement} bottomButton={false} />
        </div>
      </div>
      <div className={"mt-auto mx-5 flex gap-x-3 mb-5"}>
        <button
          onClick={() => {
            handleCloseClick();
          }}
          className={"w-full rounded-full bg-gray1 text-h5 text-gray5 py-4"}>
          닫기
        </button>
        <button
          onClick={() => {
            handleCancelClick();
          }}
          className={"w-full rounded-full bg-white text-h5 text-gray5 border-[1px] border-gray1 py-4"}>
          신청 취소
        </button>
      </div>
    </div>
  );
};
export default RoommateMatchSuccess;
