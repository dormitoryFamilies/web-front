"use client";

import { SVGProps } from "react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import ArticleSortFilter from "@/components/board/ArticleSortFilter";
import ArticleStatusFilter from "@/components/board/ArticleStatusFilter";
import FilterMenu from "@/components/board/FilterMenu";
import Post from "@/components/board/Post";
import WriteButton from "@/components/board/WriteButton";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import useAllArticles from "@/lib/hooks/useAllArticles";
import useBoardArticles from "@/lib/hooks/useBoardArticles";
import { ArticleType, BoardSortType, BoardStatusType, BoardType } from "@/types/board/type";
import { sortFilterContents, statusFilterContents } from "@/utils/board/filterContent";

const Board = () => {
  const [ref, inView] = useInView();
  const [boardType, setBoardType] = useState<BoardType>("전체");
  const [selectedSortType, setSelectedSortType] = useState<BoardSortType>("createdAt");
  const [selectedStatusType, setSelectedStatusType] = useState<BoardStatusType>("전체");
  const { allArticles, allArticlesSize, setAllArticlesSize } = useAllArticles(selectedSortType, selectedStatusType); //boardType이 전체일 때
  const { boardArticles, boardArticlesSize, setBoardArticlesSize } = useBoardArticles(
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

  useEffect(() => {
    // console.log("boardArticles", boardArticles);
    console.log("allArticles", allArticles);
  }, [boardArticles, allArticles]);

  const formatSortContent = () => {
    if (selectedSortType === "createdAt") {
      return "최신순";
    } else {
      return "인기순";
    }
  };

  useEffect(() => {
    console.log("accessToken", localStorage.getItem("accessToken"));
    console.log("refreshToken", localStorage.getItem("refreshToken"));
  }, [localStorage.getItem("accessToken"), localStorage.getItem("refreshToken")]);

  return (
    <div className="relative">
      <Header></Header>
      <div className={"h-[60px]"} />
      <FilterMenu boardType={boardType} setBoardType={setBoardType}></FilterMenu>
      {/* filter */}
      <div className="flex gap-x-2 mx-5 my-3">
        <Button
          className={"not-click-filter"}
          onClick={() => setIsSortingFilterClick(!isSortingFilterClick)}
          Icon={isSortingFilterClick ? DropUpIcon : DropDownIcon}>
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
          className={"not-click-filter"}
          onClick={() => setIsStatusFilterClick(!isStatusFilterClick)}
          Icon={isStatusFilterClick ? DropUpIcon : DropDownIcon}>
          {selectedStatusType}
        </Button>
        {isStatusFilterClick ? (
          <ArticleStatusFilter
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
                        thumbnailUrl={"/unnimm.jpg"}></Post>
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
                        thumbnailUrl={"/unnimm.jpg"}></Post>
                    </div>
                  );
                });
              })
            : null}
        </div>
      </div>
      <WriteButton />
      <div className={"h-[90px]"} />
      <NavBar></NavBar>
    </div>
  );
};
export default Board;

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
