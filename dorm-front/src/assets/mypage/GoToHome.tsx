import type { SVGProps } from "react";
import * as React from "react";
const GoToHomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none" {...props}>
    <g strokeWidth={1.2} clipPath="url(#a)">
      <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="m20.072 12.183-6.983-6.992-6.992 6.992" />
      <path
        stroke="#000"
        strokeLinecap="square"
        strokeMiterlimit={10}
        d="M18.764 11.7v5.767c0 1.158-1.134 2.092-2.525 2.092H9.93c-1.391 0-2.525-.942-2.525-2.092V11.7"
      />
      <path
        stroke="#E70050"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.53 3.175H1.855M9.255 5.025l1.717-1.85-1.717-1.841"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.972.5h20v20h-20z" />
      </clipPath>
    </defs>
  </svg>
);
export default GoToHomeIcon;
