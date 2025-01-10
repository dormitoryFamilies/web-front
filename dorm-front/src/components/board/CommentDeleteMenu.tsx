import { KeyedMutator } from "swr";

import { deleteArticleComment } from "@/lib/api/board";
import { ResponseAxiosArticleDetailAllCommentsType } from "@/types/board/type";

interface Props {
  commentId: number;
  setIsClickedCommentContent: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: KeyedMutator<ResponseAxiosArticleDetailAllCommentsType>;
}
const CommentDeleteMenu = (props: Props) => {
  const { commentId, setIsClickedCommentContent, mutate } = props;

  return (
    <div
      onClick={() => {
        setIsClickedCommentContent(false);
      }}
      className={"absolute left-0 right-0 z-40 flex flex-col bg-[rgba(0,0,0,0.6)] min-h-screen"}>
      <div className={"flex flex-col w-full fixed z-50 bg-gray0 rounded-t-[40px] p-5 bottom-0 gap-y-3"}>
        <div className={"rounded-[32px] bg-white"}>
          <div className={"flex justify-center items-center text-gray4 py-4"}>댓글 메뉴</div>
          <div
            onClick={async () => {
              await deleteArticleComment(commentId).then(() => {
                mutate();
              });
              setIsClickedCommentContent(false);
            }}
            className={"flex justify-center items-center text-point py-4 border-t border-t-gray0"}>
            삭제하기
          </div>
        </div>
        <div className={"rounded-full bg-white border-[1px] border-gray0"}>
          <div
            onClick={() => {
              setIsClickedCommentContent(false);
            }}
            className={"flex justify-center items-center text-gray5 py-4"}>
            닫기
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentDeleteMenu;
