"use client";

import useAllArticles from "@/lib/hooks/useAllArticles";
import { ArticleType } from "@/types/board/type";

const HomePost = () => {
  const { allArticles, allArticlesSize, setAllArticlesSize } = useAllArticles("popularity", "전체"); //boardType이 전체일 때

  const formatDate = (originalString: string) => {
    var dateObject = new Date(originalString);

    // 원하는 형식으로 변환
    return (
      dateObject.getFullYear().toString().slice(-2) +
      "." +
      ("0" + (dateObject.getMonth() + 1)).slice(-2) +
      "." +
      ("0" + dateObject.getDate()).slice(-2)
    );
  };

  return (
    <div className="flex flex-col mt-3 px-4 py-[11.5px] rounded-[32px] border border-secondary">
      {allArticles?.map((articles) => {
        return articles.data.articles.slice(0, 3).map((post: ArticleType, index: number) => {
          return index !== 2 ? (
            <div className="relative flex items-center gap-x-2 border-b border-gray1 py-[5.5px]">
              <div className="bg-secondary rounded-full px-2 text-h5 py-[1.5px]">{post.boardType}</div>
              <div className="truncate text-h5">{post.title}</div>
              <div className="absolute right-0 text-h6 text-gray3">{formatDate(post.createdAt)}</div>
            </div>
          ) : (
            <div>
              <div className="relative flex items-center gap-x-2 py-[5.5px]">
                <div className="bg-secondary rounded-full px-2 text-h5">{post.boardType}</div>
                <div className="truncate text-h5">{post.title}</div>
                <div className="absolute right-0 text-h6 text-gray3">{formatDate(post.createdAt)}</div>
              </div>
            </div>
          );
        });
      })}
    </div>
  );
};
export default HomePost;
