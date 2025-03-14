"use client"

import Link from "next/link"
import apiConfig from "src/api/apiConfig"
import {BsFillCollectionPlayFill} from "react-icons/bs"
import { useTranslations } from "use-intl"
import { useEffect, useState } from "react"

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
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 100)
    }, [])

    const t = useTranslations("lang")
    const link = `/${t("lang")}/movie/${item.id}`
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path || "")
    return (
        <Link href={link} className="mb-2 flex flex-col justify-center items-center w-full">
            <div style={{ backgroundImage: `url(${bg})`}}
                className={`relative w-40 h-60 md:w-56 md:h-80 bg-cover bg-center rounded-lg transition-transform hover:scale-105 bg-gray-700 bg-opacity-50 ${loading && "animate-pulse"}`}>
                <button className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <BsFillCollectionPlayFill />
                </button>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-white truncate w-40">
                {item.title || item.name}
            </h3>
        </Link>
    )
}