import MainLayout from "../layout/MainLayout.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faThumbsUp,
  faStar,
  faBuilding,
  faCompass,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import AnimeCard from "../components/AnimeCard.jsx";
import AnimeList from "../data/animeList.json";
import imgTest from "../assets/imgTest.jpg";
const seeMoreClass =
  "text-purple-600 text-xs sm:text-sm font-semibold flex items-center gap-1 hover:text-purple-800 transition-colors";

function getRecommendedAnime() {
  return [...AnimeList].sort((a, b) => b.rating - a.rating).slice(0, 15);
}

export default function Browse() {
  const recommended = getRecommendedAnime();

  return (
    <MainLayout>
      <div className="browse-container pt-24 px-2 pb-2 sm:px-4 sm:pb-4 w-full flex flex-col lg:flex-row gap-4">
        <div className="left w-full lg:w-[65%] px-2 sm:px-5">
          <div className="header-browser mb-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="leading-tight">
                <h2 className="font-open-sans font-bold text-xl sm:text-2xl text-gray-700 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCompass}
                    className="text-violet-700"
                  />
                  All Anime
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Find your favorite anime here
                </p>
              </div>

              <div className="filter flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                <div className="relative w-full sm:w-auto">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 text-sm pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Search anime..."
                    className="pl-9 pr-4 py-2 w-full sm:w-56 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <select
                  name="status"
                  id="status"
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Status</option>
                  <option value="Currently Airing">Ongoing</option>
                  <option value="Finished Airing">Completed</option>
                </select>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Sort By
                  </span>
                  <select className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popular">Most Popular</option>
                    <option value="favorite">Most Favorited</option>
                    <option value="az">Title A-Z</option>
                    <option value="za">Title Z-A</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="card-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {AnimeList.map((anime) => (
              <AnimeCard key={anime.id} {...anime} className="w-full" />
            ))}
          </div>
        </div>

        <div className="right w-full lg:w-[35%] lg:sticky lg:top-4 lg:self-start bg-white h-auto lg:h-[90vh] rounded-xl border border-gray-100 shadow-md">
          <div className="statistic w-full p-4 sm:p-5 grid grid-cols-2 gap-3">
            <div className="bg-linear-to-r from-violet-600 to-purple-600 rounded-2xl p-3 sm:p-4 shadow-sm">
              <span className="block text-[11px] sm:text-xs font-medium text-white/70">
                Total Anime
              </span>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-2">
                1,240
              </p>
            </div>

            <div className="bg-linear-to-r from-purple-700 to-blue-600 rounded-2xl p-3 sm:p-4 shadow-sm">
              <span className="block text-[11px] sm:text-xs font-medium text-white/70">
                Anime Ongoing
              </span>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-2">
                128
              </p>
            </div>

            <div className="bg-linear-to-r from-indigo-700 to-blue-600 rounded-2xl p-3 sm:p-4 shadow-sm">
              <span className="block text-[11px] sm:text-xs font-medium text-white/70">
                Anime Completed
              </span>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-2">
                342
              </p>
            </div>

            <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl p-3 sm:p-4 shadow-sm">
              <span className="block text-[11px] sm:text-xs font-medium text-white/70">
                Rata-rata Rating
              </span>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-2">
                8.4
              </p>
            </div>

          </div>

          <div className="flex flex-col gap-6 w-full py-4 px-4 sm:px-6">
            <div className="w-[95%] mx-auto flex flex-wrap items-center justify-between gap-2">
              <div className="leading-tight">
                <h3 className="font-open-sans font-bold text-md sm:text-xl text-gray-700 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className="text-purple-500"
                  />
                  Rekomendasi Untukmu
                </h3>
                <p className="text-gray-500 text-xs sm:text-xs mt-1">
                  Dipilih berdasarkan anime yang sedang tren minggu ini
                </p>
              </div>
              {/* <a href="#" className={seeMoreClass}>
                                See more <FontAwesomeIcon icon={faAnglesRight} />
                            </a> */}
            </div>

            <div className="w-[95%] mx-auto flex flex-col gap-2 h-[400px] sm:h-[450px] lg:h-[500px] overflow-y-auto pr-1">
              {recommended.map((recomed) => (
                <div
                  key={recomed.id}
                  className="w-full flex gap-2 bg-linear-to-l hover:translate-x-1 ease-in transition-all duration-300 from-indigo-800 to-blue-600 border border-gray-200 p-1.5 rounded-lg hover:shadow-lg"
                >
                  <img
                    src={imgTest}
                    alt={recomed.title}
                    className="w-14 h-20 sm:w-16 sm:h-24 object-cover rounded-md shrink-0"
                  />
                  <div className="text-white flex flex-col justify-center gap-0.5 py-0.5 min-w-0 flex-1">
                    <h2 className="font-open-sans font-bold text-xs leading-tight truncate">
                      {recomed.title}
                    </h2>
                    <ul className="flex flex-wrap gap-1">
                      {recomed.genres.slice(0, 2).map((genre) => (
                        <li
                          key={genre}
                          className="border border-gray-300 text-[9px] rounded-md py-0.5 px-1"
                        >
                          {genre}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="font-bold flex items-center gap-1">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-300"
                        />{" "}
                        {recomed.rating}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span>{recomed.episodes} Eps</span>
                    </div>
                    <h4 className="text-[10px] font-normal text-gray-200 truncate">
                      <FontAwesomeIcon icon={faBuilding} /> {recomed.studio}
                    </h4>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="bg-white/20 py-0.5 px-1.5 text-[9px] font-semibold rounded-md">
                        {recomed.status}
                      </span>
                      <div className="flex gap-2">
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="text-white text-[10px] cursor-pointer hover:text-red-400 transition-colors"
                        />
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="text-white text-[10px] cursor-pointer hover:text-yellow-300 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}