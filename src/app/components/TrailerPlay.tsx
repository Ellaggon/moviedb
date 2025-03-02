"use client"

import { useState } from "react"
import { TrailerModal } from "./TrailerModal"
import { BsFillPlayFill } from "react-icons/bs"
import { useTranslations } from "use-intl"

export const TrailerPlay = ({ movie }: { movie: any }) => {
    const t = useTranslations("lang")
    const [playTrailer, setPlayTrailer] = useState(false)

    return (
        <>
        <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold" onClick={() => setPlayTrailer(true)}>
            <BsFillPlayFill className="mr-2" /> {t("playTrailer")}
        </button>
        {
            playTrailer && <div className="relative bg-black h-screen w-100">
                <TrailerModal item={movie} playTrailer={playTrailer} setPlayTrailer={setPlayTrailer} />
            </div>
        }
        </>
    )
}