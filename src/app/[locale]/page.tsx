
import { getTranslations } from "next-intl/server";
import HomeHero from "./components/home/HomeHero";
import {MoviePreview} from "./components/home/MoviePreview";

export default async function home() {
  const t = await getTranslations("lang")
  return (
    <>
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mt-4">{t('home')}</h1>
        <HomeHero />
        <MoviePreview title={t("trending")} category="trending" redirect={`${t("lang")}/trending`}/>
        <MoviePreview title={t("popular")} category="popular" redirect={`${t("lang")}/popular`}/>
        <MoviePreview title={t("upcoming")} category="upcoming" redirect={`${t("lang")}/upcoming`}/>
      </div>
    </>
  )
}
