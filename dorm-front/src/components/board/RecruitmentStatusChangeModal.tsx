import { FormEvent } from "react";
import { KeyedMutator } from "swr";

import { putArticleStatus } from "@/lib/api/board";
import { ResponseAxiosArticleDetailType } from "@/types/board/type";

interface Props {
  articleId: string | string[] | number | undefined;
  status: string | undefined;
  setIsRecruitmentStatusChangeModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: KeyedMutator<ResponseAxiosArticleDetailType>;
}
const RecruitmentStatusChangeModal = (props: Props) => {
  const { articleId, setIsRecruitmentStatusChangeModal, status, mutate } = props;

  /**
   * form 형식 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    const formData = new FormData();

    formData.append("status", status === "모집중" ? "모집완료" : "모집중");

    try {
      const response = await putArticleStatus(articleId, formData).then(async () => {
        await mutate();
      }); // API 호출
      setIsRecruitmentStatusChangeModal(false);
    } catch (error) {
      console.error("폼 제출 중 오류 발생:", error);
    }
  };

  return (
    <div
      className={
        "absolute left-0 right-0 z-40 flex flex-col  items-center justify-center bg-[rgba(0,0,0,0.6)] min-h-screen"
      }>
      {status === "모집중" ? (
        <div className={"flex flex-col gap-y-[32px] bg-white m-5 rounded-[32px] py-[32px] px-[28px]"}>
          <div className={"flex flex-col items-center justify-center gap-y-3"}>
            <div className={"text-h2 font-bold"}>모집완료를 할까요?</div>
            <div className={"flex flex-col items-center justify-center text-h5 text-gray5"}>
              <div>모집을 완료하면 1주일 뒤에</div>
              <div>게시판에서 글이 내려가고, 보관함으로 이동해요.</div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className={"flex gap-x-3"}>
            <button
              type={"button"}
              onClick={() => {
                setIsRecruitmentStatusChangeModal(false);
              }}
              className={"bg-gray1 w-full text-gray5 text-h5 rounded-[20px] py-[14px]"}>
              취소
            </button>
            <button type={"submit"} className={"bg-primary w-full text-white text-h5 rounded-[20px] py-[14px]"}>
              완료하기
            </button>
          </form>
        </div>
      ) : (
        <div className={"flex flex-col gap-y-[32px] bg-white m-5 rounded-[32px] py-[32px] px-[28px]"}>
          <div className={"flex flex-col items-center justify-center gap-y-3"}>
            <div className={"text-h2 font-bold"}>다시 모집을 시작할까요?</div>
            <div className={"flex flex-col items-center justify-center text-h5 text-gray5"}>
              <div>모집을 완료하면 1주일 뒤에</div>
              <div>게시판에서 글이 내려가고, 보관함으로 이동해요.</div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className={"flex gap-x-3"}>
            <button
              type={"button"}
              onClick={() => {
                setIsRecruitmentStatusChangeModal(false);
              }}
              className={"bg-gray1 w-full text-gray5 text-h5 rounded-[20px] py-[14px]"}>
              취소
            </button>
            <button type={"submit"} className={"bg-primary w-full text-white text-h5 rounded-[20px] py-[14px]"}>
              완료하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default RecruitmentStatusChangeModal;
