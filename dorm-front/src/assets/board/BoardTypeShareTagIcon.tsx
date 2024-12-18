import type { SVGProps } from "react";
import * as React from "react";

const BoardTypeShareTagIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <g fill="#E70050" clipPath="url(#a)">
      <path d="M13.347 6.86c.18 0 .333.147.333.333v6.98c0 .18-.147.334-.333.334H2.653a.334.334 0 0 1-.333-.334v-6.98c0-.18.147-.333.333-.333zm0-1H2.653c-.733 0-1.333.593-1.333 1.333v6.98c0 .734.593 1.334 1.333 1.334h10.694c.733 0 1.333-.594 1.333-1.334v-6.98c0-.733-.593-1.333-1.333-1.333" />
      <path
        fillRule="evenodd"
        d="M15 3.593a.415.415 0 0 0-.413-.413H8.533v2.673h6.054A.415.415 0 0 0 15 5.44zm-6.467 3.26h6.047c.78 0 1.413-.633 1.413-1.413V3.593c0-.78-.633-1.413-1.413-1.413H1.413C.633 2.18 0 2.813 0 3.593V5.44c0 .78.633 1.413 1.413 1.413h6.12v6.22a.5.5 0 1 0 1 0zm-1-1V3.18h-6.12A.415.415 0 0 0 1 3.593V5.44c0 .227.187.413.413.413z"
        clipRule="evenodd"
      />
      <path d="M8.033 1.513a.507.507 0 1 0 0-1.013.507.507 0 0 0 0 1.013" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .5h16v15H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default BoardTypeShareTagIcon;
