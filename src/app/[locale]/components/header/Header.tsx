"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "use-intl";
import { useState } from "react";

import { BurgerButton } from "./BurgerButton";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import LanguageToggle from "./LanguageToggle";


export default function Header() {
    const pathname = usePathname();
    const t = useTranslations("lang")

    const headerNav = [
        { display: `${t("home")}`, path: "/" },
        { display: `${t("trending")}`, path: "/trending" },
        { display: `${t("categories")}`, path: "/categories" },
        { display: `${t("popular")}`, path: "/popular" },
        { display: `${t("upcoming")}`, path: "/upcoming" },
    ];

    const active = headerNav.findIndex((e) => e.path === pathname);

    const [clickedBurger, setClickedBurger] = useState(false);
    const [clickedSearcher, setClickedSearcher] = useState(false);

    return (
        <header className="fixed relative top-0 left-0 w-full bg-black/30 backdrop-blur-md border-b border-white/20 z-50">
            <ul className="flex container items-center justify-between h-16 px-5">

                {/* burger button */}
                <li className="block md:hidden">
                    <BurgerButton
                        clicked={clickedBurger}
                        handleClick={() => setClickedBurger(!clickedBurger)} />
                </li>

                {/* Títle */}
                <li className={`${clickedSearcher ? "hidden md:block" : ""}`}>
                    <Link href="/" className="text-xl ml-6 font-bold text-red-500">
                        MOVIEAPP
                    </Link>
                </li>

                {/* navigation menu */}
                <li
                    className={`absolute md:static md:z-50 top-16 left-0 w-full md:w-auto bg-black md:bg-transparent p-5 md:p-0 flex flex-col md:flex-row items-center gap-5 transition-all -z-10 ${clickedBurger ? "translate-y-0" : "-translate-y-full md:translate-y-0"
                        }`}
                >
                    {headerNav.map((e, i) => (
                        <Link
                            key={i}
                            href={e.path}
                            className={`text-white text-sm md:text-lg transition ${i === active ? "border-b-2 border-red-500" : "hover:border-b-2 hover:border-white"
                                }`}
                        >
                            {e.display}
                        </Link>
                    ))}
                    <div className="md:hidden">
                        <LanguageToggle />
                    </div>
                    <div className="w-full h-16"></div>
                </li>

                {/* config controls */}
                <li className="flex items-center gap-3">
                    <div className="hidden md:block">
                        <LanguageToggle /> 
                    </div>
                    <SearchInput />
                </li>

                {/* Search button */}
                <li className="block md:hidden">
                    <SearchButton
                        clicked={clickedSearcher}
                        handleClick={() => setClickedSearcher(!clickedSearcher)} />
                </li>
            </ul>
        </header>
    );
}