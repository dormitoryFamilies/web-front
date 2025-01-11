import { useRouter } from "next/navigation";
import * as React from "react";
import { SVGProps, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import EmblaCarousel from "@/components/room-mate/carousel/EmblaCarousel";
import IncompleteProfileModal from "@/components/room-mate/IncompleteProfileModal";
import useMyLifeStyles from "@/lib/hooks/useMyLifeStyles";
import usePreferenceOrders from "@/lib/hooks/usePreferenceOrders";
import useRoomMateRecommendResult from "@/lib/hooks/useRoomMateRecommendResult";
import { candidateIdsAtom } from "@/recoil/room-mate/atom";

interface Props {
  setIsConfirmRoommateMatchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRoommateMatchListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoommateMatchPending = (props: Props) => {
  const { setIsConfirmRoommateMatchOpen, setIsRoommateMatchListOpen } = props;
  const router = useRouter();
  const { recommendations } = useRoomMateRecommendResult();
  const [candidateIds, setCandidateIds] = useRecoilState(candidateIdsAtom);
  const { myLifeStylesError } = useMyLifeStyles();
  const { preferenceOrdersError } = usePreferenceOrders();
  const [isOpenIncompleteProfileModal, setIsOpenIncompleteProfileModal] = useState(false);

  const onBack = () => {
    router.push("/room-mate");
  };

  useEffect(() => {
    if (recommendations && candidateIds.length === 0) {
      setCandidateIds((prevState) => [...prevState, ...recommendations.data.candidateIds]);
    }
  }, [recommendations]);

  useEffect(() => {
    if (preferenceOrdersError?.response?.status === 404 || myLifeStylesError?.response?.status === 404) {
      setIsOpenIncompleteProfileModal(true);
    }
  }, [myLifeStylesError, preferenceOrdersError]);

  return (
    <div>
      {isOpenIncompleteProfileModal ? (
        <IncompleteProfileModal
          errorType={myLifeStylesError !== undefined ? "myLifeStylesError" : "preferenceOrdersError"}
        />
      ) : null}
      <Header headerType={"dynamic"} title={"추천 룸메"} onBack={onBack} />
      <div className={"h-[60px]"} />
      <div className={"px-5 mt-6"}>
        {/* 안내문구 */}
        <div>
          <div className={"text-h2 font-semibold"}>
            닉네임<span className={"text-h4 fonts-normal"}>님의</span> <br />
            추천 룸메 입니다!{" "}
          </div>
          <div className={"flex justify-between items-end"}>
            <div className={"text-h5 text-gray4 mt-1"}>
              선호하는 룸메의 라이프 스타일 선택이 <br />
              나랑 비슷한 둠즈를 추천해요.
            </div>
            <button
              onClick={() => {
                setIsRoommateMatchListOpen(true);
              }}
              className={"flex text-h5 text-gray4 mt-1 items-center"}>
              전체 추천 목록
              <OnClickIcon className={"ml-1"} />
            </button>
          </div>
        </div>
        {/* 룸메 추천 카드 */}
        <EmblaCarousel slides={candidateIds} />
      </div>
      <div className={"h-[80px]"} />
      {candidateIds.length === 0 ? null : (
        <div className={"fixed bottom-0 w-full py-5 bg-white"}>
          <button
            onClick={() => {
              setIsConfirmRoommateMatchOpen(true);
            }}
            className={"mx-5 w-[90%] rounded-full bg-primary text-h5 text-white py-4 hover:text-white transition"}>
            룸메 신청하기
          </button>
        </div>
      )}
    </div>
  );
};
export default RoommateMatchPending;

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={15} fill="none" {...props}>
    <path stroke="#9E9FA1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m3.729 13.5 6-6-6-6" />
  </svg>
);

const OnClickIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={15} fill="none" {...props}>
    <path stroke="#9E9FA1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m3.729 13.5 6-6-6-6" />
  </svg>
);
