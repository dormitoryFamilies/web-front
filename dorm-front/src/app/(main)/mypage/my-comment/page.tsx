"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SVGProps, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import ArticleSortFilter from "@/components/board/ArticleSortFilter";
import ArticleStatusFilter from "@/components/board/ArticleStatusFilter";
import FilterMenu from "@/components/board/FilterMenu";
import Post from "@/components/board/Post";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import InterestListDormitoryFilter from "@/components/mypage/InterestListDormitoryFilter";
import useMyComments from "@/lib/hooks/useMyComments";
import { ArticleType, BoardSortType, BoardStatusType, BoardType } from "@/types/board/type";
import { DormitoryType } from "@/types/mypage/type";
import { dormitoryFilterContents, sortFilterContents, statusFilterContents } from "@/utils/board/filterContent";

const MyComment = () => {
  const [ref, inView] = useInView();
  const router = useRouter();
  const [boardType, setBoardType] = useState<BoardType>("전체");
  const [selectedDormitoryType, setSelectedDormitoryType] = useState<DormitoryType>("기숙사");
  const [selectedSortType, setSelectedSortType] = useState<BoardSortType>("createdAt");
  const [selectedStatusType, setSelectedStatusType] = useState<BoardStatusType>("전체");
  const [isSortingFilterClick, setIsSortingFilterClick] = useState<boolean>(false);
  const [isStatusFilterClick, setIsStatusFilterClick] = useState<boolean>(false);
  const [isDormitoryFilterClick, setIsDormitoryFilterClick] = useState<boolean>(false);
  const { myCommentPosts, setMyCommentPostSize } = useMyComments(
    selectedDormitoryType,
    boardType,
    selectedSortType,
    selectedStatusType,
  );

  useEffect(() => {
    console.log("myCommentPosts", myCommentPosts);
  }, [myCommentPosts]);

  // 전체
  const getMoreAllArticleItem = useCallback(async () => {
    if (myCommentPosts) {
      await setMyCommentPostSize((prev: number) => prev + 1);
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

  return (
    <>
      <Header headerType={"dynamic"} title={"내가 작성한 댓글"} onBack={onBack} />
      <div className={"h-[60px]"} />
      <FilterMenu boardType={boardType} setBoardType={setBoardType}></FilterMenu>
      <div className={"px-5"}>
        {/*필터*/}
        <div className="flex gap-x-2 my-3">
          {/*기숙사 선택 필터*/}
          <div className={"relative"}>
            <Button
              className={"not-click-filter"}
              onClick={() => setIsDormitoryFilterClick(!isSortingFilterClick)}
              Icon={isDormitoryFilterClick ? DropUpIcon : DropDownIcon}>
              {selectedDormitoryType}
            </Button>
            {isDormitoryFilterClick ? (
              <InterestListDormitoryFilter
                dormitoryFilterContents={dormitoryFilterContents}
                setSelectedDormitoryType={setSelectedDormitoryType}
                setIsDormitoryFilterClick={setIsDormitoryFilterClick}
              />
            ) : null}
          </div>
          {/*sort 선택 필터*/}
          <div className={"relative"}>
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
          </div>

          {/*status 선택 필터*/}
          <div className={"relative"}>
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
        </div>
        {/*내용*/}
        <div className={"flex flex-col gap-y-3"}>
          {myCommentPosts &&
            myCommentPosts.map((myCommentPost) => {
              return myCommentPost?.data.data.articles.map((article: ArticleType, index: number) => {
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
            })}
        </div>
      </div>
    </>
  );
};
export default MyComment;

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
