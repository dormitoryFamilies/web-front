import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import ReadBoardAlarmIcon from "@/assets/alarm/ReadBoardAlarmIcon";
import ReadChatAlarmIcon from "@/assets/alarm/ReadChatAlarmIcon";
import ReadMypageAlarmIcon from "@/assets/alarm/ReadMypageAlarmIcon";
import ReadRoomMateAlarmIcon from "@/assets/alarm/ReadRoomMateAlarmIcon";
import UnReadBoardAlarmIcon from "@/assets/alarm/UnReadBoardAlarmIcon";
import UnReadChatAlarmIcon from "@/assets/alarm/UnReadChatAlarmIcon";
import UnReadMypageAlarmIcon from "@/assets/alarm/UnReadMypageAlarmIcon";
import UnReadRoomMateAlarmIcon from "@/assets/alarm/UnReadRoomMateAlarmIcon";
import { putAlarm } from "@/lib/api/alarm";
import { NotificationType } from "@/types/alarm/type";

interface Props {
  type: NotificationType;
  articleTitle: string;
  createdAt: string;
  sender: string;
  targetId: number;
  isRead: boolean;
  notificationIds: number[];
  setIsFollowPageOpen: Dispatch<SetStateAction<boolean>>;
}
const AlarmComponent = (props: Props) => {
  const { type, articleTitle, createdAt, sender, targetId, isRead, notificationIds, setIsFollowPageOpen } = props;
  const router = useRouter();

  const renderUnReadIcon = (type: NotificationType) => {
    switch (type) {
      case "ARTICLE_COMMENT":
        return <UnReadBoardAlarmIcon />;
      case "ARTICLE_REPLY_COMMENT":
        return <UnReadBoardAlarmIcon />;
      case "ARTICLE_WISH":
        return <UnReadBoardAlarmIcon />;
      case "MEMBER_FOLLOW":
        return <UnReadMypageAlarmIcon />;
      case "CHAT":
        return <UnReadChatAlarmIcon />;
      case "MATCHING_WISH":
        return <UnReadRoomMateAlarmIcon />;
      case "MATCHING_REQUEST":
        return <UnReadRoomMateAlarmIcon />;
      case "MATCHING_REJECT":
        return <UnReadRoomMateAlarmIcon />;
      case "MATCHING_ACCEPT":
        return <UnReadRoomMateAlarmIcon />;
    }
  };

  const renderReadIcon = (type: NotificationType) => {
    switch (type) {
      case "ARTICLE_COMMENT":
        return <ReadBoardAlarmIcon />;
      case "ARTICLE_REPLY_COMMENT":
        return <ReadBoardAlarmIcon />;
      case "ARTICLE_WISH":
        return <ReadBoardAlarmIcon />;
      case "MEMBER_FOLLOW":
        return <ReadMypageAlarmIcon />;
      case "CHAT":
        return <ReadChatAlarmIcon />;
      case "MATCHING_WISH":
        return <ReadRoomMateAlarmIcon />;
      case "MATCHING_REQUEST":
        return <ReadRoomMateAlarmIcon />;
      case "MATCHING_REJECT":
        return <ReadRoomMateAlarmIcon />;
      case "MATCHING_ACCEPT":
        return <ReadRoomMateAlarmIcon />;
    }
  };

  const renderTypeContent = (type: NotificationType) => {
    switch (type) {
      case "ARTICLE_COMMENT":
        return "게시판";
      case "ARTICLE_REPLY_COMMENT":
        return "게시판";
      case "ARTICLE_WISH":
        return "게시판";
      case "MEMBER_FOLLOW":
        return "마이페이지";
      case "CHAT":
        return "채팅";
      case "MATCHING_WISH":
        return "룸메 매칭";
      case "MATCHING_REQUEST":
        return "룸메 매칭";
      case "MATCHING_REJECT":
        return "룸메 매칭";
      case "MATCHING_ACCEPT":
        return "룸메 매칭";
    }
  };

  const renderContent = (type: NotificationType) => {
    switch (type) {
      case "ARTICLE_COMMENT":
        return (
          <div className={isRead ? "text-gray3" : "text-black"}>
            <span className={"font-semibold"}>{sender}</span>님이{" "}
            <span className={"font-semibold"}>{articleTitle}</span>에 댓글을 남겼습니다.
          </div>
        );
      case "ARTICLE_REPLY_COMMENT":
        return (
          <div className={isRead ? "text-gray3" : "text-black"}>
            <span className={"font-semibold"}>{sender}</span>님이{" "}
            <span className={"font-semibold"}>{articleTitle}</span>에 대댓글을 남겼습니다.
          </div>
        );
      case "ARTICLE_WISH":
        return (
          <div className={isRead ? "text-gray3" : "text-black"}>
            <span className={"font-semibold"}>{sender}</span>님이{" "}
            <span className={"font-semibold"}>{articleTitle}</span>에 찜하기를 눌렀습니다.
          </div>
        );
      case "MEMBER_FOLLOW":
        return (
          <div className={isRead ? "text-gray3" : "text-black"}>
            <span className={"font-semibold"}>{sender}</span>님이 팔로우했습니다.
          </div>
        );
      case "CHAT":
        return (
          <div className={isRead ? "text-gray3" : "text-black"}>
            <span className={"font-semibold"}>{sender}</span>님이 채팅을 보냈습니다.
          </div>
        );
      case "MATCHING_WISH":
        return (
          <div className={isRead ? "text-gray3" : "text-black"}>
            <span className={"font-semibold"}>{sender}</span>님이 룸메이트 찜을 눌렀습니다.
          </div>
        );
      case "MATCHING_REQUEST":
        return (
          <div className={isRead ? "text-gray3" : "text-black"}>
            <span className={"font-semibold"}>{sender}</span>님이 룸메이트 신청을 보냈습니다.
          </div>
        );
      case "MATCHING_REJECT":
        return (
          <div className={isRead ? "text-gray3" : "text-black"}>
            <span className={"font-semibold"}>{sender}</span>님에게 보낸 룸메이트 신청이 거절되었어요.
          </div>
        );
      case "MATCHING_ACCEPT":
        return (
          <div className={isRead ? "text-gray3" : "text-black"}>
            <span className={"font-semibold"}>{sender}</span>님에게 보낸 룸메이트 신청이 수락되었어요.
          </div>
        );
    }
  };

  const renderRouter = (type: NotificationType) => {
    switch (type) {
      case "ARTICLE_COMMENT":
        return `/board/${targetId}`;
      case "ARTICLE_REPLY_COMMENT":
        return `/board/${targetId}`;
      case "ARTICLE_WISH":
        return "/mypage/interest-list";
      case "CHAT":
        return `/chat/${targetId}`;
      case "MATCHING_WISH":
        return "/mypage/interest-list";
      case "MATCHING_REQUEST":
        return "/room-mate/application-list";
      case "MATCHING_REJECT":
        return "/room-mate/application-list";
      case "MATCHING_ACCEPT":
        return "/room-mate/application-list";
      default:
        return "";
    }
  };

  function formatDate(date: string) {
    const d = new Date(date);
    const now = Date.now();
    const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
    if (diff < 60 * 1) {
      // 1분 미만일땐 방금 전 표기
      //TODO: 몊분 전
      return "방금 전";
    }
    if (diff < 60 * 60 * 24 * 7) {
      // 7일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
      return formatDistanceToNow(d, { addSuffix: true, locale: ko });
    }
    if (diff < 60 * 60 * 24 * 30 * 12) {
      // 1년, 1달 기준
      //TODO: 날짜로 나오게 하는게 좋을 것 같다.
      return formatDistanceToNow(d, { addSuffix: true, locale: ko });
    }
    if (diff > 60 * 60 * 24 * 30 * 12) {
      // 1년 넘어가면
      return format(d, "yy.MM.dd"); // 날짜 포맷
    }
  }

  return (
    <div
      onClick={() => {
        putAlarm(notificationIds).then(() => {
          if (type === "MEMBER_FOLLOW") {
            setIsFollowPageOpen(true);
          } else {
            router.push(renderRouter(type));
          }
        });
      }}
      className={"flex flex-col gap-y-2 p-4 rounded-[16px] border border-gray1"}>
      <div className={"flex justify-between items-center text-h5"}>
        <div className={"flex gap-x-1 items-center text-gray4"}>
          {isRead ? renderReadIcon(type) : renderUnReadIcon(type)}
          {renderTypeContent(type)}
        </div>
        <div className={isRead ? "text-gray4" : "text-black"}>{formatDate(createdAt)}</div>
      </div>
      <div className={"ml-[24px]"}>{renderContent(type)}</div>
    </div>
  );
};
export default AlarmComponent;
