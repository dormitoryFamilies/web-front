import Profile from "@/components/board/Profile";

interface Props {
  usage: string; //replyComment, comment
  commentId: number;
  isWriter: boolean;
  profileUrl: string;
  createdDate: string;
  nickName: string;
  content: string;
  isDeleted?: boolean;
  setIsClickedCommentContent?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClickedReplyCommentContent?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCommentId: React.Dispatch<React.SetStateAction<number>>; //댓글 삭제 메뉴 띄우기 위한 트리거
  setIsCommentInput: React.Dispatch<React.SetStateAction<boolean>>;
}
const CommentContent = (props: Props) => {
  const {
    usage,
    commentId,
    profileUrl,
    createdDate,
    nickName,
    content,
    isWriter,
    isDeleted,
    setIsClickedCommentContent,
    setIsClickedReplyCommentContent,
    setSelectedCommentId,
    setIsCommentInput,
  } = props;

  return (
    <div className={usage == "replyComment" ? "flex flex-col gap-y-[5px] ml-[55px]" : "flex flex-col gap-y-[5px]"}>
      <div className="flex justify-between items-center">
        <Profile usage={usage} profileUrl={profileUrl} nickName={nickName} createdDate={createdDate} />
        {isWriter ? (
          <MoreMenuIcon
            onClick={() => {
              if (usage === "comment" && setIsClickedCommentContent) {
                setSelectedCommentId(commentId);
                setIsClickedCommentContent(true);
              } else if (usage === "replyComment" && setIsClickedReplyCommentContent) {
                setSelectedCommentId(commentId);
                setIsClickedReplyCommentContent(true);
              }
            }}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-y-[5px] ml-9">
        {isDeleted ? <div className={"text-point"}>삭제된 메시지입니다.</div> : <div>{content}</div>}
        <div className="flex gap-x-4">
          {usage == "comment" ? (
            <button
              onClick={() => {
                setSelectedCommentId(commentId);
                setIsCommentInput(false);
              }}
              className="flex gap-x-1 items-center">
              <CommentIcon />
              <div className="text-primaryMid text-h5">답글 달기</div>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default CommentContent;

function CommentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.01 1.369c3.62 0 6.565 2.381 6.565 5.312 0 2.932-2.944 5.313-6.565 5.313-.056 0-.106 0-.162-.006h-.144s-.025-.007-.038-.007a.93.93 0 00-.838.52l-1 1.993-1.682-3.363a.986.986 0 00-.319-.362C2.307 9.75 1.44 8.263 1.44 6.68c.006-2.93 2.95-5.312 6.571-5.312zm0-.938c-4.145 0-7.503 2.8-7.503 6.25 0 1.97 1.094 3.725 2.801 4.87l1.682 3.362a.933.933 0 00.838.518.927.927 0 00.838-.518l1-1.994c.113 0 .225.012.338.012 4.145 0 7.503-2.8 7.503-6.25S12.156.431 8.01.431z"
        fill="#FF7E8D"
      />
      <path
        d="M10.753 7.307a.625.625 0 100-1.25.625.625 0 000 1.25zM8.131 7.388a.625.625 0 100-1.25.625.625 0 000 1.25zM5.51 7.388a.625.625 0 100-1.25.625.625 0 000 1.25z"
        fill="#FF7E8D"
      />
    </svg>
  );
}

function MoreMenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={4} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.507 20.932a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM3.507 13.932a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM3.507 6.932a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
        fill="#9E9FA1"
      />
    </svg>
  );
}
