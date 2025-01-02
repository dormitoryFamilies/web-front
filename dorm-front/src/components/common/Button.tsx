"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  SecondIcon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  className: string;
}
const Button = (props: Props) => {
  const { children, onClick, Icon, className, SecondIcon } = props;
  return (
    <button
      className={twMerge(
        `
                py-1 
                px-3 
                rounded-full
                `,
        className,
      )}
      onClick={onClick}>
      <div className="flex items-center gap-x-[5px] text-h5">
        {SecondIcon ? <SecondIcon /> : null}
        {children}
        {Icon ? <Icon /> : null}
      </div>
    </button>
  );
};
export default Button;
