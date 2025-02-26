import Link from "next/link"
import MovieSwipe from "./MovieList"
import { OutlineButton } from "./SeeAllButton"
import { getTranslations } from "next-intl/server"

interface MoviePreviewProps {
    title: string,
    category: string,
    redirect: string,
    id?: number
}

export async function MoviePreview({ title, category, redirect, id }: MoviePreviewProps) {
    const t = await getTranslations("lang")
    return (
        <section className="mb-10">
            <div className="max-w-screen-lg mx-auto">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
                    {
                        category !== "similar" && (
                            <Link href={redirect}>
                                <OutlineButton className="px-4 py-2 border border-white rounded text-white text-sm hover:bg-white hover:text-black transition">
                                    {t("seeAll")}
                                </OutlineButton>
                            </Link>
                        )
                    }
                </div>
                <MovieSwipe category={category} id={id ?? 0} />
            </div>
        </section>
    )
}