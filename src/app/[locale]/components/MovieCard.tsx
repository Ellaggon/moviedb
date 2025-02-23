"use client"

import Link from "next/link"
import apiConfig from "src/api/apiConfig"
import {BsFillCollectionPlayFill} from "react-icons/bs"

interface MovieCardProps {
    id: number,
    title?: string,
    name?: string,
    poster_path?: string,
    backdrop_path?: string
}
interface itemMovie {
    item: MovieCardProps
}

export default function MovieCard({ item }: itemMovie) {
    const link = `/movie/${item.id}`
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path || "")
    return (
        <>
        <Link href={link} className="block mb-2">
            <div style={{ backgroundImage: `url(${bg})`}}
                className="relative w-40 h-60 md:w-56 md:h-80 bg-cover bg-center rounded-lg transition-transform hover:scale-105">
                <button className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <BsFillCollectionPlayFill />
                </button>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-white truncate w-40">
                {item.title || item.name}
            </h3>
        </Link>
        </>
    )
}