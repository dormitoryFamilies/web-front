import { format } from "date-fns";
import Image from "next/image";

interface Props {
  usage: string;
  profileUrl?: string;
  nickName: string;
  createdDate: string;
  dormitory?: string;
}
const Profile = (props: Props) => {
  const { usage, profileUrl, nickName, createdDate, dormitory } = props;

  return (
    <div
      className={
        usage == "author"
          ? "flex items-center gap-x-3"
          : usage == "comment"
            ? "flex items-center gap-x-2"
            : "flex gap-x-2"
      }>
      {usage == "author" ? (
        <Image src={"/unnimm.jpg"} width={45} height={45} alt={"프로필"} className={"rounded-full w-[45px] h-[45px]"} />
      ) : usage == "comment" ? (
        <Image src={"/unnimm.jpg"} width={32} height={32} alt={"프로필"} className={"rounded-full w-[32px] h-[32px]"} />
      ) : (
        <Image
          src={"/unnimm.jpg"}
          width={24}
          height={24}
          alt={"프로필"}
          className={"rounded-full w-[24px] h-[24px] mt-2"}
        />
      )}
      <div className="flex flex-col">
        {usage == "author" ? (
          <div className="font-semibold">
            {nickName}
            <span className="text-h5 font-bold"> | </span>
            <span>{dormitory}</span>
          </div>
        ) : (
          <div className="font-semibold">{nickName}</div>
        )}
        <div className="text-h5 text-gray4">
          {/*{format(new Date(createdDate), "yy.MM.dd") + " | " + format(new Date(createdDate), "HH:mm")}*/}
        </div>
      </div>
    </div>
  );
};
export default Profile;
