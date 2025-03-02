import { getTranslations } from "next-intl/server";
import MovieGrid from "../../components/MovieGrid";
import { GoBackButton } from "@/components/GoBackButton";


export default async function trending() {
    const t = await getTranslations("lang")

    return (
        <section className="w-100 relative">
            <div className="absolute top-4 right-4 md:top-10 2xl:right-96 2xl:top-20">
                <GoBackButton />
            </div>
            <h1 className="text-white text-3xl font-bold text-center pt-14 pb-6">
                {
                    t("trendingMovies")
                }
            </h1>
            <MovieGrid category="trending" />
        </section>
    )
}