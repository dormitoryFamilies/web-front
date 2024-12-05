import { useRouter } from "next/navigation";
import qs from "query-string";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as React from "react";

import Header from "@/components/common/Header";
import useDebounce from "@/hooks/useDebounce";
import { getSearchDuplicateNickName } from "@/lib/api/onboarding";
import {
  SearchDuplicateNickNameResponseType,
  SearchDuplicateNickNameType,
  StepOnboarding,
} from "@/types/onboarding/type";

interface Props {
  onNext: Dispatch<SetStateAction<StepOnboarding>>;
}

const NicknameSetting = (props: Props) => {
  const { onNext } = props;
  const [count, setCount] = useState(0);
  const [isCheckDuplicateButton, setIsCheckDuplicateButton] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchValue, 100);
  const router = useRouter();
  const [duplicateStatus, setDuplicateStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const query = {
      keyword: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/onboarding",
      query: query,
    });

    router.push(url);
  }, [debouncedValue]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      const response: SearchDuplicateNickNameResponseType = await getSearchDuplicateNickName(searchValue);
      if (response.data.code === 200) {
        setDuplicateStatus(response.data.data.isDuplicated);
      }
    } catch (error) {
      console.error("닉네임 중복 검사 중 오류 발생:", error);
    }
  };

  const onBack = () => {
    router.push("/");
  };

  return (
    <>
      <Header headerType={"dynamic"} title={"프로필 설정"} onBack={onBack}></Header>
      <div className={"h-[60px]"}></div>
      <div className={"mx-5"}>
        {/* process bar*/}
        <div className={"flex items-center justify-center"}>
          <div className={"absolute w-[90%] top-15 h-1 bg-gray1 rounded-full "}>
            <div className={"absolute w-[84px] h-1 rounded-full bg-primaryMid"}></div>
          </div>
        </div>

        <div className={"mt-[32px] text-h2 font-semibold"}>활동하실 닉네임을 입력해주세요.</div>

        {/* 입력창 */}
        <div className={"mt-5 flex gap-x-[3px]"}>
          <div
            className={
              duplicateStatus === null
                ? duplicateStatus
                  ? "relative flex justify-between rounded-[12px] border-[1px] border-point py-3 px-4 w-full"
                  : "relative flex justify-between rounded-[12px] border-[1px] border-gray1 py-3 px-4 w-full"
                : "relative flex justify-between rounded-[12px] border-[1px] border-gray1 py-3 px-4 w-full"
            }>
            <input
              placeholder={"닉네임을 입력해주세요"}
              maxLength={20}
              className={"focus:outline-0 w-full placeholder focus:placeholder-top"}
              onChange={(e) => {
                setDuplicateStatus(null);
                setSearchValue(e.target.value);
                setCount(e.target.value.length);
              }}></input>
            {duplicateStatus === null ? (
              <div className={"absolute right-3 text-gray4 text-h5"}>
                <span className="font-semibold">{count}</span>/20
              </div>
            ) : duplicateStatus ? (
              <div className={"absolute right-3 text-gray4 text-h5"}>
                <span className="font-semibold">{count}</span>/20
              </div>
            ) : (
              <div className={"absolute right-3 text-black text-h5 mt-1"}>
                <CheckIcon />
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            className={
              "flex flex-col flex-shrink-0 justify-center items-center bg-gray3 text-white text-h5 rounded-[12px] px-[18px] py-[15px]"
            }>
            중복확인
          </button>
        </div>
        {duplicateStatus === null ? null : duplicateStatus ? (
          <div className={"mt-2 py-1 flex justify-center items-center bg-primaryLight rounded-[12px] text-primaryMid"}>
            사용 불가능한 닉네임이에요. 다시 입력해주세요.
          </div>
        ) : (
          <div className={"mt-2 py-1 flex justify-center items-center bg-primaryLight rounded-[12px] text-primaryMid"}>
            사용 가능한 닉네임이에요.
          </div>
        )}
        <button
          disabled={duplicateStatus === null ? true : duplicateStatus}
          onClick={() => {
            onNext("SchoolInfoSetting");
          }}
          className={
            duplicateStatus === null
              ? "absolute w-[90%] bottom-5 text-white text-h5 bg-gray3 rounded-full py-[14px]"
              : duplicateStatus
                ? "absolute w-[90%] bottom-5 text-white text-h5 bg-gray3 rounded-full py-[14px]"
                : "absolute w-[90%] bottom-5 text-white text-h5 bg-primary rounded-full py-[14px]"
          }>
          다음
        </button>
      </div>
    </>
  );
};
export default NicknameSetting;
