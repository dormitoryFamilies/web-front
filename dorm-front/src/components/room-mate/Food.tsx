import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import Item from "@/components/room-mate/Item";
import useMyLifeStyles from "@/lib/hooks/useMyLifeStyles";
import { lifeStyleEditAtom, lifeStylePostAtom } from "@/recoil/room-mate/atom";
import {
  LateNightSnackType,
  LifeStyleResponseType,
  RoomMateLifeStyleStepType,
  SnackInRoomType,
} from "@/types/room-mate/type";
import { lateNightSnackContents, snackInRoomContents } from "@/utils/room-mate/lifestyles";
interface Props {
  setLifeStyleStep: Dispatch<SetStateAction<RoomMateLifeStyleStepType>>;
}
const Food = (props: Props) => {
  const { setLifeStyleStep } = props;
  const { myLifeStyles } = useMyLifeStyles();
  const [lifeStyleEditData, setLifeStyleEditData] = useRecoilState(lifeStyleEditAtom);
  const [lifeStylePostData, setLifeStylePostData] = useRecoilState(lifeStylePostAtom);

  const [lateNightSnack, setLateNightSnack] = useState<LateNightSnackType | undefined>("");
  const [snackInRoom, setSnackInRoom] = useState<SnackInRoomType | undefined>("");

  const handleNextClick = () => {
    if (myLifeStyles && myLifeStyles.data.sleepTime) {
      //sleepTime 이 있으면 데이터 정보가 있다고 판단
      if (myLifeStyles.data.lateNightSnack !== lateNightSnack) {
        setLifeStyleEditData((prevState) => ({ ...prevState, lateNightSnack: lateNightSnack }));
      }
      if (myLifeStyles.data.snackInRoom !== snackInRoom) {
        setLifeStyleEditData((prevState) => ({ ...prevState, snackInRoom: snackInRoom }));
      }
    } else {
      setLifeStylePostData((prevState) => {
        const updatedState = {
          ...prevState,
        };

        if (lateNightSnack !== "") {
          updatedState.lateNightSnack = lateNightSnack;
        } else {
          delete updatedState.lateNightSnack;
        }

        if (snackInRoom !== "") {
          updatedState.snackInRoom = snackInRoom;
        } else {
          delete updatedState.snackInRoom;
        }

        return updatedState;
      });
    }

    setLifeStyleStep("SoundAndPerfume");
  };

  useEffect(() => {
    if (lifeStylePostData.lateNightSnack !== "" || lifeStylePostData.snackInRoom !== "") {
      setLateNightSnack(lifeStylePostData.lateNightSnack);
      setSnackInRoom(lifeStylePostData.snackInRoom);
    }
  }, [lifeStylePostData]);

  /**
   * Recoil 초기화 함수
   */
  const initializeEditPostData = (apiResponse: LifeStyleResponseType) => {
    return {
      lateNightSnack: apiResponse.data.lateNightSnack,
      snackInRoom: apiResponse.data.snackInRoom,
    };
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    if (myLifeStyles) {
      const initialState = initializeEditPostData(myLifeStyles);
      setLateNightSnack(initialState.lateNightSnack);
      setSnackInRoom(initialState.snackInRoom);
    }
  }, [myLifeStyles]);

  useEffect(() => {
    console.log("lifeStyleEditData", lifeStyleEditData);
  }, [lifeStyleEditData]);

  const skipButton = () => {
    return (
      <button
        onClick={() => {
          setLifeStyleStep("SoundAndPerfume");
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
        onBack={() => setLifeStyleStep("CycleToReturnHome")}
        rightElement={skipButton()}
      />
      <div className={"h-[60px]"} />
      <div className={"flex flex-col p-5"}>
        <div className={"flex flex-col gap-y-4 relative justify-center items-center"}>
          <div className={"flex flex-col gap-y-2"}>
            <div className={"flex justify-center"}>
              <div className={"text-gray5"}>7 / 10</div>
            </div>

            <div className={"flex items-center justify-center"}>
              <div className={"absolute w-[148px] h-1 bg-gray1 rounded-full "}>
                <div className={"absolute w-[120px] h-1 rounded-full bg-primaryMid"}></div>
              </div>
            </div>
          </div>

          <div className={"flex flex-col items-center justify-center"}>
            <div className={"relative w-[200px] h-[140px]"}>
              <Image
                src={"/room-mate/휴대폰_소리.png"}
                alt={"/room-mate/휴대폰_소리.png"}
                className={"absolute object-cover"}
                fill
              />
            </div>
          </div>
          <div className={"text-h3 font-semibold"}>음식은 어떤가요?</div>
        </div>

        <div className={"flex flex-col gap-y-[28px] mt-[32px]"}>
          <Item
            title={"야식"}
            isRequired={false}
            contents={lateNightSnackContents}
            className={"grid-cols-3"}
            setSelectedContent={setLateNightSnack}
            selectedContent={lateNightSnack}
          />
          <Item
            title={"방 안에서"}
            isRequired={false}
            contents={snackInRoomContents}
            className={"grid-cols-2"}
            setSelectedContent={setSnackInRoom}
            selectedContent={snackInRoom}
          />
          <button
            onClick={handleNextClick}
            className={
              "absolute bottom-5 left-5 w-[90%] rounded-full bg-primary text-white text-h5 py-4 hover:text-white transition"
            }>
            다음
          </button>
        </div>
      </div>
    </>
  );
};
export default Food;
