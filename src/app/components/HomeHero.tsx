"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/router";
// import { useTranslation } from "react-i18next";

// import tmdbApi, { category, movieType } from "../../api/tmdbApi";
// import apiConfig from "../../api/apiConfig";
// import TrailerModal from "../trailer-modal/TrailerModal";
// import { BsFillPlayFill } from "react-icons/bs";
// import { AiFillInfoCircle } from "react-icons/ai";

import "./home-hero.scss";

// Definir interfaces para tipado de datos
interface Movie {
  id: number;
  title: string;
  backdrop_path?: string;
  poster_path?: string;
  overview?: string;
  vote_average?: number;
  runtime?: number;
}

interface HomeHeroItemProps {
  item: Movie;
  setPlayTrailer: (value: boolean) => void;
}

const HomeHero = () => {
  // const [t] = useTranslation("global");
  // const router = useRouter();

  const [movieItems, setMovieItems] = useState<Movie[]>([]);
  const [movieItem, setMovieItem] = useState<Movie | null>(null);
  const [playTrailer, setPlayTrailer] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const params = { page: 1 /* , language: `${t("lang.langAPI")}` */ };
        // const response = await tmdbApi.getMoviesList(movieType.popular, { params });

        // setMovieItems(response.results.slice(1, 9));

        function getIndexRandom(min: number, max: number): number {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const randomIndex = getIndexRandom(0, 9);
        // const randomMovie = await tmdbApi.detail(response.results[randomIndex].id, { params });

        // setMovieItem(randomMovie);
      } catch (error) {
        console.log("ERROR", error);
      }
    };

    getMovies();
  }, []);

  return (
    <div className="homeHero">
      {movieItem && <HomeHeroItem key={0} item={movieItem} setPlayTrailer={setPlayTrailer} />}
      {/* {playTrailer && movieItem && <TrailerModal item={movieItem} setPlayTrailer={setPlayTrailer} playTrailer={playTrailer} />} */}
    </div>
  );
};

const HomeHeroItem: React.FC<HomeHeroItemProps> = ({ item, setPlayTrailer }) => {
  // const [t] = useTranslation("global");

  // const background = apiConfig.originalImage(item.backdrop_path || item.poster_path || "");
  const link = `/popular/${item.id}`;

  return (
    <div className="relative flex flex-col md:max-w-[calc(100%-140px)] sm:max-w-[calc(100%-50px)] mx-auto">
      {/* <div
        className="absolute flex w-[82%] h-[713px] top-5 right-0 bg-cover bg-center shadow-lg md:w-full md:h-[70vh] md:opacity-80 sm:rounded-[11%]"
        style={{ backgroundImage: `url(${background})` }}
      ></div> */}

      <div className="flex flex-col items-start justify-end h-screen pb-24 max-w-lg md:pb-[25%] md:h-[70vh] sm:items-center sm:pb-24 sm:h-screen">
        <div className="flex items-center gap-4 text-xl shadow-md md:text-2xl sm:text-2xl">
          {/* <span className="text-yellow-400">★</span> {formatVoteAverage(item.vote_average)} • {formatRunTime(item.runtime)} • */}
          <span className="px-2 py-1 text-sm font-bold bg-yellow-400 rounded-md md:text-lg sm:text-lg">POPULAR</span>
        </div>

        <h2 className="mt-4 text-4xl font-semibold md:text-5xl sm:text-center">{item.title}</h2>
        <p className="mt-2 text-lg leading-6 line-clamp-4 md:text-xl md:line-clamp-5 sm:hidden">{item.overview}</p>

        <div className="flex items-center gap-4 mt-4">
          <button
            className="flex items-center gap-2 px-4 py-3 text-white bg-yellow-400 rounded-lg shadow-md md:text-lg hover:bg-opacity-80"
            onClick={() => setPlayTrailer(true)}
          >
            {/* <BsFillPlayFill className="text-xl md:text-2xl" /> Play Trailer */}
          </button>

          <Link href={link} className="flex items-center gap-2 px-4 py-3 text-white bg-gray-600 rounded-lg shadow-md md:text-lg hover:bg-opacity-80">
            {/* <AiFillInfoCircle className="text-xl md:text-2xl" /> */}
            <span className="sm:hidden">Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;