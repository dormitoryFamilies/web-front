import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className: string; //global.css의 style
  secondClassName?: string; //변형할 style
  children: React.ReactNode;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const Tag = (props: Props) => {
  const { className, secondClassName, children, Icon } = props;
  return (
    <div className={twMerge(className, secondClassName)}>
      <div className="flex items-center gap-x-[4px]">
        {Icon ? <Icon /> : null}
        {children}
      </div>
    </div>
  );
};
export default Tag;
