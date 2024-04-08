"use client";

import type { SVGProps } from "react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import FilterMenu from "@/components/board/FilterMenu";
import Post from "@/components/board/Post";
import WriteButton from "@/components/board/WriteButton";
import Button from "@/components/common/Button";
import Filter from "@/components/common/Filter";
import useAllArticles from "@/lib/hooks/useAllArticles";
import { ArticleType } from "@/types/board/type";
import FilterContent from "@/components/common/FilterContent";
import { sortingFilterContent } from "@/utils/board/sortingFilterContent";
import ArticleFilter from "@/components/board/ArticleFilter";


const Board = () => {
  const [ref, inView] = useInView();
  const { articles, size, setSize } = useAllArticles();
  const [isSortingFilterClick, setIsSortingFilterClick] = useState(false);
  const [isStatusFilterClick, setIsStatusFilterClick] = useState(false);

  const getMoreItem = useCallback(async () => {
    if (articles) {
      await setSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  useEffect(() => {
    console.log("게시글", articles);
    console.log("size", size);
  }, [size]);

  return (
    <div className="relative">
      <FilterMenu></FilterMenu>
      <div className="flex flex-col mx-[20px] gap-y-5 mt-3">
        {/*filter*/}
        <div className="flex gap-x-2">
          <Button
            className={"not-click-filter"}
            onClick={() => setIsSortingFilterClick(!isSortingFilterClick)}
            Icon={isSortingFilterClick ? DropUpIcon : DropDownIcon}>
            최신순
          </Button>
          {isSortingFilterClick ? <ArticleFilter/> : null}
          <Button
            className={"not-click-filter"}
            onClick={() => setIsStatusFilterClick(!isStatusFilterClick)}
            Icon={isStatusFilterClick ? DropUpIcon : DropDownIcon}>
            전체
          </Button>
        </div>

        {/*post*/}
        <div className="flex flex-col gap-y-3">
          {articles
            ? articles.map((data, index: number) => {
                return data.data.articles.map((article: ArticleType, index: number) => {
                  return (
                    <div key={index} ref={ref}>
                      <Post
                        articleId={article.articleId}
                        title={article.title}
                        content={article.content}
                        createdDate={article.createdAt}
                        boardType={article.boardType}
                        nickName={article.nickName}
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
    </div>
  );
};
export default Board;

const DropDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={6}
    fill="none"
    {...props}
  >
    <path
      fill="#727375"
      d="M4.293 5.293.707 1.707C.077 1.077.523 0 1.414 0h7.172c.89 0 1.337 1.077.707 1.707L5.707 5.293a1 1 0 0 1-1.414 0"
    />
  </svg>
);

const DropUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={6}
    fill="none"
    {...props}
  >
    <path
      fill="#727375"
      d="m5.707.707 3.586 3.586c.63.63.184 1.707-.707 1.707H1.414C.524 6 .077 4.923.707 4.293L4.293.707a1 1 0 0 1 1.414 0"
    />
  </svg>
);
