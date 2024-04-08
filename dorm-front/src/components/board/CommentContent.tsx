import Profile from "@/components/board/Profile";
import { useEffect } from "react";

interface Props {
  usage: string; //replyComment, comment
  profileUrl: string;
  createdDate: string;
  nickName: string;
  content: string;
}
const CommentContent = (props: Props) => {
  const { usage, profileUrl, createdDate, nickName, content } = props;

  useEffect(() => {
    console.log("nickName", nickName);
  }, []);
  return (
    <div className={usage == "replyComment" ? "flex flex-col gap-y-[5px] ml-[55px]" : "flex flex-col gap-y-[5px]"}>
      <div className="flex justify-between items-center">
        <Profile usage={usage} profileUrl={profileUrl} nickName={nickName} createdDate={createdDate} />
        <MoreMenuIcon />
      </div>
      <div className="flex flex-col gap-y-[5px] ml-9">
        <div>{content}</div>
        <div className="flex gap-x-4">
          {usage == "comment" ? (
            <button className="flex gap-x-1 items-center">
              <CommentIcon />
              <div className="text-primaryMid text-h5">답글 달기</div>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default CommentContent;

function CommentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.01 1.369c3.62 0 6.565 2.381 6.565 5.312 0 2.932-2.944 5.313-6.565 5.313-.056 0-.106 0-.162-.006h-.144s-.025-.007-.038-.007a.93.93 0 00-.838.52l-1 1.993-1.682-3.363a.986.986 0 00-.319-.362C2.307 9.75 1.44 8.263 1.44 6.68c.006-2.93 2.95-5.312 6.571-5.312zm0-.938c-4.145 0-7.503 2.8-7.503 6.25 0 1.97 1.094 3.725 2.801 4.87l1.682 3.362a.933.933 0 00.838.518.927.927 0 00.838-.518l1-1.994c.113 0 .225.012.338.012 4.145 0 7.503-2.8 7.503-6.25S12.156.431 8.01.431z"
        fill="#FF7E8D"
      />
      <path
        d="M10.753 7.307a.625.625 0 100-1.25.625.625 0 000 1.25zM8.131 7.388a.625.625 0 100-1.25.625.625 0 000 1.25zM5.51 7.388a.625.625 0 100-1.25.625.625 0 000 1.25z"
        fill="#FF7E8D"
      />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={14}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_1586_7649)" fill="#FF7E8D">
        <path d="M9.639 12.486a.472.472 0 00-.646-.199l-.16.083a1.83 1.83 0 01-1.651 0 13.118 13.118 0 01-2.298-1.484C2.19 8.684 1.621 6.118 1.5 5.107l-.02-.211c-.012-.134-.012-.218-.012-.23 0-1.792 1.414-3.367 3.027-3.367 1.51 0 2.867.717 3.545 1.87a.481.481 0 10.832-.487C8.02 1.236 6.343.34 4.501.34 2.336.34.506 2.323.506 4.666c0 0 0 .115.013.307 0 .09.013.172.025.256.135 1.12.768 3.974 3.731 6.399a13.466 13.466 0 002.464 1.593c.397.199.832.301 1.26.301.43 0 .865-.102 1.261-.3l.173-.09a.472.472 0 00.199-.646h.006zM10.829 12.217a.5.5 0 100-.998.5.5 0 000 .998z" />
        <path d="M12.173 11.073a.483.483 0 01-.34-.826c2.1-2.054 2.567-4.274 2.67-5.138.006-.07.018-.141.018-.212.013-.14.013-.224.013-.23 0-1.798-1.414-3.372-3.027-3.372-1.51 0-2.867.716-3.545 1.868a.481.481 0 11-.832-.486C7.981 1.23 9.658.335 11.5.335c2.164 0 3.988 1.984 3.988 4.332 0 0 0 .115-.013.307 0 .083-.013.173-.026.256-.115.954-.633 3.437-2.95 5.702a.492.492 0 01-.333.134l.007.007z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_1586_7649">
          <path
            fill="#fff"
            transform="translate(.507 .34)"
            d="M0 0h15v13.183H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
function MoreMenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={4}
      height={28}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.507 20.932a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM3.507 13.932a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM3.507 6.932a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
        fill="#9E9FA1"
      />
    </svg>
  );
}
