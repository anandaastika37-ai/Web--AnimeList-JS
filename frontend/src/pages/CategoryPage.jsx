import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layout/MainLayout.jsx";
import {
  faPuzzlePiece,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import SideBar from "../components/SidebarCategory.jsx";
import AnimeCard from "../components/AnimeCard.jsx";

// Handles anime.genre as either a string ("Action, Comedy") or an array (["Action","Comedy"])
function getGenres(anime) {
  if (Array.isArray(anime.genre)) return anime.genre;
  if (typeof anime.genre === "string") return anime.genre.split(",").map((g) => g.trim());
  if (Array.isArray(anime.genres)) return anime.genres;
  return [];
}

export default function CategoryPage() {
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Ambil data anime dari backend — endpoint sama dengan yang dipakai
  // di halaman Browse, supaya datanya konsisten di seluruh app
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);

        const response = await fetch("http://localhost:3000/api/anime");
        if (!response.ok) {
          throw new Error("Gagal mengambil data anime");
        }
        const data = await response.json();
        setAnimeList(data);
      } catch (error) {
        console.error("Error:", error);
        setLoadError("Gagal memuat data anime dari server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnime();
  }, []);

  const filteredAnime = useMemo(() => {
    let result = [...animeList];

    // Filter by selected sidebar category
    if (selectedCategory) {
      result = result.filter((anime) =>
        getGenres(anime).some(
          (g) => g.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    // Filter by search
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter((anime) =>
        anime.title?.toLowerCase().includes(query)
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
        result.reverse();
        break;
      case "latest":
      default:
        break;
    }

    return result;
  }, [animeList, search, sortBy, selectedCategory]);

  return (
    <MainLayout>
      <SideBar selected={selectedCategory} onSelect={setSelectedCategory} />
      <div className="w-full h-auto pt-17 flex flex-col items-end">
        <div className="header w-[85%] border border-gray-200 bg-white px-8 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-xl text-gray-800 flex items-center gap-2">
              <FontAwesomeIcon icon={faPuzzlePiece} className="text-blue-800" />
              Category
              {selectedCategory && (
                <span className="text-sm font-normal text-gray-500">
                  — {selectedCategory}
                </span>
              )}
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
          {isLoading ? (
            <div className="w-full py-16 flex flex-col items-center justify-center text-center text-gray-500">
              <p className="font-medium">Memuat data anime...</p>
            </div>
          ) : loadError ? (
            <div className="w-full py-16 flex flex-col items-center justify-center text-center text-red-500">
              <p className="font-medium">{loadError}</p>
            </div>
          ) : filteredAnime.length > 0 ? (
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