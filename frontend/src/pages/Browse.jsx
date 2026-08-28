import MainLayout from "../layout/MainLayout.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faThumbsUp, faStar, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import AnimeCard from "../components/AnimeCard.jsx";
import AnimeList from "../data/animeList.json";

const seeMoreClass =
    "text-purple-600 text-xs sm:text-sm font-semibold flex items-center gap-1 hover:text-purple-800 transition-colors";

function getRecommendedAnime() {
    return [...AnimeList].sort((a, b) => b.rating - a.rating).slice(0, 6);
}

export default function Browse() {
    const recommended = getRecommendedAnime();

    return (
        <MainLayout>
            <div className="browse-container p-2 w-full flex gap-4">
                <div className="left w-[65%]">
                    <div className="card-grid flex flex-wrap justify-center gap-4">
                        {AnimeList.map((anime) => (
                            <AnimeCard key={anime.id} {...anime} className="w-70" />
                        ))}
                    </div>
                </div>

                <div className="right w-[35%] sticky top-4 self-start bg-white h-[85vh] rounded-xl border border-gray-100 shadow-md">
                    <div className="statistic w-full p-5 flex gap-2">
                        <div className="anime-ongoing w-[50%] bg-linear-to-r from-purple-700 to-blue-600 h-45 rounded-xl"></div>
                        <div className="anime-completed w-[50%] bg-linear-to-r from-indigo-700 to-blue-600 h-45 rounded-xl"></div>
                    </div>

                    <div className="flex flex-col gap-6 w-full py-4 px-4 sm:px-6">
                        <div className="w-[95%] mx-auto flex flex-wrap items-center justify-between gap-2">
                            <div className="leading-tight">
                                <h3 className="font-open-sans font-bold text-xl sm:text-2xl text-gray-700 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faThumbsUp} className="text-purple-500" />
                                    Rekomendasi Untukmu
                                </h3>
                                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                                    Dipilih berdasarkan anime yang sedang tren minggu ini
                                </p>
                            </div>
                            <a href="#" className={seeMoreClass}>
                                See more <FontAwesomeIcon icon={faAnglesRight} />
                            </a>
                        </div>

                        <div className="w-[95%] mx-auto flex flex-col gap-3 lg:h-[560px] lg:overflow-y-auto lg:pr-1">
                            {recommended.map((recomed) => (
                                <div
                                    key={recomed.id}
                                    className="w-full flex gap-3 bg-linear-to-l hover:translate-x-1 ease-in transition-all duration-300 from-indigo-800 to-blue-600 border border-gray-200 p-2 rounded-xl hover:shadow-lg"
                                >
                                    <img
                                        src={recomed.image}
                                        alt={recomed.title}
                                        className="w-20 h-30 sm:w-24 sm:h-34 object-cover rounded-md shrink-0"
                                    />
                                    <div className="text-white flex flex-col justify-center gap-1 py-1 min-w-0 flex-1">
                                        <h2 className="font-open-sans font-bold text-sm leading-tight truncate">
                                            {recomed.title}
                                        </h2>
                                        <ul className="flex flex-wrap gap-1">
                                            {recomed.genres.slice(0, 2).map((genre) => (
                                                <li
                                                    key={genre}
                                                    className="border border-gray-300 text-[10px] rounded-md py-0.5 px-1.5"
                                                >
                                                    {genre}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="font-bold flex items-center gap-1">
                                                <FontAwesomeIcon icon={faStar} className="text-yellow-300" /> {recomed.rating}
                                            </span>
                                            <span className="text-gray-300">|</span>
                                            <span>{recomed.episodes} Eps</span>
                                        </div>
                                        <h4 className="text-[11px] font-normal text-gray-200 truncate">
                                            <FontAwesomeIcon icon={faBuilding} /> {recomed.studio}
                                        </h4>
                                        <div className="flex items-center justify-between mt-0.5">
                                            <span className="bg-white/20 py-0.5 px-2 text-[10px] font-semibold rounded-md">
                                                {recomed.status}
                                            </span>
                                            <div className="flex gap-2">
                                                <FontAwesomeIcon
                                                    icon={faHeart}
                                                    className="text-white text-xs cursor-pointer hover:text-red-400 transition-colors"
                                                />
                                                <FontAwesomeIcon
                                                    icon={faBookmark}
                                                    className="text-white text-xs cursor-pointer hover:text-yellow-300 transition-colors"
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