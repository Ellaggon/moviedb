"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
    const pathname = usePathname()

    const headerNav = [
        { display: "home", path: "/" },
        {display: "trending" ,path: "/treding"},
        {display: "categories", path: "/categories"},
        {display: "popular", path: "/popular"},
        {display: "upcoming", path: "/Upcomig"}
    ]

    const active = headerNav.find(e => e.path === pathname)

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 bg-opacity-25 backdrop-blur-md border-b border-white/20">
            <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                {/* burger button */}
                <div className="md:hidden">
                    <h2>Header</h2>
                </div>

                <h1 className={`text-2xl font-bold text-main md:text-4xl`}>
                    <Link href="/">MOVIEAPP</Link>
                </h1>

                <nav className={`absolute top-16 left-0 w-full bg-black md:static md:w-auto md:flex md:gap-16 transition-transform md:translate-x-0`}>
                    <ul className="flex flex-col md:flex-row md:gap-6">
                        {
                            headerNav.map((item, index) => (
                                <li key={index} className={`text-white px-4 py-2 md:px:0 md:py-0 ${index === active ? "border-b-2 border-main" : "" }`}> 
                                    <Link href={item.path}>{item.display}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}