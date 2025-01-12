import { useEffect, useState } from "react";
import * as React from "react";

import Paging from "@/components/common/Paging";
import ApplicationReceivedProfile from "@/components/room-mate/ApplicationReceivedProfile";
import useMatchingRequests from "@/lib/hooks/useMatchingRequests";

const ApplicationReceivedList = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { matchingRequests, mutate } = useMatchingRequests("received", pageNumber);

  return (
    <>
      <main className={"px-5"}>
        <section className={"mt-[22px] flex flex-col gap-y-2"}>
          {matchingRequests &&
            matchingRequests.map((matchingRequest) => {
              return matchingRequest.data.data.memberProfiles.map((memberProfile) => {
                return (
                  <ApplicationReceivedProfile
                    key={memberProfile.memberId}
                    memberId={memberProfile.memberId}
                    profileUrl={memberProfile.profileUrl}
                    isMatchable={memberProfile.isMatchable}
                    nickname={memberProfile.nickname}
                    mutate={mutate}
                  />
                );
              });
            })}
        </section>
      </main>

      <div className={"h-[50px]"} />

      {/* 페이징 */}
      <section className={"fixed bottom-0 bg-white py-2 w-full"}>
        <Paging
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          totalPageNumber={matchingRequests && matchingRequests[0]?.data.data.totalPageNumber}
        />
      </section>
    </>
  );
};
export default ApplicationReceivedList;
