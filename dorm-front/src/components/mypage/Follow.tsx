import * as React from "react";
import { SVGProps, useEffect, useState } from "react";

import Header from "@/components/common/Header";
import Paging from "@/components/common/Paging";
import MyPageFollowMenu from "@/components/mypage/MyPageFollowMenu";
import RoommateMatchListProfile from "@/components/room-mate/RoommateMatchListProfile";
import { getSearchFollowers, getSearchFollowings } from "@/lib/api/mypage";
import useMyFollowers from "@/lib/hooks/useMyFollowers";
import useMyFollowings from "@/lib/hooks/useMyFollowings";
import { FollowingAxiosResponseType, FollowType, MemberProfile } from "@/types/mypage/type";

interface Props {
  isFollowPageOpen: boolean;
  setIsFollowPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Follow = (props: Props) => {
  const { isFollowPageOpen, setIsFollowPageOpen } = props;
  const [followType, setFollowType] = useState<FollowType>("팔로워");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MemberProfile[]>();
  const [followerPageNumber, setFollowerPageNumber] = useState<number>(0);
  const [followingPageNumber, setFollowingPageNumber] = useState<number>(0);
  const { followings, myFollowingsMutate } = useMyFollowings(followingPageNumber);
  const { followers, myFollowersMutate } = useMyFollowers(followerPageNumber);

  // 팔로워 검색일 경우, 팔로잉 검색일 경우 따로 검색되도록
  useEffect(() => {
    if (searchValue && followType === "팔로워") {
      getSearchFollowers(searchValue).then((r) => {
        if (r && r.data.code === 200) {
          setSearchResults(r.data.data.memberProfiles);
        }
      });
    } else if (searchValue && followType === "팔로잉") {
      getSearchFollowings(searchValue).then((r: FollowingAxiosResponseType) => {
        if (r && r.data.code === 200) {
          setSearchResults(r?.data.data.memberProfiles);
        }
      });
    }
  }, [searchValue]);

  // 검색결과가 없을 경우 검색결과 state를 초기화
  useEffect(() => {
    if (!searchValue) {
      setSearchResults(undefined);
    }
  }, [searchValue]);

  //뒤로가기
  const onBack = () => {
    setIsFollowPageOpen(!isFollowPageOpen);
  };

  return (
    <div className={"z-10 fixed min-h-screen bg-white w-full"}>
      <Header headerType={"dynamic"} title={followType === "팔로워" ? "팔로워 목록" : "팔로잉 목록"} onBack={onBack} />
      <div className={"h-[60px]"} />
      <MyPageFollowMenu
        followType={followType}
        setFollowType={setFollowType}
        setSearchValue={setSearchValue}
        setSearchResults={setSearchResults}
      />

      {/* 검색창 */}
      <div className={"mt-4 flex flex-col gap-y-4 px-5"}>
        {followType === "팔로워" ? (
          <div className={"flex gap-x-2 px-4 py-2 rounded-full bg-gray0 items-center"}>
            <FollowSearchIcon />
            <input
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              value={searchValue}
              className={"placeholder:text-gray3 outline-none bg-gray0"}
              placeholder={"팔로워 검색"}
            />
          </div>
        ) : (
          <div className={"flex gap-x-2 px-4 py-2 rounded-full bg-gray0 items-center"}>
            <FollowSearchIcon />
            <input
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className={"placeholder:text-gray3 outline-none bg-gray0"}
              placeholder={"팔로잉 검색"}
            />
          </div>
        )}

        {/* 프로필 */}
        <div className={"flex flex-col gap-y-3"}>
          {searchResults
            ? searchResults.map((memberProfile) => {
                return <RoommateMatchListProfile key={memberProfile.memberId} memberId={memberProfile.memberId} />;
              })
            : !searchResults && followType === "팔로워"
              ? followers?.data.memberProfiles.map((memberProfile, index) => {
                  return (
                    <RoommateMatchListProfile
                      key={memberProfile.memberId}
                      memberId={memberProfile.memberId}
                      allDoomzListMutate={myFollowersMutate}
                    />
                  );
                })
              : !searchResults && followType === "팔로잉"
                ? followings?.data.memberProfiles.map((memberProfile, index) => {
                    return (
                      <RoommateMatchListProfile
                        key={memberProfile.memberId}
                        memberId={memberProfile.memberId}
                        allDoomzListMutate={myFollowingsMutate}
                      />
                    );
                  })
                : null}
        </div>
      </div>

      <div className={"h-[50px]"} />
      {/* 페이징 */}
      <section className={"fixed bottom-0 bg-white w-full py-2"}>
        {!searchValue ? (
          followType == "팔로워" ? (
            <Paging
              setPageNumber={setFollowerPageNumber}
              totalPageNumber={followers?.data.totalPageNumber}
              pageNumber={followerPageNumber}
            />
          ) : (
            <Paging
              setPageNumber={setFollowingPageNumber}
              pageNumber={followingPageNumber}
              totalPageNumber={followings?.data.totalPageNumber}
            />
          )
        ) : null}
      </section>
    </div>
  );
};
export default Follow;

const FollowSearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none" {...props}>
    <g stroke="#BEBEBE" clipPath="url(#a)">
      <path
        fill="#000"
        d="M12.504 6.018A5.516 5.516 0 0 0 6.99.503a5.516 5.516 0 0 0-5.514 5.515 5.516 5.516 0 0 0 5.514 5.514 5.516 5.516 0 0 0 5.515-5.514Zm-11.032 0a5.518 5.518 0 1 1 11.036 0 5.518 5.518 0 0 1-11.036 0Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m12.131 11.16 4.34 4.339" />
      <path fill="#BEBEBE" d="M9.405 4.018a.169.169 0 1 1-.338 0 .169.169 0 0 1 .338 0Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.972 0h16v16h-16z" />
      </clipPath>
    </defs>
  </svg>
);
