
// import apiConfig from "src/api/apiConfig"
// import { axiosClient } from "src/api/axiosClient"
import MovieCard from "./MovieCard"
import { tmdbApi } from "src/api/tmdbApi"

const fetchMovies = async (category: string, id?: number, lang?: string) => {
    try {
        let res = null
        const params = {language: lang || "es"}

        if(category !== "similar"){
            if(category === "upcoming"){
                res = await tmdbApi.getMovieList("upcoming",  params )
            } else if( category === "popular"){
                res = await tmdbApi.getMovieList("popular", params )
            } else if( category == "trending"){
                res = await tmdbApi.getTrendingMoviesList(params)
            }
        } else if (id){
            res = await tmdbApi.similar(id, params)
        }

        return res?.data.results || []

    } catch (e) {
        console.error("Error fetching movies: ", e)
        return []
    }
}
type Movie = {
    id: number
    title: string
    poster_path: string
    overview: string
}

type MoviesProps = {
    id: number,
    category: string,
    lang?: string
}

export default async function MovieSwipe({category, id, lang}: MoviesProps) {
    // const { data } = await axiosClient("trending/movie/day")
    // const movies: MoviesProps[] = data.results
    const movies = await fetchMovies(category, id, lang)

    return (
        <section>
            <div className="container mx-auto py-6">
                <div className="overflow-x-auto">
                    <div className="flex gap-4">
                        {
                            movies.map((el: Movie) =>
                                <article key={el.id} className="text-white w-80 grid">
                                    <MovieCard item={el}/>
                                </article>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}