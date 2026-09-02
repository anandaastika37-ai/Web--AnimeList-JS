import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layout/MainLayout.jsx";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faStar,
  faCalendarDays,
  faLayerGroup,
  faClapperboard,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

export default function UpcomingAnimePage() {
  // upcomingAnimeList sengaja mulai dari array kosong.
  // Isi lewat setUpcomingAnimeList(data) begitu fetch ke database sudah dipasang.
  const [upcomingAnimeList, setUpcomingAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  useEffect(() => {
    // TODO: sambungkan ke database di sini, pola sama seperti di HomePage.jsx
    //
    // const getUpcomingAnime = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await fetch("http://localhost:3000/api/anime/upcoming");
    //     if (!response.ok) throw new Error("Gagal mengambil data anime upcoming");
    //     const data = await response.json();
    //     setUpcomingAnimeList(data);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // getUpcomingAnime();

    setIsLoading(false); // hapus baris ini setelah fetch di atas dipasang beneran
  }, []);

  // Kumpulkan semua genre unik dari data upcoming untuk dijadikan filter
  const genres = useMemo(() => {
    const allGenres = upcomingAnimeList.flatMap((anime) => anime.genres || []);
    return ["All", ...new Set(allGenres)];
  }, [upcomingAnimeList]);

  const filteredAnime = useMemo(() => {
    return upcomingAnimeList.filter((anime) => {
      const matchSearch = (anime.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchGenre =
        activeGenre === "All" || anime.genres?.includes(activeGenre);
      return matchSearch && matchGenre;
    });
  }, [upcomingAnimeList, search, activeGenre]);

  return (
    <MainLayout>
      <div className="w-full flex flex-col items-center gap-8 pb-16 pt-24 bg-gray-50 min-h-screen">
        {/* --- HEADER --- */}
        <div className="w-[95%] bg-gradient-to-t from-blue-900 to-blue-950 rounded-2xl shadow-xl border border-gray-200 py-10 px-6 sm:px-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 text-sky-100">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sky-200 hover:text-white text-sm font-semibold mb-6 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Kembali ke Beranda
            </a>
            <h1 className="font-extrabold font-montserrat text-3xl sm:text-4xl lg:text-5xl text-white flex items-center gap-3 mb-3">
              <FontAwesomeIcon icon={faCalendarDays} className="text-indigo-300" />
              Anime Upcoming
            </h1>
            <p className="text-sky-200/90 text-sm sm:text-base max-w-2xl">
              Daftar lengkap anime yang akan segera tayang. Cari judul atau
              filter berdasarkan genre untuk menemukan tontonan berikutnya.
            </p>
          </div>
        </div>
        {/* --- HEADER END --- */}

        {/* --- FILTER BAR --- */}
        <div className="w-[95%] bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col gap-4">
          <div className="relative w-full sm:w-96">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul anime..."
              className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-500 text-xs sm:text-sm font-semibold flex items-center gap-1 mr-1">
              <FontAwesomeIcon icon={faLayerGroup} /> Genre:
            </span>
            {genres.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => setActiveGenre(genre)}
                className={`text-xs sm:text-sm font-medium py-1.5 px-3 rounded-full border transition-colors ${
                  activeGenre === genre
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        {/* --- FILTER BAR END --- */}

        {/* --- GRID ANIME --- */}
        <div className="w-[95%]">
          {!isLoading && upcomingAnimeList.length > 0 && (
            <p className="text-gray-500 text-sm mb-4">
              Menampilkan {filteredAnime.length} dari{" "}
              {upcomingAnimeList.length} anime upcoming
            </p>
          )}

          {isLoading ? (
            // --- SKELETON LOADING ---
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm animate-pulse"
                >
                  <div className="w-full h-52 bg-gray-200"></div>
                  <div className="p-3 flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/5"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/5"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : upcomingAnimeList.length === 0 ? (
            // --- BELUM ADA DATA (DB belum disambungkan / kosong) ---
            <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm py-16 flex flex-col items-center justify-center gap-3 text-gray-400">
              <FontAwesomeIcon icon={faDatabase} className="text-4xl" />
              <p className="font-medium">Belum ada data anime upcoming.</p>
              <p className="text-xs text-gray-400">
                Sambungkan endpoint database untuk menampilkan daftarnya di sini.
              </p>
            </div>
          ) : filteredAnime.length === 0 ? (
            // --- HASIL PENCARIAN/FILTER KOSONG ---
            <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm py-16 flex flex-col items-center justify-center gap-3 text-gray-400">
              <FontAwesomeIcon icon={faClapperboard} className="text-4xl" />
              <p className="font-medium">
                Tidak ada anime upcoming yang cocok dengan pencarianmu.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {filteredAnime.map((anime) => (
                <a
                  key={anime.id ?? anime.title}
                  href={`/anime/${anime.id ?? anime.title}`}
                  className="group flex flex-col rounded-xl overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-950 border border-indigo-700/50 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-full h-52 object-cover"
                    />
                    <span className="absolute top-2 right-2 text-[10px] sm:text-xs font-bold text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md border border-white/20">
                      {anime.status}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3 flex-1">
                    <h4 className="font-bold text-white text-sm sm:text-base leading-snug truncate group-hover:text-sky-200 transition-colors">
                      {anime.title}
                    </h4>
                    <div className="text-[11px] sm:text-xs text-indigo-200 truncate">
                      {anime.genres?.join(", ")}
                    </div>
                    <div className="mt-auto flex items-center gap-1 text-xs font-semibold text-yellow-400">
                      <FontAwesomeIcon icon={faStar} /> {anime.rating}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
        {/* --- GRID ANIME END --- */}
      </div>
    </MainLayout>
  );
}