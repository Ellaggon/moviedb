import { GoBackButton } from "@/components/GoBackButton";
import { TrailerPlay } from "@/components/TrailerPlay";
import { getTranslations } from "next-intl/server";
import apiConfig from "src/api/apiConfig";
import { tmdbApi } from "src/api/tmdbApi";
import MovieList from "src/app/components/MovieList"
import { formatRunTime } from "@/utils/utils";


export default async function MovieDetail({ params }: { params: Promise<{ id: string }>}) {
  const t = await getTranslations("lang");
  const movieId = (await params).id

  let res;
  try {
    res = await tmdbApi.detail(movieId.toString(), { language: t("lang") })
    if (!res?.data) throw new Error("No movie data");

    const movie = res?.data;
    const category = movie.genres.map((el: {name: string}) => el.name).join(" - ")
    const company = movie.production_companies.map((el: {name: string}) => el.name)
    const country = movie.production_countries.map((el: {name: string}) => el.name)

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
            <article className="relative h-[600px] md:h-[400px] lg:h-[600px] md:w-1/2 lg:w-1/2 xl:w-1/3 ">
              <img src={bg} alt={movie.title} className="w-full h-full object-cover md:rounded-2xl" />
              <div className="absolute h-full inset-0 bg-cover bg-gradient-to-l from-transparent via-transparent to-black/80 z-10 md:rounded-xl"></div>
              <div className="absolute h-full inset-0 bg-cover bg-gradient-to-b from-transparent via-transparent to-black/50 md:to-black/80 z-10 md:rounded-xl"></div>
            </article>

            {/* info card */}
            <article className="lg:w-1/2 max-h-[620px] container text-center md:text-start flex flex-col justify-center gap-6 relative">
              <p className="md:text-xl flex justify-center md:justify-start gap-9">
                <span>★ {movie.vote_average.toFixed(1)}</span>
                <span>-</span>
                <span>{formatRunTime(movie.runtime)}</span>
              </p>
              <h2 className="text-2xl text-3xl font-bold mb-4">{movie.title}</h2>
              <p className="text-gray-300 md:text-lg font-semibold">{movie.overview || t("noOverview")}</p>
              <div className="flex justify-center space-x-4 text-gray-400 text-sm mb-4">
                <span className="text-bold">{category || ""}</span>
              </div>
              {
                country.length > 0 &&
                <div className="flex justify-around space-x-4 text-gray-400 text-sm">
                  <span className="text-white">{t("country")}</span>
                  <span>{country || ""}</span>
                </div>
              }
              {
                company.length > 0 &&
                <div className="flex justify-around space-x-4 text-gray-400 text-sm mb-4">
                  <span className="text-white">{t("company")}</span>
                  <span >{company || ""}</span>
                </div>
              }
              <div className="flex justify-center items-center mt-6">
                <TrailerPlay movie={ movie }/>
              </div>
            </article>
        </section>

        {/* similar movies */}
        <section className="container p-2">
          <h2 className="text-xl md:text-3xl font-semibold md:font-bold mb-6">{t("similarMovies")}</h2>
          <MovieList id={parseInt(movieId)} category="similar" />
        </section>
      </main>
    );

  } catch (e) {
    console.error("Error fetching movie detail: ", e);
    return <p className="text-center text-gray-400">Error loading movie</p>
  }
};