'use client'

import React from "react";
import {twMerge} from "tailwind-merge";

interface Props {
    children: React.ReactNode;
    onClick?: () => void
    Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    className: string;
}
const Button = (props: Props) => {
    const {children, onClick, Icon, className} = props
    return (
        <button
            className={twMerge(`
                py-1 
                px-3 
                border 
                border-primaryMid 
                rounded-full 
                text-primaryMid
                hover:shadow-lg
                transition
                
                `, className)}
            onClick={onClick}
        >
            <div className="flex items-center gap-x-1 text-h5">
                {children}
                <Icon />
            </div>
        </button>
    )
}
export default Button;
