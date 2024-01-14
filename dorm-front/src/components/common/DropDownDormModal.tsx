import {DORM_LIST} from "@/utils/dorm";
import {useRecoilState} from "recoil";
import {DropDownClick, selectedDormitory} from "@/recoil/atom";
import {useCallback} from "react";

const DropDownDormModal = () => {
    //선택된 기숙사
    const [selectedDorm, setSelectedDorm] = useRecoilState<string>(selectedDormitory)
    //드롭다운 메뉴를 보이도록(or 보이지 않도록) 하는 state
    const [isDropDownClick, setIsDropDownClick] = useRecoilState<boolean>(DropDownClick);

    return (
        <div className="
            justify-center
            items-center
            flex
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            z-10
            outline-none
            focus:outline-none
            bg-black/50
            ">
            {/* TODO: drag 이벤트 */}
            <div className="
                absolute
                opacity-100
                bottom-0
                w-full
                bg-white
                flex
                flex-col
                justify-center
                items-center
                rounded-t-[32px]
                pt-3
                ">
                <DragIcon />
                <div className="
                    text-gray4
                    text-center
                    py-3"
                >
                    기숙사 선택
                </div>
                {DORM_LIST.map((dormitory, item)=>{
                    return(
                        <div
                            className="
                                w-full
                                text-h3
                                text-gray5
                                font-bold
                                text-center
                                py-2
                                border
                                border-gray0
                                hover:bg-gray0"
                            onClick={()=>{
                                setSelectedDorm(dormitory.name)
                                setIsDropDownClick(false)
                            }
                            }
                        >
                            {dormitory.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default DropDownDormModal;

function DragIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={35}
            height={5}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect width={35} height={5} rx={2.5} fill="#D9D9D9" />
        </svg>
    );
}
