interface Props {
  message: string;
  sentTime: string;
}
const MyChatContent = (props: Props) => {
  const { message, sentTime } = props;
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const period = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시를 12시로 변환

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${period} ${hours}:${formattedMinutes}`;
  };

  return (
    <div className={"px-5 w-full flex gap-x-2 justify-end items-end"}>
      <div className={"text-gray4 text-h6"}>{formatTime(sentTime)}</div>
      <div className={"flex items-start"}>
        <div className={"py-2 px-4 text-white rounded-full bg-primaryMid"}>{message}</div>
        <div className={"bg-primaryMid w-[8px] h-[8px] rounded-full"} />
      </div>
    </div>
  );
};
export default MyChatContent;
