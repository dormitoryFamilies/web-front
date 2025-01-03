import type { SVGProps } from "react";
import * as React from "react";
const HeatToleranceIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <g strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} clipPath="url(#a)">
      <path
        stroke="#000"
        d="M10 15.18a5.18 5.18 0 1 0 0-10.36 5.18 5.18 0 0 0 0 10.36M10 17.7v1.56M4.2 15.8l-2.03 2.03M2.3 10H.74M4.2 4.2 2.16 2.16"
      />
      <path stroke="#E70050" d="M10 2.3V.74" />
      <path stroke="#000" d="m15.8 4.2 2.05-2.05M17.7 10h1.56M15.8 15.8l2.03 2.03" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default HeatToleranceIcon;
