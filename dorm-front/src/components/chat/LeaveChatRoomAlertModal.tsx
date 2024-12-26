import Image from "next/image";
import { useRouter } from "next/navigation";

import { deleteChatRoom, patchLeaveChatRoom } from "@/lib/api/chat";

interface Props {
  roomId: string | string[];
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  userProfileUrl: string | undefined;
  userNickName: string | undefined;
}
const LeaveChatRoomAlertModal = (props: Props) => {
  const { roomId, setClickedMenu, userProfileUrl, userNickName } = props;
  const router = useRouter();
  return (
    <div
      className={
        "absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.6)] px-8 min-h-screen"
      }>
      <div className={"flex flex-col bg-white rounded-[32px] px-[28px] py-8 items-center"}>
        {/*사용자 프로필*/}
        <div className={"flex flex-col gap-y-2"}>
          <div className={"relative w-[80px] h-[80px]"}>
            <Image
              src={userProfileUrl ? userProfileUrl : "/unnimm.jpg"}
              alt={userProfileUrl ? userProfileUrl : "/unnimm.jpg"}
              className={"object-cover rounded-full"}
              fill
            />
          </div>
          <div className={"text-h3 font-semibold"}>{userNickName}</div>
        </div>

        {/* 안내 문구 */}
        <div className={"flex flex-col gap-y-3 mt-2 items-center"}>
          <div className={"text-h2 font-bold"}>채팅방을 나가시겠어요?</div>
          <div className={"text-h5 text-gray5"}>대화 내용이 모두 삭제됩니다.</div>
        </div>

        {/* 버튼 */}
        <div className={"mt-6 flex gap-x-3"}>
          <button className={"w-full bg-gray1 rounded-[20px] text-h5 text-gray5 py-[14px] px-[35px]"}>취소</button>
          <button
            onClick={() => {
              deleteChatRoom(roomId).then((r) => {
                setClickedMenu(false);
                router.push("/chat");
              });
            }}
            className={"w-full bg-primary rounded-[20px] text-white text-h5 py-[14px] px-[35px]"}>
            나가기
          </button>
        </div>
      </div>
    </div>
  );
};
export default LeaveChatRoomAlertModal;
