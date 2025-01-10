import * as React from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import { deleteFollowing, postFollow } from "@/lib/api/common";
import useArticleWishList from "@/lib/hooks/useArticleWishList";
import { selectedMemberIdAtom } from "@/recoil/atom";

interface Props {
  articleId: string | string[];
  writerId: number | undefined;
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ArticleFavoritesList = (props: Props) => {
  const { articleId, setIsProfileModalOpen } = props;
  const { articleWishList } = useArticleWishList(articleId);
  const [selectedMemberId, setSelectedMemberId] = useRecoilState(selectedMemberIdAtom);

  const onBack = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <div className={"min-h-screen"}>
      <Header headerType={"dynamic"} title={"게시판 관심목록"} onBack={onBack} />
      <div className={"h-[60px]"} />
      <div className={"mt-6 mx-5"}>
        {articleWishList &&
          articleWishList?.data.data.memberProfiles.map((articleWishUser) => {
            return (
              <div key={articleWishUser.memberId} className={"flex justify-between items-center py-3"}>
                <div
                  onClick={() => {
                    setSelectedMemberId(articleWishUser.memberId);
                    setIsProfileModalOpen(true);
                  }}
                  className={"flex gap-x-3"}>
                  <img
                    className={"object-cover w-[48px] h-[48px] rounded-full"}
                    src={articleWishUser.profileUrl ? articleWishUser.profileUrl : "/unnimm.jpg"}
                    alt={articleWishUser.profileUrl}
                  />
                  <div className={"flex flex-col gap-y-[2px]"}>
                    <div className={"font-semibold"}>{articleWishUser.nickname}</div>
                    <div className={"text-h5 text-gray5"}>{articleWishUser.dormitoryType}</div>
                  </div>
                </div>
                <div>
                  {articleWishUser.isFollowing ? (
                    <button
                      onClick={() => {
                        postFollow(articleWishUser.memberId);
                      }}
                      className={"border-[1px] border-gray2 text-gray5 text-h5 py-[6px] px-5 rounded-full"}>
                      팔로우
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        deleteFollowing(articleWishUser.memberId);
                      }}
                      className={"bg-gray1 text-gray5 text-h5 py-[6px] px-3 rounded-full"}>
                      팔로우 취소
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
