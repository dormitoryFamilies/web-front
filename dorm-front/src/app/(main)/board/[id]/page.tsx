"use client";

import { useParams, useRouter } from "next/navigation";
import type { SVGProps } from "react";
import { useState } from "react";
import * as React from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import BoardTypeHelpTagIcon from "@/assets/board/BoardTypeHelpTagIcon";
import BoardTypeReportLossTagIcon from "@/assets/board/BoardTypeReportLossTagIcon";
import BoardTypeShareTagIcon from "@/assets/board/BoardTypeShareTagIcon";
import BoardTypeTogetherTagIcon from "@/assets/board/BoardTypeTogetherTagIcon";
import BoardTypeWonderTagIcon from "@/assets/board/BoardTypeWonderTagIcon";
import ArticleFavoritesList from "@/components/board/ArticleFavoritesList";
import ArticleMenu from "@/components/board/ArticleMenu";
import CommentContent from "@/components/board/CommentContent";
import CommentDeleteMenu from "@/components/board/CommentDeleteMenu";
import CommentInput from "@/components/board/CommentInput";
import CommunicationBox from "@/components/board/CommunicationBox";
import DeleteArticleWarningModal from "@/components/board/DeleteArticleWarningModal";
import PostDetailContent from "@/components/board/PostDetailContent";
import Profile from "@/components/board/Profile";
import RecruitmentStatusChangeModal from "@/components/board/RecruitmentStatusChangeModal";
import ReplyCommentDeleteMenu from "@/components/board/ReplyCommentDeleteMenu";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import ProfileModal from "@/components/common/ProfileModal";
import useGetArticleDetail from "@/lib/hooks/useGetArticleDetail";
import useGetArticleDetailComments from "@/lib/hooks/useGetArticleDetailComments";
import { selectedCommentIdAtom } from "@/recoil/board/atom";
import { ArticleDetailCommentType } from "@/types/board/type";

const BoardDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { articleDetail, articleMutate } = useGetArticleDetail(params.id);
  const { articleDetailComments, commentMutate } = useGetArticleDetailComments(params.id);

  const [isClickedCommentContent, setIsClickedCommentContent] = useState<boolean>(false);
  const [isClickedReplyCommentContent, setIsClickedReplyCommentContent] = useState<boolean>(false);
  const [isClickedArticleMenu, setIsClickedArticleMenu] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isArticleFavoritesListClicked, setIsArticleFavoritesListClicked] = useState(false);
  const [isRecruitmentStatusChangeModalOpen, setIsRecruitmentStatusChangeModal] = useState(false);
  const [isDeleteArticleWarningModalOpen, setIsDeleteArticleWarningModalOpen] = useState(false);

  const [selectedCommentId, setSelectedCommentId] = useRecoilState(selectedCommentIdAtom);
  const [isCommentInput, setIsCommentInput] = useState(true);

  const onBack = () => {
    router.push("/board");
  };

  useEffect(() => {
    console.log("articleDetail", articleDetail);
    console.log("articleDetailComments", articleDetailComments);
  }, [articleDetail, articleDetailComments]);

  const renderBoardTypeIcon = (boardType: string | undefined) => {
    switch (boardType) {
      case "함께해요":
        return <BoardTypeTogetherTagIcon />;
      case "도와주세요":
        return <BoardTypeHelpTagIcon />;
      case "나눔해요":
        return <BoardTypeShareTagIcon />;
      case "궁금해요":
        return <BoardTypeWonderTagIcon />;
      case "분실신고":
        return <BoardTypeReportLossTagIcon />;
    }
  };

  return (
    <div>
      {/* 프로필 클릭 */}
      {isProfileModalOpen ? <ProfileModal></ProfileModal> : null}

      {/* 게시글 찜 목록 */}
      {isArticleFavoritesListClicked ? (
        <ArticleFavoritesList
          articleId={params.id}
          writerId={articleDetail?.data.memberId}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />
      ) : null}

      {/* 모집 상태 변경 모달창 */}
      {isRecruitmentStatusChangeModalOpen ? (
        <RecruitmentStatusChangeModal
          setIsRecruitmentStatusChangeModal={setIsRecruitmentStatusChangeModal}
          status={articleDetail?.data.status}
          articleId={articleDetail?.data.articleId}
          mutate={articleMutate}
        />
      ) : null}

      {/* 게시글 삭제 경고 모달창 */}
      {isDeleteArticleWarningModalOpen ? (
        <DeleteArticleWarningModal
          setIsDeleteArticleWarningModalOpen={setIsDeleteArticleWarningModalOpen}
          articleId={articleDetail?.data.articleId}
        />
      ) : null}

      {/* 글 매뉴*/}
      {isClickedArticleMenu ? (
        <ArticleMenu
          articleId={params.id}
          status={articleDetail?.data.status}
          setIsClickedArticleMenu={setIsClickedArticleMenu}
          setIsRecruitmentStatusChangeModal={setIsRecruitmentStatusChangeModal}
          setIsDeleteArticleWarningModalOpen={setIsDeleteArticleWarningModalOpen}
        />
      ) : null}

      {/* 댓글 삭제 매뉴*/}
      {isClickedCommentContent ? (
        <CommentDeleteMenu
          commentId={selectedCommentId}
          setIsClickedCommentContent={setIsClickedCommentContent}
          mutate={commentMutate}
        />
      ) : null}

      {/* 대댓글 삭제 매뉴*/}
      {isClickedReplyCommentContent ? (
        <ReplyCommentDeleteMenu
          commentId={selectedCommentId}
          setIsClickedReplyCommentContent={setIsClickedReplyCommentContent}
          mutate={commentMutate}
        />
      ) : null}

      {/* 헤더 */}
      <Header
        headerType={"dynamic"}
        onBack={onBack}
        title={"긱사생활"}
        rightElement={
          articleDetail?.data.isWriter ? (
            <MoreIcon
              onClick={() => {
                setIsClickedArticleMenu(true);
              }}
            />
          ) : null
        }></Header>
      <div className={"h-[60px]"} />

      {/* 게시물 디테일 UI */}
      <div className="flex flex-col m-5 gap-y-4">
        {/*태그*/}
        <div className="flex gap-x-2">
          <div className={"flex items-center gap-x-1 board-type-tag py-1 px-3 rounded-full"}>
            {renderBoardTypeIcon(articleDetail?.data.boardType)}
            {articleDetail?.data.boardType}
          </div>
          {articleDetail?.data.status == "모집중" ? (
            <Button className={"recruiting-tag"}>모집중</Button>
          ) : (
            <Button className={"recruitment-completed-tag"}>모집완료</Button>
          )}
        </div>

        {/*프로필*/}
        <Profile
          isWriter={true}
          usage={"author"}
          createdDate={articleDetail?.data.createdAt}
          profileUrl={articleDetail?.data.profileUrl}
          nickname={articleDetail?.data.nickname}
          dormitory={"양진재"}
        />

        {/*게시글 내용*/}
        <PostDetailContent
          wishCount={articleDetail?.data.wishCount}
          commentCount={articleDetailComments?.data.comments.length}
          title={articleDetail?.data.title}
          content={articleDetail?.data.content}
          tags={articleDetail?.data.tags}
          images={articleDetail?.data.imagesUrls}
        />
      </div>
      <div className="h-1 bg-gray1"></div>
      {/*댓글*/}
      <div className="flex flex-col m-5 gap-y-6">
        {articleDetailComments?.data.comments.map((comment: ArticleDetailCommentType, index: number) => {
          return (
            <div key={index} className="flex flex-col gap-y-6">
              <div>
                <CommentContent
                  usage={"comment"}
                  commentId={comment.commentId}
                  isArticleWriter={comment.isArticleWriter}
                  isDeleted={comment.isDeleted}
                  createdDate={comment.createdAt}
                  profileUrl={comment.profileUrl}
                  nickname={comment.nickname}
                  content={comment.content}
                  setIsClickedCommentContent={setIsClickedCommentContent}
                  setSelectedCommentId={setSelectedCommentId}
                  setIsCommentInput={setIsCommentInput}
                />
              </div>
              <div className="flex flex-col gap-y-5">
                {comment.replyComments
                  ? comment.replyComments.map((replyComment, index) => {
                      return (
                        <CommentContent
                          key={index}
                          usage={"replyComment"}
                          commentId={replyComment.replyCommentId}
                          isArticleWriter={replyComment.isArticleWriter}
                          createdDate={replyComment.createdAt}
                          nickname={replyComment.nickname}
                          content={replyComment.content}
                          profileUrl={replyComment.profileUrl}
                          setIsClickedReplyCommentContent={setIsClickedReplyCommentContent}
                          setSelectedCommentId={setSelectedCommentId}
                          setIsCommentInput={setIsCommentInput}
                        />
                      );
                    })
                  : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className={"h-[110px]"} />
      {/* 댓글 작성, 찜하기 */}
      {isArticleFavoritesListClicked ? null : (
        <div>
          <div
            className={
              "bg-white fixed w-full py-5 px-5 rounded-[28px] border-t-[1px] border-gray0 flex flex-col gap-y-3 bottom-0"
            }>
            <CommunicationBox
              setIsArticleFavoritesList={setIsArticleFavoritesListClicked}
              isWriter={articleDetail?.data.isWriter}
              articleId={articleDetail?.data.articleId}
              articleMutate={articleMutate}
              wishCount={articleDetail?.data.wishCount}
              isWished={articleDetail?.data.isWished}></CommunicationBox>
            <CommentInput
              isCommentInput={isCommentInput}
              setIsCommentInput={setIsCommentInput}
              articleId={params.id}
              commentId={selectedCommentId}
              mutate={commentMutate}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default BoardDetail;
const MoreIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={28} fill="none" {...props}>
    <path
      fill="#9E9FA1"
      d="M12 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M12 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M12 22.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
    />
  </svg>
);
