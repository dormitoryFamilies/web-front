import { useRouter } from "next/navigation";
import qs from "query-string";
import type { SVGProps } from "react";
import * as React from "react";
import { useEffect, useState } from "react";

import Paging from "@/components/common/Paging";
import RoommateMatchListProfile from "@/components/room-mate/RoommateMatchListProfile";
import useDebounce from "@/hooks/useDebounce";
import { getAllDoomzList } from "@/lib/api/room-mate";
import useRoomMateAllDoomzList from "@/lib/hooks/useRoomMateAllDoomzList";
import { AllDoomzListAxiosResponseType, MemberProfileType } from "@/types/room-mate/type";

interface Props {}
const AllDoomzList = (props: Props) => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { allDoomzList, mutate } = useRoomMateAllDoomzList(pageNumber);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MemberProfileType[]>();
  const debouncedValue = useDebounce<string>(searchValue, 100);

  //쿼리파라미터 검색결과
  useEffect(() => {
    const query = {
      keyword: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/room-mate/application-list",
      query: query,
    });

    router.push(url);
  }, [debouncedValue]);

  //단어가 바뀔 때 마다 검색하여 요청
  useEffect(() => {
    if (searchValue) {
      getAllDoomzList(searchValue).then((r: AllDoomzListAxiosResponseType) => {
        console.log("r", r);
        setSearchResults(r?.data.data.memberProfiles);
      });
    }
  }, [searchValue]);

  useEffect(() => {
    console.log("allDoomzList", allDoomzList);
  }, [allDoomzList]);

  return (
    <>
      <main className={"px-5"}>
        {/* 검색창 */}
        <section className={"mt-[20px] flex gap-x-2 items-center bg-gray0 rounded-full w-full py-2 px-4 "}>
          <SearchIcon />
          <input
            placeholder={"검색"}
            className={"bg-gray0 w-full outline-none placeholder:text-gray3 text-gray5"}
            onChange={(e) => {
              if (setSearchValue) {
                setSearchValue(e.target.value);
              }
            }}
          />
        </section>

        {/* 검색 결과 */}
        {searchResults && searchValue !== "" ? (
          <section className={"flex flex-col gap-y-3 mt-2"}>
            {searchResults &&
              searchResults.map((memberProfile) => {
                return (
                  <RoommateMatchListProfile
                    allDoomzListMutate={mutate}
                    memberId={memberProfile.memberId}
                    key={memberProfile.memberId}
                    isFollowing={memberProfile.isFollowing}
                  />
                );
              })}
          </section>
        ) : (
          <section className={"flex flex-col gap-y-3 mt-2"}>
            {allDoomzList &&
              allDoomzList[0]?.data?.data.memberProfiles.map((memberProfile) => {
                return (
                  <RoommateMatchListProfile
                    allDoomzListMutate={mutate}
                    memberId={memberProfile.memberId}
                    key={memberProfile.memberId}
                    isFollowing={memberProfile.isFollowing}
                  />
                );
              })}
          </section>
        )}
      </main>

      {/* 페이징 */}
      {searchResults && searchValue ? null : (
        <section>
          <Paging
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            totalPageNumber={allDoomzList && allDoomzList[0]?.data.data.totalPageNumber}
          />
        </section>
      )}
    </>
  );
};
export default AllDoomzList;

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <g stroke="#BEBEBE" clipPath="url(#a)">
      <path
        fill="#000"
        d="M11.525 6.018A5.516 5.516 0 0 0 6.011.503 5.516 5.516 0 0 0 .496 6.018a5.516 5.516 0 0 0 5.515 5.514 5.517 5.517 0 0 0 5.514-5.514Zm-11.032 0a5.518 5.518 0 1 1 11.036 0 5.518 5.518 0 0 1-11.036 0Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m11.152 11.16 4.34 4.339" />
      <path fill="#BEBEBE" d="M8.426 4.018a.169.169 0 1 1-.338 0 .169.169 0 0 1 .338 0Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M-.007 0h16v16h-16z" />
      </clipPath>
    </defs>
  </svg>
);
