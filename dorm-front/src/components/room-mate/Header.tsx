"use client";

import type { SVGProps } from "react";
import * as React from "react";
interface Props {
  onBefore?: React.Dispatch<React.SetStateAction<string>>;
}
const Header = (props: Props) => {
  const { onBefore } = props;
  return (
    <div>
      <div className={"flex justify-between"}>
        <div className={"w-[72px]"}>
          <BeforeIcon onClick={() => onBefore} />
        </div>
        <div className={"text-h2 font-bold"}>긱사생활 설정</div>
        <button className={"home-button"}>건너뛰기</button>
      </div>
    </div>
  );
};
export default Header;

const BeforeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={22} fill="none" {...props}>
    <path
      fill="#727375"
      fillRule="evenodd"
      d="M8.092 1.212 1.03 10.595a.81.81 0 0 0-.158.71c.03.122.088.238.173.336l5.458 6.866a.818.818 0 0 0 1.281-1.018l-4.421-5.562H20.05a.818.818 0 1 0 0-1.637H3.307L9.4 2.196a.818.818 0 0 0-1.307-.984m.67 19.902c.49 0 .885-.42.885-.94 0-.519-.396-.94-.884-.94-.489 0-.884.421-.884.94 0 .52.395.94.884.94"
      clipRule="evenodd"
    />
  </svg>
);
