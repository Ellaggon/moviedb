import { tmdbApi } from "src/api/tmdbApi"
import MovieCard from "./MovieCard"
import { getTranslations } from "next-intl/server"
import { Pagination } from "./Pagination"


type Props = {
    category: string
    currentPage: number
    query?: string
}
type Movie = {
    id: number
    title: string
    poster_path: string
    overview: string
}

export default async function MovieGrid ({category, currentPage, query}: Props) {
    const t = await getTranslations("lang")

    let res = null
    try {
        const params = { language: t("lang"), page: currentPage }

        if(category === "trending") {
            res = await tmdbApi.getTrendingMoviesList(params)
        }
        if(category === "popular") {
            res = await tmdbApi.getMovieList("popular", params)
        }
        if(category === "upcoming") {
            res = await tmdbApi.getMovieList("upcoming", params)
        }
        if(category === "search") {
            res = await tmdbApi.search({ language: t("lang"), query: query, page: currentPage})
        }
        
    } catch (e) {
        console.error("Error fetching movies: ", e)
    }

    const { results, total_pages, page } = res?.data || { results: [], total_pages: 1, page: 1 }

    return (
        <section className="flex flex-col justify-center items-center xl:py-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
                results.map((movie: Movie) => (
                    <MovieCard key={movie.id} item={movie}  />
                ))
            } 
            </div>
            <div> 
            { 
                <Pagination category={category} totalPages={total_pages} currentPage={page} query={query} />
            }
            </div>
        </section>
    )
}