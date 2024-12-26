"use client";

import { useState } from "react";
import * as React from "react";
import { useRecoilState } from "recoil";

import ConfirmRoommateMatch from "@/components/room-mate/ConfirmRoommateMatch";
import ConfirmRoommateMatchCancel from "@/components/room-mate/ConfirmRoommateMatchCancel";
import IncompleteProfileModal from "@/components/room-mate/IncompleteProfileModal";
import RoommateMatchCancel from "@/components/room-mate/RoommateMatchCancel";
import RoommateMatchList from "@/components/room-mate/RoommateMatchList";
import RoommateMatchPending from "@/components/room-mate/RoommateMatchPending";
import RoommateMatchSuccess from "@/components/room-mate/RoommateMatchSuccess";
import { candidateIdsAtom, selectedRoomMateMemberIdAtom } from "@/recoil/room-mate/atom";
const RecommendedRoommate = () => {
  const [candidateIds, setCandidateIds] = useRecoilState(candidateIdsAtom);
  const [selectedRoomMateMemberId, setSelectedRoomMateMemberId] = useRecoilState(selectedRoomMateMemberIdAtom);
  const [isConfirmRoommateMatchOpen, setIsConfirmRoommateMatchOpen] = useState(false);
  const [isRoommateMatchSuccessOpen, setIsRoommateMatchSuccessOpen] = useState(false);
  const [isConfirmRoommateMatchCancelOpen, setIsConfirmRoommateMatchCancelOpen] = useState(false);
  const [isRoommateMatchCancelOpen, setIsRoommateMatchCancelOpen] = useState(false);
  const [isRoommateMatchListOpen, setIsRoommateMatchListOpen] = useState(false);

  return (
    <>
      {/* 룸메 매칭 신청 확인 컴포넌트*/}
      {/*<IncompleteProfileModal />*/}
      {isRoommateMatchListOpen ? (
        <RoommateMatchList setIsRoommateMatchListOpen={setIsRoommateMatchListOpen} />
      ) : isConfirmRoommateMatchOpen ? (
        <ConfirmRoommateMatch
          memberId={candidateIds[selectedRoomMateMemberId]}
          setIsConfirmRoommateMatchOpen={setIsConfirmRoommateMatchOpen}
          setIsRoommateMatchSuccessOpen={setIsRoommateMatchSuccessOpen}
        />
      ) : isConfirmRoommateMatchCancelOpen ? (
        // 룸메 매칭 취소 확인 컴포넌트
        <ConfirmRoommateMatchCancel
          memberId={candidateIds[selectedRoomMateMemberId]}
          setIsConfirmRoommateMatchCancelOpen={setIsConfirmRoommateMatchCancelOpen}
          setIsRoommateMatchCancelOpen={setIsRoommateMatchCancelOpen}
        />
      ) : isRoommateMatchCancelOpen ? (
        // 룸메 매칭 취소 컴포넌트
        <RoommateMatchCancel
          memberId={candidateIds[selectedRoomMateMemberId]}
          setIsRoommateMatchCancelOpen={setIsRoommateMatchCancelOpen}
        />
      ) : isRoommateMatchSuccessOpen ? (
        // 룸메 매칭 신청 완료 컴포넌트
        <RoommateMatchSuccess
          memberId={candidateIds[selectedRoomMateMemberId]}
          setIsRoommateMatchSuccessOpen={setIsRoommateMatchSuccessOpen}
          setIsConfirmRoommateMatchCancelOpen={setIsConfirmRoommateMatchCancelOpen}
        />
      ) : (
        //룸메 매칭 홈화면
        <RoommateMatchPending
          setIsConfirmRoommateMatchOpen={setIsConfirmRoommateMatchOpen}
          setIsRoommateMatchListOpen={setIsRoommateMatchListOpen}
        />
      )}
    </>
  );
};

export default RecommendedRoommate;
