import type { SVGProps } from "react";
import * as React from "react";
const RequirementBanner = () => {
  return (
    <div className={"py-[22px] px-5 bg-primaryLight flex gap-x-4"}>
      <ExclamationMarkIcon />
      <div className={"text-gray5 text-h5"}>
        <span className={"text-primary"}>* </span>표시는 <span className={"text-primary"}>필수 선택사항</span>입니다.
      </div>
    </div>
  );
};
export default RequirementBanner;

const ExclamationMarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path fill="#BEBEBE" d="M10.859 20c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10" />
      <path
        fill="#FFF9FA"
        d="M10.86 12.266a1.28 1.28 0 0 1-1.278-1.277V4.305a1.278 1.278 0 0 1 2.555 0v6.684c0 .705-.572 1.277-1.278 1.277M10.86 17.083a1.278 1.278 0 1 0 0-2.556 1.278 1.278 0 0 0 0 2.556"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.859 0h20v20h-20z" />
      </clipPath>
    </defs>
  </svg>
);
