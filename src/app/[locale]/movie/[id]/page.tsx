import { GoBackButton } from "@/components/GoBackButton";
import { getTranslations } from "next-intl/server";
import { BsFillPlayFill } from "react-icons/bs";
import apiConfig from "src/api/apiConfig";
import { tmdbApi } from "src/api/tmdbApi";
import MovieList from "src/app/components/MovieList"


export default async function MovieDetail({ params }: { params: { id: string }}) {
  const t = await getTranslations("lang");

  if(!params || !params?.id){
    return <p className="text-center text-gray-400">Movie not found</p>
  }

  const movieId = Number(params?.id)
  if (isNaN(movieId)) {
    return <p className="text-center text-gray-400">Movie not found</p>
  }

  let res;
  try {
    res = await tmdbApi.detail(movieId.toString(), { language: t("lang") })
    if (!res?.data) throw new Error("No movie data");

    const movie = res?.data;
    const bg = apiConfig.originalImage(movie.backdrop_path || movie.poster_path);
    const poster = apiConfig.originalImage(movie.poster_path || movie.backdrop_path);
  
    return (
      <main className="flex flex-col items-center gap-6 relative">
        {/* background image */}
        <div className="absolute top-4 right-4 md:top-10 2xl:top-20 2xl:right-96 z-10">
          <GoBackButton />
        </div>
        <div 
          className="w-full h-full top-0 left-0 absolute -z-10 bg-black bg-opacity-70" 
          style={{backgroundImage: `url(${poster})`, 
          backgroundBlendMode: "multiply", backgroundSize: "cover", backgroundPosition: "center" }}>
        </div>

        <section className="w-full md:w-4/5 lg:w-3/5 my-14 md:my-20 flex flex-col md:flex-row justify-center items-center gap-9">
  
            {/* img card */}
            <article className="relative h-[600px] md:h-[400px] lg:h-[600px] md:w-1/2 lg:w-1/2 ">
              <img src={bg} alt={movie.title} className="w-full h-full object-cover md:rounded-2xl" />
              <div className="absolute h-full inset-0 bg-cover bg-gradient-to-l from-transparent via-transparent to-black/100 z-10 md:rounded-xl"></div>
              <div className="absolute h-full inset-0 bg-cover bg-gradient-to-b from-transparent via-transparent to-black/50 md:to-black/100 z-10 md:rounded-xl"></div>
            </article>

            {/* info card */}
            <article className="lg:w-1/2 max-h-[620px] container text-center md:text-start flex flex-col justify-center gap-3 relative">
              <p className="md:text-xl">★ {movie.vote_average.toFixed(1)}</p>
              <h2 className="text-2xl text-3xl font-bold mb-4">{movie.title}</h2>
              <p className="text-gray-300 md:text-lg font-semibold">{movie.overview || t("noOverview")}</p>
              <div className="flex space-x-4 text-gray-400 text-sm mb-4">
                {/* <span>{category || "Search"}</span> */}
              </div>
              <div className="flex gap-4 flex justify-center">
                <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">
                  <BsFillPlayFill className="mr-2" /> {t("playTrailer")}
                </button>
              </div>
            </article>
        </section>

        {/* similar movies */}
        <section className="container p-2">
          <h2 className="text-xl md:text-3xl font-semibold md:font-bold mb-6">{t("similarMovies")}</h2>
          <MovieList id={movieId} category="similar" />
        </section>
      </main>
    );

  } catch (e) {
    console.error("Error fetching movie detail: ", e);
    return <p className="text-center text-gray-400">Error loading movie</p>
  }
};