import React from "react";
interface Props {
  title: string;
  isRequired: boolean;
  showerDuration: string | undefined;
  setShowerDuration: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const ProgressBar = (props: Props) => {
  const { title, isRequired, showerDuration, setShowerDuration } = props;

  return (
    <div className={"flex flex-col gap-y-2"}>
      <div className={"flex justify-between items-center"}>
        <div className={"text-gray5 text-h4"}>
          {title}
          {isRequired ? <span className={"text-primary ml-1"}>*</span> : null}
        </div>
        <div className={"text-gray4 text-h4"}>{showerDuration}분</div>
      </div>
      <input
        onChange={(e) => {
          setShowerDuration(e.target.value);
        }}
        type={"range"}
        min="0"
        max="25"
        value={showerDuration}
        step="5"
        className={"w-full"}></input>
    </div>
  );
};
export default ProgressBar;
