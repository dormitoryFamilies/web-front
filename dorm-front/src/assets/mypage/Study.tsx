import type { SVGProps } from "react";
import * as React from "react";
const StudyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none" {...props}>
    <g strokeLinecap="round" strokeLinejoin="round" clipPath="url(#a)">
      <path
        stroke="#000"
        strokeWidth={1.2}
        d="M10.972 4.359 6.189 2.767c-2.159-.717-4.384.892-4.384 3.167v8.25c0 1.433.917 2.708 2.284 3.166l5.833 1.942a3.38 3.38 0 0 0 2.108 0l5.833-1.942a3.34 3.34 0 0 0 2.284-3.166v-8.25c0-2.275-2.225-3.884-4.383-3.167L10.98 4.359z"
      />
      <path stroke="#E70050" strokeWidth={2} d="M17.189 1.983v3.334" />
      <path stroke="#000" strokeWidth={1.2} d="M5.972 8.408h10M5.972 11.05h3.333M5.972 13.65h6.667" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.972.5h20v20h-20z" />
      </clipPath>
    </defs>
  </svg>
);
export default StudyIcon;
