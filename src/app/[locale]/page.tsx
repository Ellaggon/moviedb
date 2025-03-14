
import { getTranslations } from "next-intl/server";
import HomeHero from "../components/home/HomeHero";
import { MoviePreview } from "../components/home/MoviePreview";

export default async function home() {
  const t = await getTranslations("lang")
  return (
    <>
      <div className="text-center relative">

        {/* Skeleton loading */}
        <div className="absolute object-cover w-full h-[600px] bg-gray-700 animate-pulse z-10"></div>

        <HomeHero />
        <div className="p-6">
          <MoviePreview title={t("trending")} category="trending" redirect={`${t("lang")}/trending`} />
          <MoviePreview title={t("popular")} category="popular" redirect={`${t("lang")}/popular`} />
          <MoviePreview title={t("upcoming")} category="upcoming" redirect={`${t("lang")}/upcoming`} />
        </div>
      </div>
    </>
  )
}
