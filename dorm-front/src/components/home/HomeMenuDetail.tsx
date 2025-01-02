import { Dispatch, SetStateAction, useState } from "react";

import Header from "@/components/common/Header";
import HomeMenu from "@/components/home/HomeMenu";
import HomeMenuDetailFilter from "@/components/home/HomeMenuDetailFilter";
import HomeMenuFilter from "@/components/home/HomeMenuFilter";
import { MenuByDayType } from "@/types/home/type";

interface Props {
  headerTitle: string;
  setIsOpenHomeMenuDetail: Dispatch<SetStateAction<boolean>>;
  homeMenuFilterState: "breakfast" | "lunch" | "dinner";
  setHomeMenuFilterState: Dispatch<SetStateAction<"breakfast" | "lunch" | "dinner">>;
  eveningMenuByDay: MenuByDayType | undefined;
  morningMenuByDay: MenuByDayType | undefined;
  lunchMenuByDay: MenuByDayType | undefined;
  eveningEnergy: MenuByDayType | undefined;
  morningEnergy: MenuByDayType | undefined;
  lunchEnergy: MenuByDayType | undefined;
  day: string | undefined;
}

const HomeMenuDetail = (props: Props) => {
  const {
    headerTitle,
    setIsOpenHomeMenuDetail,
    homeMenuFilterState,
    setHomeMenuFilterState,
    eveningMenuByDay,
    morningMenuByDay,
    lunchMenuByDay,
    eveningEnergy,
    morningEnergy,
    lunchEnergy,
    day,
  } = props;
  const [dayOfWeek, setDayOfWeek] = useState<
    "일요일" | "월요일" | "화요일" | "수요일" | "목요일" | "금요일" | "토요일"
  >("월요일");

  const onBack = () => {
    setIsOpenHomeMenuDetail(false);
  };

  return (
    <>
      <Header headerType={"dynamic"} title={`${headerTitle} 메뉴`} onBack={onBack} />
      <div className={"h-[60px]"} />
      <div className={"mx-5 flex mt-[24px] items-center justify-between"}>
        <div className={"text-h3 font-semibold"}>메뉴 전체보기</div>
        <div className={"text-h5 text-gray4"}>{day}</div>
      </div>
      <HomeMenuDetailFilter day={dayOfWeek} setDay={setDayOfWeek} />
      <div className="mx-5 flex flex-col mt-3 pb-4 gap-y-3 items-center rounded-[32px] border border-secondary">
        <HomeMenuFilter homeMenuFilterState={homeMenuFilterState} setHomeMenuFilterState={setHomeMenuFilterState} />
        {eveningEnergy && lunchEnergy && morningEnergy && eveningMenuByDay && lunchMenuByDay && morningMenuByDay && (
          <HomeMenu
            energy={
              homeMenuFilterState === "dinner"
                ? eveningEnergy[dayOfWeek]
                : homeMenuFilterState === "lunch"
                  ? lunchEnergy[dayOfWeek]
                  : morningEnergy[dayOfWeek]
            }
            menuByDay={
              homeMenuFilterState === "dinner"
                ? eveningMenuByDay[dayOfWeek]
                : homeMenuFilterState === "lunch"
                  ? lunchMenuByDay[dayOfWeek]
                  : morningMenuByDay[dayOfWeek]
            }
          />
        )}
      </div>
    </>
  );
};
export default HomeMenuDetail;
