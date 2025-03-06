import { getTranslations } from "next-intl/server"

export default async function Footer () {
    const t = await getTranslations("lang")    
    return (
        <footer className="text-center text-sm py-3 md:py-6 font-thin flex flex-row items-center justify-center">
            © <span className="hidden md:block mx-1">{ t("footer") }</span> | Akeus inc 2025
        </footer>
    )
}