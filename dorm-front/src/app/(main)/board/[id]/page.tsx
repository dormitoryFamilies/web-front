"use client";
import { useParams } from "next/navigation";
import Button from "@/components/common/Button";
import Profile from '@/components/board/Profile';
import PostDetailContent from '@/components/board/PostDetailContent';
import * as React from 'react';
import Comment from '@/components/board/Comment';
import { postDetail } from '@/utils/board/postDetail';

const BoardDetail = () => {
  const parameter = useParams();
  return (
    <div>
      <div className="flex flex-col m-5 gap-y-4">
        {/*태그*/}
        <div className="flex gap-x-2">
          <Button className={"board-type-tag"}>{postDetail.boardType}</Button>
          {postDetail.status == 0 ? (
            <Button className={"recruiting-tag"}>모집중</Button>
          ) : (
            <Button className={"recruitment-completed-tag"}>모집완료</Button>
          )}
        </div>
        {/*프로필*/}
        <Profile
          usage={"author"}
          createdDate={postDetail.createdDate}
          profileUrl={postDetail.profileUrl}
          nickName={postDetail.nickName}
          dormitory={"양진재"}
        />

        {/*게시글 내용*/}
        <PostDetailContent
          title={postDetail.title}
          content={postDetail.content}
          tags={postDetail.tags}
          images={postDetail.images}
        />

        {/*하트, 댓글 갯수*/}
        <div className="flex gap-x-2 items-center">
          <div className="flex gap-x-1 items-center">
            <HeartIcon />
            <span className="text-h6 text-gray5"> {postDetail.wishCount}</span>
          </div>
          <div className="flex gap-x-1 items-center">
            <CommentIcon />
            <span className="text-h6 text-gray5"> {postDetail.commentCount}</span>
          </div>
        </div>

        {/*버튼*/}
        <div className="flex justify-between">
          <div className="flex gap-x-2">
            <Button className={"not-click-filter"} SecondIcon={WishIcon}>
              {postDetail.wishCount}
            </Button>
            <Button className={"not-click-filter"} SecondIcon={StarIcon}>
              찜하기
            </Button>
          </div>
          <Button className={"click-filter"} SecondIcon={ChatIcon}>
            채팅보내기
          </Button>
        </div>
      </div>
      <div className="h-1 bg-gray1"></div>
      {/*댓글*/}
      {postDetail.comments.map((comment, index) => {
        return (
          <div key={index} className="flex flex-col m-5 gap-y-6">
            <div>
              <Comment
                usage={"comment"}
                createdDate={comment.createdDate}
                profileUrl={comment.profileUrl}
                nickName={comment.nickName}
                content={comment.content}
              />
            </div>
            <div className="flex flex-col gap-y-5">
              {comment.replyComments
                ? comment.replyComments.map((replyComment, index) => {
                    return (
                      <Comment
                        key={index}
                        usage={"replyComment"}
                        createdDate={replyComment.createdDate}
                        profileUrl={replyComment.profileUrl}
                        nickName={replyComment.nickName}
                        content={replyComment.content}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default BoardDetail;

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={12} height={12} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clip0_1674_2873)" strokeWidth={0.46}>
        <path
          d="M6.005 10.926c-.303 0-.606-.068-.88-.209a10.39 10.39 0 01-1.85-1.19C1.07 7.729.596 5.616.499 4.79a2.14 2.14 0 01-.02-.185c-.01-.14-.01-.218-.01-.218 0-1.681 1.309-3.105 2.861-3.105 1.343 0 2.563.646 3.178 1.69.05.088.025.2-.063.249-.088.048-.2.024-.25-.064-.55-.932-1.644-1.51-2.86-1.51-1.333 0-2.5 1.282-2.5 2.74 0 .004 0 .072.01.189 0 .058.01.112.015.17.093.787.542 2.789 2.646 4.504a9.893 9.893 0 001.782 1.146c.449.229.981.229 1.43 0l.122-.063a.181.181 0 01.25.078.18.18 0 01-.079.248l-.127.068c-.273.14-.576.209-.878.209v-.01z"
          fill="#727375"
          stroke="#727375"
        />
        <path d="M8.138 10.07a.263.263 0 10.001-.525.263.263 0 00-.001.526z" fill="#E70050" stroke="#9E9FA1" />
        <path
          d="M9.188 9.065a.198.198 0 01-.132-.053.183.183 0 010-.258c1.645-1.598 2.011-3.337 2.094-4.008.01-.058.015-.112.02-.17.01-.121.01-.185.01-.19 0-1.462-1.167-2.745-2.495-2.745-1.216 0-2.314.579-2.861 1.511a.179.179 0 01-.249.064.176.176 0 01-.063-.248c.615-1.04 1.835-1.69 3.178-1.69 1.552 0 2.86 1.423 2.86 3.104 0 0 0 .082-.01.218 0 .063-.01.127-.019.19-.088.71-.473 2.54-2.197 4.222a.186.186 0 01-.127.053h-.01z"
          fill="#9E9FA1"
          stroke="#9E9FA1"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_1674_2873">
          <path
            fill="#fff"
            transform="translate(.007 .947)"
            d="M0 0h12v10.105H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

function CommentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={12} height={12} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.01.75c2.896 0 5.252 1.905 5.252 4.25 0 2.345-2.356 4.25-5.252 4.25-.045 0-.085 0-.13-.005h-.116s-.02-.005-.03-.005a.745.745 0 00-.67.415l-.8 1.595-1.346-2.69a.79.79 0 00-.255-.29C1.448 7.455.753 6.265.753 5 .756 2.655 3.112.75 6.01.75zm0-.75C2.693 0 .007 2.24.007 5c0 1.575.875 2.98 2.241 3.895l1.346 2.69c.14.275.405.415.67.415s.535-.14.67-.415l.8-1.595c.09 0 .18.01.27.01 3.317 0 6.003-2.24 6.003-5S9.326 0 6.01 0z"
        fill="#727375"
      />
      <path
        d="M8.204 5.5a.5.5 0 100-1 .5.5 0 000 1zM6.106 5.565a.5.5 0 100-1 .5.5 0 000 1zM4.009 5.565a.5.5 0 100-1 .5.5 0 000 1z"
        fill="#9E9FA1"
      />
    </svg>
  );
}

function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={17} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clip0_1586_7595)" fill="#fff">
        <path d="M13.84 2.16c.92 0 1.667.815 1.667 1.818v5.814c0 1.003-.747 1.817-1.667 1.817h-2.753a.98.98 0 00-.807.443l-1.773 1.965-1.773-1.965a.962.962 0 00-.807-.443H3.174c-.92 0-1.667-.814-1.667-1.817V3.978c0-1.003.747-1.817 1.667-1.817H13.84zm0-1.09H3.174C1.7 1.07.507 2.372.507 3.979v5.814c0 1.606 1.193 2.907 2.667 2.907h2.753l2.04 2.364a.65.65 0 00.54.298.65.65 0 00.54-.298l2.04-2.364h2.753c1.474 0 2.667-1.3 2.667-2.907V3.978c0-1.607-1.193-2.907-2.667-2.907z" />
        <path d="M5.007 7.216a.667.667 0 100-1.333.667.667 0 000 1.333zM8.507 7.216a.667.667 0 100-1.333.667.667 0 000 1.333zM12.007 7.216a.667.667 0 100-1.333.667.667 0 000 1.333z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_1586_7595">
          <path fill="#fff" transform="translate(.507 .216)" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={17} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.2 4.207l2.317-3.085c.14-.19.309-.33.503-.418.194-.09.402-.134.623-.134.22 0 .428.045.623.134.194.089.362.228.503.418l2.317 3.085 3.572 1.214c.316.108.56.287.73.539.172.252.257.53.257.835 0 .14-.02.28-.061.419a1.28 1.28 0 01-.204.398l-2.34 3.175.088 3.404c.015.418-.123.77-.414 1.056-.291.286-.63.43-1.016.43l-.404-.05-3.651-1.077-3.652 1.077a.618.618 0 01-.214.047 7.683 7.683 0 01-.19.002c-.394 0-.734-.143-1.021-.43a1.36 1.36 0 01-.409-1.055l.09-3.426L.91 7.612a1.297 1.297 0 01-.203-.402A1.458 1.458 0 01.91 5.953c.176-.258.42-.44.736-.549l3.554-1.197zm.558.763L1.944 6.255a.538.538 0 00-.35.35.487.487 0 00.077.488l2.48 3.412-.105 3.697a.51.51 0 00.205.461.516.516 0 00.495.085l3.897-1.119 3.896 1.142a.516.516 0 00.495-.086.51.51 0 00.205-.461l-.105-3.719 2.48-3.368a.487.487 0 00.078-.487.538.538 0 00-.35-.35l-3.815-1.33L9.07 1.698a.491.491 0 00-.427-.222.491.491 0 00-.428.222L5.758 4.97z"
        fill="#727375"
      />
    </svg>
  );
}

function WishIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clip0_1586_7582)" fill="#727375">
        <path d="M9.639 12.77a.472.472 0 00-.646-.199l-.16.084a1.83 1.83 0 01-1.651 0 13.124 13.124 0 01-2.298-1.485C2.19 8.968 1.621 6.402 1.5 5.39l-.02-.21c-.012-.135-.012-.218-.012-.231 0-1.792 1.414-3.366 3.027-3.366 1.51 0 2.867.716 3.545 1.868a.481.481 0 10.832-.486C8.02 1.52 6.343.624 4.501.624 2.336.624.506 2.608.506 4.95c0 0 0 .115.013.307 0 .09.013.173.025.256.135 1.12.768 3.974 3.731 6.4a13.466 13.466 0 002.464 1.593c.397.198.832.3 1.26.3.43 0 .865-.102 1.261-.3l.173-.09a.472.472 0 00.199-.646h.006zM10.829 12.502a.5.5 0 100-.999.5.5 0 000 .998z" />
        <path d="M12.173 11.357a.483.483 0 01-.34-.826c2.1-2.054 2.567-4.274 2.67-5.138.006-.07.018-.141.018-.211.013-.141.013-.224.013-.23 0-1.799-1.414-3.373-3.027-3.373-1.51 0-2.867.717-3.545 1.868a.481.481 0 11-.832-.486C7.981 1.515 9.658.62 11.5.62c2.164 0 3.988 1.984 3.988 4.332 0 0 0 .115-.013.307 0 .084-.013.173-.026.256-.115.954-.633 3.437-2.95 5.702a.492.492 0 01-.333.135l.007.006z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_1586_7582">
          <path
            fill="#fff"
            transform="translate(.507 .624)"
            d="M0 0h15v13.183H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
