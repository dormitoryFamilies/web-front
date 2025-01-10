"use client";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { SVGProps, useEffect, useState } from "react";
import * as React from "react";
import { useRecoilState } from "recoil";

import SearchInput from "@/components/chat/SearchInput";
import SearchMenu from "@/components/chat/SearchMenu";
import ProfileModal from "@/components/common/ProfileModal";
import useDebounce from "@/hooks/useDebounce";
import { getSearchChatMessage, getSearchChatRoom } from "@/lib/api/chat";
import { getSearchFollowings } from "@/lib/api/mypage";
import { chatRoomUUIDAtom, memberIdAtom } from "@/recoil/chat/atom";
import {
  chatHistoryType,
  ChatRoomMessagesAxiosResponseType,
  ChatRoomsAxiosResponseType,
  ChatRoomType,
} from "@/types/chat/page";
import { AllDoomzListAxiosResponseType, MemberProfileType } from "@/types/room-mate/type";

const ChatSearch = () => {
  const [type, setType] = useState<"전체" | "팔로잉" | "채팅방" | "메시지">("전체");
  const [searchValue, setSearchValue] = useState("");
  const [searchChatRoomResults, setSearchChatRoomResults] = useState<ChatRoomType[]>([]);
  const [searchChatMessageResults, setSearchChatMessageResults] = useState<chatHistoryType[]>([]);
  const [searchFollowingResults, setSearchFollowingResults] = useState<MemberProfileType[]>([]);
  const debouncedValue = useDebounce<string>(searchValue, 100);
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [memberIdState, setMemberIdState] = useRecoilState(memberIdAtom);
  const [chatRoomUUID, setChatRoomUUID] = useRecoilState(chatRoomUUIDAtom);

  //쿼리파라미터 검색결과
  useEffect(() => {
    const query = {
      keyword: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/chat/search",
      query: query,
    });

    router.push(url);
  }, [debouncedValue]);

  //단어가 바뀔 때 마다 검색하여 요청
  useEffect(() => {
    if (searchValue) {
      getSearchChatRoom(searchValue, 3).then((r: ChatRoomsAxiosResponseType) => {
        // console.log(r?.data.data.chatRooms)
        setSearchChatRoomResults(r?.data.data.chatRooms);
      });
      getSearchChatMessage(searchValue, "latest", 5).then((r: ChatRoomMessagesAxiosResponseType) => {
        // console.log(r?.data.data.chatHistory)
        setSearchChatMessageResults(r?.data.data.chatHistory);
      });
      getSearchFollowings(searchValue).then((r: AllDoomzListAxiosResponseType) => {
        // console.log(r?.data.data.memberProfiles)
        setSearchFollowingResults(r?.data.data.memberProfiles);
      });
    }
  }, [searchValue]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const period = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시를 12시로 변환

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${period} ${hours}:${formattedMinutes}`;
  };

  const renderSearchResults = (type: "전체" | "팔로잉" | "채팅방" | "메시지") => {
    switch (type) {
      case "전체":
        return (
          <div className={"mt-[120px] flex flex-col gap-y-8 px-5"}>
            <section>
              <div className={"flex justify-between"}>
                <div className={"text-h3 font-semibold"}>팔로잉</div>
                <button
                  className={
                    "flex gap-x-1 text-h5 text-primaryMid rounded-full border border-primaryMid py-1 px-3 items-center"
                  }
                  onClick={() => {
                    setType("팔로잉");
                  }}>
                  더보기
                  <ArrowIcon />
                </button>
              </div>
              <div className={"overflow-x-scroll pt-[12px] flex flex-col gap-y-3"}>
                <div className={"flex gap-x-3"}>
                  {searchFollowingResults?.map((searchFollowingResult) => {
                    return (
                      <div
                        onClick={() => {
                          setMemberIdState(searchFollowingResult.memberId);
                          setChatRoomUUID(searchFollowingResult.roomUUID);
                          setIsProfileOpen(true);
                        }}
                        key={searchFollowingResult.memberId}
                        className={"flex flex-col gap-y-1 justify-center items-center"}>
                        {searchFollowingResult.profileUrl ? (
                          <img
                            src={searchFollowingResult.profileUrl}
                            alt={searchFollowingResult.profileUrl}
                            className={"object-cover rounded-full w-[48px] h-[48px]"}
                          />
                        ) : (
                          <ProfileIcon />
                        )}
                        <div className={"text-h6 text-gray3"}>{searchFollowingResult.nickname}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <section>
              <div className={"flex justify-between"}>
                <div className={"text-h3 font-semibold"}>채팅방</div>
                <button
                  className={
                    "flex gap-x-1 text-h5 text-primaryMid rounded-full border border-primaryMid py-1 px-3 items-center"
                  }
                  onClick={() => {
                    setType("채팅방");
                  }}>
                  더보기
                  <ArrowIcon />
                </button>
              </div>
              <div className={"mt-3"}>
                {searchChatRoomResults?.map((searchChatRoomResult) => {
                  return (
                    <div
                      onClick={() => {
                        setMemberIdState(searchChatRoomResult.memberId);
                        setChatRoomUUID(searchChatRoomResult.roomUUID);
                        router.push(`/chat/${searchChatRoomResult.roomId}`);
                      }}
                      key={searchChatRoomResult.roomId}
                      className={"my-3 flex justify-between"}>
                      <div className={"flex gap-x-3"}>
                        <img
                          className={"rounded-full w-[48px] h-[48px]"}
                          src={searchChatRoomResult.memberProfileUrl}
                          alt={searchChatRoomResult.memberProfileUrl}
                        />
                        <div className={"flex flex-col gap-y-1"}>
                          <div className={"text-h4 font-semibold"}>{searchChatRoomResult.memberNickname}</div>
                          <div className={"text-h5 text-gray5"}>{searchChatRoomResult.lastMessage}</div>
                        </div>
                      </div>
                      <div className={"flex flex-col items-end gap-y-1"}>
                        <div className={"text-gray3 text-h6"}>{formatTime(searchChatRoomResult.lastMessageTime)}</div>
                        {searchChatRoomResult.unReadCount === 0 ? null : (
                          <div className={"rounded-full bg-primary w-fit px-2 text-white text-h6 py-[2px]"}>
                            {searchChatRoomResult.unReadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            <section>
              <div className={"flex justify-between"}>
                <div className={"text-h3 font-semibold"}>메시지</div>
                <button
                  className={
                    "flex gap-x-1 text-h5 text-primaryMid rounded-full border border-primaryMid py-1 px-3 items-center"
                  }
                  onClick={() => {
                    setType("메시지");
                  }}>
                  더보기
                  <ArrowIcon />
                </button>
              </div>
              <div className={"mt-3"}>
                {searchChatMessageResults.map((searchChatMessageResult) => {
                  return (
                    <div
                      onClick={async () => {
                        setMemberIdState(searchChatMessageResult.memberId);
                        setChatRoomUUID(searchChatMessageResult.roomUUID);
                        router.push(`/chat/${searchChatMessageResult.roomId}`);
                      }}
                      key={searchChatMessageResult.memberId}
                      className={"my-3 flex justify-between"}>
                      <div className={"flex gap-x-3"}>
                        <img
                          className={"rounded-full w-[48px] h-[48px]"}
                          src={searchChatMessageResult.memberProfileUrl}
                          alt={searchChatMessageResult.memberProfileUrl}
                        />
                        <div className={"flex flex-col gap-y-1"}>
                          <div className={"text-h4 font-semibold"}>{searchChatMessageResult.memberNickname}</div>
                          <div className={"text-h5 text-gray5"}>{searchChatMessageResult.chatMessage}</div>
                        </div>
                      </div>
                      <div className={"flex flex-col items-end gap-y-1"}>
                        <div className={"text-gray3 text-h6"}>{formatTime(searchChatMessageResult.sentTime)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        );
      case "팔로잉":
        return (
          <div className={"mt-[120px] flex flex-col gap-y-8 px-5"}>
            <section>
              <div className={"flex justify-between"}>
                <div className={"text-h3 font-semibold"}>팔로잉</div>
                <button
                  className={
                    "flex gap-x-1 text-h5 text-primaryMid rounded-full border border-primaryMid py-1 px-3 items-center"
                  }
                  onClick={() => {
                    setType("팔로잉");
                  }}>
                  더보기
                  <ArrowIcon />
                </button>
              </div>
              <div className={"overflow-x-scroll pt-[12px] flex flex-col gap-y-3"}>
                <div className={"flex gap-x-3"}>
                  {searchFollowingResults?.map((searchFollowingResult) => {
                    return (
                      <div
                        onClick={() => {
                          setMemberIdState(searchFollowingResult.memberId);
                          setChatRoomUUID(searchFollowingResult.roomUUID);
                          setIsProfileOpen(true);
                        }}
                        key={searchFollowingResult.memberId}
                        className={"flex flex-col gap-y-1 justify-center items-center"}>
                        {searchFollowingResult.profileUrl ? (
                          <img
                            src={searchFollowingResult.profileUrl}
                            alt={searchFollowingResult.profileUrl}
                            className={"object-cover rounded-full w-[48px] h-[48px]"}
                          />
                        ) : (
                          <ProfileIcon />
                        )}
                        <div className={"text-h6 text-gray3"}>{searchFollowingResult.nickname}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        );
      case "채팅방":
        return (
          <div className={"mt-[120px] flex flex-col gap-y-8 px-5"}>
            <section>
              <div className={"flex justify-between"}>
                <div className={"text-h3 font-semibold"}>채팅방</div>
              </div>
              <div className={"mt-3"}>
                {searchChatRoomResults?.map((searchChatRoomResult) => {
                  return (
                    <div
                      onClick={() => {
                        setMemberIdState(searchChatRoomResult.memberId);
                        setChatRoomUUID(searchChatRoomResult.roomUUID);
                        router.push(`/chat/${searchChatRoomResult.roomId}`);
                      }}
                      key={searchChatRoomResult.roomId}
                      className={"my-3 flex justify-between"}>
                      <div className={"flex gap-x-3"}>
                        <img
                          className={"rounded-full w-[48px] h-[48px]"}
                          src={searchChatRoomResult.memberProfileUrl}
                          alt={searchChatRoomResult.memberProfileUrl}
                        />
                        <div className={"flex flex-col gap-y-1"}>
                          <div className={"text-h4 font-semibold"}>{searchChatRoomResult.memberNickname}</div>
                          <div className={"text-h5 text-gray5"}>{searchChatRoomResult.lastMessage}</div>
                        </div>
                      </div>
                      <div className={"flex flex-col items-end gap-y-1"}>
                        <div className={"text-gray3 text-h6"}>{formatTime(searchChatRoomResult.lastMessageTime)}</div>
                        {searchChatRoomResult.unReadCount === 0 ? null : (
                          <div className={"rounded-full bg-primary w-fit px-2 text-white text-h6 py-[2px]"}>
                            {searchChatRoomResult.unReadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        );
      case "메시지":
        return (
          <div className={"mt-[120px] flex flex-col gap-y-8 px-5"}>
            <section>
              <div className={"flex justify-between"}>
                <div className={"text-h3 font-semibold"}>메시지</div>
                <button
                  className={
                    "flex gap-x-1 text-h5 text-primaryMid rounded-full border border-primaryMid py-1 px-3 items-center"
                  }
                  onClick={() => {
                    setType("메시지");
                  }}>
                  더보기
                  <ArrowIcon />
                </button>
              </div>
              <div className={"mt-3"}>
                {searchChatMessageResults.map((searchChatMessageResult) => {
                  return (
                    <div
                      onClick={async () => {
                        setMemberIdState(searchChatMessageResult.memberId);
                        setChatRoomUUID(searchChatMessageResult.roomUUID);
                        router.push(`/chat/${searchChatMessageResult.roomId}`);
                      }}
                      key={searchChatMessageResult.memberId}
                      className={"my-3 flex justify-between"}>
                      <div className={"flex gap-x-3"}>
                        <img
                          className={"rounded-full w-[48px] h-[48px]"}
                          src={searchChatMessageResult.memberProfileUrl}
                          alt={searchChatMessageResult.memberProfileUrl}
                        />
                        <div className={"flex flex-col gap-y-1"}>
                          <div className={"text-h4 font-semibold"}>{searchChatMessageResult.memberNickname}</div>
                          <div className={"text-h5 text-gray5"}>{searchChatMessageResult.chatMessage}</div>
                        </div>
                      </div>
                      <div className={"flex flex-col items-end gap-y-1"}>
                        <div className={"text-gray3 text-h6"}>{formatTime(searchChatMessageResult.sentTime)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className={"relative"}>
      {isProfileOpen ? <ProfileModal memberId={memberIdState} setIsOpenProfileModal={setIsProfileOpen} /> : null}
      <SearchInput setSearchValue={setSearchValue} />
      <SearchMenu type={type} setType={setType} />
      {renderSearchResults(type)}
    </div>
  );
};
export default ChatSearch;

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" {...props}>
    <path
      stroke="#FF7E8D"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.664 6.14H.806M11.194 6.14l-4-5M8.1 9.803l3.094-3.663"
    />
    <path fill="#FF7E8D" d="M6.684 10.96a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0" />
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
