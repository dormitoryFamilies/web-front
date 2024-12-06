import useSWRInfinite from "swr/infinite";

import { swrGetFetcher } from "@/lib/axios";
import { VerifyMembersType } from "@/types/onboarding/type";

const getKey = (pageIndex: number, previousPageData: VerifyMembersType | null) => {
  // 초기 요청 또는 이전 페이지 데이터가 없을 때
  if (pageIndex === 0) {
    return `/api/verify/members?page=${pageIndex}&size=10`;
  }

  // 이전 페이지 데이터가 없으면 종료
  if (!previousPageData) return null;

  // 이전 페이지에 더 많은 데이터가 있으면 다음 페이지 요청
  if (previousPageData?.data.totalPages === previousPageData?.data.currentPage) {
    return `/api/verify/members?page=${pageIndex}&size=10`;
  }

  // 이전 페이지에 더 이상 데이터가 없으면 null 반환
  return null;
};
const useVerifyMembers = () => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<VerifyMembersType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((noNonVerifiedStudentCard) => noNonVerifiedStudentCard).flat() : null;

  return {
    nonVerifiedStudentCardList: parseResultList ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    size: size,
    setSize: setSize,
  };
};
export default useVerifyMembers;
