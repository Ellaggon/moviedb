"use client"

import { useEffect, useState } from "react"
import { tmdbApi } from "src/api/tmdbApi"
import MovieCard from "../MovieCard"
import { useTranslations } from "use-intl"
import { Pagination } from "../Pagination"
import { SkeletonMovies } from "./SkeletonMovies"

type Movie = {
    id: number,
    poster_path: string,
    title: string,
    overview: string
}
interface GenreMovieProps {
    selectedGenres: number[]
}

export const GenreMovies = ({ selectedGenres }: GenreMovieProps) => {
    const t = useTranslations("lang")

    const [listMovies, setListMovies] = useState<Movie[]>([])
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getList = async () => {
            setLoading(true)

            const params = {
                page: currentPage || 1,
                language: `${ t("lang") }`,
            }
            try {
                const { data } = await tmdbApi.getMoviesByCategory(selectedGenres, params)
                const { results, total_pages, page} = data

                setListMovies(results)
                setTotalPage(total_pages)
                setCurrentPage(page)
            } catch (e) {
                console.error("Error fetching list movies :", e)
            } finally {
                setLoading(false)
            }
        }
        getList()
    }, [selectedGenres, currentPage])

    const handlePages = (newPage: number) => {
        setCurrentPage(newPage)
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    return (
        <section className="flex flex-col justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    loading ? (
                        Array(8).fill(0).map((_, index) => <SkeletonMovies key={index} />)
                    ): (
                        listMovies.map((movie) => (
                            <MovieCard key={movie.id} item={movie} />
                        ))
                    )
                }
            </div>
                <Pagination totalPages={totalPage} category="categories" currentPage={currentPage} sendPage={handlePages}/>
        </section>
    )
}
