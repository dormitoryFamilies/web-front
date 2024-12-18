"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import * as React from "react";

import Post from "@/components/board/Post";
import Header from "@/components/common/Header";
import useDebounce from "@/hooks/useDebounce";
import { getSearchResult } from "@/lib/api/board";
import { ArticleType } from "@/types/board/type";

const BoardSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ArticleType[]>();
  const debouncedValue = useDebounce<string>(searchValue, 100);
  const router = useRouter();

  //쿼리파라미터 검색결과
  useEffect(() => {
    const query = {
      keyword: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/board/search",
      query: query,
    });

    router.push(url);
  }, [debouncedValue]);

  //단어가 바뀔 때 마다 검색하여 요청
  useEffect(() => {
    if (!searchValue) {
      getSearchResult("본관", " ").then((r) => {
        setSearchResults(r?.data.data.articles);
      });
    } else {
      getSearchResult("본관", searchValue).then((r) => {
        setSearchResults(r?.data.data.articles);
      });
    }
  }, [searchValue]);

  const onBack = () => {
    router.push("/board");
  };

  useEffect(() => {
    console.log("searchResults", searchResults);
  }, [searchResults]);

  return (
    <div>
      <Header headerType={"search"} setSearchValue={setSearchValue} onBack={onBack}></Header>
      <div className="flex flex-col mx-[20px] gap-y-5 mt-4">
        {/* 검색 결과가 있을 때 */}
        {searchResults ? (
          <div className={"flex flex-col gap-y-5 pt-[52px] min-h-screen"}>
            {searchResults.map((searchResult: ArticleType, index: number) => {
              return (
                <div key={index}>
                  <Post
                    articleId={searchResult.articleId}
                    title={searchResult.title}
                    content={searchResult.content}
                    createdDate={searchResult.createdAt}
                    boardType={searchResult.boardType}
                    nickname={searchResult.nickname}
                    commentCount={searchResult.commentCount}
                    status={searchResult.status}
                    isWished={searchResult.isWished}
                    wishCount={searchResult.wishCount}
                    viewCount={searchResult.viewCount}
                    profileUrl={searchResult.profileUrl}
                    thumbnailUrl={"/unnimm.jpg"}></Post>
                </div>
              );
            })}
          </div>
        ) : (
          //검색 결과가 없을 때
          <div className={"flex flex-col justify-center items-center min-h-screen w-full"}>
            <div className={"relative w-[145px] h-[125px]"}>
              <Image
                alt={"/search/검색결과없음.png"}
                src={"/search/검색결과없음.png"}
                fill
                className={"object-cover"}
              />
            </div>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <div className={"mt-[24px] text-h3 text-gray3"}>'{searchValue}'에 대한 검색 결과가 없어요.</div>
            <div className={"mt-[6px] text-h5 text-gray3"}>검색어가 정확한지 확인해주세요.</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BoardSearch;
