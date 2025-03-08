"use client"

import { useRouter } from "next/navigation"
import { useTranslations } from "use-intl"

type PaginationProps = {
    totalPages: number
    category: string
    currentPage: number
    query?: string | string[] |undefined
    sendPage?: (page: number) => void
}

export const Pagination = ({category, totalPages, currentPage, query, sendPage}:  PaginationProps) => {
    const t = useTranslations("lang")
    const route = useRouter()

    const createPageUrl = (newPage: number) => {
        let url: string
        if (query) {
            url = `/${t("lang")}/search?name=${query}&page=${newPage}`
            route.push(url)
        }
        if (category != "search") {
            url = `/${t("lang")}/${category}?page=${newPage}`
            route.push(url)
        }
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    const maxPagesToShow = 5
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    // const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
    // console.log("startPage", startPage)
    // console.log("endPage", endPage)

    return (
        <div className="hidden lg:flex justify-center space-x-2 mt-6 pt-10">
            <button 
                onClick={() => sendPage ? sendPage(currentPage - 1) : createPageUrl(currentPage - 1)}
                disabled={ currentPage === 1 }
                className={`px-4 py-2 border rounded-lg ${
                    currentPage === 1 ? "bg-black-900 text-gray-900 cursor-not-allowed" : "bg-gray-800 text-white"
                }`}>
                ← Anterior
            </button>
            {
                Array.from({length: 10}, ((_, i) => startPage + i)).map(page => (
                    <button 
                        key={page}
                        onClick={() => sendPage ? sendPage(page) : createPageUrl(page)}
                        disabled={page > totalPages}
                        className={`px-4 py-2 border rounded-lg font-bold hover:bg-red-900 ${
                            page === currentPage ? "bg-red-700 text-white" : "bg-black"
                        }${
                            page > totalPages ? "cursor-not-allowed bg-black-900 text-gray-900 hover:bg-black": ""
                            }`}>
                            { page }
                    </button>
                ))
            }
            <button 
                onClick={() => sendPage ? sendPage(currentPage + 1) : createPageUrl(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`px-4 py-2 border rounded-lg ${
                    currentPage === totalPages ? "bg-black-900 text-gray-900 cursor-not-allowed" : "bg-gray-800 text-white"
                }`}>
                Siguiente →
            </button>
        </div>
    )
}