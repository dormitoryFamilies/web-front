import type { SVGProps } from "react";
import * as React from "react";
const StudyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <g strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} clipPath="url(#a)">
      <path
        stroke="#000"
        d="M12 4.63 6.26 2.72C3.67 1.86 1 3.79 1 6.52v9.9c0 1.72 1.1 3.25 2.74 3.8l7 2.33c.82.27 1.71.27 2.53 0l7-2.33a4 4 0 0 0 2.74-3.8v-9.9c0-2.73-2.67-4.66-5.26-3.8l-5.74 1.91z"
      />
      <path stroke="#E70050" d="M19.46 1.78v4" />
      <path stroke="#000" d="M6 9.49h12M6 12.66h4M6 15.78h8" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default StudyIcon;
