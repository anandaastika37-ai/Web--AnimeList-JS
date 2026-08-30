import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layout/MainLayout.jsx";
import {
  faPuzzlePiece,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import SideBar from "../components/SidebarCategory.jsx";
import AnimeCard from "../components/AnimeCard.jsx";
import AnimeList from "../data/animeList.json";

export default function CategoryPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const filteredAnime = useMemo(() => {
    let result = [...AnimeList];

    // Filter by search
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter((anime) =>
        anime.title.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "oldest":
        result.reverse(); // sesuaikan kalau ada field tanggal seperti "year"
        break;
      case "latest":
      default:
        // urutan bawaan dari animeList.json dianggap terbaru dulu
        break;
    }

    return result;
  }, [search, sortBy]);

  return (
    <MainLayout>
      <SideBar />
      <div className="w-full h-auto pt-17 flex flex-col items-end">
        <div className="header w-[85%] border border-gray-200 bg-white px-8 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-xl text-gray-800 flex items-center gap-2">
              <FontAwesomeIcon icon={faPuzzlePiece} className="text-blue-800" />
              Category
            </h2>
            <p className="text-sm text-gray-600">
              Discover anime by genre and find your next favorite series.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Search box */}
            <div className="relative w-full sm:w-64">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search anime title..."
                className="w-full pl-9 pr-8 py-2 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-sm" />
                </button>
              )}
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-2">
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
                <option value="az">Title A-Z</option>
                <option value="za">Title Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content: card grid */}
        <div className="content w-[85%] px-8 py-6">
          {filteredAnime.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 mb-4">
                Menampilkan {filteredAnime.length} anime
              </p>
              <div className="card-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {filteredAnime.map((anime) => (
                  <AnimeCard key={anime.id} {...anime} className="w-full" />
                ))}
              </div>
            </>
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
      </div>
    </MainLayout>
  );
}