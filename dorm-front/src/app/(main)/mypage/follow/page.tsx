"use client";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { SVGProps, useEffect } from "react";
import * as React from "react";
import { useState } from "react";

import Header from "@/components/common/Header";
import Paging from "@/components/common/Paging";
import FollowProfile from "@/components/mypage/FollowProfile";
import MyPageFollowMenu from "@/components/mypage/MyPageFollowMenu";
import useDebounce from "@/hooks/useDebounce";
import { getSearchFollowers, getSearchFollowings } from "@/lib/api/mypage";
import useMyFollowers from "@/lib/hooks/useMyFollowers";
import useMyFollowings from "@/lib/hooks/useMyFollowings";
import { FollowSearchResponseType, FollowType, MemberProfile } from "@/types/mypage/type";

const MyPageFollow = () => {
  const [followType, setFollowType] = useState<FollowType>("팔로워");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MemberProfile[]>();
  const [followerPageNumber, setFollowerPageNumber] = useState<number>(0);
  const [followingPageNumber, setFollowingPageNumber] = useState<number>(0);
  const debouncedValue = useDebounce<string>(searchValue, 100);
  const router = useRouter();
  const { followings } = useMyFollowings(0);
  const { followers } = useMyFollowers(0);

  //쿼리파라미터 검색결과
  useEffect(() => {
    const query = {
      keyword: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/mypage/follow",
      query: query,
    });

    router.push(url);
  }, [debouncedValue]);

  // 팔로워 검색일 경우, 팔로잉 검색일 경우 따로 검색되도록
  useEffect(() => {
    if (followType === "팔로워") {
      getSearchFollowers(searchValue).then((r: FollowSearchResponseType) => {
        if (r && r.code === 200) {
          setSearchResults(r.data.MemberProfiles);
        }
      });
    } else {
      getSearchFollowings(searchValue).then((r: FollowSearchResponseType) => {
        if (r && r.code === 200) {
          setSearchResults(r?.data.MemberProfiles);
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

  // 팔로우 페이징 이전 버튼 클릭시
  const handlerBeforeFollowerPageNumber = () => {
    if (followerPageNumber === 0) {
      setFollowerPageNumber(0);
    } else {
      setFollowerPageNumber(followerPageNumber - 1);
    }
  };

  // 팔로우 페이징 다음 버튼 클릭시
  const handlerNextFollowerPageNumber = () => {
    if (followers && followerPageNumber >= followers?.totalPageNumber - 1) {
      setFollowerPageNumber(followers?.totalPageNumber - 1);
    } else {
      setFollowerPageNumber(followerPageNumber + 1);
    }
  };

  // 팔로잉 페이징 이전 버튼 클릭시
  const handlerBeforeFollowingPageNumber = () => {
    if (followingPageNumber === 0) {
      setFollowingPageNumber(0);
    } else {
      setFollowingPageNumber(followingPageNumber - 1);
    }
  };

  // 팔로잉 페이징 다음 버튼 클릭시
  const handlerNextFollowingPageNumber = () => {
    if (followings && followingPageNumber >= followings?.totalPageNumber - 1) {
      setFollowingPageNumber(followings?.totalPageNumber - 1);
    } else {
      setFollowingPageNumber(followingPageNumber + 1);
    }
  };

  //뒤로가기
  const onBack = () => {
    router.push("/mypage");
  };

  return (
    <div className={"min-h-screen"}>
      <Header
        headerType={"dynamic"}
        title={followType === "팔로워" ? "팔로워 목록" : "팔로잉 목록"}
        onBack={onBack}></Header>
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
                return (
                  <FollowProfile
                    key={memberProfile.memberId}
                    profileUrl={memberProfile.profileUrl}
                    nickname={memberProfile.nickname}
                    memberId={memberProfile.memberId}></FollowProfile>
                );
              })
            : followType === "팔로워"
              ? followers?.memberProfiles.map((memberProfile, index) => {
                  return (
                    <FollowProfile
                      key={memberProfile.memberId}
                      profileUrl={memberProfile.profileUrl}
                      nickname={memberProfile.nickname}
                      memberId={memberProfile.memberId}></FollowProfile>
                  );
                })
              : followings?.memberProfiles.map((memberProfile, index) => {
                  return (
                    <FollowProfile
                      key={memberProfile.memberId}
                      profileUrl={memberProfile.profileUrl}
                      nickname={memberProfile.nickname}
                      memberId={memberProfile.memberId}></FollowProfile>
                  );
                })}
        </div>
      </div>

      {/* 페이징 */}
      {!searchValue ? (
        followType == "팔로워" ? (
          <Paging
            setPageNumber={setFollowerPageNumber}
            totalPageNumber={followers?.totalPageNumber}
            handlerBeforeButton={handlerBeforeFollowerPageNumber}
            pageNumber={followerPageNumber}
            handlerNextButton={handlerNextFollowerPageNumber}
          />
        ) : (
          <Paging
            setPageNumber={setFollowingPageNumber}
            handlerNextButton={handlerNextFollowingPageNumber}
            pageNumber={followingPageNumber}
            totalPageNumber={followings?.totalPageNumber}
            handlerBeforeButton={handlerBeforeFollowingPageNumber}
          />
        )
      ) : null}
    </div>
  );
};
export default MyPageFollow;

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
