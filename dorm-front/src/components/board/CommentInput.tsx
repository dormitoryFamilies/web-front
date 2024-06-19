import { AxiosResponse } from "axios";
import { FormEvent } from "react";
import { useRecoilState } from "recoil";
import { KeyedMutator } from "swr";

import { postArticleComment } from "@/lib/api/board";
import { articleCommentDataAtom } from "@/recoil/board/atom";
import { ResponseArticleDetailAllCommentsType } from "@/types/board/type";

interface Props {
  articleId: string | string[];
  mutate: KeyedMutator<AxiosResponse<ResponseArticleDetailAllCommentsType, any>>;
}

const CommentInput = (props: Props) => {
  const { articleId, mutate } = props;
  const [articleComment, setArticleComment] = useRecoilState(articleCommentDataAtom);

  /**
   * form 형식 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    try {
      await postArticleComment(articleId, articleComment).then(() => {
        mutate();
      });
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
          setArticleComment((prevData) => ({
            ...prevData,
            content: e.target.value,
          }));
        }}
        placeholder={"댓글을 남겨주세요"}
        className="bg-gray0 rounded-[22px] py-2 focus:outline-0"></input>
      <button type={"submit"} className="px-4 py-2 bg-primary text-white rounded-full">
        등록
      </button>
    </form>
  );
};
export default CommentInput;
