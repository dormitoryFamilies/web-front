import { format } from "date-fns";

interface Props {
  usage: string;
  isWriter: boolean;
  profileUrl: string | undefined;
  nickname: string | undefined;
  createdDate: string | undefined;
  dormitory?: string;
}
const Profile = (props: Props) => {
  const { usage, profileUrl, nickname, createdDate, dormitory, isWriter } = props;

  return (
    <div
      className={
        usage == "author"
          ? "flex items-center gap-x-3"
          : usage == "comment"
            ? "flex items-center gap-x-2"
            : "flex gap-x-2"
      }>
      {/* 프로필 사진 */}
      {usage == "author" ? (
        <img
          src={profileUrl ? profileUrl : "/profile.png"}
          alt={profileUrl ? profileUrl : "/profile.png"}
          className={"object-cover rounded-full w-[45px] h-[45px]"}
        />
      ) : usage == "comment" ? (
        <img
          src={profileUrl ? profileUrl : "/profile.png"}
          alt={profileUrl ? profileUrl : "/profile.png"}
          className={"object-cover rounded-full w-[32px] h-[32px]"}
        />
      ) : (
        <img
          src={profileUrl ? profileUrl : "/profile.png"}
          alt={profileUrl ? profileUrl : "/profile.png"}
          className={"object-cover rounded-full mt-2 w-[24px] h-[24px]"}
        />
      )}
      {/* 프로필 이름 */}
      <div className="flex flex-col">
        {usage == "author" ? (
          <div className="flex justify-start items-center font-semibold gap-x-[6px]">
            <span>{nickname}</span>
            <span className="text-h6 font-bold"> | </span>
            <span>{dormitory}</span>
          </div>
        ) : usage == "comment" ? (
          <div className={"flex gap-x-1 items-center"}>
            <div className="font-semibold">{nickname}</div>
            {isWriter ? (
              <button className="text-h6 bg-gray0 rounded-[8px] px-2 w-fit text-gray5 items-center h-[18px]">
                작성자
              </button>
            ) : null}
          </div>
        ) : (
          <div className={"flex gap-x-1 items-center"}>
            <div className="font-semibold">{nickname}</div>
            {isWriter ? (
              <button className="text-h6 bg-gray0 rounded-[8px] px-2 w-fit text-gray5 items-center h-[18px]">
                작성자
              </button>
            ) : null}
          </div>
        )}
        <div className="flex items-center text-h5 text-gray4 gap-x-[6px]">
          {createdDate ? format(new Date(createdDate), "yy.MM.dd") : null}
          <span className={"text-[10px]"}> | </span>
          {createdDate ? format(new Date(createdDate), "HH:mm") : null}
        </div>
      </div>
    </div>
  );
};
export default Profile;
