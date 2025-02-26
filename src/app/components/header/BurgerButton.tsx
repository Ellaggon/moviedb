"use client"

export function BurgerButton({clicked, handleClick}: {clicked: boolean, handleClick: () => void}){
    return (
        <div
        onClick={handleClick}
        className={`w-9 h-7 relative cursor-pointer inline-block ${clicked ? "open" : ""}`}>
            <span className={`absolute w-full h-1 bg-white rounded transition-transform duration-500 ${clicked ? "rotate-45 top-[13px]" : "top-0"}`}></span>
            <span className={`absolute w-full h-1 bg-white rounded transition-opacity duration-500 ${clicked ? "opacity-0" : "top-[13px]"}`}></span>
            <span className={`absolute w-full h-1 bg-white rounded transition-transform duration-500 ${clicked ? "-rotate-45 top-[13px]" : "bottom-0"}`}></span>
        </div>
    );
};