import type { SVGProps } from "react";
import * as React from "react";
const UnReadBoardAlarmIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#E70050"
        d="M13.753 3.567c.994 0 1.8.806 1.8 1.8v10.266a1.8 1.8 0 0 1-1.8 1.8H6.247c-.994 0-1.8-.806-1.8-1.8V5.367c0-.994.806-1.8 1.8-1.8zm0-1.067H6.247A2.87 2.87 0 0 0 3.38 5.367v10.266A2.867 2.867 0 0 0 6.247 18.5h7.506a2.867 2.867 0 0 0 2.867-2.867V5.367A2.867 2.867 0 0 0 13.753 2.5"
      />
      <path
        fill="#E70050"
        d="M12.047 11.5a.51.51 0 0 0-.514.513.51.51 0 0 0 .514.514.51.51 0 0 0 .513-.514.51.51 0 0 0-.513-.513"
      />
      <path
        stroke="#E70050"
        strokeLinecap="round"
        strokeMiterlimit={10}
        d="M6.393 6.467h4.987M6.393 8.68h4.987M6.393 12.066h3.434"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M3.38 2.5h13.24v16H3.38z" />
      </clipPath>
    </defs>
  </svg>
);
export default UnReadBoardAlarmIcon;
