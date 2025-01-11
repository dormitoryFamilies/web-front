"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { SVGProps, useCallback, useEffect, useState } from "react";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import ArticleSortFilter from "@/components/board/ArticleSortFilter";
import ArticleStatusFilter from "@/components/board/ArticleStatusFilter";
import Post from "@/components/board/Post";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import ProfileModal from "@/components/common/ProfileModal";
import InterestListDormitoryFilter from "@/components/mypage/InterestListDormitoryFilter";
import InterestListMenu from "@/components/mypage/InterestListMenu";
import { deleteRoomMateWish } from "@/lib/api/room-mate";
import useMyPageBoardWishes from "@/lib/hooks/useMyPageBoardWishes";
import useMypageDoomzWishes from "@/lib/hooks/useMypageDoomzWishes";
import { ArticleType, BoardSortType, BoardStatusType } from "@/types/board/type";
import { DormitoryType, InterestListType } from "@/types/mypage/type";
import { dormitoryFilterContents, sortFilterContents, statusFilterContents } from "@/utils/board/filterContent";

const InterestList = () => {
  const [ref, inView] = useInView();
  const router = useRouter();
  const [interestListType, setInterestListType] = useState<InterestListType>("둠즈");
  const [selectedDormitoryType, setSelectedDormitoryType] = useState<DormitoryType>("기숙사");
  const [selectedSortType, setSelectedSortType] = useState<BoardSortType>("createdAt");
  const [selectedStatusType, setSelectedStatusType] = useState<BoardStatusType>("전체");
  const [isSortingFilterClick, setIsSortingFilterClick] = useState<boolean>(false);
  const [isStatusFilterClick, setIsStatusFilterClick] = useState<boolean>(false);
  const [isDormitoryFilterClick, setIsDormitoryFilterClick] = useState<boolean>(false);
  const { wishPosts, setWishPostSize } = useMyPageBoardWishes(
    selectedDormitoryType,
    selectedSortType,
    selectedStatusType,
  );
  const { wishDoomz, setwishDoomzSize } = useMypageDoomzWishes();
  const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number>(0);

  // 전체
  const getMoreAllArticleItem = useCallback(async () => {
    if (wishPosts) {
      await setWishPostSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  // 전체
  const getMoreDoomzItem = useCallback(async () => {
    if (wishPosts) {
      await setwishDoomzSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreAllArticleItem();
      getMoreDoomzItem();
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
      {isOpenProfileModal ? (
        <ProfileModal memberId={selectedMemberId} setIsOpenProfileModal={setIsOpenProfileModal} />
      ) : null}
      <Header headerType={"dynamic"} title={"관심목록"} onBack={onBack} />
      <div className={"h-[60px]"} />
      <InterestListMenu
        interestListType={interestListType}
        setInterestListType={setInterestListType}
        numberOfBoards={wishPosts && wishPosts[0]?.data.data.articles.length}
        numberOfDoomz={wishDoomz && wishDoomz[0]?.data.data.memberProfiles.length}
      />
      <div className={"px-5"}>
        {interestListType === "게시판" ? (
          <>
            {/* 필터 */}
            <div>
              <div className="flex gap-x-2 my-3">
                {/*기숙사 선택 필터*/}
                <div className={"relative"}>
                  <Button
                    className={"not-click-filter"}
                    onClick={() => setIsDormitoryFilterClick(!isDormitoryFilterClick)}
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
            </div>
            {/* 내용 */}
            <div className={"flex flex-col gap-y-3"}>
              {wishPosts && interestListType === "게시판"
                ? wishPosts.map((post, index: number) => {
                    return post?.data.data.articles.map((article: ArticleType, index: number) => {
                      return (
                        <div key={article.articleId} ref={ref}>
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
            </div>
          </>
        ) : (
          <>
            <div className={"mt-5 flex flex-col gap-y-5"}>
              {wishDoomz &&
                wishDoomz.map((wishDoomList) => {
                  return wishDoomList.data.data.memberProfiles.map((memberProfile) => {
                    return (
                      <div className={"flex justify-between items-center"} key={memberProfile.memberId} ref={ref}>
                        <div
                          onClick={() => {
                            setSelectedMemberId(memberProfile.memberId);
                            setIsOpenProfileModal(true);
                          }}
                          className={"flex gap-x-3 items-center"}>
                          <Image
                            alt={memberProfile.profileUrl}
                            src={memberProfile.profileUrl}
                            width={52}
                            height={52}
                            className={"rounded-full"}
                          />
                          <div className={"font-semibold"}>{memberProfile.nickname}</div>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              deleteRoomMateWish(memberProfile.memberId);
                            }}
                            className={"py-1 px-3 rounded-full bg-gray1 text-gray5 text-h5"}>
                            찜 취소
                          </button>
                        </div>
                      </div>
                    );
                  });
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default InterestList;

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
