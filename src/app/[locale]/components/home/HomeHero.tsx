"use client"
import { useEffect, useState } from "react"
import apiConfig from "src/api/apiConfig"
import { tmdbApi } from "src/api/tmdbApi"
import { AiFillInfoCircle } from "react-icons/ai"
import { BsFillPlayFill } from "react-icons/bs"
import { useTranslations } from "next-intl"


export default function HomeHero() {
  const t = useTranslations("lang")
  const [ movieItem, setMovieItem ] = useState(null)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const params = { language: t("langAPI") }
        const res = await tmdbApi.getMovieList("popular", params)
        const randomIndex = Math.floor(Math.random() * res.data.results.length)
        const randomMovie = res.data.results[randomIndex]
        console.log(res)
        setMovieItem(randomMovie)
      } catch (e) {
        console.error("Error fetch movie: ", e)
      }
    }
    fetchMovie()
  }, [t])
    return (
        <section className="relative bg-black h-screen w-100">
          <HomeHeroItem item={movieItem}/>
        </section>
    )
}

interface itemProps {
  title: string,
  overview: string,
  popularity: number,
  backdrop_path: string,
  poster_path: string,
  vote_average: number,
  runtime: number,
}

function HomeHeroItem ({item}: {item: itemProps | null}) {
  const t = useTranslations("lang")

  if (!item) return null
  const bg = apiConfig.originalImage(item?.backdrop_path || item?.poster_path)

    return (
        <article className="relative h-full text-white">
            <div className="absolute h-[600px] inset-0 bg-cover bg-gradient-to-b from-transparent via-transparent to-black/60">
            </div>
            <img src={bg} alt="img" className="object-cover h-[600px] w-full"/>

            <div className="absolute bottom-24 md:left-20 xl:left-64 z-10 max-w-2xl text-left p-8">
              <div className="flex items-center gap-3 text-lg">
                <span className="text-yellow-400 text-2xl">★{item.vote_average}</span>
                <span className="">• {item.runtime}</span>
                <span className="bg-red-600 px-2 py-1 rounded shadow-lg shadow-red-500/50">{t("popular")}</span>
              </div>
              <h2 className="text-4xl font-bold my-6">{item.title}</h2>
              <p className="text-lg mb-4 line-clamp-3 xl:font-semibold hidden md:flex">{item.overview}</p>
              <div className="flex gap-4">
                <button className="flex items-center px-4 py-2 bg-red-700 hover:bg-red-800 rounded-lg text-white text-sm font-semibold">
                  <BsFillPlayFill className="text-xl mr-1"/>
                  {t("playTrailer")}
                </button>
                <button className="flex items-center px-4 py-2 hover:bg-gray-900 rounded-lg text-sm font-semibold">
                  <AiFillInfoCircle  className="text-xl mr-1"/>
                  {t("details")}
                </button>
              </div>
            </div>
        </article>
    )
}