// import { useParams } from "next/navigation"
import { tmdbApi } from "src/api/tmdbApi"
import MovieCard from "./MovieCard"


const fetchMovies = async (category: string) => {
    try {
        let res = null
        const params = {language: "es-ES"}

        if(category === "trending") {
            res = await tmdbApi.getTrendingMoviesList(params)
        }
        if(category === "popular") {
            res = await tmdbApi.getMovieList("popular", params)
        }
        if(category === "upcoming") {
            res = await tmdbApi.getMovieList("upcoming", params)
        }
        return res?.data.results || []

    } catch (e) {
        console.error("Error fetching movies: ", e)
        
    }
}

type MovieGridProps = {
    category: string
}

type Movie = {
    id: number
    title: string
    poster_path: string
    overview: string
}

export default async function MovieGrid ({category}: MovieGridProps) {
    const movies = await fetchMovies(category) 

    return (
        <section className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
                movies.map((movie: Movie) => (
                    <div key={movie.id}>
                    <MovieCard key={movie.id} item={movie}  />
                    </div>
                ))
            }
            </div>
        </section>
    )
}