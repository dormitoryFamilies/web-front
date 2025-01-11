import { FormEvent } from "react";
import { useRecoilState } from "recoil";
import { KeyedMutator } from "swr";

import { postArticleComment, postArticleReplyComments } from "@/lib/api/board";
import { articleCommentDataAtom } from "@/recoil/board/atom";
import { ResponseAxiosArticleDetailAllCommentsType } from "@/types/board/type";

interface Props {
  isCommentInput: boolean;
  articleId: string | string[];
  commentId: number;
  mutate: KeyedMutator<ResponseAxiosArticleDetailAllCommentsType>;
  setIsCommentInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentInput = (props: Props) => {
  const { isCommentInput, articleId, commentId, mutate, setIsCommentInput } = props;
  const [articleComment, setArticleComment] = useRecoilState(articleCommentDataAtom);
  const [articleReplyComment, setArticleReplyComment] = useRecoilState(articleCommentDataAtom);

  /**
   * form 형식 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    try {
      if (isCommentInput) {
        await postArticleComment(articleId, articleComment).then(async () => {
          await mutate();
          setArticleComment((prevState) => ({ ...prevState, content: "" }));
        });
      } else {
        await postArticleReplyComments(commentId, articleReplyComment).then(async () => {
          await mutate();
          setArticleReplyComment((prevState) => ({ ...prevState, content: "" }));
          setIsCommentInput(true);
        });
      }
    } catch (error) {
      console.error("폼 제출 중 오류 발생:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full rounded-[22px] py-2 pr-2 pl-4 bg-gray0 text-h5 justify-between">
      <input
        onChange={(e) => {
          if (isCommentInput) {
            setArticleComment((prevData) => ({
              ...prevData,
              content: e.target.value,
            }));
          } else {
            setArticleReplyComment((prevData) => ({
              ...prevData,
              content: e.target.value,
            }));
          }
        }}
        placeholder={isCommentInput ? "댓글을 남겨주세요" : "대댓글을 남겨주세요"}
        className="bg-gray0 rounded-[22px] py-2 focus:outline-0 w-full"></input>
      <button type={"submit"} className="px-4 py-2 bg-primary text-white rounded-full">
        등록
      </button>
    </form>
  );
};
export default CommentInput;
