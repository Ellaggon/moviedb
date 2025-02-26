"use client"

import { useEffect, useState } from "react"
import { tmdbApi } from "src/api/tmdbApi"
import MovieCard from "../MovieCard"
import { useTranslations } from "use-intl"

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
    const [listMovies, setListMovies] = useState<Movie[]>([])
    const t = useTranslations("lang")

    useEffect(() => {
        const getList = async () => {
            const params = {
                page: 1,
                language: `${ t("lang") }`,
            }
            try {
                const { data } = await tmdbApi.getMoviesByCategory(selectedGenres, params)
                const movies = data.results
                setListMovies(movies)
            } catch (e) {
                console.error("Error:", e)
            }
        }
        getList()
    }, [selectedGenres])

    return (
        <section className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    listMovies.map((movie) => (
                        <MovieCard key={movie.id} item={movie} />
                    ))
                }
            </div>
        </section>
    )
}