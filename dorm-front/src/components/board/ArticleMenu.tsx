import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { selectedArticleIdAtom } from "@/recoil/board/atom";

interface Props {
  articleId: string | string[];
  setIsClickedArticleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRecruitmentStatusChangeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteArticleWarningModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ArticleMenu = (props: Props) => {
  const { articleId, setIsClickedArticleMenu, setIsRecruitmentStatusChangeModal, setIsDeleteArticleWarningModalOpen } = props;
  const router = useRouter();
  const [selectedArticleId, setSelectedArticleId] = useRecoilState(selectedArticleIdAtom);

  return (
    <div className={"absolute left-0 right-0 z-40 flex flex-col bg-[rgba(0,0,0,0.6)] min-h-screen"}>
      <div className={"flex flex-col w-full fixed z-50 bg-gray0 rounded-t-[40px] p-5 bottom-0 gap-y-3"}>
        <div className={"rounded-[32px] bg-white"}>
          <div className={"flex justify-center items-center text-gray4 py-4"}>글 메뉴</div>
          <div
            onClick={async () => {
              setIsDeleteArticleWarningModalOpen(true);
              setIsClickedArticleMenu(false);
            }}
            className={"flex justify-center items-center text-point py-4 border-t border-t-gray0"}>
            삭제하기
          </div>
          <div
            onClick={async () => {
              setSelectedArticleId(articleId);
              router.push("/board/edit");
              setIsClickedArticleMenu(false);
            }}
            className={"flex justify-center items-center text-gray5 py-4"}>
            수정하기
          </div>
          <div
            onClick={async () => {
              setIsClickedArticleMenu(false);
              setIsRecruitmentStatusChangeModal(true);
            }}
            className={"flex justify-center items-center text-gray5 py-4"}>
            모집 완료하기
          </div>
        </div>
        <div className={"rounded-full bg-white border-[1px] border-gray0"}>
          <div
            onClick={() => {
              setIsClickedArticleMenu(false);
            }}
            className={"flex justify-center items-center text-gray5 py-4"}>
            닫기
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticleMenu;
