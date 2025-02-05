"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";
import { BurgerButton } from "./BurgerButton";
import { SearchInput } from "./SearchInput";

interface NavItem {
    display: string;
    path: string
}

export const Header = () => {
    const pathname = usePathname()

    const headerNav: NavItem[] = [
        { display: "home", path: "/" },
        {display: "trending" ,path: "/treding"},
        {display: "categories", path: "/categories"},
        {display: "popular", path: "/popular"},
        {display: "upcoming", path: "/Upcomig"}
    ]

    const activeIndex = headerNav.findIndex(e => e.path === pathname)

    const [ isBurgerOpen, setIsBurgerOpen ] = useState(false)

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 bg-opacity-25 backdrop-blur-md border-b border-white/20">
            <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                {/* burger button */}
                <div className="md:hidden">
                    <BurgerButton clicked={isBurgerOpen} handleClick={() => setIsBurgerOpen(!isBurgerOpen)} />
                </div>

                <h1 className={`text-2xl font-bold text-main md:text-4xl`}>
                    <Link href="/">MOVIEAPP</Link>
                </h1>

                {/* menu */}
                <nav className={`absolute top-16 left-0 w-full bg-black md:static md:w-auto md:flex md:gap-16 transition-transform md:translate-x-0`}>
                    <ul className="flex flex-col md:flex-row md:gap-6">
                        {
                            headerNav.map((item, index) => (
                                <li key={index} className={`text-white px-4 py-2 md:px:0 md:py-0 ${index === activeIndex ? "border-b-2 border-main" : "" }`}> 
                                    <Link href={item.path}>{item.display}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div>
                <SearchInput />
                </div>
            </div>
        </header>
    );
}