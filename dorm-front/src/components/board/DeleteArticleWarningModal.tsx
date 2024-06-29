import { useRouter } from "next/navigation";

import { deleteArticle } from "@/lib/api/board";

interface Props {
  articleId: string | string[];
  setIsDeleteArticleWarningModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteArticleWarningModal = (props: Props) => {
  const { articleId, setIsDeleteArticleWarningModalOpen } = props;
  const router = useRouter();

  return (
    <div
      className={
        "absolute left-0 right-0 z-40 flex flex-col  items-center justify-center bg-[rgba(0,0,0,0.6)] min-h-screen"
      }>
      <div className={"flex flex-col gap-y-[32px] bg-white mx-[28px] rounded-[32px] py-[32px] px-[28px]"}>
        <div className={"flex flex-col items-center justify-center gap-y-3"}>
          <div className={"text-h2 font-bold"}>정말 삭제할까요?</div>
          <div className={"flex flex-col items-center justify-center text-h5 text-gray5"}>
            <div>삭제를 하게 되면</div>
            <div>더이상 게시물을 확인할 수 없어요.</div>
          </div>
        </div>
        <div className={"flex gap-x-3"}>
          <button
            onClick={() => {
              setIsDeleteArticleWarningModalOpen(false);
            }}
            className={"bg-gray1 w-full text-gray5 text-h5 rounded-[20px] py-[14px]"}>
            취소
          </button>
          <button
            onClick={() => {
              deleteArticle(articleId).then(() => {
                router.push("/board");
              });
              setIsDeleteArticleWarningModalOpen(false);
            }}
            className={"bg-primary w-full text-white text-h5 rounded-[20px] py-[14px]"}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteArticleWarningModal;
