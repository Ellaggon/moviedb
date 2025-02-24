"use client"
import { on } from "events"
import { use, useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { tmdbApi } from "src/api/tmdbApi"
import { useTranslations } from "use-intl"

interface TrailerModalProps {
    item: any,
    playTrailer: boolean,
    setPlayTrailer: (value: boolean) => void
}

export const TrailerModal = ({ item, playTrailer, setPlayTrailer }: TrailerModalProps) => {
    const t = useTranslations("lang")
    const [trailerKey, setTrailerKey] = useState(null)

    useEffect(() => {
        const getVideo = async () => {
            try {
                const params = { language: "en-US" }
                const res = await tmdbApi.getVideos(item.id, params)

                if(res.data.results.length > 0){
                    const trailer = res.data.results
                    .find((el: {name: string, key: string}) => ["official trailer", "trailer oficial", "tráiler oficial"]
                    .some(keyword => el.name.toLowerCase().includes(keyword)))

                    const key = trailer ? trailer.key : res.data.results[0]?.key
                    setTrailerKey(key)
                } else {
                    setTrailerKey(null)
                }
            } catch (e) {
                console.error("Error fetching trailer:", e)
                setTrailerKey(null)
            }
        }

        getVideo()
    }, [item.id, playTrailer, t])
    return (
        <article
            className={`fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center ${playTrailer ? "opacity-100" : "opcaity-0"}`}
            onClick={() => setPlayTrailer(false)}>

            <div 
                className="realtive w-[90%] h-[80%] flex items-center justify-center bg-black"
                onClick={(e) => e.stopPropagation()}>
                {
                    trailerKey ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}?=1&controls=0`}
                            className="w-full h-full rounded-lg"
                            title="YouTube video player"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        >
                        </iframe>
                    ) : (
                        <div className="text-white text-center text-xl">{t("noTrailer")}</div>
                    )
                }
                <button className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-full hover:bg-red-700 hover:text-white transition">
                    <MdClose className="w-6 h-6" onClick={() => setPlayTrailer(false)} />
                </button>
            </div>
        </article>
    )
}