
import MovieCard from "../components/home/MovieCard"
import { getGenres } from "../lib/getGenres"
import { getTranslations } from "next-intl/server"
import { GenreFilter } from "../components/categories/GenreFilter"

export type Movie = {
    id: number,
    psoter_path: string,
    title: string,
    overview: string
}
export type Genre = {}

export default async function categories () {
    // const res = await getMoviesByCategory()
    const t = await getTranslations("lang")
    
    const genres = await getGenres(t("langAPI"))

    return (
        <section className="container mx-auto py-6 flex justify-center">
            <GenreFilter genres={genres}/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* {
                    movies.map((movie: Movie)=>(
                        <MovieCard key={movie.id} item={movie}/>
                    ))
                } */}
            </div>
            <div>
                <button>
                </button>
            </div>
        </section>
    )
}