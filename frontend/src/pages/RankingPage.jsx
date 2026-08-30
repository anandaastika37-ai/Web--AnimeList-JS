import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layout/MainLayout.jsx";
import {
  faTrophy,
  faCrown,
  faMedal,
  faStar,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import AnimeList from "../data/animeList.json";

const FILTERS = [
  { key: "all", label: "All Time" },
  { key: "monthly", label: "Monthly" },
  { key: "weekly", label: "Weekly" },
];

export default function RankingPage() {
  const [filter, setFilter] = useState("all");

  // Catatan: filter weekly/monthly masih placeholder UI.
  // Sesuaikan logikanya kalau animeList.json sudah punya field views/timeframe.
  const ranked = useMemo(() => {
    return [...AnimeList]
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .map((anime, index) => ({ ...anime, rank: index + 1 }));
  }, [filter]);

  const podium = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  // Urutan tampil di podium: #2 - #1 - #3
  const podiumOrder = [podium[1], podium[0], podium[2]].filter(Boolean);
  const podiumStyle = {
    1: { crown: faCrown, crownColor: "text-yellow-400", ring: "ring-yellow-400", badge: "bg-yellow-400", size: "w-28 h-40 sm:w-32 sm:h-44" },
    2: { crown: faMedal, crownColor: "text-gray-300", ring: "ring-gray-300", badge: "bg-gray-300", size: "w-24 h-32 sm:w-28 sm:h-36" },
    3: { crown: faMedal, crownColor: "text-amber-600", ring: "ring-amber-600", badge: "bg-amber-600", size: "w-24 h-32 sm:w-28 sm:h-36" },
  };

  return (
    <MainLayout>
      <div className="w-full h-auto pt-17 flex flex-col items-center">
        {/* Header */}
        <div className="header w-[90%] lg:w-[85%] border border-gray-200 bg-white px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 rounded-lg">
          <div>
            <h2 className="font-semibold text-xl text-gray-800 flex items-center gap-2">
              <FontAwesomeIcon icon={faTrophy} className="text-yellow-500" />
              Ranking
            </h2>
            <p className="text-sm text-gray-600">
              Anime paling populer berdasarkan rating dan jumlah penonton.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  filter === f.key
                    ? "bg-indigo-900 text-white shadow"
                    : "text-gray-600 hover:text-indigo-900"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Podium Top 3 */}
        {podiumOrder.length > 0 && (
          <div className="podium w-[90%] lg:w-[85%] mt-10 flex items-end justify-center gap-4 sm:gap-10">
            {podiumOrder.map((anime) => {
              const style = podiumStyle[anime.rank];
              return (
                <div key={anime.id} className="flex flex-col items-center">
                  <FontAwesomeIcon
                    icon={style.crown}
                    className={`text-2xl mb-2 ${style.crownColor}`}
                  />
                  <div className={`relative ${style.size} rounded-xl overflow-hidden ring-4 ${style.ring} shadow-lg bg-gray-100`}>
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-1.5 left-1.5 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white ${style.badge}`}
                    >
                      {anime.rank}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-gray-800 text-center line-clamp-2 w-24 sm:w-28">
                    {anime.title}
                  </p>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    {anime.rating ?? "-"}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Daftar ranking selanjutnya */}
        <div className="content w-[90%] lg:w-[85%] py-8">
          <div className="flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white overflow-hidden">
            {rest.map((anime) => (
              <div
                key={anime.id}
                className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-all"
              >
                <span className="w-8 text-center font-bold text-gray-400">
                  {anime.rank}
                </span>
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 truncate">
                    {anime.title}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {Array.isArray(anime.genre) ? anime.genre.join(", ") : anime.genre}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-sm text-gray-600 w-16 justify-end">
                  <FontAwesomeIcon icon={faEye} className="text-gray-400" />
                  {anime.views ?? "-"}
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 w-14 justify-end">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  {anime.rating ?? "-"}
                </div>
              </div>
            ))}

            {rest.length === 0 && podiumOrder.length === 0 && (
              <p className="text-center text-gray-400 py-10 text-sm">
                Belum ada data anime untuk ditampilkan.
              </p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}