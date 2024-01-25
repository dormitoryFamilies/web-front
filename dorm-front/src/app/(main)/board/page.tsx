"use client";

import { useState } from "react";

import FilterMenu from "@/components/board/FilterMenu";
import PopularPost from "@/components/board/PopularPost";
import Post from "@/components/board/Post";
import Button from "@/components/common/Button";
import { allPost } from "@/utils/board/allPost";
import { useRouter } from "next/navigation";

const Board = () => {
  const [filterClick, setFilterClick] = useState(0);
  const router = useRouter();
  const onMove = (articleId: number) => {
    router.push("/board/" + articleId);
  };
  return (
    <div>
      <FilterMenu></FilterMenu>
      <div className="flex flex-col mx-[20px] gap-y-5 mt-3">
        {/*filter*/}
        <div className="flex gap-x-2">
          <Button className={filterClick == 0 ? "click-filter" : "not-click-filter"} onClick={() => setFilterClick(0)}>
            인기순
          </Button>
          <Button className={filterClick == 1 ? "click-filter" : "not-click-filter"} onClick={() => setFilterClick(1)}>
            최신순
          </Button>
          <Button className={filterClick == 2 ? "click-filter" : "not-click-filter"} onClick={() => setFilterClick(2)}>
            모집중
          </Button>
        </div>

        {/*post*/}
        <div className="flex flex-col gap-y-3">
          {/*TODO: 백엔드 필터 기능 싹 지우기*/}
          <PopularPost
            title={allPost.sort((a, b) => b.wishCount - a.wishCount).sort((a, b) => a.status - b.status)[0].title}
          />
          {filterClick == 0
            ? allPost
                .sort((a, b) => {
                  if (a.wishCount === b.wishCount) {
                    //TODO: 나중에 조회수로 바꾸기
                    return b.commentCount - a.commentCount;
                  } else {
                    return b.wishCount - a.wishCount;
                  }
                })
                .sort((a, b) => a.status - b.status)
                .map((post, index) => {
                  return (
                    <Post
                      key={index}
                      content={post.content}
                      title={post.title}
                      author={post.author}
                      boardType={post.boardType}
                      status={post.status}
                      commentCount={post.commentCount}
                      wishCount={post.wishCount}
                      createdDate={post.createdDate}
                      thumbnailUrl={post.thumbnailUrl}
                      onClick={() => onMove(post.articleId)}
                    />
                  );
                })
            : filterClick === 1
              ? allPost
                  .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                  .sort((a, b) => a.status - b.status)
                  .map((post, index) => {
                    return (
                      <Post
                        key={index}
                        content={post.content}
                        title={post.title}
                        author={post.author}
                        boardType={post.boardType}
                        status={post.status}
                        commentCount={post.commentCount}
                        wishCount={post.wishCount}
                        createdDate={post.createdDate}
                        thumbnailUrl={post.thumbnailUrl}
                        onClick={() => onMove(post.articleId)}
                      />
                    );
                  })
              : allPost
                  .filter((value) => value.status === 0)
                  .map((post, index) => {
                    return (
                      <Post
                        key={index}
                        content={post.content}
                        title={post.title}
                        author={post.author}
                        boardType={post.boardType}
                        status={post.status}
                        commentCount={post.commentCount}
                        wishCount={post.wishCount}
                        createdDate={post.createdDate}
                        thumbnailUrl={post.thumbnailUrl}
                        onClick={() => onMove(post.articleId)}
                      />
                    );
                  })}
        </div>
      </div>
    </div>
  );
};
export default Board;
