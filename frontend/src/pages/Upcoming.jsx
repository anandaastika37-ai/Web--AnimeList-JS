import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MainLayout from "../layout/MainLayout.jsx";

import {
  faArrowLeft,
  faMagnifyingGlass,
  faCalendarDays,
  faLayerGroup,
  faClapperboard,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

import AnimeCard from "../components/AnimeCard.jsx";

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
  // =========================
  // STATE
  // =========================

  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    const dataAnime = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          "http://localhost:3000/api/anime"
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data anime");
        }

        const data = await response.json();

        console.log("Data anime:", data);

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
  // HANYA STATUS "UPCOMING"
  // =========================

  // Halaman ini khusus anime upcoming, jadi apapun hasil fetch-nya,
  // yang ditampilkan cuma yang status-nya "Upcoming".
  const upcomingAnimeList = animeList.filter(
    (anime) => anime.status?.toLowerCase() === "upcoming"
  );

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredAnime = upcomingAnimeList.filter((anime) => {
    const matchesSearch = anime.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "" ||
      anime.genres?.includes(selectedGenre);

    return matchesSearch && matchesGenre;
  });

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
               DATA KOSONG
            ========================= */

            <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-16 text-gray-400 shadow-sm">

              <FontAwesomeIcon
                icon={faDatabase}
                className="text-4xl"
              />

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

              <FontAwesomeIcon
                icon={faClapperboard}
                className="text-4xl"
              />

              <p className="font-medium">
                Tidak ada anime upcoming yang cocok.
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
                <AnimeCard
                  key={anime.id ?? anime.title}
                  {...anime}
                />
              ))}

            </div>
          )}

        </div>
      </div>
    </MainLayout>
  );
}