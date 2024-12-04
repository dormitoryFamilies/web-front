import * as React from "react";

import Header from "@/components/common/Header";
import RoommateMatchCard from "@/components/room-mate/RoommateMatchCard";
import { deleteMatchingRequest } from "@/lib/api/room-mate";

interface Props {
  memberId: number;
  setIsConfirmRoommateMatchCancelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRoommateMatchCancelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ConfirmRoommateMatchCancel = (props: Props) => {
  const { memberId, setIsConfirmRoommateMatchCancelOpen, setIsRoommateMatchCancelOpen } = props;
  const handleCancelClick = () => {
    deleteMatchingRequest(memberId).then((r) => {
      console.log(r);
    });
    setIsConfirmRoommateMatchCancelOpen(false);
    setIsRoommateMatchCancelOpen(true);
  };

  const onBack = () => {
    setIsConfirmRoommateMatchCancelOpen(false);
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
              닉네임<span className={"text-h4 font-normal"}>님과의</span> <br />
              매칭 신청을 취소할껀가요?{" "}
            </div>
            <div className={""}>
              <div className={"text-h5 text-gray4 mt-1"}>
                신청 취소 후 다시 신청할 시<br />
                룸메매칭 과정을 처음부터 다시 진행해야해요.
              </div>
            </div>
          </div>
          {/* 카드 */}
          <RoommateMatchCard memberId={memberId} topElement={topElement} bottomButton={false} />
        </div>
      </div>
      <div className={"mt-auto mx-5 flex gap-x-3 mb-5"}>
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
export default ConfirmRoommateMatchCancel;