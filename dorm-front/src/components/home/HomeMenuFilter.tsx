'use client'

import {homeMenuFilterState} from "@/recoil/atom";
import {useRecoilState} from "recoil";

const HomeMenuFilter = () => {
    const [state, setState] = useRecoilState<'breakfast' | 'lunch' | 'dinner'>(homeMenuFilterState);

    return (
        <div className="flex justify-evenly gap-x-[27px] bg-secondary h-[40px] rounded-full text-h4 font-semibold mt-3">
            <button
                onClick={() => setState('breakfast')}
                className={
                    state == 'breakfast'
                        ? "m-1 px-6 text-primary bg-primaryLight rounded-full font-semibold"
                        : "m-1 px-6"
                }>
                아침
            </button>
            <button
                onClick={() => setState('lunch')}
                className={
                    state == 'lunch'
                        ? "m-1 px-6 text-primary bg-primaryLight rounded-full font-semibold"
                        : "m-1 px-6"
                }>
                점심
            </button>
            <button
                onClick={() => setState('dinner')}
                className={
                    state == 'dinner'
                        ? "m-1 px-6 text-primary bg-primaryLight rounded-full font-semibold"
                        : "m-1 px-6"
                }>
                저녁
            </button>
        </div>
    )
}
export default HomeMenuFilter;
