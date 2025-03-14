import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SVGProps } from "react";

import Button from "@/components/common/Button";
import Tag from "@/components/common/Tag";

interface Props {
  articleId: number;
  nickname: string;
  boardType: string;
  title: string;
  content: string;
  wishCount: number;
  isWished: boolean;
  commentCount: number;
  status: string;
  createdDate: string;
  thumbnailUrl: string | undefined;
  viewCount: number;
  profileUrl: string;
  bottomElement?: React.JSX.Element | null;
}
const Post = (props: Props) => {
  const {
    articleId,
    nickname,
    viewCount,
    boardType,
    isWished,
    title,
    content,
    wishCount,
    commentCount,
    status,
    createdDate,
    thumbnailUrl,
    profileUrl,
    bottomElement,
  } = props;
  const router = useRouter();

  const onMove = (articleId: number) => {
    router.push("/board/" + articleId);
  };

  function formatDate(date: string) {
    const d = new Date(date);
    const now = Date.now();
    const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
    if (diff < 60 * 1) {
      // 1분 미만일땐 방금 전 표기
      //TODO: 몊분 전
      return "방금 전";
    }
    if (diff < 60 * 60 * 24 * 7) {
      // 7일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
      return formatDistanceToNow(d, { addSuffix: true, locale: ko });
    }
    if (diff < 60 * 60 * 24 * 30 * 12) {
      // 1년, 1달 기준
      //TODO: 날짜로 나오게 하는게 좋을 것 같다.
      return formatDistanceToNow(d, { addSuffix: true, locale: ko });
    }
    if (diff > 60 * 60 * 24 * 30 * 12) {
      // 1년 넘어가면
      return format(d, "yy.MM.dd"); // 날짜 포맷
    }
  }

  return (
    <div className="rounded-[20px] p-4 border-[1px] border-gray1">
      <div onClick={() => onMove(articleId)} className="flex flex-col gap-y-2">
        {/*태그*/}
        <div className="flex gap-x-2">
          <Button className={"bg-secondary-tag"}>{boardType}</Button>
          {status == "모집중" ? (
            <Tag className={"bg-blue-tag"}>모집중</Tag>
          ) : (
            <Tag className={"bg-gray0-tag"}>모집완료</Tag>
          )}
        </div>

        {/*게시글*/}
        <article className="flex justify-between items-center">
          <div className="flex flex-col gap-y-1 w-[230px]">
            <div className="truncate text-h4">{title}</div>
            <div className="text-h5 text-gray5 line-clamp-2">{content}</div>
          </div>
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={thumbnailUrl} className="rounded-[8px] bg-[#D9D9D9] w-[60px] h-[60px]"></img>
          ) : null}
        </article>

        {/*프로필*/}
        <div className="flex justify-between">
          <div className="flex items-center justify-center text-h5 text-gray4 gap-x-2 ">
            <div className="flex items-center justify-center gap-x-[5px]">
              <img
                alt={profileUrl ? profileUrl : "profile"}
                src={profileUrl ? profileUrl : "/profile.png"}
                className={"w-[15px] h-[15px] rounded-full"}></img>
              <div className={"flex items-center justify-center"}>
                <span className="text-h5">{nickname}</span>
                <span className="px-[6px] text-[10px]">|</span>
                <span className="text-h5">{formatDate(createdDate)}</span>
                <span className="px-[6px] text-[10px]">|</span>
                <span className="text-h5">조회</span>
                <span className="text-h5 pl-1">{viewCount}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-x-2">
            <div className="flex items-center gap-x-1">
              {isWished ? <HeartIcon /> : <EmptyHeartIcon />}
              <div className="text-h6 text-gray5">{wishCount}</div>
            </div>
            <div className="flex items-center gap-x-1">
              <ChatIcon />
              <div className="text-h6 text-gray5">{commentCount}</div>
            </div>
          </div>
        </div>
      </div>
      {/*수정, 삭제버튼*/}
      {bottomElement ? bottomElement : null}
    </div>
  );
};
export default Post;

function EmptyHeartIcon(props: React.SVGProps<SVGSVGElement>) {
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
          <path fill="#fff" transform="translate(.007 .947)" d="M0 0h12v10.105H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
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

function MoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.007 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12.007 15.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12.007 22.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="#9E9FA1"
      />
    </svg>
  );
}

const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={10} fill="none" {...props}>
    <path
      fill="#FF7E8D"
      fillRule="evenodd"
      d="m9.206 7.954.611-.683c1.21-1.51 1.515-3 1.593-3.63.01-.066.02-.131.02-.197.01-.14.01-.226.01-.226 0-.974-.422-1.865-1.074-2.461l-.003-.008-.008-.002C9.842.283 9.188 0 8.487 0 7.41 0 6.409.407 5.719 1.095 5.028.408 4.029.005 2.953.005 1.351.005 0 1.48 0 3.223c0 0 0 .08.01.226q.006.1.02.192c.101.855.59 3.046 2.868 4.909.564.458 1.204.876 1.91 1.233.282.147.594.217.907.217.312 0 .625-.06.907-.206l.03-.017c.75-.312 1.563-.872 2.394-1.703a2 2 0 0 1 .16-.12m-6.07.309v.002l-.001-.002-.004-.003z"
      clipRule="evenodd"
    />
  </svg>
);
