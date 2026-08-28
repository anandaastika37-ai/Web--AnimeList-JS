import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faHeart, } from "@fortawesome/free-regular-svg-icons";
import imgTest from "../assets/imgTest.jpg";
export default function AnimeCard({
    image,
    title,
    rating,
    status,
    episodes,
    studio,
    genres = [],
    href = "#",
    saved = false,
    liked = false,
    onSave,
    onLike,
    className
}) {
    const [isSaved, setIsSaved] = useState(saved);
    const [isLiked, setIsLiked] = useState(liked);

    function handleSave(e) {
        e.preventDefault();
        e.stopPropagation();
        const next = !isSaved;
        setIsSaved(next);
        onSave?.(next);
    }

    function handleLike(e) {
        e.preventDefault();
        e.stopPropagation();
        const next = !isLiked;
        setIsLiked(next);
        onLike?.(next);
    }

    return (
        <a
            href={href}
            className={`anime-card group ${className} block  shrink-0 rounded-xl overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/30`}
        >
            {/* Poster */}
            <div className="relative w-full aspect-[2/3] overflow-hidden bg-blue-950">
                <img
                    src={imgTest}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* gradient overlay biar teks kebaca */}
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/95 via-blue-950/15 to-transparent" />

                {/* badge status - kiri atas, samain sama badge status di section lain */}
                {status && (
                    <span className="absolute top-3 left-3 bg-linear-to-l from-indigo-700 to-purple-500 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md">
                        {status}
                    </span>
                )}

                {/* info: rating, genre, judul, episode, studio, aksi */}
                <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="flex items-center flex-wrap gap-1.5 mb-1.5">
                        {rating && (
                            <span className="flex items-center gap-1 text-yellow-300 text-sm font-bold">
                                <FontAwesomeIcon icon={faStar} className="text-xs" />
                                {rating}
                            </span>
                        )}
                        {genres.slice(0, 2).map((genre) => (
                            <span
                                key={genre}
                                className="text-[11px] border border-gray-400/60 text-sky-100 px-2 py-0.5 rounded-md"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>

                    <h4 className="font-open-sans font-bold text-white text-base leading-tight line-clamp-2 mb-1">
                        {title}
                    </h4>

                    <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1 text-xs text-sky-200 font-medium truncate">
                            {episodes && <span>{episodes} Eps</span>}
                            {episodes && studio && <span className="mx-1">•</span>}
                            {studio && (
                                <span>
                                    <FontAwesomeIcon icon={faBuilding} className="mr-1" />
                                    {studio}
                                </span>
                            )}
                        </div>

                        {/* aksi: like & save, ikon aja - samain sama section Rekomendasi */}
                        <div className="flex items-center gap-2.5 shrink-0">
                            <button
                                type="button"
                                onClick={handleLike}
                                aria-pressed={isLiked}
                                aria-label={isLiked ? "Batal suka" : "Suka"}
                                className={`transition-colors duration-200 ${
                                    isLiked ? "text-red-400" : "text-white hover:text-red-400"
                                }`}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                aria-pressed={isSaved}
                                aria-label={isSaved ? "Hapus dari list" : "Simpan ke list"}
                                className={`transition-colors duration-200 ${
                                    isSaved ? "text-yellow-300" : "text-white hover:text-yellow-300"
                                }`}
                            >
                                <FontAwesomeIcon icon={faBookmark} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}