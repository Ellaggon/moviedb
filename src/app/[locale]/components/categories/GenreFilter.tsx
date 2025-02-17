"use client"

import { useState } from "react"

interface Genre {
    id: number,
    name: string
}
interface GenreFilterProps {
    genres: Genre[]
}

export const GenreFilter: React.FC<GenreFilterProps> = ({ genres }) => {
   const [selectedGenres, setSelectedGenres] = useState<number[]>([])
   console.log(selectedGenres)

   const handleSelectedClick = (id: number) => {
    setSelectedGenres((prev) =>
        prev.includes(id) ? prev.filter(el => el !== id) : [...prev, id ]
    )
   }
    return (
        <article className="flex gap-2 overflow-x-auto pb-6 mb-8 ml-6">
            {
                genres.map((el) => (
                    <button 
                        key={el.id}
                        className={`px-4 py-2 rounded-md text-white text-sm hover:scale-95 transition-all ease-in-out duration-500 ${selectedGenres.includes(el.id) ? "bg-red-700" : "bg-gray-700"}`}
                        onClick={() => handleSelectedClick(el.id)}>
                        {el.name}
                    </button>
                ))
            }
        </article>
    )
}