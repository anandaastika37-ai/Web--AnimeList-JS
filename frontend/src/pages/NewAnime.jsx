import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";

import MainLayout from "../layout/MainLayout.jsx";

import {
  faArrowLeft,
  faMagnifyingGlass,
  faFire,
  faLayerGroup,
  faClapperboard,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import AnimeCard from "../components/AnimeCard.jsx";

// =========================
// GENRE LIST
// =========================

const genres = [
  "Action",
  "Fantasy",
  "Romance",
  "Comedy",
  "Drama",
  "Isekai",
  "Slice of Life",
];

export default function NewAnimePage() {
  // =========================
  // STATE
  // =========================

  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    const dataAnime = async () => {
      try {
        setIsLoading(true);

        // Sesuaikan URL ini kalau route backend untuk anime terbaru berbeda
        const response = await fetch("http://localhost:3000/api/anime");

        if (!response.ok) {
          throw new Error("Gagal mengambil data anime terbaru");
        }

        const data = await response.json();

        console.log("Data anime terbaru:", data);

        setAnimeList(data);
      } catch (error) {
        console.error("ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    };

    dataAnime();
  }, []);

  // =========================
  // HANYA STATUS "ONGOING"
  // =========================

  // Halaman ini khusus anime yang sedang tayang, jadi apapun hasil
  // fetch-nya, yang ditampilkan cuma yang status-nya "Ongoing".
  const ongoingAnimeList = useMemo(() => {
    return animeList.filter(
      (anime) => anime.status?.toLowerCase() === "ongoing"
    );
  }, [animeList]);

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredAnime = useMemo(() => {
    return ongoingAnimeList.filter((anime) => {
      // Filter berdasarkan judul
      const matchesSearch = anime.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      // Filter berdasarkan genre
      const matchesGenre =
        activeGenre === "" || anime.genres?.includes(activeGenre);

      return matchesSearch && matchesGenre;
    });
  }, [ongoingAnimeList, search, activeGenre]);

  return (
    <MainLayout>
      <div className="flex min-h-screen w-full flex-col items-center gap-8 bg-gray-50 pb-16 pt-24">
        {/* HEADER */}
        <div className="relative w-[95%] overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-t from-blue-900 to-blue-950 px-6 py-10 shadow-xl sm:px-10">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden opacity-20">
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-500 blur-[100px]" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500 blur-[100px]" />
          </div>

          <div className="relative z-10 text-sky-100">
            <a
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition-colors hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Kembali ke Beranda
            </a>

            <h1 className="mb-3 flex items-center gap-3 font-montserrat text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              <FontAwesomeIcon icon={faFire} className="text-indigo-300" />
              Anime Terbaru
            </h1>

            <p className="max-w-2xl text-sm text-sky-200/90 sm:text-base">
              Daftar anime yang baru saja rilis dan sedang tayang. Cari judul
              atau filter berdasarkan genre untuk menemukan tontonan terbarumu.
            </p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex w-[95%] flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
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
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm text-gray-700 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1 text-xs font-semibold text-gray-500 sm:text-sm">
              <FontAwesomeIcon icon={faLayerGroup} />
              Genre:
            </span>

            <button
              type="button"
              onClick={() => setActiveGenre("")}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                activeGenre === ""
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              Semua
            </button>

            {genres.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => setActiveGenre(genre)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                  activeGenre === genre
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* GRID ANIME */}
        <div className="w-[95%]">
          {!isLoading && ongoingAnimeList.length > 0 && (
            <p className="mb-4 text-sm text-gray-500">
              Menampilkan{" "}
              <span className="font-semibold text-gray-700">
                {filteredAnime.length}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-gray-700">
                {ongoingAnimeList.length}
              </span>{" "}
              anime terbaru
            </p>
          )}

          {isLoading ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm animate-pulse"
                >
                  <div className="h-52 w-full bg-gray-200" />
                  <div className="flex flex-col gap-2 p-3">
                    <div className="h-4 w-4/5 rounded bg-gray-200" />
                    <div className="h-3 w-3/5 rounded bg-gray-200" />
                    <div className="h-3 w-2/5 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : ongoingAnimeList.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-16 text-gray-400 shadow-sm">
              <FontAwesomeIcon icon={faDatabase} className="text-4xl" />
              <p className="font-medium">Belum ada data anime terbaru.</p>
              <p className="text-xs text-gray-400">
                Sambungkan endpoint database untuk menampilkan daftarnya di
                sini.
              </p>
            </div>
          ) : filteredAnime.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-16 text-gray-400 shadow-sm">
              <FontAwesomeIcon icon={faClapperboard} className="text-4xl" />
              <p className="font-medium">
                Tidak ada anime terbaru yang cocok dengan pencarianmu.
              </p>
              <p className="text-xs text-gray-400">
                Coba gunakan kata kunci atau genre lainnya.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredAnime.map((anime) => (
                <AnimeCard key={anime.id ?? anime.title} {...anime} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}