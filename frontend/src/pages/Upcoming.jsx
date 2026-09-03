import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

// =========================
// DATA DUMMY
// =========================

const upcomingAnimeList = [
  {
    id: 1,
    title: "Contoh Judul Anime Upcoming Satu",
    image: "https://placehold.co/300x400/1e293b/ffffff?text=Anime+1",
    status: "Upcoming",
    genres: ["Action", "Fantasy"],
    rating: "8.5",
  },
  {
    id: 2,
    title: "Contoh Judul Anime Upcoming Dua",
    image: "https://placehold.co/300x400/1e293b/ffffff?text=Anime+2",
    status: "Upcoming",
    genres: ["Romance", "Drama"],
    rating: "7.9",
  },
  {
    id: 3,
    title: "Contoh Judul Anime Upcoming Tiga",
    image: "https://placehold.co/300x400/1e293b/ffffff?text=Anime+3",
    status: "Upcoming",
    genres: ["Comedy", "Slice of Life"],
    rating: "8.1",
  },
  {
    id: 4,
    title: "Contoh Judul Anime Upcoming Empat",
    image: "https://placehold.co/300x400/1e293b/ffffff?text=Anime+4",
    status: "Upcoming",
    genres: ["Isekai", "Action"],
    rating: "9.0",
  },
  {
    id: 5,
    title: "Contoh Judul Anime Upcoming Lima",
    image: "https://placehold.co/300x400/1e293b/ffffff?text=Anime+5",
    status: "Upcoming",
    genres: ["Fantasy", "Drama"],
    rating: "8.3",
  },
];

// =========================
// GENRE
// =========================

const genreList = [
  "Action",
  "Fantasy",
  "Romance",
  "Comedy",
  "Drama",
  "Isekai",
  "Slice of Life",
];

export default function UpcomingAnimePage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  // Untuk sementara loading false
  const isLoading = false;

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredAnime = upcomingAnimeList.filter((anime) => {
    const matchesSearch = anime.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "" || anime.genres.includes(selectedGenre);

    return matchesSearch && matchesGenre;
  });

  return (
    <MainLayout>
      <div className="w-full min-h-screen flex flex-col items-center gap-8 bg-gray-50 pt-24 pb-16">
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
            {/* Back button */}
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
                icon={faCalendarDays}
                className="text-indigo-300"
              />

              Anime Upcoming
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-sm text-sky-200/90 sm:text-base">
              Daftar lengkap anime yang akan segera tayang. Cari judul atau
              filter berdasarkan genre untuk menemukan tontonan berikutnya.
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
              onClick={() => setSelectedGenre("")}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                selectedGenre === ""
                  ? "border-indigo-500 bg-indigo-500 text-white"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              Semua
            </button>

            {/* Genre list */}
            {genreList.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => setSelectedGenre(genre)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                  selectedGenre === genre
                    ? "border-indigo-500 bg-indigo-500 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* =========================
            ANIME GRID
        ========================= */}

        <div className="w-[95%]">
          {/* Result count */}
          {!isLoading && upcomingAnimeList.length > 0 && (
            <p className="mb-4 text-sm text-gray-500">
              Menampilkan{" "}
              <span className="font-semibold text-gray-700">
                {filteredAnime.length}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-gray-700">
                {upcomingAnimeList.length}
              </span>{" "}
              anime upcoming
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
          ) : upcomingAnimeList.length === 0 ? (
            /* =========================
                DATABASE KOSONG
            ========================= */

            <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-16 text-gray-400 shadow-sm">
              <FontAwesomeIcon icon={faDatabase} className="text-4xl" />

              <p className="font-medium">
                Belum ada data anime upcoming.
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
              <FontAwesomeIcon icon={faClapperboard} className="text-4xl" />

              <p className="font-medium">
                Tidak ada anime upcoming yang cocok.
              </p>

              <p className="text-xs text-gray-400">
                Coba gunakan kata kunci atau genre lainnya.
              </p>
            </div>
          ) : (
            /* =========================
                ANIME LIST
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

                    {/* Rating */}
                    <div className="mt-auto flex items-center gap-1 text-xs font-semibold text-yellow-400">
                      <FontAwesomeIcon icon={faStar} />

                      {anime.rating}
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