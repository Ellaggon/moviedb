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
        { display: `${t("favorites")}`, path: "/favorites" },
    ];

    const active = headerNav.findIndex((e) => `/${t("lang")}${e.path}` === pathname);

    const [clickedBurger, setClickedBurger] = useState(false);
    const [clickedSearcher, setClickedSearcher] = useState(false);

    return (
        <>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transform ${clickedBurger === true ? "h-100 z-20" : "hidden"}`}></div>
        <header className="sticky relative flex justify-center top-0 left-0 w-full z-20 bg-black bg-opacity-80">
            <ul className="flex container items-center justify-between h-16 px-5">

                {/* burger button */}
                <li className="block lg:hidden">
                    <BurgerButton
                        clicked={clickedBurger}
                        handleClick={() => setClickedBurger(!clickedBurger)} />
                </li>

                {/* Títle */}
                <li className={`${clickedSearcher ? "hidden md:block" : ""}`}>
                    <Link href="/" className="text-xl font-bold text-red-500">
                        MOVIEAPP
                    </Link>
                </li>

                {/* navigation menu */}
                <li
                    className={`absolute lg:sticky top-20 left-0 w-full lg:w-auto lg:bg-transparent p-5 lg:p-0 flex flex-col lg:flex-row items-center gap-6 transition-all -z-10 lg:z-0 ${clickedBurger ? "translate-y-0" : "-translate-y-full lg:translate-y-0"
                        }`}
                >
                    {headerNav.map((e, i) => (
                        <Link
                            key={i}
                            href={`/${t("lang")}${e.path}`}
                            className={`text-white text-sm transition-transform duration-500 pt-2 ${i === active ? "lg:border-t-2 lg:border-red-500" : "hover:border-t-2 hover:border-white"}`}
                            onClick={() => setClickedBurger(false)}
                        >
                            {e.display}
                        </Link>
                    ))}
                    <div className="lg:hidden mt-3">
                        <LanguageToggle />
                    </div>
                    <div className="w-full h-16"></div>
                </li>

                {/* config controls */}
                <li className="flex items-center gap-3 hidden lg:flex">
                    <div className="hidden lg:block">
                        <LanguageToggle /> 
                    </div>
                    <SearchInput />
                </li>

                {/* Search button */}
                <li className="block lg:hidden">
                    <SearchButton
                        clicked={clickedSearcher}
                        handleClick={() => setClickedSearcher(!clickedSearcher)} />
                </li>
            </ul>
        </header>
        </>
    );
}