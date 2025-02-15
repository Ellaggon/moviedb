
import { tmdbApi } from "src/api/tmdbApi"

export const getGenres = async (language: string)=> {

    try {
        const params = { language }
        const res = await tmdbApi.genres(params)
        return res.data?.genres ?? []
    } catch (e) {
        console.error("Error fetching genres", e)
        return []
    }
}