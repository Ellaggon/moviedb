"use client"

import { useTranslations } from "use-intl"
import { useEffect, useRef, useState } from "react"
import { tmdbApi } from "src/api/tmdbApi"
import MovieCard from "../MovieCard"
import { Pagination } from "../Pagination"
import { SkeletonMovies } from "./SkeletonMovies"

import { MovieDetail } from "src/types/movieTypes"

interface GenreMovieProps {
    selectedGenres: number[]
}

export const GenreMovies = ({ selectedGenres }: GenreMovieProps) => {
    const t = useTranslations("lang")

    const [listMovies, setListMovies] = useState<MovieDetail[]>([])
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const observer = useRef<IntersectionObserver | null>(null)


    // function to detect the screen size
    useEffect(()=> {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 1020)
        }
        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)
    }, [])

    // Function to re-render if the selected genres are changed (selectedGenres)
    useEffect(() => {
        setCurrentPage(1)
        setListMovies([])
    }, [selectedGenres])

    // uploading movies by category
    useEffect(() => {
        const getList = async () => {
            if(hasMore) return
            setHasMore(true)
            
            const params = {
                page: currentPage || 1,
                language: `${ t("lang") }`,
            }

            try {
                const { data } = await tmdbApi.getMoviesByCategory(selectedGenres, params)
                const { results, total_pages } = data
                
                setTotalPage(total_pages)
                setListMovies(
                    (prev) => {
                            const existingIds = new Set(prev.map(movie => (movie.id)))
                            const newMovies = results.filter((movie: MovieDetail) => !existingIds.has(movie.id))
                            if(isMobile) {
                                return currentPage === 1 ? results : [...prev, ...newMovies]
                            } else {
                                return results
                            }
                        }
                    )
                
            } catch (e) {
                console.error("Error fetching list movies :", e)
            } finally {
                setLoading(false)
                setHasMore(false)
            }
        }
        getList()
    }, [selectedGenres, currentPage, t])

    // pagination function
    const handlePagination = (newPage: number) => {
        setCurrentPage(newPage)
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    // infinite scroll function
    const lastMovieRef = (node: HTMLAnchorElement | null) => {
        if(!node || !isMobile) return
        if(observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if(entry.isIntersecting && currentPage < totalPage && !loading){
                            setCurrentPage(prev => prev + 1)
                        }
                    })
            },
            { threshold: 1.0 }
        )
            observer.current.observe(node)
    }

    return (
        <section className="flex flex-col justify-center">
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${(loading || hasMore) && "mx-3" }`}>
                {
                    listMovies.map((movie, i) => (
                        <MovieCard key={movie.id} item={movie} ref={i === listMovies.length - 1 ? lastMovieRef : null} />
                    ))
                }
                {
                    (loading || hasMore) && (
                        Array(8).fill(0).map((_, index) => <SkeletonMovies key={index} />)
                    )
                }
            </div>

            <Pagination category="categories" totalPages={totalPage} currentPage={currentPage} sendPage={handlePagination}/>
        </section>
    )
}
