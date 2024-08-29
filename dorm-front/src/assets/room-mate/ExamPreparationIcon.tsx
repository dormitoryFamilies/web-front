import type { SVGProps } from "react";
import * as React from "react";
const ExamPreparationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M16.43.61H1.82v18.78h14.61zM5.54 5.21h7.77M5.54 7.89h6.44M5.54 14.66h3.14"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      stroke="#E70050"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m11.88 12.99-1.42.64.24-1.48 7.49-10.48 1.18.84z"
      clipRule="evenodd"
    />
  </svg>
);
export default ExamPreparationIcon;
