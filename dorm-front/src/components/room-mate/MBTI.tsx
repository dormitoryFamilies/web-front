import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import MBTIItem from "@/components/room-mate/MBTIItem";
import useMyLifeStyles from "@/lib/hooks/useMyLifeStyles";
import { lifeStyleEditAtom, lifeStylePostAtom } from "@/recoil/room-mate/atom";
import {
  ExtrovertOrIntrovertType,
  HeterosexualOrEmotionalType,
  IntuitiveOrThinkingType,
  LifeStyleResponseType,
  PlannedOrSpontaneousType,
  RoomMateLifeStyleStepType,
} from "@/types/room-mate/type";
import {
  extrovertOrIntrovertContents,
  heterosexualOrEmotionalContents,
  intuitiveOrThinkingContents,
  plannedOrSpontaneousContents,
} from "@/utils/room-mate/lifestyles";
interface Props {
  setLifeStyleStep: React.Dispatch<React.SetStateAction<RoomMateLifeStyleStepType>>;
}
const MBTI = (props: Props) => {
  const { setLifeStyleStep } = props;
  const { myLifeStyles } = useMyLifeStyles();
  const [lifeStyleEditData, setLifeStyleEditData] = useRecoilState(lifeStyleEditAtom);
  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);
  const [extrovertOrIntrovert, setExtrovertOrIntrovert] = useState<string | ExtrovertOrIntrovertType | undefined>("");
  const [intuitiveOrThinking, setIntuitiveOrThinking] = useState<string | IntuitiveOrThinkingType | undefined>("");
  const [heterosexualOrEmotional, setHeterosexualOrEmotional] = useState<
    string | HeterosexualOrEmotionalType | undefined
  >("");
  const [plannedOrSpontaneous, setPlannedOrSpontaneous] = useState<string | PlannedOrSpontaneousType | undefined>("");
  const [selectedMBTI, setSelectedMBTI] = useState<string | undefined>("");
  const [updateMBTITrigger, setUpdateMBTITrigger] = useState(false);

  const updateMBTI = () => {
    if (extrovertOrIntrovert && intuitiveOrThinking && heterosexualOrEmotional && plannedOrSpontaneous) {
      setSelectedMBTI(extrovertOrIntrovert + intuitiveOrThinking + heterosexualOrEmotional + plannedOrSpontaneous);
      setUpdateMBTITrigger(true);
    }
  };

  const handleNextClick = () => {
    if (myLifeStyles && myLifeStyles.data.sleepTime) {
      //sleepTime 이 있으면 데이터 정보가 있다고 판단
      if (myLifeStyles.data.MBTI !== selectedMBTI) {
        setLifeStyleEditData((prevState) => ({ ...prevState, MBTI: selectedMBTI }));
      }
    } else {
      setLifeStylePostData((prevState) => ({
        ...prevState,
        ...(selectedMBTI !== "" && { MBTI: selectedMBTI }),
      }));
    }
    setLifeStyleStep("CycleToReturnHome");
    setUpdateMBTITrigger(false);
  };

  useEffect(() => {
    if (updateMBTITrigger) {
      handleNextClick();
      setUpdateMBTITrigger(false);
    }
  }, [updateMBTITrigger, selectedMBTI]);

  useEffect(() => {
    if (lifeStylePostData.MBTI && lifeStylePostData.MBTI !== "") {
      setExtrovertOrIntrovert(lifeStylePostData.MBTI.substring(0, 1));
      setIntuitiveOrThinking(lifeStylePostData.MBTI.substring(1, 2));
      setHeterosexualOrEmotional(lifeStylePostData.MBTI.substring(2, 3));
      setPlannedOrSpontaneous(lifeStylePostData.MBTI.substring(3, 4));
    }
  }, [lifeStylePostData]);

  /**
   * Recoil 초기화 함수
   */
  const initializeEditPostData = (apiResponse: LifeStyleResponseType) => {
    return {
      MBTI: apiResponse.data.MBTI,
    };
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    if (myLifeStyles) {
      const initialState = initializeEditPostData(myLifeStyles);
      setExtrovertOrIntrovert(initialState.MBTI?.substring(0, 1));
      setIntuitiveOrThinking(initialState.MBTI?.substring(1, 2));
      setHeterosexualOrEmotional(initialState.MBTI?.substring(2, 3));
      setPlannedOrSpontaneous(initialState.MBTI?.substring(3, 4));
    }
  }, [myLifeStyles]);

  useEffect(() => {
    console.log("lifeStyleEditData", lifeStyleEditData);
  }, [lifeStyleEditData]);

  const skipButton = () => {
    return (
      <button
        onClick={() => {
          setLifeStyleStep("CycleToReturnHome");
        }}
        className={"home-button"}>
        건너뛰기
      </button>
    );
  };

  return (
    <>
      <Header
        headerType={"dynamic"}
        title={"긱사생활 설정"}
        onBack={() => setLifeStyleStep("Constitution")}
        rightElement={skipButton()}
      />
      <div className={"h-[60px]"} />
      <div className={"flex flex-col p-5"}>
        <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"flex justify-center"}>
              <div className={"text-gray5"}>5 / 10</div>
            </div>

            <div className={"flex items-center justify-center"}>
              <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
                <div className={"absolute w-[74px] h-1 rounded-full bg-primaryMid"}></div>
              </div>
            </div>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <div className={"relative w-[400px] h-[140px]"}>
              <Image src={"/room-mate/MBTI.png"} alt={"/room-mate/MBTI.png"} className={"absolute object-cover"} fill />
            </div>
          </div>
          <div className={"text-h3 font-semibold"}>나의 MBTI는?</div>
        </div>

        <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"text-gray5 text-h4"}>MBTI</div>
            <div className={"flex gap-x-3"}>
              <MBTIItem
                selectedContent={extrovertOrIntrovert}
                contents={extrovertOrIntrovertContents}
                setSelectedContent={setExtrovertOrIntrovert}></MBTIItem>
              <MBTIItem
                selectedContent={intuitiveOrThinking}
                contents={intuitiveOrThinkingContents}
                setSelectedContent={setIntuitiveOrThinking}></MBTIItem>
              <MBTIItem
                selectedContent={heterosexualOrEmotional}
                contents={heterosexualOrEmotionalContents}
                setSelectedContent={setHeterosexualOrEmotional}></MBTIItem>
              <MBTIItem
                selectedContent={plannedOrSpontaneous}
                contents={plannedOrSpontaneousContents}
                setSelectedContent={setPlannedOrSpontaneous}></MBTIItem>
            </div>
          </div>
          <button
            disabled={
              !(
                (extrovertOrIntrovert === "" &&
                  intuitiveOrThinking === "" &&
                  heterosexualOrEmotional === "" &&
                  plannedOrSpontaneous === "") ||
                (extrovertOrIntrovert !== "" &&
                  intuitiveOrThinking !== "" &&
                  heterosexualOrEmotional !== "" &&
                  plannedOrSpontaneous !== "")
              )
            }
            onClick={updateMBTI}
            className={
              (extrovertOrIntrovert === "" &&
                intuitiveOrThinking === "" &&
                heterosexualOrEmotional === "" &&
                plannedOrSpontaneous === "") ||
              (extrovertOrIntrovert !== "" &&
                intuitiveOrThinking !== "" &&
                heterosexualOrEmotional !== "" &&
                plannedOrSpontaneous !== "")
                ? "absolute bottom-5 left-5 w-[90%] rounded-full bg-primary text-white text-h5 py-4 hover:text-white transition"
                : "absolute bottom-5 left-5 w-[90%] rounded-full bg-gray3 text-white text-h5 py-4 hover:text-white transition"
            }>
            다음
          </button>
        </div>
      </div>
    </>
  );
};
export default MBTI;
