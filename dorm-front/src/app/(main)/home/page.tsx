"use client";

import Button from "@/components/common/Button";
import HomeBanner from "@/components/home/HomeBanner";
import HomeMenu from "@/components/home/HomeMenu";
import HomePost from "@/components/home/HomePost";

const Home = () => {
  return (
    <div className="bg-background mx-5">
      <div className="h-[33px]" />
      <div className="flex flex-col gap-y-8">
        <div>
          <div className="flex justify-between">
            <div className="text-black text-h3 font-bold">오늘의 메뉴</div>
            <Button className={"home-button"} Icon={ArrowIcon}>
              전체보기
            </Button>
          </div>
          <HomeMenu />
        </div>
        <HomeBanner />
        <div>
          <div className="flex justify-between">
            <div className="text-black text-h3 font-bold">인기 게시글</div>
            <Button className={"home-button"} Icon={ArrowIcon}>
              전체보기
            </Button>
          </div>
          <HomePost />
        </div>
      </div>
    </div>
  );
};
export default Home;

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={13}
      height={11}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
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
