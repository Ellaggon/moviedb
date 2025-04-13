"use client"

import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { tmdbApi } from "src/api/tmdbApi"

import { MovieProps } from "./MovieGrid"
import { SkeletonMovies } from "./categories/SkeletonMovies"
import { MovieDetail } from "src/types/movieTypes"
import MovieCard from "./MovieCard"


export const MovieGridClient = ({ category, query }: MovieProps) => {
    const t = useTranslations("lang")
    const [listMovies, setListMovies] = useState<MovieDetail[]>([])
    const [page, setPage] = useState(2)
    const [loading, setLoading] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Function to detect the screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 1020)
        }
        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)
    }, [])

    useEffect(() => {
        const getList = async () => {
            setLoading(true)

            let res
            try {
                const params = { language: t("lang"), page }

                if (category === "trending") {
                    res = await tmdbApi.getTrendingMoviesList(params)
                }
                if (category === "popular") {
                    res = await tmdbApi.getMovieList("popular", params)
                }
                if (category === "upcoming") {
                    res = await tmdbApi.getMovieList("upcoming", params)
                }
                if (category === "search") {
                    res = await tmdbApi.search({ language: t("lang"), query })
                }

                if (!isMobile) {
                    setListMovies([])
                    return
                }

                const data = res?.data
                setListMovies(prev => {
                    const existingIds = new Set(prev.map(movie => movie.id))
                    const newMovies = data?.results?.filter((movie: MovieDetail) => !existingIds.has(movie.id))
                    return [...prev, ...newMovies]
                })

            } catch (e) {
                console.error("Error fetching movies: ", e)
            } finally {
                setLoading(false)
            }
        }
        getList()
    }, [page, isMobile])

    // Function to add infinite scroll
    useEffect(() => {
        if(!isMobile) return
        const handleScroll = () => {
            const { scrollHeight, scrollTop, clientHeight } = document.documentElement
            const scrollIsBottom = ((scrollTop + clientHeight) >= (scrollHeight - 15) && !loading)

            if (scrollIsBottom) {
                setPage(prev => prev + 1)
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [loading])


    return (
        <>
            {
                listMovies?.map((movie) => (
                    <MovieCard key={movie.id} item={movie} />
                ))
            }
            {
                loading && (
                    Array(8).fill(0).map((_, index) => <SkeletonMovies key={index} />)
                )
            }

        </>
    )
}