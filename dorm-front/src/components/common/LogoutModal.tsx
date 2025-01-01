import { useRouter } from "next/navigation";
import * as React from "react";

import { logout } from "@/lib/api/common";

interface Props {
  setIsOpenLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModal = (props: Props) => {
  const { setIsOpenLogoutModal } = props;
  const router = useRouter();
  return (
    <div
      className={
        "absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.2)] px-8 min-h-screen"
      }>
      <section className={"flex flex-col gap-y-8 justify-center items-center bg-white py-8 px-7 rounded-[32px]"}>
        <div className={"flex flex-col gap-y-3"}>
          <div className={"flex flex-col items-center justify-center"}>
            <div className={"flex justify-center items-center text-h2 font-semibold"}>로그아웃 하시겠어요?</div>
          </div>
          <div>
            <div className={"flex justify-center items-center text-h5 text-gray5"}>재로그인하면 둠즈서비스를</div>
            <div className={"flex justify-center items-center text-h5 text-gray5"}>다시 이용할 수 있어요.</div>
          </div>
        </div>
        <div className={"flex gap-x-3 w-full"}>
          <button
            onClick={() => {
              setIsOpenLogoutModal(false);
            }}
            className={
              "flex gap-x-2 items-center justify-center bg-gray1 rounded-full text-gray5 text-h5 py-[13px] w-full "
            }>
            돌아가기
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              logout();
              router.push("/");
            }}
            className={
              "flex gap-x-2 items-center justify-center bg-primary rounded-full text-white text-h5 py-[13px] w-full "
            }>
            로그아웃
          </button>
        </div>
      </section>
    </div>
  );
};
export default LogoutModal;
