import { getTranslations } from "next-intl/server";
import MovieGrid from "../components/MovieGrid";

export default async function popular() {
    const t = await getTranslations("lang")
    return (
            <div className="bg-black w-100">
                <h1 className="text-white text-3xl font-bold text-center py-6">
                    {
                        t("popularMovies")
                    }
                </h1>
                <MovieGrid category="popular"/>
            </div>
        )
}