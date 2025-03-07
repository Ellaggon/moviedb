import { GoBackButton } from "@/components/GoBackButton"
import MovieGrid from "@/components/MovieGrid"
import { getTranslations } from "next-intl/server"
import { SearchParams } from "src/types/movieTypes"


export default async function movieSearch({ searchParams }: SearchParams) {
    const t = await getTranslations("lang")
    const query = String((await searchParams).name) || ""
    const currentPage = Number((await searchParams).page) || 1

    return (
        <main className="w-100 relative">
            <div className="absolute top-4 right-4 md:top-10 2xl:right-96 2xl:top-20">
                <GoBackButton />
            </div>
            <h1 className="text-white text-3xl font-bold text-center pt-14 pb-6">
                {
                    t("trendingMovies")
                }
            </h1>
            <MovieGrid currentPage={currentPage} category="search" query={query}/>
        </main>
    )
}