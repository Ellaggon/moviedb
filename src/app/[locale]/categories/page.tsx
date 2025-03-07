import { tmdbApi } from "src/api/tmdbApi"
import { GenreFilter } from "../../components/categories/GenreFilter"
import { getTranslations } from "next-intl/server"
import { GoBackButton } from "@/components/GoBackButton"

export default async function categories() {
    const t = await getTranslations("lang")
    const params = { language: `${t("langAPI")}` }

    const res = await tmdbApi.genres(params)
    const genres = res.data?.genres ?? []

    return (
        <main className="relative">
            <div className="absolute top-4 right-4 md:top-10 2xl:right-96 2xl:top-20">
                <GoBackButton />
            </div>
            <h1 className="text-white text-3xl font-bold text-center pt-9 xl:pb-12">
                {
                    t("categories")
                }
            </h1>
            <GenreFilter genres={genres} />
        </main>
    )
}