import { useState, useEffect, useMemo } from "react";
import MainLayout from "../layout/MainLayout.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faStar,
  faBuilding,
  faCompass,
  faMagnifyingGlass,
  faCalendarCheck,
  faCalendarDays,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import AnimeCard from "../components/AnimeCard.jsx";
import imgTest from "../assets/imgTest.jpg";
import { useNavigate } from "react-router-dom";

const seeMoreClass =
  "text-purple-600 text-xs sm:text-sm font-semibold flex items-center gap-1 hover:text-purple-800 transition-colors";

export default function Browse() {
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState([]);
  const [countData, setCount] = useState(0);
  const [animeRecomand, setRecomandAnime] = useState([]);
  const [totalOngoing, setTotalOngoing] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  // filter & sort state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const handleDetail = (animeId) => {
    navigate(`/anime/${animeId}`);
  };

  useEffect(() => {
    const dataAnime = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/anime");
        if (!response.ok) {
          throw new Error("Gagal mengambil data anime");
        }
        const data = await response.json();
        console.log("Data dari MySQL:", data);
        setAnimeList(data);
        setCount(data.length);

        const ongoingCount = data.filter(
          (anime) => anime.status === "Ongoing",
        ).length;
        const completedCount = data.filter(
          (anime) => anime.status === "Completed",
        ).length;
        const validRatings = data
          .map((anime) => Number(anime.rating))
          .filter((r) => !Number.isNaN(r) && r > 0);

        const totalRating = validRatings.reduce((total, r) => total + r, 0);
        const average =
          validRatings.length > 0 ? totalRating / validRatings.length : 0;

        setAverageRating(average);
        setTotalCompleted(completedCount);
        setTotalOngoing(ongoingCount);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    dataAnime();
  }, []);

  useEffect(() => {
    const dataRecomand = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recomand");
        if (!response.ok) {
          throw new Error("gagal mengambil data anime");
        }
        const dataAnime = await response.json();
        console.log("Data dari MySql:", dataAnime);
        setRecomandAnime(dataAnime);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    dataRecomand();
  }, []);

  // Filtering + sorting dilakukan di client dari animeList yang sudah di-fetch
  const filteredAnime = useMemo(() => {
    let result = [...animeList];

    // Search by title
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter((anime) =>
        anime.title?.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter) {
      result = result.filter((anime) => anime.status === statusFilter);
    }

    // Sort
    switch (sortBy) {
      case "oldest":
        result.reverse();
        break;
      case "rating":
        result.sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));
        break;
      case "popular":
        result.sort(
          (a, b) => Number(b.popularity ?? b.views ?? 0) - Number(a.popularity ?? a.views ?? 0)
        );
        break;
      case "favorite":
        result.sort(
          (a, b) => Number(b.favorites ?? b.favoriteCount ?? 0) - Number(a.favorites ?? a.favoriteCount ?? 0)
        );
        break;
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "latest":
      default:
        // urutan bawaan dari API dianggap terbaru dulu
        break;
    }

    return result;
  }, [animeList, search, statusFilter, sortBy]);

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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search anime..."
                    className="pl-9 pr-4 py-2 w-full sm:w-56 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <select
                  name="status"
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Status</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Sort By
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  >
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

          {filteredAnime.length > 0 ? (
            <div className="card-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredAnime.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  {...anime}
                  onClick={() => handleDetail(anime.id)}
                  className="w-full"
                />
              ))}
            </div>
          ) : (
            <div className="w-full py-16 flex flex-col items-center justify-center text-center text-gray-500">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-3xl mb-3 text-gray-300"
              />
              <p className="font-medium">Anime tidak ditemukan</p>
              <p className="text-sm">Coba kata kunci pencarian yang lain.</p>
            </div>
          )}
        </div>

        <div className="right w-full lg:w-[35%] lg:sticky lg:top-4 lg:self-start bg-white h-auto lg:h-[90vh] rounded-xl border border-gray-100 shadow-md">
          <div className="statistic w-full h-70 p-4 sm:p-5 grid grid-cols-2 gap-2">
            <div className="bg-linear-to-r from-violet-600 to-purple-600 rounded-2xl px-3 py-6 sm:p-4 shadow-sm">
              <span className="block text-[11px] sm:text-xs font-medium text-white/70">
                Total Anime
              </span>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faBook} className="text-white text-2xl"/>
                {countData}
              </p>
            </div>

            <div className="bg-linear-to-r from-purple-700 to-blue-600 rounded-2xl px-3 py-6 sm:p-4 shadow-sm">
              <span className="block text-[11px] sm:text-xs font-medium text-white/70">
                Anime Ongoing
              </span>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendarDays} className="text-white text-2xl"/>
                {totalOngoing}
              </p>
            </div>

            <div className="bg-linear-to-r from-indigo-700 to-blue-600 rounded-2xl px-3 py-6 sm:p-4 shadow-sm">
              <span className="block text-[11px] sm:text-xs font-medium text-white/70">
                Anime Completed
              </span>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-white text-2xl"/>
                {totalCompleted}
              </p>
            </div>

            <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl px-3 py-6 sm:p-4 shadow-sm">
              <span className="block text-[11px] sm:text-xs font-medium text-white/70">
                Rata-rata Rating
              </span>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-2 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-500 text-2xl"
                  />
                {averageRating.toFixed(1)}
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
            </div>

            <div className="w-[95%] mx-auto flex flex-col gap-2 h-[400px] sm:h-[450px] lg:h-[450px] overflow-y-auto pr-1">
              {animeRecomand.map((recomed) => (
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
                      {(recomed.genres ?? []).slice(0, 2).map((genre) => (
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