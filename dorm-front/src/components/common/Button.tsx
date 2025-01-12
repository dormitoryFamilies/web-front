"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  RightIcon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  LeftIcon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  className: string; //globals.css에 선언된 style
  secondClassName?: string; //globals.css에서 변경하고 싶은 style
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
const Button = (props: Props) => {
  const {
    children,
    onClick,
    RightIcon,
    className,
    secondClassName,
    LeftIcon,
    type = "button",
    disabled = false,
  } = props;
  return (
    <button
      disabled={disabled}
      type={type}
      className={twMerge("flex items-center gap-x-[4px]", className, secondClassName)}
      onClick={onClick}>
      {LeftIcon ? <LeftIcon /> : null}
      {children}
      {RightIcon ? <RightIcon /> : null}
    </button>
  );
};
export default Button;
