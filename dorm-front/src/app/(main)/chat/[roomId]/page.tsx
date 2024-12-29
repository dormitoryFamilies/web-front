"use client";

import { Stomp } from "@stomp/stompjs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, SVGProps, useEffect, useRef, useState } from "react";
import * as React from "react";
import { useRecoilState } from "recoil";

import ChattingRoomMenu from "@/components/chat/ChattingRoomMenu";
import LeaveChatRoomAlertModal from "@/components/chat/LeaveChatRoomAlertModal";
import MyChatContent from "@/components/chat/MyChatContent";
import OtherUserChatContent from "@/components/chat/OtherUserChatContent";
import { deleteNoMessageChatRoom, patchLeaveChatRoom } from "@/lib/api/chat";
import useChatMessages from "@/lib/hooks/useChatMessages";
import useMyMemberId from "@/lib/hooks/useMyMemberId";
import useUserProfile from "@/lib/hooks/useUserProfile";
import { chatRoomUUIDAtom, memberIdAtom, messageAtom } from "@/recoil/chat/atom";
const ChatRoom = () => {
  const router = useRouter();
  const params = useParams();
  // STOMP 클라이언트를 위한 ref. 웹소켓 연결을 유지하기 위해 사용
  const stompClient = useRef();
  const chatContainerRef = useRef(null); // 채팅 컨테이너에 대한 참조 생성
  const { chatMessages, mutate } = useChatMessages(params.roomId);
  const [isClickedMenu, setIsClickedMenu] = useState(false);
  const [isClickedLeaveChatRoomAlertModal, setIsClickedLeaveChatRoomAlertModal] = useState(false);
  // 메시지 입력 상태
  const [message, setMessage] = useRecoilState(messageAtom);
  const [chatRoomUUID, setChatRoomUUID] = useRecoilState(chatRoomUUIDAtom);
  const [memberIdState, setMemberIdState] = useRecoilState(memberIdAtom);
  const { userProfileData } = useUserProfile(memberIdState);
  const { myMemberId } = useMyMemberId();

  // 웹소켓 연결 설정
  const connectChattingRoom = (roomId: string | string[], roomUUID: string) => {
    const socket = new WebSocket("ws://13.124.186.20:8080/stomp");

    stompClient.current = Stomp.over(socket);
    stompClient.current.connect(
      { AccessToken: "Bearer " + localStorage.getItem("accessToken") },
      (frame) => {
        console.log("STOMP Connected:", frame);

        stompClient.current.subscribe(
          `/sub/chat/room/${chatRoomUUID}`,
          { AccessToken: "Bearer " + localStorage.getItem("accessToken") },
          (frame: { body: string }) => {
            console.log("frame", frame);
          },
        );
      },
      (error) => {
        console.error("STOMP 연결 에러:", error);
      },
    );
    console.log("방 번호", roomId);
  };

  // 새 메시지를 보내는 함수
  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    console.log("sendMessage called"); // 디버깅 로그 추가
    if (stompClient.current && stompClient.current.connected && message) {
      const messageObj = {
        roomUUID: chatRoomUUID,
        senderId: myMemberId?.data.memberId,
        message: message,
      };
      console.log("Attempting to send message:", messageObj);
      stompClient.current.send(
        `/pub/message`,
        { AccessToken: "Bearer " + localStorage.getItem("accessToken") },
        JSON.stringify(messageObj),
      );
      await mutate();
    }
  };

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  //소캣 연결
  useEffect(() => {
    connectChattingRoom(params.roomId, chatRoomUUID);
  }, []);

  // 메시지 추가될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    console.log(chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    console.log("chatRoomUUID", chatRoomUUID);
  }, [chatRoomUUID]);

  useEffect(() => {
    console.log("memberId", memberIdState);
  }, [memberIdState]);

  return (
    <form className={"flex flex-col min-h-screen"} onSubmit={sendMessage}>
      {/* 채팅방 나가기 경고 모달 */}
      {isClickedLeaveChatRoomAlertModal ? (
        <LeaveChatRoomAlertModal
          roomId={params.roomId}
          setClickedMenu={setIsClickedMenu}
          userProfileUrl={userProfileData?.data.profileUrl}
          userNickName={userProfileData?.data.nickname}
        />
      ) : null}

      {/* 채팅방 메뉴 */}
      {isClickedMenu ? (
        <ChattingRoomMenu
          setClickedMenu={setIsClickedMenu}
          roomId={params.roomId}
          setIsClickedLeaveChatRoomAlertModal={setIsClickedLeaveChatRoomAlertModal}
        />
      ) : null}

      {/* Header */}
      <div
        className={
          "fixed z-10 w-full bg-white flex items-center px-5 py-3 justify-between border-b-[1px] border-[#D9D9D9]"
        }>
        <div className={"flex items-center"}>
          <BackIcon
            onClick={() => {
              if (chatMessages && chatMessages?.data.chatHistory.length === 0) {
                deleteNoMessageChatRoom(params.roomId).then((r) => {
                  console.log("빈 채팅방 삭제", r);
                  router.push("/chat");
                });
              } else {
                patchLeaveChatRoom(params.roomId).then((r) => {
                  console.log("채팅방 나가기", r);
                  router.push("/chat");
                });
              }
            }}
          />
          {userProfileData?.data.profileUrl ? (
            <div className={"ml-4 relative w-[36px] h-[36px]"}>
              <Image
                src={userProfileData?.data.profileUrl}
                alt={userProfileData?.data.profileUrl}
                fill
                className={"object-cover rounded-full"}
              />
            </div>
          ) : (
            <ProfileIcon className={"ml-4"} />
          )}
          <div className={"ml-3 text-h3 font-semibold"}>{userProfileData?.data.nickname}</div>
        </div>
        <MenuIcon
          onClick={() => {
            setIsClickedMenu(!isClickedMenu);
          }}
        />
      </div>

      <div className={"h-[80px]"} />

      {/*경고 문구*/}
      {chatMessages?.data.chatHistory.length === 0 ? (
        <div className={"fixed top-[71px] w-full px-5 py-3 flex gap-x-4 items-center bg-primaryLight"}>
          <AlertIcon />
          <div className={"flex flex-col text-gray5 text-h5"}>
            <span>카카오톡 ID 등으로 대화를 유도하는 경우</span>
            <span>피해가 있을 수 있으니 주의하세요!</span>
          </div>
        </div>
      ) : null}

      <div className={"h-[57px]"} />

      {/* 내용 */}
      <div
        ref={chatContainerRef}
        className={
          chatMessages?.data.chatHistory.length === 0
            ? "flex flex-col justify-center flex-grow overflow-y-scroll" // 메시지 없을 때는 중앙정렬
            : "flex flex-col justify-end flex-grow overflow-y-scroll" //메시지 있을 때는 끝 정렬
        }>
        {chatMessages?.data.chatHistory.length === 0 ? (
          <div className={"flex flex-col items-center"}>
            <Image width={147} height={121} src={"/chat/noMessages.png"} alt={"/chat/noMessages.png"}></Image>
            <div className={"mt-[7px] flex flex-col text-gray3 items-center"}>
              <span className={"font-medium text-h5"}>채팅 내용이 없습니다</span>
              <span className={"text-h6"}>지금 바로 채팅을 시작해보세요!</span>
            </div>
          </div>
        ) : (
          <div className={"flex flex-col gap-y-5 justify-end"}>
            {chatMessages?.data.chatHistory.map((chatMessage) => {
              return chatMessage.isSender ? (
                <MyChatContent message={chatMessage.chatMessage} sentTime={chatMessage.sentTime} />
              ) : (
                <OtherUserChatContent
                  message={chatMessage.chatMessage}
                  memberId={chatMessage.memberId}
                  sentTime={chatMessage.sentTime}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className={"h-[80px]"} />

      {/*채팅 보내기 input 창*/}
      <div className={"fixed bottom-0 w-full bg-white pb-5"}>
        <div className={"flex mx-5 justify-between bg-gray0 rounded-[22px] py-[7px] px-2"}>
          <input
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder={"메시지 보내기"}
            className={"ml-3 bg-gray0 placeholder:text-gray4 placeholder:text-h5 outline-none"}
          />
          <button type={"submit"} className={"py-2 px-4 text-white bg-primary rounded-full"}>
            전송
          </button>
        </div>
      </div>
    </form>
  );
};
export default ChatRoom;

const BackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={11} height={18} fill="none" {...props}>
    <path stroke="#767676" strokeWidth={2} d="m9.507 17-8-8 8-8" />
  </svg>
);

const ProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={49} height={48} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path fill="#E4E5E7" d="M24.507 48c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24" />
      <path
        fill="#191919"
        d="M24.507 8.76c2.6 0 4.72 2.12 4.72 4.72s-2.12 4.72-4.72 4.72-4.72-2.12-4.72-4.72 2.12-4.72 4.72-4.72m0-3c-4.26 0-7.72 3.46-7.72 7.72s3.46 7.72 7.72 7.72 7.72-3.46 7.72-7.72-3.46-7.72-7.72-7.72M39.647 35.14c-.48 0-.96-.24-1.26-.68-3.1-4.68-8.28-7.46-13.88-7.46s-10.78 2.8-13.88 7.46c-.46.7-1.38.88-2.08.42a1.49 1.49 0 0 1-.42-2.08c3.66-5.52 9.78-8.82 16.38-8.82s12.74 3.3 16.38 8.82c.46.7.26 1.62-.42 2.08-.26.16-.54.24-.82.24z"
      />
      <path
        fill="#E70050"
        d="M31.627 33.86c-.86 0-1.56.7-1.56 1.56s.7 1.56 1.56 1.56 1.56-.7 1.56-1.56-.7-1.56-1.56-1.56"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.507 0h48v48h-48z" />
      </clipPath>
    </defs>
  </svg>
);
const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={4} fill="none" {...props}>
    <circle cx={2.507} cy={2} r={2} fill="#727375" />
    <circle cx={10.507} cy={2} r={2} fill="#727375" />
    <circle cx={18.507} cy={2} r={2} fill="#727375" />
  </svg>
);
const AlertIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path fill="#E70050" d="M10.507 20c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10" />
      <path
        fill="#FFF9FA"
        d="M10.508 12.266A1.28 1.28 0 0 1 9.23 10.99V4.305a1.278 1.278 0 0 1 2.555 0v6.684c0 .705-.572 1.277-1.277 1.277M10.508 17.083a1.278 1.278 0 1 0 0-2.556 1.278 1.278 0 0 0 0 2.556"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.507 0h20v20h-20z" />
      </clipPath>
    </defs>
  </svg>
);
