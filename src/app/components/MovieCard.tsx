"use client"

import Link from "next/link"
import apiConfig from "src/api/apiConfig"
import { BsFillCollectionPlayFill } from "react-icons/bs"
import { useTranslations } from "use-intl"
import { useEffect, useRef, useState } from "react"
import { MdOutlineFavorite } from "react-icons/md"
import { MovieDetail } from "src/types/movieTypes"
import { likedmovieList } from "./MovieFavorites"


type MovieCardProps = {
    item: MovieDetail
    ref?: React.Ref<HTMLAnchorElement>
}


export default function MovieCard({ item, ref }: MovieCardProps) {
    const t = useTranslations("lang")
    const observer = useRef<IntersectionObserver | null>(null)

    const [loading, setLoading] = useState(true)
    const [imgLoaded, setImgLoaded] = useState(false)
    const [favorites, setFavorites] = useState(
        () => {
            const likedMovies = JSON.parse(localStorage.getItem("liked_movies") || "{}")
            return likedMovies[item.id] ? true : false
        }
    )
    const lazyRef = useRef<HTMLDivElement>(null)

    const link = `/${t("lang")}/movie/${item.id}`
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path || "")



    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 100)
    }, [])

    // lazy loader
    useEffect(() => {
        if (!lazyRef.current) return

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setImgLoaded(true)
                    observer.current?.unobserve(entries[0].target)
                }
            },
            { threshold: 0.1 }
        )
        if (observer.current) {
            observer.current.observe(lazyRef.current)
        }

        return () => observer.current?.disconnect()
    }, [])

    
    function handleFavorites(movie: MovieDetail) {
        const likedMovies = likedmovieList()

        console.log(likedMovies)
        if (likedMovies[movie.id]) {
            likedMovies[movie.id] = undefined
            setFavorites(false)
        } else {
            likedMovies[movie.id] = movie
            setFavorites(true)
        }
        localStorage.setItem(`liked_movies`, JSON.stringify(likedMovies))
    }


    return (
        <div className="relative">
            <Link href={link} ref={ref} className="mb-2 flex flex-col justify-center items-center w-full≤">
                <div
                    ref={lazyRef}
                    style={{ backgroundImage: imgLoaded ? `url(${bg})` : "" }}
                    className={`relative w-40 h-60 md:w-56 md:h-80 bg-cover bg-center rounded-lg transition-transform hover:scale-105 bg-gray-700 bg-opacity-50 ${loading && "animate-pulse"}`}>

                    <button className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                        <BsFillCollectionPlayFill />
                    </button>
                </div>

                <h3 className="mt-2 text-sm font-semibold text-white truncate w-40">
                    {item.title || item.name}
                </h3>
            </Link>
            <MdOutlineFavorite onClick={() => handleFavorites(item)} className={`absolute top-2 right-2 w-7 h-7 z-10 hover:scale-110 ${favorites ? "text-red-600" : "text-white"}`} />
        </div>
    )
}