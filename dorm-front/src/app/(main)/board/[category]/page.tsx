'use client'
import {useParams} from "next/navigation";

const BoardCategory = () => {
    const parameter = useParams()
    return (
        <div>
            {parameter.id} 페이지입니다.
        </div>
    );
};
export default BoardCategory
