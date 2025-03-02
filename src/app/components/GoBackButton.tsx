"use client"

import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { BiArrowBack } from "react-icons/bi"

export const GoBackButton = () => {
    const t = useTranslations("lang")
    const router = useRouter()

    return (
        <button 
            onClick={() => router.back()} 
            className="flex flex-row items-center">
            <BiArrowBack className="mr-1 font-bold text-2xl text-white border-l-4 rounded-full"/>
            <p className="text-sm md:text-md font-bold">{ t("goBack") }</p>
        </button>
    )
}