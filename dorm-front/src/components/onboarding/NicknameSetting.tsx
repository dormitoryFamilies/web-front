import { useRouter } from "next/navigation";
import qs from "query-string";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as React from "react";

import Header from "@/components/common/Header";
import useDebounce from "@/hooks/useDebounce";
import { getSearchDuplicateNickName } from "@/lib/api/onboarding";
import { StepOnboarding } from "@/types/onboarding/type";

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
    await getSearchDuplicateNickName(searchValue).then((r) => console.log("검색 결과", r));
    setIsCheckDuplicateButton(!isCheckDuplicateButton);
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
          <div className={"relative flex justify-between rounded-[12px] border-[1px] border-gray1 py-3 px-4 w-full"}>
            <input
              placeholder={"닉네임을 입력해주세요"}
              maxLength={20}
              className={"focus:outline-0 w-full placeholder focus:placeholder-top"}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCount(e.target.value.length);
              }}></input>
            <div className={"absolute right-3 text-gray4 text-h5"}>
              <span className="font-semibold">{count}</span>/20
            </div>
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
        <button
          onClick={() => {
            onNext("SchoolInfoSetting");
          }}
          className={"absolute w-[90%] bottom-5 text-white text-h5 bg-gray3 rounded-full py-[14px]"}>
          다음
        </button>
      </div>
    </>
  );
};
export default NicknameSetting;
