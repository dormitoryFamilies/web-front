"use client";
export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { SVGProps } from "react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";

import ArticleSortFilter from "@/components/board/ArticleSortFilter";
import ArticleStatusFilter from "@/components/board/ArticleStatusFilter";
import FilterMenu from "@/components/board/FilterMenu";
import Post from "@/components/board/Post";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import useAllArticles from "@/lib/hooks/useAllArticles";
import useBoardArticles from "@/lib/hooks/useBoardArticles";
import { selectedDormitory } from "@/recoil/atom";
import { ArticleType, BoardSortType, BoardStatusType, BoardType } from "@/types/board/type";
import { sortFilterContents, statusFilterContents } from "@/utils/board/filterContent";

const Board = () => {
  const [ref, inView] = useInView();
  const router = useRouter();
  const [selectedDorm, setSelectedDorm] = useRecoilState<string>(selectedDormitory);
  const [boardType, setBoardType] = useState<BoardType>("전체");
  const [selectedSortType, setSelectedSortType] = useState<BoardSortType>("createdAt");
  const [selectedStatusType, setSelectedStatusType] = useState<BoardStatusType>("전체");
  const { allArticles, allArticlesSize, setAllArticlesSize } = useAllArticles(
    selectedDorm,
    selectedSortType,
    selectedStatusType,
  ); //boardType이 전체일 때
  const { boardArticles, boardArticlesSize, setBoardArticlesSize } = useBoardArticles(
    selectedDorm,
    boardType,
    selectedSortType,
    selectedStatusType,
  ); //boardType이 전체가 아닐 때
  const [isSortingFilterClick, setIsSortingFilterClick] = useState<boolean>(false);
  const [isStatusFilterClick, setIsStatusFilterClick] = useState<boolean>(false);

  // 전체
  const getMoreAllArticleItem = useCallback(async () => {
    if (allArticles) {
      await setAllArticlesSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreAllArticleItem();
    }
  }, [inView]);

  // 보드
  const getMoreBoardArticleItem = useCallback(async () => {
    if (boardArticles) {
      await setAllArticlesSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreBoardArticleItem();
    }
  }, [inView]);

  const formatSortContent = () => {
    if (selectedSortType === "createdAt") {
      return "최신순";
    } else {
      return "인기순";
    }
  };

  const onMove = () => {
    router.push("/board/write");
  };

  return (
    <div className="relative">
      <Header
        rightElement={
          <SearchIcon
            onClick={() => {
              router.push("/board/search");
            }}
          />
        }></Header>
      <div className={"h-[60px]"} />
      <FilterMenu boardType={boardType} setBoardType={setBoardType}></FilterMenu>
      {/* filter */}
      <div className="relative flex gap-x-2 mx-5 my-3">
        <Button
          className={"border-gray1-button"}
          onClick={() => setIsSortingFilterClick(!isSortingFilterClick)}
          RightIcon={isSortingFilterClick ? DropUpIcon : DropDownIcon}>
          {formatSortContent()}
        </Button>
        {isSortingFilterClick ? (
          <ArticleSortFilter
            sortFilterContents={sortFilterContents}
            setSelectedSortType={setSelectedSortType}
            setIsSortingFilterClick={setIsSortingFilterClick}
          />
        ) : null}
        <Button
          className={"border-gray1-button"}
          onClick={() => setIsStatusFilterClick(!isStatusFilterClick)}
          RightIcon={isStatusFilterClick ? DropUpIcon : DropDownIcon}>
          {selectedStatusType}
        </Button>
        {isStatusFilterClick ? (
          <ArticleStatusFilter
            className={"left-[25%]"}
            statusFilterContents={statusFilterContents}
            setSelectedStatusType={setSelectedStatusType}
            setIsStatusFilterClick={setIsStatusFilterClick}
          />
        ) : null}
      </div>
      <div className="flex flex-col mx-[20px] gap-y-5">
        {/*post*/}
        <div className="flex flex-col gap-y-3">
          {allArticles && boardType === "전체"
            ? allArticles.map((allArticleList, index: number) => {
                return allArticleList?.data.data.articles.map((article: ArticleType, index: number) => {
                  return (
                    <div key={index} ref={ref}>
                      <Post
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
              })
            : null}
          {boardArticles
            ? boardArticles.map((allArticleList, index: number) => {
                return allArticleList?.data.data.articles.map((article: ArticleType, index: number) => {
                  return (
                    <div key={index} ref={ref}>
                      <Post
                        profileUrl={article.profileUrl}
                        isWished={article.isWished}
                        articleId={article.articleId}
                        title={article.title}
                        content={article.content}
                        createdDate={article.createdAt}
                        boardType={article.boardType}
                        nickname={article.nickname}
                        commentCount={article.commentCount}
                        status={article.status}
                        wishCount={article.wishCount}
                        viewCount={article.viewCount}
                        thumbnailUrl={article.thumbnailUrl}></Post>
                    </div>
                  );
                });
              })
            : null}
        </div>
      </div>
      <Button
        className={"bg-primary-button"}
        secondClassName={"fixed bottom-[84px] right-5 z-10 text-h4 gap-x-2"}
        LeftIcon={WriteButtonIcon}>
        글쓰기
      </Button>
      <div className={"h-[90px]"} />
      <NavBar />
    </div>
  );
};
export default Board;

const WriteButtonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.81 15.864a.82.82 0 01-.813-.813V8.857H.814A.82.82 0 010 8.043a.82.82 0 01.814-.813h6.183V.95A.82.82 0 017.81.134a.82.82 0 01.814.814v6.28h3.037a.82.82 0 01.814.814.82.82 0 01-.814.814H8.624v6.194a.82.82 0 01-.814.813zM16 8.044a1.085 1.085 0 11-2.17 0 1.085 1.085 0 012.17 0z"
      fill="#fff"
    />
  </svg>
);

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

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#000"
        d="M17.026 9.504a7.525 7.525 0 0 1 7.522 7.522 7.525 7.525 0 0 1-7.522 7.522 7.525 7.525 0 0 1-7.522-7.522 7.525 7.525 0 0 1 7.522-7.522m0-1.504a9.027 9.027 0 1 0 .002 18.054A9.027 9.027 0 0 0 17.026 8"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m24.739 24.739 6.509 6.509"
      />
      <path fill="#191919" d="M20.396 15.03a1.003 1.003 0 1 0 0-2.005 1.003 1.003 0 0 0 0 2.005" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M8 8h24v24H8z" />
      </clipPath>
    </defs>
  </svg>
);
