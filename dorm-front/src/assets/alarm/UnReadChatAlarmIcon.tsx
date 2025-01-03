import type { SVGProps } from "react";
import * as React from "react";

const UnReadChatAlarmIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path
      fill="#E70050"
      fillRule="evenodd"
      d="M17.875 5.732c0-1.128-.84-2.044-1.875-2.044H4c-1.035 0-1.875.916-1.875 2.044v6.541c0 1.129.84 2.044 1.875 2.044h3.098c.36 0 .697.18.907.499L10 17.026l1.995-2.21c.21-.31.548-.499.908-.499H16c1.035 0 1.875-.915 1.875-2.044zM4 2.462h12c1.657 0 3 1.463 3 3.27v6.541c0 1.807-1.343 3.27-3 3.27h-3.097l-2.296 2.66a.73.73 0 0 1-.607.335.73.73 0 0 1-.607-.335l-2.296-2.66H4c-1.658 0-3-1.463-3-3.27v-6.54c0-1.808 1.342-3.271 3-3.271m2.813 6.164a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m3.187.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5m4.688-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"
      clipRule="evenodd"
    />
  </svg>
);
export default UnReadChatAlarmIcon;
