"use client";

import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import HomeBanner from "@/components/home/HomeBanner";
import HomeMenu from "@/components/home/HomeMenu";
import HomeMenuDetail from "@/components/home/HomeMenuDetail";
import HomeMenuFilter from "@/components/home/HomeMenuFilter";
import HomePost from "@/components/home/HomePost";
import { selectedDormitory } from "@/recoil/atom";
import { MenuByDayType } from "@/types/home/type";

const Home = () => {
  const router = useRouter();
  const [selectedDorm, setSelectedDorm] = useRecoilState<string>(selectedDormitory);
  const [eveningMenuByDay, setEveningMenuByDay] = useState<MenuByDayType | undefined>();
  const [morningMenuByDay, setMorningMenuByDay] = useState<MenuByDayType | undefined>();
  const [lunchMenuByDay, setLunchMenuByDay] = useState<MenuByDayType | undefined>();
  const [eveningEnergy, setEveningEnergy] = useState<MenuByDayType | undefined>();
  const [morningEnergy, setMorningEnergy] = useState<MenuByDayType | undefined>();
  const [lunchEnergy, setLunchEnergy] = useState<MenuByDayType | undefined>();
  const [homeMenuFilterState, setHomeMenuFilterState] = useState<"breakfast" | "lunch" | "dinner">("breakfast");
  const [isOpenHomeMenuDetail, setIsOpenHomeMenuDetail] = useState(false);
  const [day, setDay] = useState<string | undefined>("");

  // 요일 배열 생성
  const days: Array<keyof MenuByDayType> = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  const today = new Date(); // 현재 날짜 및 시간
  const dayOfWeek = today.getDay(); // 요일: 0 (일요일) ~ 6 (토요일)

  useEffect(() => {
    axios.get(`/api/scrape?type=${selectedDorm === "본관" ? 1 : selectedDorm === "양성재" ? 2 : 3}`).then(
      (
        res: AxiosResponse<
          {
            data: {
              morning: string[];
              lunch: string[];
              evening: string[];
              day: string[];
            };
          },
          any
        >,
      ) => {
        // 문자열을 줄바꿈 기준으로 나누기
        const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        const eveningResult: MenuByDayType = {
          일요일: [],
          월요일: [],
          화요일: [],
          수요일: [],
          목요일: [],
          금요일: [],
          토요일: [],
        };
        const morningResult: MenuByDayType = {
          일요일: [],
          월요일: [],
          화요일: [],
          수요일: [],
          목요일: [],
          금요일: [],
          토요일: [],
        };
        const lunchResult: MenuByDayType = {
          일요일: [],
          월요일: [],
          화요일: [],
          수요일: [],
          목요일: [],
          금요일: [],
          토요일: [],
        };

        const eveningEnergy: MenuByDayType = {
          일요일: [],
          월요일: [],
          화요일: [],
          수요일: [],
          목요일: [],
          금요일: [],
          토요일: [],
        };
        const morningEnergy: MenuByDayType = {
          일요일: [],
          월요일: [],
          화요일: [],
          수요일: [],
          목요일: [],
          금요일: [],
          토요일: [],
        };
        const lunchEnergy: MenuByDayType = {
          일요일: [],
          월요일: [],
          화요일: [],
          수요일: [],
          목요일: [],
          금요일: [],
          토요일: [],
        };

        console.log("res.data", res);

        res?.data.data.evening.forEach((menu: string, index: number) => {
          // 문자열을 \n으로 나누고 "에너지" 이후를 제외
          const lines = menu.split("\n");
          // 요일별 데이터 매핑
          eveningResult[days[index] as keyof MenuByDayType] = lines.filter(
            (line) => !/^\d/.test(line) && !line.startsWith("단백질"),
          );
        });

        res?.data.data.morning.forEach((menu: string, index: number) => {
          // 문자열을 \n으로 나누고 "에너지" 이후를 제외
          const lines = menu.split("\n");
          // 요일별 데이터 매핑
          morningResult[days[index] as keyof MenuByDayType] = lines.filter(
            (line) => !/^\d/.test(line) && !line.startsWith("단백질"),
          );
        });

        res?.data.data.lunch.forEach((menu: string, index: number) => {
          // 문자열을 \n으로 나누고 "에너지" 이후를 제외
          const lines = menu.split("\n");
          // 요일별 데이터 매핑
          lunchResult[days[index] as keyof MenuByDayType] = lines.filter(
            (line) => !/^\d/.test(line) && !line.startsWith("단백질"),
          );
        });

        res?.data.data.lunch.forEach((menu: string, index: number) => {
          // 문자열을 \n으로 나누고 "에너지" 이후를 제외
          const lines = menu.split("\n");
          const filteredLines = lines.filter((line) => /^\d/.test(line));
          console.log(filteredLines);

          // 요일별 데이터 매핑
          lunchEnergy[days[index] as keyof MenuByDayType] = filteredLines;
        });

        res?.data.data.morning.forEach((menu: string, index: number) => {
          // 문자열을 \n으로 나누고 "에너지" 이후를 제외
          const lines = menu.split("\n");
          // 요일별 데이터 매핑
          morningEnergy[days[index] as keyof MenuByDayType] = lines.filter((line) => /^\d/.test(line));
        });

        res?.data.data.evening.forEach((menu: string, index: number) => {
          // 문자열을 \n으로 나누고 "에너지" 이후를 제외
          const lines = menu.split("\n");
          // 요일별 데이터 매핑
          eveningEnergy[days[index] as keyof MenuByDayType] = lines.filter((line) => /^\d/.test(line));
        });

        setEveningMenuByDay(eveningResult);
        setMorningMenuByDay(morningResult);
        setLunchMenuByDay(lunchResult);

        console.log(eveningEnergy);

        setEveningEnergy(eveningEnergy);
        setMorningEnergy(morningEnergy);
        setLunchEnergy(lunchEnergy);
        setDay(res?.data.data.day[0]);
      },
    );
  }, [selectedDorm]);

  useEffect(() => {
    console.log("eveningMenuByDay", eveningMenuByDay);
    console.log("day", day);
  }, [eveningMenuByDay]);

  return (
    <>
      {isOpenHomeMenuDetail ? (
        <HomeMenuDetail
          headerTitle={selectedDorm}
          setIsOpenHomeMenuDetail={setIsOpenHomeMenuDetail}
          homeMenuFilterState={homeMenuFilterState}
          setHomeMenuFilterState={setHomeMenuFilterState}
          eveningMenuByDay={eveningMenuByDay}
          morningMenuByDay={morningMenuByDay}
          lunchMenuByDay={lunchMenuByDay}
          eveningEnergy={eveningEnergy}
          morningEnergy={morningEnergy}
          lunchEnergy={lunchEnergy}
          day={day}
        />
      ) : (
        <div>
          <Header />
          <div className={"h-[52px]"}></div>
          <div className="bg-background mx-5">
            <div className="h-[33px]" />
            <div className="flex flex-col gap-y-8">
              <section>
                <div className="flex justify-between">
                  <div className="text-black text-h3 font-bold">오늘의 메뉴</div>
                  <button
                    onClick={() => {
                      setIsOpenHomeMenuDetail(true);
                    }}
                    className={
                      "flex gap-x-1 items-center border-[1px] px-3 py-1 text-h5 border-primaryMid rounded-full text-primaryMid hover:shadow-lg transition"
                    }>
                    전체보기
                    <ArrowIcon />
                  </button>
                </div>
                <div className="flex flex-col mt-3 pb-4 gap-y-3 items-center rounded-[32px] border border-secondary">
                  <HomeMenuFilter
                    homeMenuFilterState={homeMenuFilterState}
                    setHomeMenuFilterState={setHomeMenuFilterState}
                  />
                  {eveningEnergy &&
                    lunchEnergy &&
                    morningEnergy &&
                    eveningMenuByDay &&
                    lunchMenuByDay &&
                    morningMenuByDay && (
                      <HomeMenu
                        energy={
                          homeMenuFilterState === "dinner"
                            ? eveningEnergy[days[dayOfWeek]]
                            : homeMenuFilterState === "lunch"
                              ? lunchEnergy[days[dayOfWeek]]
                              : morningEnergy[days[dayOfWeek]]
                        }
                        menuByDay={
                          homeMenuFilterState === "dinner"
                            ? eveningMenuByDay[days[dayOfWeek]]
                            : homeMenuFilterState === "lunch"
                              ? lunchMenuByDay[days[dayOfWeek]]
                              : morningMenuByDay[days[dayOfWeek]]
                        }
                      />
                    )}
                </div>
              </section>
              <HomeBanner />
              <section>
                <div className="flex justify-between">
                  <div className="text-black text-h3 font-bold">인기 게시글</div>
                  <button
                    onClick={() => {
                      router.push("/board");
                    }}
                    className={
                      "flex gap-x-1 items-center border-[1px] px-3 py-1 text-h5 border-primaryMid rounded-full text-primaryMid hover:shadow-lg transition"
                    }>
                    전체보기
                    <ArrowIcon />
                  </button>
                </div>
                <HomePost />
              </section>
            </div>
          </div>
          <div className={"h-[80px]"} />
          <NavBar />
        </div>
      )}
    </>
  );
};
export default Home;

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={13} height={11} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.171 5.64H1.313M11.701 5.64l-4-5M8.606 9.303l3.095-3.663"
        stroke="#FF7E8D"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.191 10.46a.5.5 0 101 0 .5.5 0 00-1 0z" fill="#FF7E8D" />
    </svg>
  );
}
