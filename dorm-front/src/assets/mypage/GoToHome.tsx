import type { SVGProps } from "react";
import * as React from "react";
const GoToHomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <g strokeWidth={2} clipPath="url(#a)">
      <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="m22.92 14.02-8.38-8.39-8.39 8.39" />
      <path
        stroke="#000"
        strokeLinecap="square"
        strokeMiterlimit={10}
        d="M21.35 13.44v6.92c0 1.39-1.36 2.51-3.03 2.51h-7.57c-1.67 0-3.03-1.13-3.03-2.51v-6.92"
      />
      <path
        stroke="#E70050"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.27 3.209H1.06M9.94 5.43 12 3.21 9.94 1"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default GoToHomeIcon;
