"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function LanguageToggle() {
    const currentLocale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const [language, setLanguage] = useState(currentLocale)
    
    useEffect(() => {
        setLanguage(currentLocale)
    }, [currentLocale])
    
    const onChange = async () => {
        const newLanguage = language === "es" ? "en" : "es"
        setLanguage(newLanguage)

        router.replace(`/${newLanguage}${pathname.replace(/^\/(es|en)/, "")}`)
    }

    return (
        <label className="relative cursor-pointer inline-block w-12 h-6 overflow-hidden transition md:block">
            <input
                type="checkbox"
                checked={language === "es"}
                onChange={onChange}
                className="hidden peer"
            />
            <span className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full peer-checked:bg-red-700 transition"></span>
            <span className="absolute left-1 top-1 w-4 h-4 bg-white border-2 border-gray-700 rounded-full transition-transform peer-checked:translate-x-6"></span>
            <span className="absolute top-1/2 left-6 transform -translate-y-1/2 text-gray-800 peer-checked:translate-x-6 transition text-xs">
                EN
            </span>
            <span className="absolute top-1/2 -left-4 transform -translate-y-1/2 text-gray-800 peer-checked:translate-x-6 transition text-xs">
                ES
            </span>
        </label>
    )
}