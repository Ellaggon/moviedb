import { axiosClient } from "./axiosClient"

export const movieType = {
    upcoming: "upcoming",
    popular: "popular"
}
type MovieType = keyof typeof movieType
interface apiParams {
    [key: string]: string | number | boolean | undefined
}
interface categoryParams {
    page?: number,
    language?: string
}

export const tmdbApi = {
    getMovieList : (type: MovieType, params: apiParams) => {
        const url = `movie/${movieType[type]}`
        return axiosClient.get(url, {params})
    },
    getTrendingMoviesList: (params: apiParams) => {
        const url = "trending/movie/day"
        return axiosClient.get(url,{params})
    },
    getVideos: (id: number, params: apiParams ) => {
        const url = `movie/${id}/videos`
        return axiosClient.get(url, { params })
    },
    similar: (id: number, params: apiParams) => {
        const url = `movie/${id}/similar`
        return axiosClient.get(url, {params})
    },
    genres: (params: apiParams) => {
        const url = "genre/movie/list"
        return axiosClient.get(url, { params })
    },
    getMoviesByCategory: (genres: number[], params: categoryParams) => {
        const url = "discover/movie"
        return axiosClient.get(url, {params: {...params, with_genres: genres.join(",")}})
    }
}