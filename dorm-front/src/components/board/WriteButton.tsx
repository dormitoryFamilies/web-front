import { useRouter } from "next/navigation";
import * as React from "react";
const WriteButton = () => {
  const router = useRouter();
  const onMove = () => {
    router.push("/board/write");
  };

  return (
    <button
      onClick={() => onMove()}
      className="fixed bottom-[84px] right-5 z-10 flex items-center text-white rounded-full bg-primary gap-x-2 px-4 py-2">
      <WriteButtonIcon />
      <div>글쓰기</div>
    </button>
  );
};
export default WriteButton;

function WriteButtonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.81 15.864a.82.82 0 01-.813-.813V8.857H.814A.82.82 0 010 8.043a.82.82 0 01.814-.813h6.183V.95A.82.82 0 017.81.134a.82.82 0 01.814.814v6.28h3.037a.82.82 0 01.814.814.82.82 0 01-.814.814H8.624v6.194a.82.82 0 01-.814.813zM16 8.044a1.085 1.085 0 11-2.17 0 1.085 1.085 0 012.17 0z"
        fill="#fff"
      />
    </svg>
  );
}
