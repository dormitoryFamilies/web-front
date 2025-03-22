import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Header from "@/components/common/Header";
import HomeMenu from "@/components/home/HomeMenu";
import HomeMenuDetailFilter from "@/components/home/HomeMenuDetailFilter";
import HomeMenuFilter from "@/components/home/HomeMenuFilter";
import { MealMenuResponseType, MealMenuType, MealType, MenuByDayType } from "@/types/home/type";

interface Props {
  headerTitle: string;
  setIsOpenHomeMenuDetail: Dispatch<SetStateAction<boolean>>;
  homeMenuFilterState: "breakfast" | "lunch" | "dinner";
  setHomeMenuFilterState: Dispatch<SetStateAction<"breakfast" | "lunch" | "dinner">>;
  mealMenu: MealMenuResponseType | null;
}

const HomeMenuDetail = (props: Props) => {
  const { headerTitle, setIsOpenHomeMenuDetail, mealMenu, homeMenuFilterState, setHomeMenuFilterState } = props;

  const getToday = (): "일요일" | "월요일" | "화요일" | "수요일" | "목요일" | "금요일" | "토요일" => {
    const days: ("일요일" | "월요일" | "화요일" | "수요일" | "목요일" | "금요일" | "토요일")[] = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    return days[new Date().getDay()];
  };

  const [dayOfWeek, setDayOfWeek] = useState(getToday);

  // 예: props.data 같은 곳에서 받아온 전체 데이터
  const todayData = mealMenu?.data.find((item) => item.weekday === dayOfWeek);

  const mealKeyMap = {
    breakfast: "morning",
    lunch: "lunch",
    dinner: "dinner",
  } as const;

  const selectedMeal: MealType | undefined = todayData?.[mealKeyMap[homeMenuFilterState]];

  const onBack = () => {
    setIsOpenHomeMenuDetail(false);
  };

  function formatDateRange(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const format = (date: Date) => {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${month}.${day}`;
    };

    return `${format(start)}~${format(end)}`;
  }

  useEffect(() => {
    console.log("selectedMeal", selectedMeal?.menu);
  }, [selectedMeal]);

  return (
    <>
      <Header headerType={"dynamic"} title={`${headerTitle} 메뉴`} onBack={onBack} />
      <div className={"h-[60px]"} />
      <div className={"mx-5 flex mt-[24px] items-center justify-between"}>
        <div className={"text-h3 font-semibold"}>메뉴 전체보기</div>
        <div className={"text-h5 text-gray4"}>
          {mealMenu && formatDateRange(mealMenu?.data[0].day, mealMenu?.data[mealMenu?.data.length - 1].day)}
        </div>
      </div>
      <HomeMenuDetailFilter day={dayOfWeek} setDay={setDayOfWeek} />
      <div className="mx-5 flex flex-col mt-3 pb-4 gap-y-3 items-center rounded-[32px] border border-secondary">
        <HomeMenuFilter homeMenuFilterState={homeMenuFilterState} setHomeMenuFilterState={setHomeMenuFilterState} />
        {mealMenu && (
          <HomeMenu energy={selectedMeal?.energy} menu={selectedMeal?.menu} protein={selectedMeal?.protein} />
        )}
      </div>
    </>
  );
};
export default HomeMenuDetail;
