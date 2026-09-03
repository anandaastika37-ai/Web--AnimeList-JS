import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";

import MainLayout from "../layout/MainLayout.jsx";

import {
  faArrowLeft,
  faMagnifyingGlass,
  faStar,
  faFire,
  faLayerGroup,
  faClapperboard,
  faDatabase,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

// =========================
// DATA DUMMY
// =========================

const newAnimeList = [
  {
    id: 1,
    title: "Contoh Anime Terbaru Satu",
    image: "https://placehold.co/300x400/1e293b/ffffff?text=Anime+1",
    status: "Ongoing",
    genres: ["Action", "Fantasy"],
    rating: "8.5",
    episode: 12,
  },
  {
    id: 2,
    title: "Contoh Anime Terbaru Dua",
    image: "https://placehold.co/300x400/1e293b/ffffff?text=Anime+2",
    status: "Ongoing",
    genres: ["Romance", "Drama"],
    rating: "7.9",
    episode: 8,
  },
  {
    id: 3,
    title: "Contoh Anime Terbaru Tiga",
    image: "https://placehold.co/300x400/1e293b/ffffff?text=Anime+3",
    status: "Ongoing",
    genres: ["Comedy", "Slice of Life"],
    rating: "8.1",
    episode: 6,
  },
  {
    id: 4,
    title: "Contoh Anime Terbaru Empat",
    image: "https://placehold.co/300x400/1e293b/ffffff?text=Anime+4",
    status: "Ongoing",
    genres: ["Isekai", "Action"],
    rating: "9.0",
    episode: 10,
  },
  {
    id: 5,
    title: "Contoh Anime Terbaru Lima",
    image: "https://placehold.co/300x400/1e293b/ffffff?text=Anime+5",
    status: "Ongoing",
    genres: ["Fantasy", "Drama"],
    rating: "8.3",
    episode: 5,
  },
];

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

  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("");

  // Sementara masih dummy
  const isLoading = false;

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredAnime = useMemo(() => {
    return newAnimeList.filter((anime) => {
      // Filter berdasarkan judul
      const matchesSearch = anime.title
        .toLowerCase()
        .includes(search.toLowerCase());

      // Filter berdasarkan genre
      const matchesGenre =
        activeGenre === "" || anime.genres?.includes(activeGenre);

      return matchesSearch && matchesGenre;
    });
  }, [search, activeGenre]);

  return (
    <MainLayout>
      <div className="flex min-h-screen w-full flex-col items-center gap-8 bg-gray-50 pb-16 pt-24">
        {/* =========================
            HEADER
        ========================= */}

        <div className="relative w-[95%] overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-t from-blue-900 to-blue-950 px-6 py-10 shadow-xl sm:px-10">
          {/* Background decoration */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden opacity-20">
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-500 blur-[100px]" />

            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500 blur-[100px]" />
          </div>

          <div className="relative z-10 text-sky-100">
            {/* Back */}
            <a
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition-colors hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Kembali ke Beranda
            </a>

            {/* Title */}
            <h1 className="mb-3 flex items-center gap-3 font-montserrat text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              <FontAwesomeIcon
                icon={faFire}
                className="text-indigo-300"
              />

              Anime Terbaru
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-sm text-sky-200/90 sm:text-base">
              Daftar anime yang baru saja rilis dan sedang tayang. Cari judul
              atau filter berdasarkan genre untuk menemukan tontonan
              terbarumu.
            </p>
          </div>
        </div>

        {/* =========================
            FILTER BAR
        ========================= */}

        <div className="flex w-[95%] flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          {/* Search */}
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

          {/* Genre */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1 text-xs font-semibold text-gray-500 sm:text-sm">
              <FontAwesomeIcon icon={faLayerGroup} />
              Genre:
            </span>

            {/* Semua */}
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

            {/* Genre */}
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

        {/* =========================
            GRID ANIME
        ========================= */}

        <div className="w-[95%]">
          {/* Result count */}
          {!isLoading && newAnimeList.length > 0 && (
            <p className="mb-4 text-sm text-gray-500">
              Menampilkan{" "}
              <span className="font-semibold text-gray-700">
                {filteredAnime.length}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-gray-700">
                {newAnimeList.length}
              </span>{" "}
              anime terbaru
            </p>
          )}

          {/* =========================
              LOADING
          ========================= */}

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
          ) : newAnimeList.length === 0 ? (
            /* =========================
               DATA KOSONG
            ========================= */

            <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-16 text-gray-400 shadow-sm">
              <FontAwesomeIcon
                icon={faDatabase}
                className="text-4xl"
              />

              <p className="font-medium">
                Belum ada data anime terbaru.
              </p>

              <p className="text-xs text-gray-400">
                Sambungkan endpoint database untuk menampilkan daftarnya di
                sini.
              </p>
            </div>
          ) : filteredAnime.length === 0 ? (
            /* =========================
               FILTER KOSONG
            ========================= */

            <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-16 text-gray-400 shadow-sm">
              <FontAwesomeIcon
                icon={faClapperboard}
                className="text-4xl"
              />

              <p className="font-medium">
                Tidak ada anime terbaru yang cocok dengan pencarianmu.
              </p>

              <p className="text-xs text-gray-400">
                Coba gunakan kata kunci atau genre lainnya.
              </p>
            </div>
          ) : (
            /* =========================
               ANIME GRID
            ========================= */

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredAnime.map((anime) => (
                <a
                  key={anime.id ?? anime.title}
                  href={`/anime/${anime.id ?? anime.title}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-indigo-700/50 bg-gradient-to-b from-blue-900 to-indigo-950 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="h-52 w-full object-cover"
                    />

                    {/* Badge Baru */}
                    <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md border border-white/20 bg-indigo-600/90 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm sm:text-xs">
                      <FontAwesomeIcon
                        icon={faFire}
                        className="text-[10px]"
                      />
                      Baru
                    </span>

                    {/* Status */}
                    <span className="absolute right-2 top-2 rounded-md border border-white/20 bg-black/50 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm sm:text-xs">
                      {anime.status}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-1.5 p-3">
                    {/* Title */}
                    <h4 className="truncate text-sm font-bold leading-snug text-white transition-colors group-hover:text-sky-200 sm:text-base">
                      {anime.title}
                    </h4>

                    {/* Genres */}
                    <div className="truncate text-[11px] text-indigo-200 sm:text-xs">
                      {anime.genres?.join(", ")}
                    </div>

                    {/* Rating + Episode */}
                    <div className="mt-auto flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center gap-1 text-yellow-400">
                        <FontAwesomeIcon icon={faStar} />
                        {anime.rating}
                      </span>

                      {anime.episode && (
                        <span className="flex items-center gap-1 text-indigo-200">
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="text-[10px]"
                          />

                          Eps {anime.episode}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}