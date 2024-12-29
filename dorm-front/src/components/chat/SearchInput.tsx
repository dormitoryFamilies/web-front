import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction, SVGProps } from "react";
import * as React from "react";

interface Props {
  setSearchValue: Dispatch<SetStateAction<string>>;
}
const SearchInput = (props: Props) => {
  const { setSearchValue } = props;
  const router = useRouter();

  return (
    <div className={"fixed top-0 flex px-5 justify-between items-center gap-x-4 py-[10px] w-full bg-white"}>
      <ArrowIcon
        onClick={() => {
          router.push("/chat");
        }}
      />
      <div className={"bg-gray0 rounded-full px-3 py-2 w-full"}>
        <input
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          className={"w-full placeholder:text-gray3 bg-gray0 outline-none"}
          placeholder={"검색어를 입력해주세요."}
        />
      </div>
    </div>
  );
};
export default SearchInput;

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      fill="#191919"
      fillRule="evenodd"
      d="M7.234.345.178 9.603a.82.82 0 0 0 .014 1.036l5.457 6.779a.818.818 0 0 0 1.275-1.026l-4.397-5.46h16.645a.818.818 0 1 0 0-1.637H2.471l6.065-7.958A.818.818 0 0 0 7.234.345m.67 19.632c.487 0 .882-.415.882-.927s-.395-.927-.883-.927-.883.415-.883.927.395.927.883.927"
      clipRule="evenodd"
    />
  </svg>
);
