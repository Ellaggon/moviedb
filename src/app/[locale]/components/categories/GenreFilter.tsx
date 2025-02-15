"use client"

interface Genre {
    id: number,
    name: string
}
interface GenreFilterProps {
    genres: Genre[]
}

export const GenreFilter: React.FC<GenreFilterProps> = ({ genres }) => {
   console.log(genres)
    return (
        <article className="flex gap-2 overflow-x-auto pb-6 mb-8 ml-6">
            {
                genres.map((el) => (
                    <button 
                        key={el.id}
                        className="px-4 py-2 rounded-md text-white text-sm transition-colors bg-gray-700 hover:bg-red-500">
                        {el.name}
                    </button>
                ))
            }
        </article>
    )
}