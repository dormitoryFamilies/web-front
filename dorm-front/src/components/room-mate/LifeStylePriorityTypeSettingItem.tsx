import * as React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  title: string | null;
  className: string | undefined;
  contents: string[] | undefined;
  selectedContent: string;
  setSelectedContent: React.Dispatch<React.SetStateAction<string>>;
  secondClassName?: string;
}
const LifeStylePriorityTypeSettingItem = (props: Props) => {
  const { title, className, contents, selectedContent, secondClassName, setSelectedContent } = props;
  const updateSelectedContent = (content: string) => {
    setSelectedContent(content);
  };

  const resetSelectedContent = (content: string) => {
    if (selectedContent === content) {
      setSelectedContent("");
    } else {
      updateSelectedContent(content);
    }
  };
  return (
    <div className={"flex flex-col gap-y-2"}>
      <div className={"flex items-center gap-x-1 text-gray5 text-h4"}>{title}</div>
      <div className={twMerge("grid gap-2", className)}>
        {contents &&
          contents.map((content: string, index: number) => {
            return (
              <button
                key={index}
                onClick={() => {
                  resetSelectedContent(content);
                }}
                className={
                  selectedContent === content
                    ? twMerge(
                        "py-[9px] px-[10px] rounded-[12px] border-[1px] border-primaryMid bg-secondary text-primary",
                        secondClassName,
                      )
                    : twMerge("py-[9px] px-[10px] rounded-[12px] border-[1px] border-gray1", secondClassName)
                }>
                <span className={selectedContent === content ? "text-h5 text-primary" : "text-h5 text-gray4 "}>
                  {content}
                </span>
              </button>
            );
          })}
      </div>
    </div>
  );
};
export default LifeStylePriorityTypeSettingItem;
