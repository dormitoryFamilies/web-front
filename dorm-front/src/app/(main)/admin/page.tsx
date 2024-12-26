"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Header from "@/components/common/Header";
import { putMemberApproval, putMemberRejection } from "@/lib/api/onboarding";
import useVerifyMembers from "@/lib/hooks/useVerifyMembers";
import { VerifyMembersResponseType } from "@/types/onboarding/type";

const AdminPage = () => {
  const [isOpenStudentCardUrl, setIsOpenStudentCardUrl] = useState(false);
  const [studentCardIdUrl, setStudentCardIdUrl] = useState("");
  const [ref, inView] = useInView();
  const { nonVerifiedStudentCardList, setSize, mutate } = useVerifyMembers();

  // 전체
  const getMoreItem = useCallback(async () => {
    if (nonVerifiedStudentCardList) {
      await setSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  return (
    <div>
      {isOpenStudentCardUrl ? (
        <Image alt={studentCardIdUrl} src={studentCardIdUrl} width={300} height={300}></Image>
      ) : null}
      <Header headerType={"dynamic"} title={"학생증 승인"} />
      <section className={"flex flex-col gap-y-3 mt-10 px-5 py-3"}>
        {nonVerifiedStudentCardList && nonVerifiedStudentCardList.length !== 0
          ? nonVerifiedStudentCardList.map((nonVerifiedStudentCardResponse: VerifyMembersResponseType) => {
              return nonVerifiedStudentCardResponse?.data.data.nonVerifiedStudentCards.map((nonVerifiedStudentCard) => {
                return (
                  <div ref={ref} key={nonVerifiedStudentCard.memberId} className={"border-b border-gray1 py-4"}>
                    <div
                      className={"flex "}
                      onClick={() => {
                        setStudentCardIdUrl(nonVerifiedStudentCard.studentCardUrl);
                        setIsOpenStudentCardUrl(true);
                      }}>
                      <div
                        onClick={() => {
                          setIsOpenStudentCardUrl(true);
                        }}
                        className={"flex flex-col text-h5"}>
                        <div className={"flex"}>
                          <span>{nonVerifiedStudentCard.name}</span>
                          <span>/</span>
                          <span>{nonVerifiedStudentCard.Department}</span>
                        </div>
                        <span>{nonVerifiedStudentCard.studentNumber}</span>
                      </div>
                    </div>

                    <div className={"flex gap-x-3 justify-end"}>
                      <button
                        onClick={() => {
                          putMemberApproval(nonVerifiedStudentCard.memberId).then(() => {
                            mutate();
                          });
                        }}
                        className={"border border-gray1 text-gray5 py-[6px] rounded-full px-5"}>
                        승인
                      </button>
                      <button
                        onClick={() => {
                          putMemberRejection(nonVerifiedStudentCard.memberId).then(() => {
                            mutate();
                          });
                        }}
                        className={"bg-primary text-white py-[6px] rounded-full px-5"}>
                        거부
                      </button>
                    </div>
                  </div>
                );
              });
            })
          : null}
      </section>
    </div>
  );
};
export default AdminPage;
