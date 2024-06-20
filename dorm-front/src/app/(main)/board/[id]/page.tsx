"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import * as React from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import ArticleFavoritesList from "@/components/board/ArticleFavoritesList";
import CommentContent from "@/components/board/CommentContent";
import CommentDeleteMenu from "@/components/board/CommentDeleteMenu";
import CommentInput from "@/components/board/CommentInput";
import CommunicationBox from "@/components/board/CommunicationBox";
import PostDetailContent from "@/components/board/PostDetailContent";
import Profile from "@/components/board/Profile";
import ReplyCommentDeleteMenu from "@/components/board/ReplyCommentDeleteMenu";
import Button from "@/components/common/Button";
import useGetArticleDetail from "@/lib/hooks/useGetArticleDetail";
import useGetArticleDetailComments from "@/lib/hooks/useGetArticleDetailComments";
import { selectedCommentIdAtom } from "@/recoil/board/atom";
import { ArticleDetailCommentType } from "@/types/board/type";

const BoardDetail = () => {
  const params = useParams();
  const { articleDetail, articleMutate } = useGetArticleDetail(params.id);
  const { articleDetailComments, commentMutate } = useGetArticleDetailComments(params.id);
  const [isClickedCommentContent, setIsClickedCommentContent] = useState<boolean>(false);
  const [isClickedReplyCommentContent, setIsClickedReplyCommentContent] = useState<boolean>(false);
  const [selectedCommentId, setSelectedCommentId] = useRecoilState(selectedCommentIdAtom);
  const [isCommentInput, setIsCommentInput] = useState(true);
  const [isArticleFavoritesListClicked, setIsArticleFavoritesListClicked] = useState(false);

  useEffect(() => {
    console.log("articleDetail", articleDetail);
    console.log("articleDetailComments", articleDetailComments);
  }, [articleDetail, articleDetailComments]);

  return (
    <div>
      {/* 게시글 찜 목록 */}
      {isArticleFavoritesListClicked ? (
        <ArticleFavoritesList articleId={params.id} writerId={articleDetail?.memberId} />
      ) : null}
      {/* 댓글 삭제 */}
      {isClickedCommentContent ? (
        <CommentDeleteMenu
          commentId={selectedCommentId}
          setIsClickedCommentContent={setIsClickedCommentContent}
          mutate={commentMutate}
        />
      ) : null}
      {/* 대댓글 삭제 */}
      {isClickedReplyCommentContent ? (
        <ReplyCommentDeleteMenu
          commentId={selectedCommentId}
          setIsClickedReplyCommentContent={setIsClickedReplyCommentContent}
          mutate={commentMutate}
        />
      ) : null}
      <div className="flex flex-col m-5 gap-y-4">
        {/*태그*/}
        <div className="flex gap-x-2">
          <Button className={"board-type-tag"}>{articleDetail?.boardType}</Button>
          {articleDetail?.status == "모집중" ? (
            <Button className={"recruiting-tag"}>모집중</Button>
          ) : (
            <Button className={"recruitment-completed-tag"}>모집완료</Button>
          )}
        </div>
        {/*프로필*/}
        <Profile
          usage={"author"}
          createdDate={articleDetail?.createdAt}
          profileUrl={"/unnimm.jpg"}
          // profileUrl={articleDetail?.profileUrl}
          nickName={articleDetail?.nickName}
          dormitory={"양진재"}
        />

        {/*게시글 내용*/}
        <PostDetailContent
          title={articleDetail?.title}
          content={articleDetail?.content}
          tags={articleDetail?.tags}
          // images={"/unnimm.jpg"}
          // images={articleDetail?.imagesUrls}
        />
      </div>
      <div className="h-1 bg-gray1"></div>
      {/*댓글*/}
      <div className="flex flex-col m-5 gap-y-6">
        {articleDetailComments?.comments.map((comment: ArticleDetailCommentType, index: number) => {
          return (
            <div key={index} className="flex flex-col gap-y-6">
              <div>
                <CommentContent
                  usage={"comment"}
                  commentId={comment.commentId}
                  isWriter={comment.isWriter}
                  isDeleted={comment.isDeleted}
                  createdDate={comment.createdAt}
                  profileUrl={comment.profileUrl}
                  nickName={comment.nickName}
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
                          isWriter={replyComment.isWriter}
                          createdDate={replyComment.createdAt}
                          nickName={replyComment.nickName}
                          content={replyComment.content}
                          profileUrl={"/unnimm.jpg"}
                          // profileUrl={replyComment.profileUrl}
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
              isWriter={articleDetail?.isWriter}
              articleId={articleDetail?.articleId}
              articleMutate={articleMutate}
              wishCount={articleDetail?.wishCount}
              isWished={articleDetail?.isWished}></CommunicationBox>
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
