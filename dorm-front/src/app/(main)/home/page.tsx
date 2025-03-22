"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";

import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import HomeBanner from "@/components/home/HomeBanner";
import HomeMenu from "@/components/home/HomeMenu";
import HomeMenuDetail from "@/components/home/HomeMenuDetail";
import HomeMenuFilter from "@/components/home/HomeMenuFilter";
import HomePost from "@/components/home/HomePost";
import useMealMenu from "@/lib/hooks/useMealMenu";
import { selectedDormitory } from "@/recoil/atom";

const Home = () => {
  const router = useRouter();
  const [homeMenuFilterState, setHomeMenuFilterState] = useState<"breakfast" | "lunch" | "dinner">("breakfast");
  const [isOpenHomeMenuDetail, setIsOpenHomeMenuDetail] = useState(false);
  const [selectedDorm, setSelectedDorm] = useRecoilState(selectedDormitory);

  const { mealMenu } = useMealMenu(selectedDorm);

  // ✅ 현재 날짜 가져오기 (YYYY-MM-DD 형식)
  const today = new Date().toISOString().split("T")[0]; // "2025-01-14" 형태

  // ✅ 오늘 날짜에 해당하는 객체 찾기
  const todayData = mealMenu?.data.find((item) => item.day === today);

  const navigateToBoard = () => {
    router.push("/board");
  };

  const openHomeMenuDetailComponent = () => {
    setIsOpenHomeMenuDetail(true);
  };

  return (
    <>
      <div>
        {isOpenHomeMenuDetail ? (
          <HomeMenuDetail
            homeMenuFilterState={homeMenuFilterState}
            setHomeMenuFilterState={setHomeMenuFilterState}
            mealMenu={mealMenu}
            setIsOpenHomeMenuDetail={setIsOpenHomeMenuDetail}
            headerTitle={selectedDorm}
          />
        ) : (
          <div>
            <Header />
            <div className={"h-[52px]"} />
            <div className="bg-background mx-5">
              <div className="h-[33px]" />
              <div className="flex flex-col gap-y-8">
                <section>
                  <div className="flex justify-between">
                    <div className="text-black text-h3 font-bold">오늘의 메뉴</div>
                    <Button
                      RightIcon={ArrowIcon}
                      className={"border-primaryMid-button"}
                      onClick={openHomeMenuDetailComponent}>
                      전체보기
                    </Button>
                  </div>
                  <div className="flex flex-col mt-3 pb-4 gap-y-3 items-center rounded-[32px] border border-secondary">
                    <HomeMenuFilter
                      homeMenuFilterState={homeMenuFilterState}
                      setHomeMenuFilterState={setHomeMenuFilterState}
                    />
                    {todayData && (
                      <HomeMenu
                        menu={
                          homeMenuFilterState === "breakfast"
                            ? todayData?.morning.menu
                            : homeMenuFilterState === "lunch"
                              ? todayData?.lunch.menu
                              : todayData?.dinner.menu
                        }
                        energy={
                          homeMenuFilterState === "breakfast"
                            ? todayData?.morning?.energy
                            : homeMenuFilterState === "lunch"
                              ? todayData?.lunch?.energy
                              : todayData?.dinner?.energy
                        }
                        protein={
                          homeMenuFilterState === "breakfast"
                            ? todayData?.morning?.protein
                            : homeMenuFilterState === "lunch"
                              ? todayData?.lunch?.protein
                              : todayData?.dinner?.protein
                        }
                      />
                    )}
                  </div>
                </section>
                <HomeBanner />
                <section>
                  <div className="flex justify-between">
                    <div className="text-black text-h3 font-bold">인기 게시글</div>
                    <Button className={"border-primaryMid-button"} RightIcon={ArrowIcon} onClick={navigateToBoard}>
                      전체보기
                    </Button>
                  </div>
                  <HomePost />
                </section>
              </div>
            </div>
            <div className={"h-[80px]"} />
            <NavBar />
          </div>
        )}
      </div>
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
