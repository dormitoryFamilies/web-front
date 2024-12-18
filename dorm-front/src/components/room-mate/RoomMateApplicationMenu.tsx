interface Props {
  type: "모든 둠즈" | "받은 신청" | "보낸 신청";
  changeType: React.Dispatch<React.SetStateAction<"모든 둠즈" | "받은 신청" | "보낸 신청">>;
}
const RoomMateApplicationMenu = (props: Props) => {
  const { type, changeType } = props;
  return (
    <div className={"flex justify-between bg-white px-5 py-1 border-b-[1px] border-gray1 gap-x-2 w-full"}>
      <button
        onClick={() => {
          changeType("모든 둠즈");
        }}
        className={"flex-shrink-0"}>
        <span
          className={
            type === "모든 둠즈"
              ? "text-primary border-b-[2px] font-semibold px-[26px] py-[5px]"
              : "text-gray3 px-[26px] py-[5px]"
          }>
          모든 둠즈
        </span>
      </button>
      <button
        onClick={() => {
          changeType("받은 신청");
        }}
        className={"flex-shrink-0"}>
        <span
          className={
            type === "받은 신청"
              ? "text-primary border-b-[2px] font-semibold px-[26px] py-[5px]"
              : "text-gray3 px-[26px] py-[5px]"
          }>
          받은 신청
        </span>
      </button>
      <button
        onClick={() => {
          changeType("보낸 신청");
        }}
        className={"flex-shrink-0"}>
        <span
          className={
            type === "보낸 신청"
              ? "text-primary border-b-[2px] font-semibold px-[26px] py-[5px]"
              : "text-gray3 px-[26px] py-[5px]"
          }>
          보낸 신청
        </span>
      </button>
    </div>
  );
};
export default RoomMateApplicationMenu;
