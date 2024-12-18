import * as React from "react";
import { SVGProps } from "react";
import { KeyedMutator } from "swr";

import { deleteArticleWish, postArticleWish } from "@/lib/api/board";
import { ResponseAxiosArticleDetailType } from "@/types/board/type";

interface Props {
  isWriter: boolean | undefined;
  isWished: boolean | undefined;
  articleId: string | string[] | number | undefined;
  wishCount: number | undefined;
  articleMutate: KeyedMutator<ResponseAxiosArticleDetailType>;
  setIsArticleFavoritesList: React.Dispatch<React.SetStateAction<boolean>>;
}
const CommunicationBox = (props: Props) => {
  const { isWriter, isWished, articleId, wishCount, articleMutate, setIsArticleFavoritesList } = props;
  const renderCommunicationBox = (isWriter: boolean | undefined) => {
    switch (isWriter) {
      case true:
        return (
          <div className={"flex justify-between"}>
            <button
              onClick={() => {
                setIsArticleFavoritesList(true);
              }}
              className={
                "flex items-center border-[1px] border-gray1 px-4 py-[5px] text-gray5 text-h5 gap-x-1 rounded-full"
              }>
              <GrayHeartIcon /> <span>관심목록</span>
              {wishCount}
            </button>
            <button
              className={
                "flex items-center border-[1px] border-gray1 px-4 py-[5px] text-gray5 text-h5 gap-x-1 rounded-full"
              }>
              <div className={"w-[16px] h-[16px]"}>
                <ChatIcon />
              </div>
              채팅하기
            </button>
          </div>
        );
      default:
        return (
          <div className={"flex justify-between"}>
            {isWished ? (
              <button
                onClick={() => {
                  deleteArticleWish(articleId).then(() => {
                    articleMutate();
                  });
                }}
                className={"flex items-center px-4 py-[5px] text-white text-h5 gap-x-1 rounded-full bg-primaryMid"}>
                <FullHeartIcon />
                {wishCount}
              </button>
            ) : (
              <button
                onClick={() => {
                  //좋아요가 눌리지 않을경우
                  postArticleWish(articleId).then(() => {
                    articleMutate();
                  });
                }}
                className={
                  "flex items-center border-[1px] border-gray1 px-4 py-[5px] text-gray5 text-h5 gap-x-1 rounded-full"
                }>
                <GrayHeartIcon />
                {wishCount}
              </button>
            )}
            <button
              className={
                "flex items-center border-[1px] border-gray1 px-4 py-[5px] text-gray5 text-h5 gap-x-1 rounded-full"
              }>
              <div className={"w-[16px] h-[16px]"}>
                <ChatIcon />
              </div>
              채팅보내기
            </button>
          </div>
        );
    }
  };

  return <div>{renderCommunicationBox(isWriter)}</div>;
};
export default CommunicationBox;

const FullHeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={10} fill="none" {...props}>
    <path
      fill="#FF7E8D"
      fillRule="evenodd"
      d="m9.206 7.954.611-.683c1.21-1.51 1.515-3 1.593-3.63.01-.066.02-.131.02-.197.01-.14.01-.226.01-.226 0-.974-.422-1.865-1.074-2.461l-.003-.008-.008-.002C9.842.283 9.188 0 8.487 0 7.41 0 6.409.407 5.719 1.095 5.028.408 4.029.005 2.953.005 1.351.005 0 1.48 0 3.223c0 0 0 .08.01.226q.006.1.02.192c.101.855.59 3.046 2.868 4.909.564.458 1.204.876 1.91 1.233.282.147.594.217.907.217.312 0 .625-.06.907-.206l.03-.017c.75-.312 1.563-.872 2.394-1.703a2 2 0 0 1 .16-.12m-6.07.309v.002l-.001-.002-.004-.003z"
      clipRule="evenodd"
    />
  </svg>
);

const GrayHeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={15} height={14} fill="none" {...props}>
    <g fill="#727375" clipPath="url(#a)">
      <path d="M9.132 12.554a.47.47 0 0 0-.647-.199l-.16.084a1.83 1.83 0 0 1-1.65 0 13 13 0 0 1-2.298-1.485C1.683 8.753 1.113 6.187.992 5.175l-.02-.21C.96 4.83.96 4.746.96 4.733c0-1.792 1.414-3.366 3.027-3.366 1.51 0 2.867.717 3.545 1.868a.481.481 0 1 0 .832-.486C7.513 1.304 5.836.408 3.994.408 1.83.408 0 2.392 0 4.734c0 0 0 .115.013.307 0 .09.013.173.025.256.135 1.12.768 3.974 3.731 6.4a13.5 13.5 0 0 0 2.464 1.593c.397.198.832.3 1.26.3.43 0 .865-.102 1.261-.3l.173-.09a.47.47 0 0 0 .198-.646zM10.322 12.286a.5.5 0 1 0 0-.999.5.5 0 0 0 0 .999" />
      <path d="M11.666 11.141a.483.483 0 0 1-.34-.825c2.1-2.055 2.567-4.275 2.67-5.139.005-.07.018-.14.018-.211.013-.141.013-.224.013-.23 0-1.799-1.414-3.373-3.027-3.373-1.51 0-2.867.717-3.545 1.869a.481.481 0 1 1-.832-.487C7.474 1.3 9.151.403 10.993.403c2.164 0 3.988 1.984 3.988 4.332 0 0 0 .116-.013.308 0 .083-.013.172-.026.256-.115.953-.633 3.436-2.95 5.701a.5.5 0 0 1-.333.135z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .408h15v13.183H0z" />
      </clipPath>
    </defs>
  </svg>
);

const ChatIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <g fill="#727375" clipPath="url(#a)">
      <path d="M13.333 1.945c.92 0 1.667.814 1.667 1.817v5.814c0 1.003-.747 1.817-1.667 1.817H10.58a.98.98 0 0 0-.807.443L8 13.801l-1.773-1.965a.96.96 0 0 0-.807-.443H2.667C1.747 11.393 1 10.58 1 9.576V3.762c0-1.003.747-1.817 1.667-1.817zm0-1.09H2.667C1.193.855 0 2.155 0 3.762v5.814c0 1.606 1.193 2.907 2.667 2.907H5.42l2.04 2.364a.65.65 0 0 0 .54.298.65.65 0 0 0 .54-.298l2.04-2.364h2.753c1.474 0 2.667-1.3 2.667-2.907V3.762C16 2.156 14.807.855 13.333.855" />
      <path d="M4.5 7a.667.667 0 1 0 0-1.333A.667.667 0 0 0 4.5 7M8 7a.667.667 0 1 0 0-1.333A.667.667 0 0 0 8 7M11.5 7a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
