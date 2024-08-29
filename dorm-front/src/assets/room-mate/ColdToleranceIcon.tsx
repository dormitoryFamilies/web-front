import type { SVGProps } from "react";
import * as React from "react";
const ColdToleranceIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <g strokeLinecap="round" strokeMiterlimit={10} strokeWidth={1.2} clipPath="url(#a)">
      <path stroke="#000" d="M10 .67v18.58M15.51 4.41 4.45 15.47M4.41 4.41l11.06 11.06M19.29 9.96H.71" />
      <path
        stroke="#E70050"
        d="M7.15 2.02 10 3.81l2.85-1.79M7.15 17.86 10 16.07l2.85 1.79M2.1 12.81l1.79-2.85L2.1 7.11M17.99 12.81 16.2 9.96l1.79-2.85"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default ColdToleranceIcon;
