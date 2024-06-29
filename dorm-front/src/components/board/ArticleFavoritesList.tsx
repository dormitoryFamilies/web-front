import Image from "next/image";
import * as React from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import { postFollow } from "@/lib/api/common";
import useArticleWishList from "@/lib/hooks/useArticleWishList";
import { selectedMemberIdAtom } from "@/recoil/atom";

interface Props {
  articleId: string | string[];
  writerId: number;
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ArticleFavoritesList = (props: Props) => {
  const { articleId, writerId, setIsProfileModalOpen } = props;
  const { articleWishList } = useArticleWishList(articleId);
  const [selectedMemberId, setSelectedMemberId] = useRecoilState(selectedMemberIdAtom);

  return (
    <div className={"min-h-screen"}>
      <Header headerType={"dynamic"} title={"게시판 관심목록"}></Header>
      <div className={"h-[60px]"} />
      <div className={"mt-6 mx-5"}>
        {articleWishList?.map((ArticleWishUser) => {
          return (
            <div key={ArticleWishUser.memberId} className={"flex justify-between items-center py-3"}>
              <div
                onClick={() => {
                  setSelectedMemberId(ArticleWishUser.memberId);
                  setIsProfileModalOpen(true);
                }}
                className={"flex gap-x-3"}>
                <div className={"relative w-[48px] h-[48px] "}>
                  <Image
                    className={"object-cover rounded-full"}
                    src={ArticleWishUser.profileUrl ? ArticleWishUser.profileUrl : "/unnimm.jpg"}
                    alt={ArticleWishUser.profileUrl}
                    fill></Image>
                </div>
                <div className={"flex flex-col gap-y-[2px]"}>
                  <div className={"font-semibold"}>{ArticleWishUser.nickName}</div>
                  <div className={"text-h5 text-gray5"}>{ArticleWishUser.dormitoryType}</div>
                </div>
              </div>
              <div>
                {writerId === ArticleWishUser.memberId ? null : (
                  <button
                    onClick={() => {
                      postFollow(ArticleWishUser.memberId);
                    }}
                    className={"border-[1px] border-gray2 text-gray5 text-h5 py-[6px] px-5 rounded-full"}>
                    팔로우
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ArticleFavoritesList;
