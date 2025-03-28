"use client";

//@ts-ignore
import { EventSourcePolyfill } from "event-source-polyfill";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AlarmComponent from "@/components/alarm/AlarmComponent";
import Header from "@/components/common/Header";
import Follow from "@/components/mypage/Follow";
import { putAlarm } from "@/lib/api/alarm";
import useAlarms from "@/lib/hooks/useAlarms";

const Alarm = () => {
  const { alarms } = useAlarms();
  const [notificationIds, setNotificationIds] = useState<number[]>([]);
  const router = useRouter();
  const [isFollowPageOpen, setIsFollowPageOpen] = useState(false);

  useEffect(() => {
    const connect = () => {
      if (typeof window === "undefined") {
        console.error("Cannot access localStorage on the server.");
        return;
      }
      const accessToken = "Bearer " + localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token is missing.");
        return;
      }

      const eventSource = new EventSourcePolyfill("http://13.124.186.20:8080/api/subscribe", {
        headers: {
          AccessToken: accessToken,
        },
      });

      console.log("eventSource", eventSource);

      eventSource.onopen = () => {
        console.log("Connection opened.");
      };

      eventSource.onerror = (error: any) => {
        console.error("EventSource error:", error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    };

    connect();
  }, []);

  useEffect(() => {
    // 모든 alarms의 notifications에서 notificationId 추출
    if (alarms) {
      const newIds = alarms
        .flatMap((alarm) => alarm.data.data.notifications.map((notif) => notif.notificationId))
        .filter((id) => !notificationIds.includes(id)); // 이미 존재하는 id는 제외

      if (newIds.length > 0) {
        setNotificationIds((prevIds) => [...prevIds, ...newIds]); // 새로운 id만 추가
      }
    }
  }, [alarms, notificationIds]); // alarms나 notificationIds가 변경될 때 실행

  const onBack = () => {
    putAlarm(notificationIds).then(() => {
      router.back();
    });
  };

  return (
    <>
      {isFollowPageOpen ? (
        <Follow isFollowPageOpen={isFollowPageOpen} setIsFollowPageOpen={setIsFollowPageOpen} />
      ) : (
        <main>
          <Header headerType={"dynamic"} title={"알림"} onBack={onBack} />
          <div className={"h-[60px]"} />
          <div className={"flex flex-col gap-y-[15px] px-5 mt-[24px]"}>
            {alarms &&
              alarms.map((alarmData) => {
                return alarmData?.data.data.notifications.map((notification) => {
                  return (
                    <AlarmComponent
                      key={notification.notificationId}
                      articleTitle={notification.articleTitle}
                      type={notification.type}
                      createdAt={notification.createdAt}
                      sender={notification.sender}
                      targetId={notification.targetId}
                      isRead={notification.isRead}
                      notificationIds={notificationIds}
                      setIsFollowPageOpen={setIsFollowPageOpen}
                    />
                  );
                });
              })}
          </div>
        </main>
      )}
    </>
  );
};
export default Alarm;
