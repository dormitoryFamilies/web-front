"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SVGProps, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";

import ArticleSortFilter from "@/components/board/ArticleSortFilter";
import ArticleStatusFilter from "@/components/board/ArticleStatusFilter";
import FilterMenu from "@/components/board/FilterMenu";
import Post from "@/components/board/Post";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import InterestListDormitoryFilter from "@/components/mypage/InterestListDormitoryFilter";
import { deleteArticle } from "@/lib/api/board";
import useMyArticles from "@/lib/hooks/useMyArticles";
import { selectedArticleIdAtom } from "@/recoil/board/atom";
import { ArticleType, BoardSortType, BoardStatusType, BoardType } from "@/types/board/type";
import { DormitoryType } from "@/types/mypage/type";
import { dormitoryFilterContents, sortFilterContents, statusFilterContents } from "@/utils/board/filterContent";

const MyArticle = () => {
  const [ref, inView] = useInView();
  const router = useRouter();
  const [boardType, setBoardType] = useState<BoardType>("전체");
  const [selectedDormitoryType, setSelectedDormitoryType] = useState<DormitoryType>("기숙사");
  const [selectedSortType, setSelectedSortType] = useState<BoardSortType>("createdAt");
  const [selectedStatusType, setSelectedStatusType] = useState<BoardStatusType>("전체");
  const { myArticles, setMyArticleSize, mutate } = useMyArticles(
    selectedDormitoryType,
    boardType,
    selectedSortType,
    selectedStatusType,
  );
  //수정할 ArticleId
  const [selectedArticleId, setSelectedArticleId] = useRecoilState(selectedArticleIdAtom);

  //filter
  const [activeFilter, setActiveFilter] = useState<"sort" | "status" | "dormitory" | null>(null);

  // 전체
  const getMoreAllArticleItem = useCallback(async () => {
    if (myArticles) {
      await setMyArticleSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreAllArticleItem();
    }
  }, [inView]);

  const onBack = () => {
    router.push("/mypage");
  };

  const formatSortContent = () => {
    if (selectedSortType === "createdAt") {
      return "최신순";
    } else {
      return "인기순";
    }
  };

  const bottomElement = (articleId: number | string | string[]) => {
    return (
      <div className={"mt-2 flex gap-x-2 justify-end"}>
        <Button
          onClick={() => {
            setSelectedArticleId(articleId);
            router.push("/board/edit");
          }}
          secondClassName={"rounded-[8px] text-[#323232] px-4 py-1"}
          className={"bg-gray1-button"}>
          수정
        </Button>
        <Button
          onClick={() => {
            deleteArticle(articleId).then(() => {
              mutate();
            });
          }}
          className={"bg-black-button"}>
          삭제
        </Button>
      </div>
    );
  };

  return (
    <>
      <Header headerType={"dynamic"} title={"내가 작성한 글"} onBack={onBack} />
      <div className={"h-[60px]"} />
      <FilterMenu boardType={boardType} setBoardType={setBoardType} setActiveFilter={setActiveFilter} />
      <div className={"px-5"}>
        {/*필터*/}
        <div className="flex gap-x-2 my-3">
          {/*기숙사 선택 필터*/}
          <div className={"relative"}>
            <Button
              className={"border-gray1-button"}
              onClick={() => setActiveFilter(activeFilter === "dormitory" ? null : "dormitory")}
              RightIcon={activeFilter === "dormitory" ? DropUpIcon : DropDownIcon}>
              {selectedDormitoryType}
            </Button>
            {activeFilter === "dormitory" ? (
              <InterestListDormitoryFilter
                dormitoryFilterContents={dormitoryFilterContents}
                setSelectedDormitoryType={setSelectedDormitoryType}
                setIsDormitoryFilterClick={() => setActiveFilter(null)}
              />
            ) : null}
          </div>
          {/*sort 선택 필터*/}
          <div className={"relative"}>
            <Button
              className={"border-gray1-button"}
              onClick={() => setActiveFilter(activeFilter === "sort" ? null : "sort")}
              RightIcon={activeFilter === "sort" ? DropUpIcon : DropDownIcon}>
              {formatSortContent()}
            </Button>
            {activeFilter === "sort" ? (
              <ArticleSortFilter
                sortFilterContents={sortFilterContents}
                setSelectedSortType={setSelectedSortType}
                setIsSortingFilterClick={() => setActiveFilter(null)}
              />
            ) : null}
          </div>
          {/*status 선택 필터*/}
          <div className={"relative"}>
            <Button
              className={"border-gray1-button"}
              onClick={() => setActiveFilter(activeFilter === "status" ? null : "status")}
              RightIcon={activeFilter === "status" ? DropUpIcon : DropDownIcon}>
              {selectedStatusType}
            </Button>
            {activeFilter === "status" ? (
              <ArticleStatusFilter
                statusFilterContents={statusFilterContents}
                setSelectedStatusType={setSelectedStatusType}
                setIsStatusFilterClick={() => setActiveFilter(null)}
              />
            ) : null}
          </div>
        </div>
        {/*내용*/}
        <div className={"flex flex-col gap-y-3"}>
          {myArticles &&
            myArticles.map((myArticle) => {
              return myArticle?.data.data.articles.map((article: ArticleType, index: number) => {
                return (
                  <div key={index} ref={ref}>
                    <Post
                      bottomElement={bottomElement(article.articleId)}
                      articleId={article.articleId}
                      title={article.title}
                      content={article.content}
                      createdDate={article.createdAt}
                      boardType={article.boardType}
                      nickname={article.nickname}
                      commentCount={article.commentCount}
                      status={article.status}
                      isWished={article.isWished}
                      wishCount={article.wishCount}
                      viewCount={article.viewCount}
                      profileUrl={article.profileUrl}
                      thumbnailUrl={article.thumbnailUrl}></Post>
                  </div>
                );
              });
            })}
        </div>
      </div>
    </>
  );
};
export default MyArticle;

const DropDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={6} fill="none" {...props}>
    <path
      fill="#727375"
      d="M4.293 5.293.707 1.707C.077 1.077.523 0 1.414 0h7.172c.89 0 1.337 1.077.707 1.707L5.707 5.293a1 1 0 0 1-1.414 0"
    />
  </svg>
);

const DropUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={6} fill="none" {...props}>
    <path
      fill="#727375"
      d="m5.707.707 3.586 3.586c.63.63.184 1.707-.707 1.707H1.414C.524 6 .077 4.923.707 4.293L4.293.707a1 1 0 0 1 1.414 0"
    />
  </svg>
);
