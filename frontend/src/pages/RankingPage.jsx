import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layout/MainLayout.jsx";
import {
  faTrophy,
  faCrown,
  faMedal,
  faStar,
  faFilm,
  faBuilding,
  faSearch,
  faTriangleExclamation,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import imgTest from "../assets/imgTest.jpg";

const FILTERS = [
  { key: "all", label: "All Time" },
  { key: "monthly", label: "Monthly" },
  { key: "weekly", label: "Weekly" },
];

// Helper: ambil tanggal mulai tayang dari string "YYYY-MM-DD - Present"
function parseAiredStart(anime) {
  const raw = anime.aired?.split(" - ")?.[0];
  const date = raw ? new Date(raw) : null;
  return date && !isNaN(date) ? date : null;
}

export default function RankingPage() {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchAnime = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/anime");
      if (!response.ok) throw new Error("Gagal mengambil data anime");
      const data = await response.json();
      setAnimeData(data);
    } catch (err) {
      console.error("Error:", err);
      setError("Tidak bisa memuat data ranking. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  // Catatan: API belum punya field "views/popularity" terpisah untuk
  // periode mingguan/bulanan. Sebagai gantinya, Monthly & Weekly
  // memprioritaskan anime yang tayang lebih baru, lalu diurutkan rating.
  // Ganti bagian ini dengan field views/popularity asli begitu tersedia.
  const ranked = useMemo(() => {
    let list = [...animeData];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((a) => a.title?.toLowerCase().includes(q));
    }

    if (filter === "monthly" || filter === "weekly") {
      const days = filter === "weekly" ? 7 : 30;
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days * 6); // window longgar krn data historis

      const recent = list.filter((a) => {
        const start = parseAiredStart(a);
        return start && start >= cutoff;
      });

      const base = recent.length > 0 ? recent : list;
      list = [...base].sort((a, b) => {
        const dateA = parseAiredStart(a) ?? new Date(0);
        const dateB = parseAiredStart(b) ?? new Date(0);
        if (dateB - dateA !== 0) return dateB - dateA;
        return (b.rating ?? 0) - (a.rating ?? 0);
      });
    } else {
      list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return list.map((anime, index) => ({ ...anime, rank: index + 1 }));
  }, [animeData, filter, search]);

  const podium = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  // Urutan tampil di podium: #2 - #1 - #3
  const podiumOrder = [podium[1], podium[0], podium[2]].filter(Boolean);

  const podiumStyle = {
    1: {
      crown: faCrown,
      crownColor: "text-yellow-400",
      ring: "ring-yellow-400",
      badge: "bg-gradient-to-br from-yellow-300 to-yellow-500",
      glow: "shadow-[0_0_35px_rgba(250,204,21,0.45)]",
      size: "w-28 h-40 sm:w-36 sm:h-52",
    },
    2: {
      crown: faMedal,
      crownColor: "text-slate-300",
      ring: "ring-slate-300",
      badge: "bg-gradient-to-br from-slate-200 to-slate-400",
      glow: "shadow-[0_0_20px_rgba(203,213,225,0.35)]",
      size: "w-24 h-32 sm:w-28 sm:h-40",
    },
    3: {
      crown: faMedal,
      crownColor: "text-amber-500",
      ring: "ring-amber-500",
      badge: "bg-gradient-to-br from-amber-400 to-amber-700",
      glow: "shadow-[0_0_20px_rgba(217,119,6,0.35)]",
      size: "w-24 h-32 sm:w-28 sm:h-40",
    },
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen pt-24 pb-16 flex flex-col items-center bg-gray-50">
        {/* Header */}
        <div className="header w-[95%] lg:w-[85%] border border-gray-200 bg-gradient-to-r from-indigo-950 via-blue-900 to-indigo-950 px-6 sm:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="z-10">
            <h2 className="font-open-sans font-extrabold text-2xl sm:text-3xl text-white flex items-center gap-3">
              <div className="bg-yellow-400/20 p-2 rounded-lg text-yellow-400">
                <FontAwesomeIcon icon={faTrophy} />
              </div>
              Ranking Anime
            </h2>
            <p className="text-sm text-sky-200/80 mt-1 ml-1">
              Anime paling populer berdasarkan rating dan tren penayangan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-10">
            {/* Search */}
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-300/70 text-sm"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari judul anime..."
                className="pl-9 pr-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-white placeholder:text-sky-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-56 backdrop-blur-sm"
              />
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm p-1 rounded-lg w-fit border border-white/10">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                    filter === f.key
                      ? "bg-white text-indigo-900 shadow"
                      : "text-sky-100 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error state */}
        {error && !loading && (
          <div className="w-[95%] lg:w-[85%] mt-8 flex flex-col items-center gap-3 bg-red-50 border border-red-200 rounded-xl py-10 px-4 text-center">
            <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-500 text-2xl" />
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={fetchAnime}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faRotateRight} /> Coba Lagi
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="w-[95%] lg:w-[85%] mt-10 animate-pulse">
            <div className="flex items-end justify-center gap-4 sm:gap-10 mb-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-24 sm:w-32 h-32 sm:h-44 bg-gray-200 rounded-xl" />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Podium Top 3 */}
            {podiumOrder.length > 0 && (
              <div className="podium w-[95%] lg:w-[85%] mt-10 flex items-end justify-center gap-4 sm:gap-10">
                {podiumOrder.map((anime) => {
                  const style = podiumStyle[anime.rank];
                  return (
                    <a
                      href={`/anime/${anime.id}`}
                      key={anime.id}
                      className="flex flex-col items-center group"
                    >
                      <FontAwesomeIcon
                        icon={style.crown}
                        className={`text-2xl sm:text-3xl mb-2 ${style.crownColor} drop-shadow`}
                      />
                      <div
                        className={`relative ${style.size} rounded-xl overflow-hidden ring-4 ${style.ring} ${style.glow} bg-gray-100 transition-transform duration-300 group-hover:-translate-y-2`}
                      >
                        <img
                          src={anime.image || imgTest}
                          alt={anime.title}
                          className="w-full h-full object-cover"
                        />
                        <span
                          className={`absolute top-1.5 left-1.5 w-7 h-7 flex items-center justify-center rounded-full text-xs font-extrabold text-white shadow ${style.badge}`}
                        >
                          {anime.rank}
                        </span>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent h-10" />
                      </div>
                      <p className="mt-2 text-sm font-semibold text-gray-800 text-center line-clamp-2 w-24 sm:w-32 group-hover:text-indigo-600 transition-colors">
                        {anime.title}
                      </p>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        {anime.rating ?? "-"}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}

            {/* Daftar ranking selanjutnya */}
            <div className="content w-[95%] lg:w-[85%] py-8">
              <div className="flex flex-col divide-y divide-gray-100 border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm">
                {rest.map((anime) => (
                  <a
                    href={`/anime/${anime.id}`}
                    key={anime.id}
                    className="flex items-center gap-4 px-4 sm:px-6 py-3 hover:bg-indigo-50/50 transition-colors group"
                  >
                    <span className="w-8 text-center font-bold text-gray-400 group-hover:text-indigo-500 transition-colors">
                      {anime.rank}
                    </span>
                    <img
                      src={anime.image || imgTest}
                      alt={anime.title}
                      className="w-12 h-16 sm:w-14 sm:h-18 object-cover rounded-md flex-shrink-0 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 truncate group-hover:text-indigo-700 transition-colors">
                        {anime.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        {(anime.genres ?? []).slice(0, 2).map((g) => (
                          <span
                            key={g}
                            className="text-[10px] sm:text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-md px-2 py-0.5"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                      {anime.studio && (
                        <p className="text-xs text-gray-400 mt-1 truncate">
                          <FontAwesomeIcon icon={faBuilding} className="mr-1" />
                          {anime.studio}
                        </p>
                      )}
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-sm text-gray-600 w-16 justify-end shrink-0">
                      <FontAwesomeIcon icon={faFilm} className="text-gray-400" />
                      {anime.episodes ?? "-"}
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-gray-700 w-14 justify-end shrink-0">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                      {anime.rating ?? "-"}
                    </div>
                  </a>
                ))}

                {rest.length === 0 && podiumOrder.length === 0 && (
                  <p className="text-center text-gray-400 py-14 text-sm">
                    {search
                      ? `Tidak ada anime yang cocok dengan "${search}".`
                      : "Belum ada data anime untuk ditampilkan."}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}