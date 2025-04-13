"use client"

import { useEffect, useState } from "react"
import { MovieDetail } from "src/types/movieTypes"
import MovieCard from "./MovieCard"

export function likedmovieList() {
    const item = localStorage.getItem("liked_movies")
    if (!item) return {}

    try {
        return JSON.parse(item)
    } catch (e) {
        console.error("Error parsing JSON from localStorage: ", e)
        return {}
    }
}

export const MovieFavorites = () => {
    const [movies, setMovies] = useState<MovieDetail[]>([])

    useEffect(() => {
        const likedMovies = likedmovieList()
        const moviesList = Object.values(likedMovies).filter(
            (movie): movie is MovieDetail => movie !== undefined && movie !== null
        )
        setMovies(moviesList)

    }, [])
    return (
        <section className="flex flex-col justify-center items-center xl:py-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    movies.map((movie: MovieDetail) => (
                        <MovieCard key={movie.id} item={movie} />
                    ))
                }
            </div>
        </section>
    )
}