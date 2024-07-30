import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  title: string;
  data: string[];
  className?: string;
  secondClassName?: string;
  onClick: (datum: string) => void;
  isClickedItem: string;
}
const Item = (props: Props) => {
  const { title, data, className, secondClassName, isClickedItem, onClick } = props;
  return (
    <div className={"flex flex-col gap-y-2"}>
      <div className={"text-gray5 text-h4"}>{title}</div>
      <div className={twMerge("grid gap-2", className)}>
        {data.map((datum: string, index: number) => {
          return (
            <button
              key={index}
              onClick={() => {
                onClick({});
              }}
              className={
                isClickedItem === datum
                  ? twMerge(
                      "py-[9px] px-[10px] rounded-[12px] border-[1px] border-primaryMid bg-secondary text-primary",
                      secondClassName,
                    )
                  : twMerge("py-[9px] px-[10px] rounded-[12px] border-[1px] border-gray1", secondClassName)
              }>
              <span className={isClickedItem === datum ? "text-h5 text-primary" : "text-h5 text-gray4 "}>{datum}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Item;
