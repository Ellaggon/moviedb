
export type SearchParams = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export type MovieDetail = {
    id: number
    title: string
    name?: string
    poster_path: string
    backdrop_path?: string
    overview?: string
}