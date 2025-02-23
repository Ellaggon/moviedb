import { tmdbApi } from "src/api/tmdbApi"
import { GenreFilter } from "../components/categories/GenreFilter"
import { getTranslations } from "next-intl/server"

export default async function categories () {
    const t = await getTranslations("lang")
    const params = { language: `${t("langAPI")}` }

    const res = await tmdbApi.genres(params)
    const genres = res.data?.genres ?? []

    return (
        <main>
            <GenreFilter genres={genres}/>
        </main>
    )
}