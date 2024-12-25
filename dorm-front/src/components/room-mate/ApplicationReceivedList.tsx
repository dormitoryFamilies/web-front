import { useEffect, useState } from "react";
import * as React from "react";

import Paging from "@/components/common/Paging";
import ApplicationReceivedProfile from "@/components/room-mate/ApplicationReceivedProfile";
import useMatchingRequests from "@/lib/hooks/useMatchingRequests";

const ApplicationReceivedList = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { matchingRequests, mutate } = useMatchingRequests("received", pageNumber);

  useEffect(() => {
    console.log("matchingRequests", matchingRequests);
  }, [matchingRequests]);

  // 팔로우 페이징 이전 버튼 클릭시
  const handlerBeforePageNumber = () => {
    if (pageNumber === 0) {
      setPageNumber(0);
    } else {
      setPageNumber(pageNumber - 1);
    }
  };

  // 팔로우 페이징 다음 버튼 클릭시
  const handlerNextPageNumber = () => {
    if (matchingRequests && pageNumber >= matchingRequests[0]?.data.data.totalPageNumber - 1) {
      setPageNumber(matchingRequests[0]?.data.data.totalPageNumber - 1);
    } else {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className={"px-5 "}>
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
      {/* 페이징 */}
      <section>
        <Paging
          setPageNumber={setPageNumber}
          handlerNextButton={handlerNextPageNumber}
          pageNumber={pageNumber}
          totalPageNumber={matchingRequests && matchingRequests[0]?.data.data.totalPageNumber}
          handlerBeforeButton={handlerBeforePageNumber}
        />
      </section>
    </div>
  );
};
export default ApplicationReceivedList;