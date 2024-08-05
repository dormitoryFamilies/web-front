import { Dispatch, SetStateAction, SVGProps } from "react";
import * as React from "react";
interface Props {
  setIsClickedGuideMessage: Dispatch<SetStateAction<boolean>>;
}
const GuideMessageModal = (props: Props) => {
  const { setIsClickedGuideMessage } = props;
  return (
    <>
      <div
        className={
          "absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.2)] px-8 min-h-screen"
        }>
        <div className={"flex flex-col gap-y-4 bg-white rounded-[12px] px-5 py-4"}>
          <div className={"flex flex-col gap-y-[10px]"}>
            <div className={"flex justify-between items-center"}>
              <div className={"flex gap-x-1 items-center text-primaryMid font-semibold "}>
                <Icon /> 시험
              </div>
              <CancelIcon
                onClick={() => {
                  setIsClickedGuideMessage(false);
                }}
              />
            </div>
            <div className={"text-h5 text-gray5"}>
              학교 시험 이외에도 따로 준비하고 있는 시험이나 공부가 있을 경우에 해당해요
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GuideMessageModal;

const Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <rect width={14.667} height={14.667} x={0.667} y={0.667} stroke="#FF7E8D" strokeWidth={1.333} rx={7.333} />
    <path
      fill="#FF7E8D"
      d="M7.698 9.905c-.374 0-.626-.257-.636-.678l-.03-.914c-.01-.287.161-.554.444-.708C8.565 7.04 9.039 6.598 9.039 5.9c0-.647-.444-1.068-1.049-1.068-.454 0-.847.206-1.16.606q-.242.308-.574.308a.7.7 0 0 1-.343-.092.63.63 0 0 1-.313-.534c0-.113.03-.226.1-.339.445-.74 1.251-1.18 2.29-1.18 1.432 0 2.41.985 2.41 2.32 0 1.109-.726 1.961-2.047 2.649l-.03.657c-.03.41-.262.678-.625.678m-.837 1.684c0-.452.363-.811.837-.811s.837.36.837.81c0 .453-.363.812-.837.812s-.837-.36-.837-.811"
    />
  </svg>
);
const CancelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" {...props}>
    <path
      fill="#727375"
      d="M.545 11.09a.777.777 0 0 1 0-1.09L10 .545a.777.777 0 0 1 1.09 0 .777.777 0 0 1 0 1.091l-9.454 9.455a.777.777 0 0 1-1.09 0"
    />
    <path
      fill="#727375"
      d="M7.818 8.91.545 1.635a.777.777 0 0 1 0-1.09.777.777 0 0 1 1.091 0L8.91 7.817a.777.777 0 0 1 0 1.091.777.777 0 0 1-1.09 0M9.818 11.273a1.028 1.028 0 1 0 1.455-1.455 1.028 1.028 0 0 0-1.455 1.455"
    />
  </svg>
);
