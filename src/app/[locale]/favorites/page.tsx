import { GoBackButton } from "@/components/GoBackButton";
import { MovieFavorites } from "@/components/MovieFavorites";
import { getTranslations } from "next-intl/server";


export default async function favorites() {
    const t = await getTranslations("lang")


    return (
        <main className="w-100 relative flex-1">
            <div className="absolute top-4 right-4 md:top-10 2xl:right-96 2xl:top-20">
                <GoBackButton />
            </div>
            <h1 className="text-white text-3xl font-bold text-center pt-14 pb-6">
                {
                    t("favoritesMovies")
                }
            </h1>
            <MovieFavorites />
        </main>
    )
}