
import HomeHero from "@/[locale]/components/home/HomeHero";
import { getTranslations } from "next-intl/server";


export default async function home() {
  const t = await getTranslations("lang")
  return (
    <>
      <HomeHero />
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mt-4">{t('home')}</h1>
      </div>
    </>
  )
}
